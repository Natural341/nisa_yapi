import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const categories = [
    { name: 'El Aletleri', count: 250 },
    { name: 'Elektrikli Aletler', count: 180 },
    { name: 'Boya & Badana', count: 120 },
    { name: 'Hırdavat', count: 450 },
    { name: 'Yapı Malzemeleri', count: 320 },
    { name: 'Bahçe & Dış Mekan', count: 95 },
  ];

  const featuredProducts = [
    { id: 1, name: 'Professional Matkap Seti', price: '1.299', oldPrice: '1.599' },
    { id: 2, name: 'Akülü Vidalama', price: '899', oldPrice: null },
    { id: 3, name: 'Boya Fırça Seti', price: '149', oldPrice: '199' },
    { id: 4, name: 'Çekiç Seti 3lü', price: '299', oldPrice: null },
    { id: 5, name: 'Metre & Tesviye', price: '179', oldPrice: '229' },
    { id: 6, name: 'Tornavida Seti', price: '249', oldPrice: null },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-dark py-24 md:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
                  Hayalinizdeki Projeyi Gerçeğe Dönüştürün
                </h1>
                <p className="text-lg text-gray-light mb-8 leading-relaxed">
                  Profesyonel kalitede hırdavat ve yapı malzemeleri.
                  Güvenilir markalar, uygun fiyatlar, hızlı teslimat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/urunler"
                    className="bg-white text-dark px-8 py-3.5 rounded modern-button text-center font-medium hover:bg-gray-lighter"
                  >
                    Ürünleri İncele
                  </Link>
                  <Link
                    href="/kampanyalar"
                    className="border-2 border-white hover:bg-white hover:text-dark text-white px-8 py-3.5 rounded modern-button text-center font-medium transition-colors"
                  >
                    Kampanyalar
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:flex justify-center items-center">
                <div className="relative w-96 h-96 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
                  <Image
                    src="/maskot.png"
                    alt="Nisa Yapı Market"
                    width={350}
                    height={350}
                    className="relative z-10 drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-light rounded mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-1">Ücretsiz Kargo</h3>
                <p className="text-sm text-secondary">500 TL ve üzeri</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-light rounded mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-1">Kaliteli Ürünler</h3>
                <p className="text-sm text-secondary">Orijinal & Garantili</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-light rounded mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-1">Güvenli Ödeme</h3>
                <p className="text-sm text-secondary">Taksit seçenekleri</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-light rounded mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-1">İade Garantisi</h3>
                <p className="text-sm text-secondary">14 gün içinde</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-dark mb-3">
                Kategoriler
              </h2>
              <p className="text-secondary">İhtiyacınız olan her şey</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/kategori/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="modern-card p-6 text-center group"
                >
                  <h3 className="font-medium text-dark mb-1">{category.name}</h3>
                  <p className="text-xs text-secondary">{category.count} ürün</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-light">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-dark mb-2">
                  Öne Çıkan Ürünler
                </h2>
                <p className="text-secondary">En çok tercih edilen ürünler</p>
              </div>
              <Link href="/urunler" className="text-dark hover:text-dark/70 font-medium text-sm flex items-center gap-1 group">
                Tümünü Gör
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="modern-card overflow-hidden group">
                  <div className="aspect-square bg-light flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-lighter rounded"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-dark mb-3 min-h-[48px]">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-semibold text-dark">{product.price} ₺</span>
                      {product.oldPrice && (
                        <span className="text-sm text-secondary line-through">{product.oldPrice} ₺</span>
                      )}
                    </div>
                    <button className="w-full bg-dark hover:bg-primary-hover text-white py-3 rounded modern-button font-medium">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-dark mb-3">Bültenimize Abone Olun</h2>
            <p className="mb-8 text-secondary">
              Kampanyalardan ve yeni ürünlerden ilk siz haberdar olun
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded modern-input text-dark"
              />
              <button className="bg-dark hover:bg-primary-hover text-white px-8 py-3 rounded modern-button font-medium">
                Abone Ol
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
