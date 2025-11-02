import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Kullanım Koşulları</h1>
            <p className="text-secondary">Web sitemizi kullanım şartları ve koşulları</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="modern-card p-8 mb-6">
              <p className="text-secondary mb-4">
                <strong className="text-dark">Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}
              </p>
              <p className="text-secondary">
                Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız.
                Koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
              </p>
            </div>

            <div className="space-y-8">
              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">1. Genel Koşullar</h2>
                <p className="text-secondary mb-4">
                  Nisa Yapı Market web sitesini kullanarak, bu kullanım koşullarına ve gizlilik politikasına
                  uyacağınızı kabul etmiş olursunuz. Bu koşulları ihlal etmeniz durumunda, siteye erişiminiz
                  kısıtlanabilir veya engellenebilir.
                </p>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">2. Ürün Bilgileri ve Fiyatlar</h2>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Web sitesindeki tüm ürün bilgileri ve fiyatlar bilgi amaçlıdır ve önceden haber verilmeksizin değiştirilebilir.</li>
                  <li>Ürün görselleri temsilidir, renk ve boyut farklılıkları olabilir.</li>
                  <li>Fiyatlara KDV dahildir, aksi belirtilmedikçe.</li>
                  <li>Kampanya ve indirimlerin süresi sınırlıdır ve önceden haber verilmeksizin sona erdirilebilir.</li>
                  <li>Stok durumu anlık olarak değişebilir. Sipariş onayı stok kontrolünden sonra verilir.</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">3. Sipariş ve Ödeme</h2>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Sipariş vermek için 18 yaşından büyük olmanız gerekmektedir.</li>
                  <li>Verilen siparişler, stok kontrolü ve ödeme onayından sonra kesinleşir.</li>
                  <li>Ödeme bilgileriniz güvenli ödeme sistemleri üzerinden işlenir.</li>
                  <li>Hatalı veya eksik bilgi verilmesi durumunda sipariş iptal edilebilir.</li>
                  <li>Fiyat hatası veya sistem hatası durumunda siparişi iptal etme hakkımız saklıdır.</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">4. Teslimat</h2>
                <p className="text-secondary mb-4">
                  Teslimat koşulları şu şekildedir:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Teslimat süreleri tahminidir ve garanti edilmez.</li>
                  <li>Kargo firması seçimi bize aittir.</li>
                  <li>Teslimat adresinin doğruluğu müşterinin sorumluluğundadır.</li>
                  <li>Hatalı adres nedeniyle oluşan gecikmelerden sorumlu değiliz.</li>
                  <li>Ürünü teslim alırken mutlaka kontrol ediniz. Hasarlı ürünler için kargo tutanağı tutulmalıdır.</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">5. İade ve İptal</h2>
                <p className="text-secondary mb-4">
                  İade ve iptal koşulları:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>14 gün içinde cayma hakkınız bulunmaktadır (Mesafeli Satış Sözleşmesi gereği).</li>
                  <li>İade edilen ürünler kullanılmamış ve orijinal ambalajında olmalıdır.</li>
                  <li>Özel üretim ürünler iade edilemez.</li>
                  <li>İade onayından sonra 7-10 iş günü içinde ödeme iade edilir.</li>
                  <li>Sipariş kargoya verilmeden önce iptal edilebilir.</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">6. Fikri Mülkiyet Hakları</h2>
                <p className="text-secondary mb-4">
                  Bu web sitesindeki tüm içerik (metin, görsel, logo, tasarım vb.) Nisa Yapı Market\'e aittir
                  ve telif hakları ile korunmaktadır.
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Site içeriği izinsiz kopyalanamaz, çoğaltılamaz veya dağıtılamaz.</li>
                  <li>Ticari amaçlı kullanım için yazılı izin gereklidir.</li>
                  <li>Marka ve logoların kullanımı yasaktır.</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">7. Kullanıcı Sorumlulukları</h2>
                <p className="text-secondary mb-4">
                  Site kullanıcıları olarak:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Doğru ve güncel bilgi vermekle yükümlüsünüz.</li>
                  <li>Hesap güvenliğiniz sizin sorumluluğunuzdadır.</li>
                  <li>Yasadışı faaliyetlerde bulunmayacağınızı taahhüt edersiniz.</li>
                  <li>Siteye zarar verecek davranışlardan kaçınacaksınız.</li>
                  <li>Diğer kullanıcıların haklarına saygı göstereceksiniz.</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">8. Sorumluluk Sınırlamaları</h2>
                <p className="text-secondary mb-4">
                  Nisa Yapı Market aşağıdaki durumlardan sorumlu değildir:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Üçüncü taraf web sitelerinin içeriği</li>
                  <li>Sistem arızaları veya teknik sorunlar</li>
                  <li>Mücbir sebepler (doğal afet, savaş, salgın vb.)</li>
                  <li>Kullanıcı hatalarından kaynaklanan sorunlar</li>
                  <li>İnternet bağlantı sorunları</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">9. Değişiklikler</h2>
                <p className="text-secondary">
                  Bu kullanım koşullarını herhangi bir zamanda değiştirme hakkımız saklıdır.
                  Değişiklikler sitede yayınlandığı anda yürürlüğe girer. Siteyi kullanmaya
                  devam ederek değişiklikleri kabul etmiş sayılırsınız.
                </p>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">10. Uyuşmazlıkların Çözümü</h2>
                <p className="text-secondary">
                  Bu sözleşmeden doğabilecek uyuşmazlıklarda İstanbul Mahkemeleri ve
                  İcra Daireleri yetkilidir. Tüketici hakem heyetleri ve tüketici mahkemeleri
                  de yetkilidir.
                </p>
              </div>

              <div className="modern-card p-8 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                <h2 className="text-2xl font-semibold text-dark mb-4">İletişim</h2>
                <p className="text-secondary mb-4">
                  Kullanım koşulları hakkında sorularınız için:
                </p>
                <div className="space-y-2 text-secondary">
                  <p><strong className="text-dark">E-posta:</strong> info@nisayapimarket.com</p>
                  <p><strong className="text-dark">Telefon:</strong> <a href="tel:05458527726" className="hover:text-dark transition-colors">0545 852 77 26</a></p>
                  <p><strong className="text-dark">Adres:</strong> Gültepe, Halk Cd. 137/a, 26040 Odunpazarı/Eskişehir</p>
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
