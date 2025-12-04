// client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from '../shared/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (!cancelled) setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Perfume Shop</h1>
        <nav>
          <a href="/" style={{ marginRight: 12 }}>Home</a>
          <a href="#collections">Collections</a>
        </nav>
      </header>

      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{
          background: 'linear-gradient(90deg,#f3ec78,#af4261)',
          padding: '2rem',
          borderRadius: 12,
          color: '#111'
        }}>
          <h2>Discover our latest collection</h2>
          <p>Handpicked fragrances — limited offers available.</p>
          <a href="#products" style={{ padding: '0.5rem 1rem', background: '#111', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>
            Explore
          </a>
        </div>
      </section>

      <section id="products">
        <h3 style={{ marginBottom: '1rem' }}>Featured perfumes</h3>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem'
        }}>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
