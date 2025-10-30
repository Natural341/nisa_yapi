import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Campaigns() {
  const campaigns = [
    {
      title: 'Bahar İndirimleri',
      description: 'Seçili el aletlerinde %30\'a varan indirimler',
      discount: '%30',
      validUntil: '30 Nisan 2025',
      category: 'El Aletleri'
    },
    {
      title: 'Elektrikli Aletler Kampanyası',
      description: 'Tüm matkap ve vidalama setlerinde özel fiyatlar',
      discount: '%25',
      validUntil: '15 Mayıs 2025',
      category: 'Elektrikli Aletler'
    },
    {
      title: 'Boya Sezonu',
      description: 'İç ve dış cephe boyalarında fırsat fiyatları',
      discount: '%20',
      validUntil: '31 Mayıs 2025',
      category: 'Boya & Badana'
    },
    {
      title: 'Hırdavat Paketi',
      description: '3 al 2 öde kampanyası vida ve dübelda',
      discount: '3 Al 2 Öde',
      validUntil: '30 Haziran 2025',
      category: 'Hırdavat'
    },
  ];

  const products = [
    { id: 1, name: 'Professional Matkap Seti', price: '1.299', oldPrice: '1.599', discount: '%19' },
    { id: 2, name: 'Boya Fırça Seti', price: '149', oldPrice: '199', discount: '%25' },
    { id: 3, name: 'Metre & Tesviye', price: '179', oldPrice: '229', discount: '%22' },
    { id: 4, name: 'Duvar Boyası 15L', price: '459', oldPrice: '549', discount: '%16' },
    { id: 5, name: 'Dijital Su Tesviyesi', price: '799', oldPrice: '999', discount: '%20' },
    { id: 6, name: 'Dübel Set 200 Parça', price: '129', oldPrice: '159', discount: '%19' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Kampanyalar</h1>
            <p className="text-secondary">Güncel kampanya ve fırsatlarımız</p>
          </div>
        </section>

        {/* Active Campaigns */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-dark mb-6">Aktif Kampanyalar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign, index) => (
                <div key={index} className="modern-card overflow-hidden">
                  <div className="bg-dark text-white px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{campaign.title}</h3>
                      <span className="bg-white text-dark px-3 py-1 rounded text-sm font-semibold">
                        {campaign.discount}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-dark mb-4">{campaign.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary">Kategori: {campaign.category}</span>
                      <span className="text-secondary">Son: {campaign.validUntil}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discounted Products */}
        <section className="py-12 bg-light">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-dark mb-1">İndirimli Ürünler</h2>
                <p className="text-secondary text-sm">Kampanyalı ürünlerimize göz atın</p>
              </div>
              <Link href="/urunler" className="text-dark hover:text-dark/70 font-medium text-sm flex items-center gap-1 group">
                Tümünü Gör
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="modern-card overflow-hidden group">
                  <div className="aspect-square bg-white flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-lighter rounded"></div>
                  </div>
                  <div className="absolute top-4 right-4 bg-dark text-white px-3 py-1 rounded text-sm font-semibold">
                    {product.discount}
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-dark mb-3 min-h-[48px]">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-semibold text-dark">{product.price} ₺</span>
                      <span className="text-sm text-secondary line-through">{product.oldPrice} ₺</span>
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

        {/* Benefits */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-dark mb-8 text-center">Kampanya Avantajları</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-light rounded mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-2">En İyi Fiyat Garantisi</h3>
                <p className="text-sm text-secondary">Kampanyalı ürünlerimizde en uygun fiyatları bulacaksınız</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-light rounded mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-2">Ücretsiz Kargo</h3>
                <p className="text-sm text-secondary">Kampanyalı ürünlerde 300 TL üzeri ücretsiz kargo</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-light rounded mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-2">Sınırlı Süre</h3>
                <p className="text-sm text-secondary">Kampanyalar stoklar tükenene kadar geçerlidir</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
