import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Categories() {
  const categories = [
    {
      name: 'El Aletleri',
      count: 250,
      description: 'Çekiç, tornavida, pense ve daha fazlası',
      subcategories: ['Çekiçler', 'Tornavidalar', 'Penseler', 'Anahtar Setleri']
    },
    {
      name: 'Elektrikli Aletler',
      count: 180,
      description: 'Matkap, taşlama, testere ve elektrikli aletler',
      subcategories: ['Matkap', 'Taşlama', 'Testere', 'Vidalama']
    },
    {
      name: 'Boya & Badana',
      count: 120,
      description: 'İç ve dış cephe boyaları, fırçalar',
      subcategories: ['İç Cephe', 'Dış Cephe', 'Fırçalar', 'Rulo Setleri']
    },
    {
      name: 'Hırdavat',
      count: 450,
      description: 'Vida, dübel, cıvata ve bağlantı elemanları',
      subcategories: ['Vidalar', 'Dübellar', 'Cıvatalar', 'Bağlantı Elemanları']
    },
    {
      name: 'Yapı Malzemeleri',
      count: 320,
      description: 'Çimento, kireç, alçı ve inşaat malzemeleri',
      subcategories: ['Çimento', 'Alçı', 'Kireç', 'Kaplama']
    },
    {
      name: 'Bahçe & Dış Mekan',
      count: 95,
      description: 'Bahçe aletleri ve dış mekan ürünleri',
      subcategories: ['Bahçe Aletleri', 'Sulama', 'Aydınlatma', 'Dekorasyon']
    },
    {
      name: 'Ölçü & Seviye Aletleri',
      count: 85,
      description: 'Metre, tesviye, açıölçer ve ölçüm aletleri',
      subcategories: ['Metreler', 'Tesviyeler', 'Lazer Ölçüm', 'Açıölçerler']
    },
    {
      name: 'Güvenlik Ekipmanları',
      count: 65,
      description: 'İş güvenliği ekipmanları ve koruyucu malzemeler',
      subcategories: ['Eldiven', 'Gözlük', 'Maske', 'Baret']
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Kategoriler</h1>
            <p className="text-secondary">Tüm ürün kategorilerimize göz atın</p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/kategori/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="modern-card p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-dark text-lg mb-1">{category.name}</h3>
                      <p className="text-xs text-secondary">{category.count} ürün</p>
                    </div>
                    <svg className="w-5 h-5 text-secondary group-hover:text-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <p className="text-sm text-secondary mb-4">{category.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-light px-2 py-1 rounded text-secondary"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-light border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-dark mb-3">
              Aradığınızı Bulamadınız mı?
            </h2>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Tüm ürünlerimize göz atın veya bizimle iletişime geçin
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/urunler"
                className="bg-dark text-white px-8 py-3 rounded modern-button text-center font-medium"
              >
                Tüm Ürünler
              </Link>
              <Link
                href="/iletisim"
                className="border border-border hover:border-dark text-dark px-8 py-3 rounded modern-button text-center font-medium"
              >
                İletişim
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
