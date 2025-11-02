'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Products() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const { addToCart } = useCart();

  // URL'den kategori parametresini oku
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'el-aletleri', name: 'El Aletleri' },
    { id: 'elektrikli-aletler', name: 'Elektrikli Aletler' },
    { id: 'boya', name: 'Boya & Badana' },
    { id: 'hirdavat', name: 'Hırdavat' },
    { id: 'yapi', name: 'Yapı Malzemeleri' },
  ];

  const products = [
    { id: 1, name: 'Professional Matkap Seti', category: 'elektrikli-aletler', price: 1299, oldPrice: 1599, rating: 4.8, reviews: 156, isNew: false },
    { id: 2, name: 'Akülü Vidalama 18V', category: 'elektrikli-aletler', price: 899, oldPrice: null, rating: 4.9, reviews: 89, isNew: true },
    { id: 3, name: 'Boya Fırça Seti 5li', category: 'boya', price: 149, oldPrice: 199, rating: 4.6, reviews: 234, isNew: false },
    { id: 4, name: 'Çekiç Seti 3lü', category: 'el-aletleri', price: 299, oldPrice: null, rating: 4.7, reviews: 112, isNew: false },
    { id: 5, name: 'Metre & Tesviye 5m', category: 'el-aletleri', price: 179, oldPrice: 229, rating: 4.5, reviews: 78, isNew: false },
    { id: 6, name: 'Tornavida Seti 12li', category: 'el-aletleri', price: 249, oldPrice: null, rating: 4.8, reviews: 145, isNew: true },
    { id: 7, name: 'Duvar Boyası 15L Beyaz', category: 'boya', price: 459, oldPrice: 549, rating: 4.7, reviews: 203, isNew: false },
    { id: 8, name: 'Vida Seti Karışık 500 Parça', category: 'hirdavat', price: 189, oldPrice: null, rating: 4.6, reviews: 167, isNew: false },
    { id: 9, name: 'Dübel Set Karışık 200 Parça', category: 'hirdavat', price: 129, oldPrice: 159, rating: 4.5, reviews: 95, isNew: false },
    { id: 10, name: 'El Testere 300mm', category: 'el-aletleri', price: 349, oldPrice: null, rating: 4.9, reviews: 178, isNew: true },
    { id: 11, name: 'Dijital Su Tesviyesi', category: 'el-aletleri', price: 799, oldPrice: 999, rating: 4.8, reviews: 123, isNew: false },
    { id: 12, name: 'Taş Duvar Kaplama', category: 'yapi', price: 89, oldPrice: null, rating: 4.4, reviews: 56, isNew: false },
    { id: 13, name: 'Bahçe Makası Profesyonel', category: 'bahce', price: 329, oldPrice: 429, rating: 4.7, reviews: 92, isNew: true },
    { id: 14, name: 'Daire Testere 1200W', category: 'elektrikli-aletler', price: 1599, oldPrice: null, rating: 4.9, reviews: 134, isNew: false },
    { id: 15, name: 'Akrilik Boya Set 12 Renk', category: 'boya', price: 279, oldPrice: 349, rating: 4.5, reviews: 88, isNew: false },
  ];

  // Filtreleme
  let filteredProducts = products;

  // Kategori filtresi
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  // Fiyat aralığı filtresi
  if (priceRange.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      return priceRange.some(range => {
        if (range === '0-100') return p.price <= 100;
        if (range === '100-500') return p.price > 100 && p.price <= 500;
        if (range === '500-1000') return p.price > 500 && p.price <= 1000;
        if (range === '1000+') return p.price > 1000;
        return false;
      });
    });
  }

  // Özellik filtreleri
  if (features.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      if (features.includes('discounted') && !p.oldPrice) return false;
      if (features.includes('free-shipping') && p.price < 1000) return false;
      if (features.includes('new') && !p.isNew) return false;
      return true;
    });
  }

  // Puan filtresi
  if (minRating > 0) {
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating);
  }

  // Sıralama
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0; // featured
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const togglePriceRange = (range: string) => {
    setPriceRange(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Tüm Ürünler';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">
              {getCategoryName(selectedCategory)}
            </h1>
            <p className="text-secondary">
              {selectedCategory === 'all'
                ? 'Kaliteli hırdavat ve yapı malzemeleri'
                : `${getCategoryName(selectedCategory)} kategorisindeki ürünler`
              }
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Category Pills */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded font-medium text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-dark text-white'
                      : 'border border-border hover:border-dark'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:w-64">
              <div className="modern-card p-5 sticky top-24">
                <h2 className="font-semibold text-dark mb-4">Filtreler</h2>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium text-dark mb-3 text-sm">Fiyat Aralığı</h3>
                  <div className="space-y-2">
                    {[
                      { value: '0-100', label: '0 - 100 TL' },
                      { value: '100-500', label: '100 - 500 TL' },
                      { value: '500-1000', label: '500 - 1000 TL' },
                      { value: '1000+', label: '1000+ TL' }
                    ].map((range) => (
                      <label key={range.value} className="flex items-center gap-2 cursor-pointer hover:text-dark/70 text-sm">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded accent-dark"
                          checked={priceRange.includes(range.value)}
                          onChange={() => togglePriceRange(range.value)}
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-medium text-dark mb-3 text-sm">Özellikler</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'discounted', label: 'İndirimli' },
                      { value: 'free-shipping', label: 'Ücretsiz Kargo' },
                      { value: 'new', label: 'Yeni Ürünler' }
                    ].map((feature) => (
                      <label key={feature.value} className="flex items-center gap-2 cursor-pointer hover:text-dark/70 text-sm">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded accent-dark"
                          checked={features.includes(feature.value)}
                          onChange={() => toggleFeature(feature.value)}
                        />
                        <span>{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="font-medium text-dark mb-3 text-sm">Puan</h3>
                  <div className="space-y-2">
                    {[
                      { value: 4.5, stars: 5 },
                      { value: 4, stars: 4 },
                      { value: 3, stars: 3 }
                    ].map((rating) => (
                      <label key={rating.value} className="flex items-center gap-2 cursor-pointer hover:text-dark/70 text-sm">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded accent-dark"
                          checked={minRating === rating.value}
                          onChange={() => setMinRating(minRating === rating.value ? 0 : rating.value)}
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(rating.stars)].map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                          {[...Array(5 - rating.stars)].map((_, i) => (
                            <span key={i} className="text-gray-light">★</span>
                          ))}
                          <span className="ml-1">ve üzeri</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(priceRange.length > 0 || features.length > 0 || minRating > 0 || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setPriceRange([]);
                      setFeatures([]);
                      setMinRating(0);
                      setSelectedCategory('all');
                    }}
                    className="w-full py-2 text-sm text-secondary hover:text-dark border border-border hover:border-dark rounded-lg transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="modern-card p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-dark font-medium text-sm">
                  <strong>{sortedProducts.length}</strong> ürün bulundu
                </p>
                <div className="flex items-center gap-3">
                  <label className="text-dark text-sm font-medium">Sırala:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded border border-border bg-white text-dark text-sm outline-none focus:border-dark transition-colors"
                  >
                    <option value="featured">Öne Çıkanlar</option>
                    <option value="price-asc">Fiyat: Düşük - Yüksek</option>
                    <option value="price-desc">Fiyat: Yüksek - Düşük</option>
                    <option value="rating">En Yüksek Puan</option>
                    <option value="newest">En Yeni</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="modern-card overflow-hidden group relative">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-lighter to-light flex items-center justify-center overflow-hidden">
                      <div className="w-32 h-32 bg-gray-light rounded-lg group-hover:scale-110 transition-transform duration-300"></div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.oldPrice && (
                          <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                            Yeni
                          </span>
                        )}
                        {product.price >= 1000 && (
                          <span className="bg-green-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                            Ücretsiz Kargo
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                        <button className="w-9 h-9 bg-white hover:bg-dark hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <Link
                          href={`/urun/${product.id}`}
                          className="w-9 h-9 bg-white hover:bg-dark hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-dark mb-2 min-h-[48px] group-hover:text-dark/70 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-sm text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-light'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-secondary font-medium">
                          {product.rating} <span className="text-gray-light">({product.reviews})</span>
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-bold text-dark">{product.price.toLocaleString('tr-TR')} ₺</span>
                          {product.oldPrice && (
                            <span className="text-sm text-secondary line-through">{product.oldPrice.toLocaleString('tr-TR')} ₺</span>
                          )}
                        </div>
                        {product.oldPrice && (
                          <p className="text-xs text-green-600 font-medium">
                            {(product.oldPrice - product.price).toLocaleString('tr-TR')} ₺ tasarruf
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-3 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                          addedToCart === product.id
                            ? 'bg-green-600 text-white'
                            : 'bg-dark hover:bg-primary-hover text-white'
                        }`}
                      >
                        {addedToCart === product.id ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Sepete Eklendi
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Sepete Ekle
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center gap-2">
                <button className="px-4 py-2 border border-border rounded modern-button font-medium hover:border-dark text-sm">
                  ← Önceki
                </button>
                <button className="px-4 py-2 bg-dark text-white rounded font-medium text-sm">1</button>
                <button className="px-4 py-2 border border-border rounded modern-button hover:border-dark text-sm">2</button>
                <button className="px-4 py-2 border border-border rounded modern-button hover:border-dark text-sm">3</button>
                <button className="px-4 py-2 border border-border rounded modern-button font-medium hover:border-dark text-sm">
                  Sonraki →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
