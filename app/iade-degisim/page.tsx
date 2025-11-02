import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ReturnExchange() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">İade ve Değişim</h1>
            <p className="text-secondary">İade ve değişim prosedürümüz</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="modern-card p-8 mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">İade Koşulları</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">İade Süresi</h3>
                    <p className="text-secondary">
                      Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz.
                      Bu süre içinde ürün kullanılmamış ve orijinal ambalajında olmalıdır.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">Ürün Durumu</h3>
                    <p className="text-secondary">
                      İade edilecek ürün kullanılmamış, zarar görmemiş ve orijinal ambalajında olmalıdır.
                      Ürünle birlikte gelen tüm aksesuarlar, belgeler ve hediyeler de iade edilmelidir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">İade Prosedürü</h3>
                    <p className="text-secondary mb-3">
                      İade işlemi başlatmak için müşteri hizmetlerimiz ile iletişime geçin.
                      Size bir iade kodu ve kargo bilgisi verilecektir.
                    </p>
                    <ul className="list-disc list-inside text-secondary text-sm space-y-1 ml-4">
                      <li>İade kodunu alın</li>
                      <li>Ürünü orijinal ambalajında paketleyin</li>
                      <li>Kargo ile gönderin (kargo ücreti tarafımızca karşılanır)</li>
                      <li>Ürün kontrolünden sonra ödeme iade edilir</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">İade Ödemesi</h3>
                    <p className="text-secondary">
                      İade edilen ürün depoya ulaştıktan ve kontrol edildikten sonra,
                      ödeme 7-10 iş günü içinde hesabınıza iade edilir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modern-card p-8 mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">Değişim İşlemleri</h2>
              <p className="text-secondary mb-4">
                Ürün değişimi yapmak istiyorsanız, önce mevcut ürünü iade edip ardından yeni ürün için sipariş verebilirsiniz.
                Veya müşteri hizmetlerimiz ile iletişime geçerek değişim talebinizi iletebilirsiniz.
              </p>
              <p className="text-secondary">
                Değişim işlemlerinde de iade koşulları geçerlidir. Ürün kullanılmamış ve orijinal ambalajında olmalıdır.
              </p>
            </div>

            <div className="modern-card p-8 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-2">İade Edilemeyen Ürünler</h3>
                  <ul className="list-disc list-inside text-secondary space-y-1">
                    <li>Hijyen kuralları gereği kullanılmış veya denenmiş ürünler</li>
                    <li>Özel sipariş üzerine hazırlanmış ürünler</li>
                    <li>Açılmış yazılım, müzik veya video ürünleri</li>
                    <li>Tek kullanımlık ürünler</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="modern-card p-8 text-center">
              <h2 className="text-xl font-semibold text-dark mb-3">İade Başvurusu Yapmak İster misiniz?</h2>
              <p className="text-secondary mb-6">Müşteri hizmetlerimiz size yardımcı olmak için hazır.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 bg-dark hover:bg-primary-hover text-white px-6 py-3 rounded-lg modern-button font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Bizi Arayın
                </a>
                <a
                  href="mailto:iade@nisayapimarket.com"
                  className="inline-flex items-center justify-center gap-2 border-2 border-dark text-dark hover:bg-dark hover:text-white px-6 py-3 rounded-lg modern-button font-medium transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-posta Gönderin
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
