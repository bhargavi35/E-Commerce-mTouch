'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import Sorting from './components/Sorting';
import { FadeLoader } from 'react-spinners';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({ field: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch products. Please try again.');
        setLoading(false);
      });
  }, []);

  // Filtering by search query
  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Sorting function
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortCriteria.field === 'name') {
      return sortCriteria.order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortCriteria.field === 'price') {
      return sortCriteria.order === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSortChange = (field, order) => {
    setSortCriteria({ field, order });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="px-4 py-2 mb-4 border border-gray-300 rounded-lg w-80 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <Sorting onSortChange={handleSortChange} />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FadeLoader color="#3498db" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-lg font-semibold mt-4">{error}</div>
      ) : (
        <>
          <ProductList products={paginatedProducts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}
