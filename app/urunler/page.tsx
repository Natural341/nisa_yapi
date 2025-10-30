'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'el-aletleri', name: 'El Aletleri' },
    { id: 'elektrikli-aletler', name: 'Elektrikli Aletler' },
    { id: 'boya', name: 'Boya & Badana' },
    { id: 'hirdavat', name: 'Hırdavat' },
    { id: 'yapi', name: 'Yapı Malzemeleri' },
  ];

  const products = [
    { id: 1, name: 'Professional Matkap Seti', category: 'elektrikli-aletler', price: '1.299', oldPrice: '1.599', rating: 4.8, reviews: 156 },
    { id: 2, name: 'Akülü Vidalama 18V', category: 'elektrikli-aletler', price: '899', oldPrice: null, rating: 4.9, reviews: 89 },
    { id: 3, name: 'Boya Fırça Seti 5li', category: 'boya', price: '149', oldPrice: '199', rating: 4.6, reviews: 234 },
    { id: 4, name: 'Çekiç Seti 3lü', category: 'el-aletleri', price: '299', oldPrice: null, rating: 4.7, reviews: 112 },
    { id: 5, name: 'Metre & Tesviye 5m', category: 'el-aletleri', price: '179', oldPrice: '229', rating: 4.5, reviews: 78 },
    { id: 6, name: 'Tornavida Seti 12li', category: 'el-aletleri', price: '249', oldPrice: null, rating: 4.8, reviews: 145 },
    { id: 7, name: 'Duvar Boyası 15L Beyaz', category: 'boya', price: '459', oldPrice: '549', rating: 4.7, reviews: 203 },
    { id: 8, name: 'Vida Seti Karışık 500 Parça', category: 'hirdavat', price: '189', oldPrice: null, rating: 4.6, reviews: 167 },
    { id: 9, name: 'Dübel Set Karışık 200 Parça', category: 'hirdavat', price: '129', oldPrice: '159', rating: 4.5, reviews: 95 },
    { id: 10, name: 'El Testere 300mm', category: 'el-aletleri', price: '349', oldPrice: null, rating: 4.9, reviews: 178 },
    { id: 11, name: 'Dijital Su Tesviyesi', category: 'el-aletleri', price: '799', oldPrice: '999', rating: 4.8, reviews: 123 },
    { id: 12, name: 'Taş Duvar Kaplama', category: 'yapi', price: '89', oldPrice: null, rating: 4.4, reviews: 56 },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('.', '')),
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Tüm Ürünler</h1>
            <p className="text-secondary">Kaliteli hırdavat ve yapı malzemeleri</p>
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
                    {['0 - 100 TL', '100 - 500 TL', '500 - 1000 TL', '1000+ TL'].map((range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer hover:text-dark/70 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <span>{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-medium text-dark mb-3 text-sm">Özellikler</h3>
                  <div className="space-y-2">
                    {['İndirimli', 'Ücretsiz Kargo', 'Yeni Ürünler'].map((feature) => (
                      <label key={feature} className="flex items-center gap-2 cursor-pointer hover:text-dark/70 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <span>{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-medium text-dark mb-3 text-sm">Puan</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map((star) => (
                      <label key={star} className="flex items-center gap-2 cursor-pointer hover:text-dark/70 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <div className="flex items-center gap-1">
                          {[...Array(star)].map((_, i) => (
                            <span key={i} className="text-dark">★</span>
                          ))}
                          {[...Array(5 - star)].map((_, i) => (
                            <span key={i} className="text-gray-light">★</span>
                          ))}
                          <span className="ml-1">ve üzeri</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="modern-card p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-dark font-medium text-sm">
                  <strong>{filteredProducts.length}</strong> ürün bulundu
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="modern-card overflow-hidden group">
                    <div className="aspect-square bg-light flex items-center justify-center">
                      <div className="w-24 h-24 bg-gray-lighter rounded"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-medium text-dark mb-2 min-h-[48px]">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-sm">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating) ? 'text-dark' : 'text-gray-light'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-secondary">({product.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-semibold text-dark">{product.price} ₺</span>
                        {product.oldPrice && (
                          <span className="text-sm text-secondary line-through">{product.oldPrice} ₺</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 py-2.5 rounded modern-button font-medium text-sm transition-all ${
                            addedToCart === product.id
                              ? 'bg-green-600 text-white'
                              : 'bg-dark hover:bg-primary-hover text-white'
                          }`}
                        >
                          {addedToCart === product.id ? '✓ Sepete Eklendi' : 'Sepete Ekle'}
                        </button>
                        <Link
                          href={`/urun/${product.id}`}
                          className="border border-border hover:border-dark text-dark px-4 py-2.5 rounded modern-button font-medium flex items-center justify-center"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                      </div>
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
