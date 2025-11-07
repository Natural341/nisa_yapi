'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

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
    { id: 1, name: 'D-Max Şerit Metre 5m', category: 'el-aletleri', price: 185, oldPrice: 220, rating: 4.8, reviews: 12, isNew: false, images: ['/urun_foto/d_max5m.webp'] },
    { id: 2, name: 'D-Max Şerit Metre 3m', category: 'el-aletleri', price: 145, oldPrice: null, rating: 4.7, reviews: 8, isNew: false, images: ['/urun_foto/dmax3m.jpg'] },
    { id: 3, name: 'Goldfix Silikonlu Derz Dolgu 380 gr', category: 'yapi', price: 89, oldPrice: 110, rating: 4.9, reviews: 23, isNew: true, images: ['/urun_foto/goldfix_1.webp', '/urun_foto/goldfix_2.webp', '/urun_foto/goldfix_3.webp'] },
    { id: 4, name: 'Selsil 07 Akvaryum Silikonu Şeffaf 280 ml', category: 'yapi', price: 75, oldPrice: 95, rating: 4.6, reviews: 14, isNew: false, images: ['/urun_foto/selsil_07.webp'] },
    { id: 5, name: 'Selsil Poliüretan Montaj Köpüğü Isı ve Ses Yalıtımı Sağlayan 600 gr', category: 'yapi', price: 125, oldPrice: 155, rating: 4.9, reviews: 20, isNew: true, images: ['/urun_foto/selsil_montaj.jpg', '/urun_foto/selsil_montaj2.jpg'] },
    { id: 6, name: 'Somafix SE450 Akrilik Mastik 450GR Beyaz', category: 'hirdavat', price: 45, oldPrice: null, rating: 4.8, reviews: 31, isNew: false, images: ['/urun_foto/somafix.jpg'] },
    { id: 7, name: 'Somafix Beyaz Hibrit High Tack Yapıştırıcı S580 Ultratack 290 ml', category: 'hirdavat', price: 135, oldPrice: 165, rating: 4.9, reviews: 18, isNew: true, images: ['/urun_foto/somafix_s580.webp'] },
    { id: 8, name: 'PS40 Pas Sökücü ve Yağlayıcı Sprey 200 ml', category: 'hirdavat', price: 165, oldPrice: null, rating: 4.9, reviews: 27, isNew: false, images: ['/urun_foto/ps40.webp'] },
    { id: 9, name: 'PS20 Pas Sökücü ve Yağlayıcı Sprey 200 ml', category: 'hirdavat', price: 85, oldPrice: 105, rating: 4.7, reviews: 15, isNew: false, images: ['/urun_foto/pas_sokucu.jpg'] },
    { id: 10, name: 'Eltos Metal Uçlu Cam ve Buz Kazıma Aparatı', category: 'el-aletleri', price: 95, oldPrice: null, rating: 4.6, reviews: 13, isNew: false, images: ['/urun_foto/cam_vebuz.jpg', '/urun_foto/cam_vebuz2.jpg', '/urun_foto/cam_vebuz3.jpg'] },
    { id: 11, name: 'Tyson Ultra Fix Güçlü Montaj ve Korniş Yapıştırıcısı', category: 'yapi', price: 245, oldPrice: 290, rating: 4.5, reviews: 9, isNew: false, images: ['/urun_foto/korniş.webp'] },
    { id: 12, name: 'Master Poliüretan Köpük Tabancalı 840 gr', category: 'yapi', price: 285, oldPrice: 350, rating: 4.8, reviews: 16, isNew: true, images: ['/urun_foto/masterpoliüretan.jpeg'] },
    { id: 13, name: 'Kidmix Pencere Kilidi Çelik Halatlı Anahtarlı Emniyet Şeridi', category: 'hirdavat', price: 65, oldPrice: 85, rating: 4.7, reviews: 9, isNew: false, images: ['/urun_foto/kidmix-pencere-kilidi.webp'] },
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
      if (features.includes('free-shipping') && p.price < 500) return false;
      if (features.includes('new') && !p.isNew) return false;
      if (features.includes('favorites') && !isFavorite(p.id)) return false;
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
      image: product.images[0],
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

  const handleMouseMove = (productId: number, e: React.MouseEvent<HTMLDivElement>, imagesCount: number) => {
    if (imagesCount <= 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const imageIndex = Math.floor(percentage * imagesCount);

    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: Math.min(imageIndex, imagesCount - 1)
    }));
  };

  const handleMouseLeave = (productId: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: 0
    }));
  };

  const handleFavoriteToggle = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
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
                      { value: 'favorites', label: 'Beğenilenler' },
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
                  <Link
                    key={product.id}
                    href={`/urun/${product.id}`}
                    className="modern-card overflow-hidden group relative flex flex-col h-full cursor-pointer hover:shadow-xl transition-all"
                  >
                    {/* Product Image */}
                    <div
                      className="relative aspect-square bg-white flex items-center justify-center overflow-hidden p-4"
                      onMouseMove={(e) => handleMouseMove(product.id, e, product.images.length)}
                      onMouseLeave={() => handleMouseLeave(product.id)}
                    >
                      {product.images && product.images.length > 0 && product.images[currentImageIndex[product.id] || 0] && (
                        <Image
                          src={product.images[currentImageIndex[product.id] || 0]}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      {/* Image Indicators */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {product.images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                (currentImageIndex[product.id] || 0) === idx
                                  ? 'bg-dark w-4'
                                  : 'bg-gray-light'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2 flex-wrap max-w-[calc(100%-80px)]">
                        {product.oldPrice && (
                          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-1.5 rounded-lg font-black text-xs leading-tight shadow-lg">
                            %{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)} İNDİRİM
                          </div>
                        )}
                        {product.isNew && (
                          <div className="bg-dark text-white px-3 py-1.5 rounded-lg font-black text-xs leading-tight shadow-lg">
                            YENİ
                          </div>
                        )}
                        {product.price >= 500 && (
                          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-3 py-1.5 rounded-lg font-black text-xs leading-tight shadow-lg">
                            ÜCRETSİZ KARGO
                          </div>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                        <button
                          onClick={(e) => handleFavoriteToggle(product.id, e)}
                          className={`w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-all ${
                            isFavorite(product.id)
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-white hover:bg-red-500 hover:text-white text-gray-400'
                          }`}
                          title={isFavorite(product.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                        >
                          <svg className="w-5 h-5" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`/urun/${product.id}`);
                          }}
                          className="w-9 h-9 bg-white hover:bg-dark hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all"
                          title="Ürün Detayını Gör"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-dark mb-2 h-12 group-hover:text-dark/70 transition-colors line-clamp-2">
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
                      <div className="mb-4 h-[68px]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-2xl font-bold text-dark">{product.price.toLocaleString('tr-TR')} ₺</span>
                          {product.oldPrice && (
                            <span className="text-sm text-secondary line-through">{product.oldPrice.toLocaleString('tr-TR')} ₺</span>
                          )}
                        </div>
                        {product.oldPrice && (
                          <div className="text-xs font-semibold text-green-600">
                            {(product.oldPrice - product.price).toLocaleString('tr-TR')} ₺ tasarruf
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
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
                  </Link>
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

export default function Products() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto mb-4"></div>
            <p className="text-secondary">Ürünler yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
