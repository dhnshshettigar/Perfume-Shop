// client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from '../shared/ProductCard';

const HERO_IMG = '/images/Hero-image.jpg';

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
        <main className="min-h-screen bg-gray-50 w-full">
            {/* FULL-BLEED HERO */}
            {/* FULL-BLEED HERO — responsive image using <picture> */}
            <section className="w-full relative">
                {/* picture: browsers choose the best source available */}
                <div className="absolute inset-0 overflow-hidden">
                    <picture>
                        {/* large screens: provide a large image if you have one */}
                        <source media="(min-width:1200px)" srcSet="/images/Hero-image-6.jpg" />
                        {/* medium screens */}
                        <source media="(min-width:768px)" srcSet="/images/Hero-image-6.jpg" />
                        {/* fallback / small screens */}
                        <img
                            src="/images/Hero-image-6.jpg"
                            alt="Hero perfume display"
                            className="w-full h-[65vh] object-cover object-center"
                            style={{ display: 'block' }}
                        />
                    </picture>

                    {/* gradient overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" aria-hidden="true" />
                </div>

                {/* center-aligned inner content that aligns with navbar/footer */}
                <div className="relative">
                    <div className="max-w-7xl mx-auto px-6 h-[65vh] flex items-center">
                        <div className="text-white md:text-left text-center">
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md max-w-3xl">
                                Discover Luxury Fragrances
                            </h1>

                            <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl drop-shadow-sm">
                                Premium, long-lasting perfumes crafted for elegance and confidence.
                            </p>

                            <div className="mt-8 flex justify-center md:justify-start gap-4">
                                <a
                                    href="#products"
                                    className="inline-block px-10 py-4 text-lg bg-white text-primary rounded-lg shadow-lg hover:shadow-xl transition"
                                >
                                    Explore Collection
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* PRODUCTS SECTION (aligned to same inner container) */}
            <section id="products" className="max-w-7xl mx-auto px-6 mt-12 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Featured perfumes</h3>
                    <div className="text-sm text-gray-500">{products.length} items</div>
                </div>

                {loading && <p>Loading products...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        </main>
    );
}
