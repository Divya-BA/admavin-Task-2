
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InfiniteScroll.css'; // Import your CSS file

function Infinite() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10}`);
      const data = response.data;
      setProducts(prevProducts => [...prevProducts, ...data.products]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight
    ) return;
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      <h1>Infinite Scroll </h1>
      <div className="content">
        {products.map(product => (
          <div className="card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div className="card-body">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Infinite;
