// client/src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        if (!cancelled) setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProduct();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading product...</p>;
  if (!product) return <p style={{ padding: '2rem' }}>Product not found.</p>;

  const images = Array.isArray(product.images) ? product.images : (product.images ? [product.images] : []);

  return (
    <main style={{ padding: '2rem' }}>
      <button onClick={() => window.history.back()} style={{ marginBottom: 12 }}>← Back</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <img src={images[0] || product.mainImage} alt={product.name} style={{ width: '100%', borderRadius: 8 }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`${product.name}-${i}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
            ))}
          </div>
        </div>

        <div>
          <h2>{product.name}</h2>
          <p style={{ color: '#666' }}>{product.description}</p>
          <p><strong>Price: ₹{product.price}</strong></p>
          <p>Sizes: {product.sizes?.join(', ')}</p>

          <div style={{ marginTop: 12 }}>
            <button style={{ padding: '0.6rem 1rem', marginRight: 8 }}>Add to Cart</button>
            <button style={{ padding: '0.6rem 1rem' }} onClick={() => { navigator.share ? navigator.share({ title: product.name, text: product.shortDesc, url: window.location.href }) : alert('Share not supported in this browser') }}>Share</button>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 24 }}>
        <h3>Reviews</h3>
        {product.reviews?.length ? (
          product.reviews.map(r => (
            <div key={r._id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
              <strong>{r.name}</strong> <span style={{ color: '#888', fontSize: 13 }}> — {r.rating}/5</span>
              <p style={{ margin: 6 }}>{r.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </main>
  );
}
