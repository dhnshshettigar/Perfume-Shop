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
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Perfume Shop</h1>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="text-gray-700 hover:text-primary">Home</a>
          <a href="#collections" className="text-gray-700 hover:text-primary">Collections</a>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl p-8 bg-gradient-to-r from-bannerStart to-bannerEnd text-primary mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Discover our latest collection</h2>
            <p className="text-sm mt-1">Handpicked fragrances — limited offers available.</p>
          </div>
          <div>
            <a href="#products" className="btn bg-primary text-white">Explore collections</a>
          </div>
        </div>

        <section id="products">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Featured perfumes</h3>
            <div className="text-sm text-gray-500">{products.length} items</div>
          </div>

          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
