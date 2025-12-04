// client/src/shared/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // some products have mainImage as array in your seed — handle both
  const mainImg = Array.isArray(product.mainImage) ? product.mainImage[0] : product.mainImage;

  return (
    <article
      onClick={() => navigate(`/product/${product._id}`)}
      style={{
        cursor: 'pointer',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        background: '#fff',
        transition: 'transform .15s ease, box-shadow .15s ease'
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 26px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)'; }}
    >
      <div style={{ width: '100%', paddingTop: '70%', position: 'relative', overflow: 'hidden' }}>
        <img
          src={mainImg}
          alt={product.name}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ padding: '0.8rem' }}>
        <h4 style={{ margin: '0 0 0.25rem 0' }}>{product.name}</h4>
        <p style={{ margin: 0, fontSize: 13, color: '#555' }}>{product.shortDesc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <strong>₹{product.price}</strong>
          <span style={{ fontSize: 12, color: '#777' }}>{product.sizes?.join(' • ')}</span>
        </div>
      </div>
    </article>
  );
}
