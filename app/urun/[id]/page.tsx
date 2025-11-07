'use client';

import { useState, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Ürün verileri
  const products = [
    { id: 1, name: 'D-Max Şerit Metre 5m', category: 'el-aletleri', categoryName: 'El Aletleri', price: 185, oldPrice: 220, rating: 4.8, reviews: 12, isNew: false, images: ['/urun_foto/d_max5m.webp'], stock: 45, brand: 'D-Max', sku: 'DM-5M-001' },
    { id: 2, name: 'D-Max Şerit Metre 3m', category: 'el-aletleri', categoryName: 'El Aletleri', price: 145, oldPrice: null, rating: 4.7, reviews: 8, isNew: false, images: ['/urun_foto/dmax3m.jpg'], stock: 32, brand: 'D-Max', sku: 'DM-3M-001' },
    { id: 3, name: 'Goldfix Silikonlu Derz Dolgu 380 gr', category: 'yapi', categoryName: 'Yapı Malzemeleri', price: 89, oldPrice: 110, rating: 4.9, reviews: 23, isNew: true, images: ['/urun_foto/goldfix_1.webp', '/urun_foto/goldfix_2.webp', '/urun_foto/goldfix_3.webp'], stock: 78, brand: 'Goldfix', sku: 'GF-380-001' },
    { id: 4, name: 'Selsil 07 Akvaryum Silikonu Şeffaf 280 ml', category: 'yapi', categoryName: 'Yapı Malzemeleri', price: 75, oldPrice: 95, rating: 4.6, reviews: 14, isNew: false, images: ['/urun_foto/selsil_07.webp'], stock: 56, brand: 'Selsil', sku: 'SL-07-280' },
    { id: 5, name: 'Selsil Poliüretan Montaj Köpüğü Isı ve Ses Yalıtımı Sağlayan 600 gr', category: 'yapi', categoryName: 'Yapı Malzemeleri', price: 125, oldPrice: 155, rating: 4.9, reviews: 20, isNew: true, images: ['/urun_foto/selsil_montaj.jpg', '/urun_foto/selsil_montaj2.jpg'], stock: 67, brand: 'Selsil', sku: 'SL-PU-600' },
    { id: 6, name: 'Somafix SE450 Akrilik Mastik 450GR Beyaz', category: 'hirdavat', categoryName: 'Hırdavat', price: 45, oldPrice: null, rating: 4.8, reviews: 31, isNew: false, images: ['/urun_foto/somafix.jpg'], stock: 120, brand: 'Somafix', sku: 'SM-450-WHT' },
    { id: 7, name: 'Somafix Beyaz Hibrit High Tack Yapıştırıcı S580 Ultratack 290 ml', category: 'hirdavat', categoryName: 'Hırdavat', price: 135, oldPrice: 165, rating: 4.9, reviews: 18, isNew: true, images: ['/urun_foto/somafix_s580.webp'], stock: 43, brand: 'Somafix', sku: 'SM-580-ULT' },
    { id: 8, name: 'PS40 Pas Sökücü ve Yağlayıcı Sprey 200 ml', category: 'hirdavat', categoryName: 'Hırdavat', price: 165, oldPrice: null, rating: 4.9, reviews: 27, isNew: false, images: ['/urun_foto/ps40.webp'], stock: 89, brand: 'PS40', sku: 'PS-40-200' },
    { id: 9, name: 'PS20 Pas Sökücü ve Yağlayıcı Sprey 200 ml', category: 'hirdavat', categoryName: 'Hırdavat', price: 85, oldPrice: 105, rating: 4.7, reviews: 15, isNew: false, images: ['/urun_foto/pas_sokucu.jpg'], stock: 95, brand: 'PS20', sku: 'PS-20-200' },
    { id: 10, name: 'Eltos Metal Uçlu Cam ve Buz Kazıma Aparatı', category: 'el-aletleri', categoryName: 'El Aletleri', price: 95, oldPrice: null, rating: 4.6, reviews: 13, isNew: false, images: ['/urun_foto/cam_vebuz.jpg', '/urun_foto/cam_vebuz2.jpg', '/urun_foto/cam_vebuz3.jpg'], stock: 72, brand: 'Eltos', sku: 'EL-CAM-001' },
    { id: 11, name: 'Tyson Ultra Fix Güçlü Montaj ve Korniş Yapıştırıcısı', category: 'yapi', categoryName: 'Yapı Malzemeleri', price: 245, oldPrice: 290, rating: 4.5, reviews: 9, isNew: false, images: ['/urun_foto/korniş.webp'], stock: 38, brand: 'Tyson', sku: 'TY-UF-001' },
    { id: 12, name: 'Master Poliüretan Köpük Tabancalı 840 gr', category: 'yapi', categoryName: 'Yapı Malzemeleri', price: 285, oldPrice: 350, rating: 4.8, reviews: 16, isNew: true, images: ['/urun_foto/masterpoliüretan.jpeg'], stock: 54, brand: 'Master', sku: 'MA-PU-840' },
    { id: 13, name: 'Kidmix Pencere Kilidi Çelik Halatlı Anahtarlı Emniyet Şeridi', category: 'hirdavat', categoryName: 'Hırdavat', price: 65, oldPrice: 85, rating: 4.7, reviews: 9, isNew: false, images: ['/urun_foto/kidmix-pencere-kilidi.webp'], stock: 112, brand: 'Kidmix', sku: 'KD-PK-001' },
  ];

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-dark mb-4">Ürün Bulunamadı</h1>
            <Link href="/urunler" className="text-dark hover:underline">
              Ürünlere Geri Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="hover:text-dark transition-colors">Ana Sayfa</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/urunler" className="hover:text-dark transition-colors">Ürünler</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/urunler?category=${product.category}`} className="hover:text-dark transition-colors">
                {product.categoryName}
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-dark font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white border border-border rounded-lg overflow-hidden group">
                {product.images && product.images.length > 0 && product.images[selectedImage] && (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="object-contain w-full h-full p-8 transition-all duration-500"
                  />
                )}

                {/* Navigation Buttons */}
                {product.images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-dark p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {/* Next Button */}
                    <button
                      onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-dark p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {product.oldPrice && (
                    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-1.5 rounded-lg font-black text-xs shadow-lg">
                      %{discount} İNDİRİM
                    </div>
                  )}
                  {product.isNew && (
                    <div className="bg-dark text-white px-3 py-1.5 rounded-lg font-black text-xs shadow-lg">
                      YENİ
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                        selectedImage === idx
                          ? 'border-dark scale-105 shadow-md'
                          : 'border-border hover:border-gray'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - ${idx + 1}`}
                        width={150}
                        height={150}
                        className="object-contain w-full h-full p-2 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              <div className="text-sm text-secondary">
                Marka: <span className="font-semibold text-dark">{product.brand}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-light'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-dark font-semibold">{product.rating}</span>
                <span className="text-secondary">({product.reviews} değerlendirme)</span>
              </div>

              {/* Price */}
              <div className="modern-card p-6 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-dark">{product.price.toLocaleString('tr-TR')} ₺</span>
                  {product.oldPrice && (
                    <span className="text-xl text-secondary line-through">{product.oldPrice.toLocaleString('tr-TR')} ₺</span>
                  )}
                </div>
                {product.oldPrice && (
                  <div className="text-green-600 font-semibold">
                    {(product.oldPrice - product.price).toLocaleString('tr-TR')} ₺ tasarruf ediyorsunuz!
                  </div>
                )}
                {product.price >= 500 && (
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span>Ücretsiz Kargo</span>
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  product.stock > 50 ? 'bg-green-50 text-green-700' :
                  product.stock > 20 ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-sm">Stokta {product.stock} adet</span>
                </div>
                <div className="text-sm text-secondary">SKU: {product.sku}</div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-dark font-semibold text-sm">Miktar</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-gray-lighter transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                      className="w-16 text-center border-x border-border py-3 outline-none"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-3 hover:bg-gray-lighter transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-secondary text-sm">
                    Toplam: <span className="font-bold text-dark">{(product.price * quantity).toLocaleString('tr-TR')} ₺</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-dark hover:bg-primary-hover text-white'
                  }`}
                >
                  {addedToCart ? (
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
                <button
                  onClick={handleFavoriteToggle}
                  className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg ${
                    isFavorite(product.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'border-2 border-border hover:border-red-500 hover:bg-red-50'
                  }`}
                  title={isFavorite(product.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                >
                  <svg className="w-6 h-6" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div className="modern-card p-6 space-y-3">
                <h3 className="font-semibold text-dark mb-3">Avantajlar</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-secondary">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Hızlı Teslimat</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Kolay İade ve Değişim</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Orijinal Ürün Garantisi</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Güvenli Ödeme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="border-b border-border">
              <div className="flex gap-8">
                {[
                  { id: 'description', label: 'Açıklama' },
                  { id: 'specs', label: 'Özellikler' },
                  { id: 'reviews', label: 'Değerlendirmeler' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 font-semibold transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-dark'
                        : 'text-secondary hover:text-dark'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-secondary leading-relaxed">
                    {product.name} yüksek kaliteli malzemelerden üretilmiştir. Dayanıklı yapısı ve kullanışlı tasarımı ile uzun ömürlü kullanım sağlar.
                    Profesyonel ve hobi amaçlı kullanıma uygundur. {product.brand} markasının kalite standartlarına uygun olarak üretilmiştir.
                  </p>
                  <p className="text-secondary leading-relaxed mt-4">
                    Güvenli ve etkili kullanım için kullanma talimatlarını okuyunuz. Çocukların erişemeyeceği yerlerde saklayınız.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="modern-card p-4">
                    <div className="text-sm text-secondary mb-1">Marka</div>
                    <div className="font-semibold text-dark">{product.brand}</div>
                  </div>
                  <div className="modern-card p-4">
                    <div className="text-sm text-secondary mb-1">Kategori</div>
                    <div className="font-semibold text-dark">{product.categoryName}</div>
                  </div>
                  <div className="modern-card p-4">
                    <div className="text-sm text-secondary mb-1">Stok Kodu</div>
                    <div className="font-semibold text-dark">{product.sku}</div>
                  </div>
                  <div className="modern-card p-4">
                    <div className="text-sm text-secondary mb-1">Stok Durumu</div>
                    <div className="font-semibold text-dark">{product.stock} Adet</div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-dark mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-light'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-secondary">{product.reviews} değerlendirme</div>
                    </div>
                  </div>
                  <div className="text-secondary">
                    Henüz yorum yapılmamış. İlk yorumu siz yapın!
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20 border-t border-border pt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-dark">
                Beğenebileceğiniz Ürünler
              </h2>
              <Link href="/urunler" className="text-dark hover:text-dark/70 font-medium text-sm flex items-center gap-1 group">
                Tümünü Gör
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/urun/${relatedProduct.id}`}
                    className="modern-card overflow-hidden group hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-square bg-white flex items-center justify-center p-4">
                      {relatedProduct.images && relatedProduct.images.length > 0 && relatedProduct.images[0] && (
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          width={250}
                          height={250}
                          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      {relatedProduct.oldPrice && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-2 py-1 rounded-md font-black text-[10px] shadow-md">
                          %{Math.round(((relatedProduct.oldPrice - relatedProduct.price) / relatedProduct.oldPrice) * 100)}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-dark mb-2 line-clamp-2 min-h-[48px] text-sm group-hover:text-dark/70 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-xs text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(relatedProduct.rating) ? 'text-yellow-500' : 'text-gray-light'}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-secondary">({relatedProduct.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-dark">{relatedProduct.price.toLocaleString('tr-TR')} ₺</span>
                        {relatedProduct.oldPrice && (
                          <span className="text-xs text-secondary line-through">{relatedProduct.oldPrice.toLocaleString('tr-TR')} ₺</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
