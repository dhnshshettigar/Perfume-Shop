// client/src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // review form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

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

  if (loading) return <div className="p-8">Loading product...</div>;
  if (!product) return <div className="p-8">Product not found.</div>;

  const images = Array.isArray(product.images) ? product.images : (product.images ? [product.images] : []);
  const mainImg = images[0] || (Array.isArray(product.mainImage) ? product.mainImage[0] : product.mainImage);

  // handle review submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!name.trim()) return setFormError('Please enter your name.');
    if (!comment.trim()) return setFormError('Please enter a comment.');
    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return setFormError('Rating must be between 1 and 5.');
    }

    const payload = { name: name.trim(), rating: numericRating, comment: comment.trim() };

    const tempReview = {
      _id: `temp-${Date.now()}`,
      name: payload.name,
      rating: payload.rating,
      comment: payload.comment,
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    setProduct(prev => ({ ...prev, reviews: [tempReview, ...(prev.reviews || [])] }));
    setSubmitting(true);

    try {
      const res = await api.post(`/products/${id}/reviews`, payload);
      const realReview = res.data.review;
      setProduct(prev => {
        const withoutTemp = (prev.reviews || []).filter(r => !(r._id && String(r._id).startsWith('temp-')));
        return { ...prev, reviews: [realReview, ...withoutTemp] };
      });
      setFormSuccess('Review submitted — thank you!');
      setName('');
      setRating(5);
      setComment('');
      setTimeout(() => setFormSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to submit review', err);
      setProduct(prev => ({ ...prev, reviews: (prev.reviews || []).filter(r => !(r._id && String(r._id).startsWith('temp-'))) }));
      setFormError(err?.response?.data?.message || 'Failed to submit review. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm text-gray-600 hover:text-primary">← Back to home</Link>
          <div className="text-sm text-gray-500">SKU: <span className="font-medium">#{product._id.slice(-6)}</span></div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Images */}
            <div>
              <div className="rounded-xl overflow-hidden bg-gray-100">
                <img src={mainImg} alt={product.name} className="w-full h-[420px] object-cover" />
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        // move clicked image to front
                        setProduct(prev => {
                          const imgs = Array.isArray(prev.images) ? [...prev.images] : (prev.images ? [prev.images] : []);
                          const newImgs = [...imgs];
                          const [picked] = newImgs.splice(idx, 1);
                          newImgs.unshift(picked);
                          return { ...prev, images: newImgs };
                        });
                      }}
                      className="flex-none w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border hover:border-primary"
                    >
                      <img src={src} alt={`${product.name}-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.shortDesc}</p>
              <p className="mt-4 text-gray-800 text-xl font-semibold">₹{product.price}</p>

              <div className="mt-4">
                <div className="text-sm text-gray-500">Available sizes</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {product.sizes?.map(s => (
                    <span key={s} className="px-3 py-1 border rounded-full text-sm text-gray-700">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="btn bg-primary text-white">Add to cart</button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: product.name, text: product.shortDesc, url: window.location.href });
                    } else {
                      // fallback: copy url
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Product link copied to clipboard');
                    }
                  }}
                  className="btn border border-gray-200"
                >
                  Share
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-700">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews + Form */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left: reviews list (2/3 width on lg) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <div className="text-sm text-gray-500">{product.reviews?.length || 0} reviews</div>
              </div>

              {product.reviews?.length ? (
                <div className="space-y-4">
                  {product.reviews.map(r => (
                    <div key={r._id} className={`p-4 border rounded-lg ${r.optimistic ? 'opacity-90' : ''}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                              {r.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{r.name}</div>
                              <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-800">{r.rating}/5</div>
                      </div>
                      <p className="mt-3 text-gray-700">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* right: review form */}
          <aside className="bg-white rounded-2xl shadow-sm p-6">
            <h4 className="text-lg font-semibold mb-3">Write a review</h4>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  disabled={submitting}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very good</option>
                  <option value={3}>3 - Good</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={submitting}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Share your experience..."
                />
              </div>

              {formError && <div className="text-sm text-red-600">{formError}</div>}
              {formSuccess && <div className="text-sm text-green-600">{formSuccess}</div>}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn bg-primary text-white w-full"
                >
                  {submitting ? 'Submitting...' : 'Submit review'}
                </button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}
