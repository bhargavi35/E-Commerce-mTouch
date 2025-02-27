'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import Sorting from './components/Sorting';
import { FadeLoader } from 'react-spinners';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({ field: 'name', order: 'asc' });

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Sorting function
  const sortedProducts = [...products].sort((a, b) => {
    if (sortCriteria.field === "name") {
      return sortCriteria.order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortCriteria.field === "price") {
      return sortCriteria.order === "asc" ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSortChange = (field, order) => {
    setSortCriteria({ field, order });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
      <Sorting onSortChange={handleSortChange} />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FadeLoader color="#3498db" />
        </div>
      ) : (
        <>
          <ProductList products={paginatedProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
