import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ShippingInfo() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Kargo Bilgileri</h1>
            <p className="text-secondary">Teslimat süreçleri ve kargo ücretleri</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="modern-card p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-dark">Ücretsiz Kargo</h2>
                </div>
                <p className="text-dark font-semibold text-2xl mb-2">500 TL ve Üzeri</p>
                <p className="text-secondary text-sm">
                  500 TL ve üzeri tüm alışverişlerinizde kargo ücretsizdir.
                </p>
              </div>

              <div className="modern-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-dark rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-dark">Standart Kargo</h2>
                </div>
                <p className="text-dark font-semibold text-2xl mb-2">49 TL</p>
                <p className="text-secondary text-sm">
                  500 TL altı alışverişlerde kargo ücreti 49 TL\'dir.
                </p>
              </div>
            </div>

            <div className="modern-card p-8 mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">Teslimat Süreleri</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">Hazırlık Süresi</h3>
                    <p className="text-secondary">
                      Siparişiniz onaylandıktan sonra 1-3 iş günü içinde hazırlanır ve kargoya verilir.
                      Sipariş durumunuz e-posta ile bildirilir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">Teslimat Süresi</h3>
                    <p className="text-secondary mb-3">
                      Kargoya verilen ürünler bölgenize göre 2-5 iş günü içinde teslim edilir:
                    </p>
                    <ul className="list-disc list-inside text-secondary text-sm space-y-1 ml-4">
                      <li>İstanbul, Ankara, İzmir: 2-3 iş günü</li>
                      <li>Diğer büyük şehirler: 3-4 iş günü</li>
                      <li>Uzak bölgeler: 4-5 iş günü</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">Teslimat Saatleri</h3>
                    <p className="text-secondary">
                      Kargo teslimatları Pazartesi-Cumartesi arası 09:00-19:00 saatleri arasında yapılır.
                      Pazar günleri teslimat yapılmamaktadır.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modern-card p-8 mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">Kargo Firmaları</h2>
              <p className="text-secondary mb-4">
                Siparişleriniz aşağıdaki kargo firmalarından biri ile gönderilir:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Aras Kargo', 'Yurtiçi Kargo', 'MNG Kargo', 'Sürat Kargo'].map((cargo) => (
                  <div key={cargo} className="p-4 bg-light rounded-lg text-center">
                    <p className="font-medium text-dark text-sm">{cargo}</p>
                  </div>
                ))}
              </div>
              <p className="text-secondary text-sm mt-4">
                * Kargo firması siparişinizin boyutuna ve bölgenize göre otomatik olarak seçilir.
              </p>
            </div>

            <div className="modern-card p-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">Önemli Notlar</h2>
              <div className="space-y-3 text-secondary">
                <div className="flex items-start gap-3">
                  <span className="text-dark mt-1">•</span>
                  <p>Kargo takip numaranız, ürün kargoya verildikten sonra e-posta ile tarafınıza gönderilir.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-dark mt-1">•</span>
                  <p>Ürünü teslim alırken mutlaka kontrol edin. Hasarlı paketleri teslim almayın.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-dark mt-1">•</span>
                  <p>Resmi tatil günlerinde teslimat yapılmamaktadır. Teslimat süreleri buna göre uzayabilir.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-dark mt-1">•</span>
                  <p>Hava koşulları veya beklenmedik durumlar teslimat süresini etkileyebilir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
