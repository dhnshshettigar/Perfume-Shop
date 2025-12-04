// client/src/shared/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const mainImg = Array.isArray(product.mainImage) ? product.mainImage[0] : product.mainImage;

  return (
    <article
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer bg-white rounded-xl2 overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-2 transition"
    >
      <div className="w-full aspect-[4/3] relative bg-gray-100">
        <img
          src={mainImg}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h4 className="text-base font-semibold text-gray-900 truncate">{product.name}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.shortDesc}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-primary">₹{product.price}</div>
          <div className="text-xs text-gray-400">{product.sizes?.join(' • ')}</div>
        </div>
      </div>
    </article>
  );
}
