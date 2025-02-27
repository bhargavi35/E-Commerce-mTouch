'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import Sorting from './components/Sorting';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState({ field: 'name', order: 'asc' });

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (field, order) => {
    setSortCriteria({ field, order });
  };

  const sortedProducts = products.sort((a, b) => {
    if (sortCriteria.field === 'name') {
      return sortCriteria.order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortCriteria.field === 'price') {
      return sortCriteria.order === 'asc' ? a.price - b.price : b.price - a.price;
    }
  });

  const paginatedProducts = sortedProducts.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">Product Catalog</h1>
      <Sorting onSortChange={handleSortChange} />
      <ProductList products={paginatedProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedProducts.length / 10)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
