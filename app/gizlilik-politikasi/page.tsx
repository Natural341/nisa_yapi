import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Gizlilik Politikası</h1>
            <p className="text-secondary">Kişisel verilerinizin korunması bizim için önemlidir</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="modern-card p-8 mb-6">
              <p className="text-secondary mb-4">
                <strong className="text-dark">Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}
              </p>
              <p className="text-secondary">
                Nisa Yapı Market olarak müşterilerimizin gizliliğine saygı duyuyor ve kişisel verilerini korumak için
                gerekli tüm önlemleri alıyoruz. Bu gizlilik politikası, web sitemizi kullanırken toplanan bilgilerin
                nasıl işlendiğini açıklamaktadır.
              </p>
            </div>

            <div className="space-y-8">
              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">1. Toplanan Bilgiler</h2>
                <p className="text-secondary mb-4">
                  Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Ad, soyad, e-posta adresi, telefon numarası</li>
                  <li>Teslimat ve fatura adresi bilgileri</li>
                  <li>Sipariş geçmişi ve ödeme bilgileri</li>
                  <li>Web sitesi kullanım verileri (IP adresi, tarayıcı bilgisi, çerezler)</li>
                  <li>Müşteri hizmetleri ile yapılan iletişim kayıtları</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">2. Bilgilerin Kullanım Amacı</h2>
                <p className="text-secondary mb-4">
                  Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Siparişlerinizi işleme almak ve teslim etmek</li>
                  <li>Size daha iyi hizmet sunmak ve müşteri deneyimini geliştirmek</li>
                  <li>Kampanya ve özel teklifler hakkında bilgilendirme yapmak</li>
                  <li>Web sitemizi iyileştirmek ve kişiselleştirmek</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                  <li>Dolandırıcılığı önlemek ve güvenliği sağlamak</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">3. Bilgilerin Paylaşımı</h2>
                <p className="text-secondary mb-4">
                  Kişisel bilgilerinizi üçüncü kişilerle paylaşmıyoruz. Ancak aşağıdaki durumlarda
                  bilgi paylaşımı yapılabilir:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Kargo ve lojistik hizmet sağlayıcıları (sadece teslimat için gerekli bilgiler)</li>
                  <li>Ödeme işlemcileri (güvenli ödeme işlemleri için)</li>
                  <li>Yasal zorunluluklar çerçevesinde yetkili kurumlar</li>
                  <li>İş ortaklarımız (açık rızanız ile)</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">4. Çerezler (Cookies)</h2>
                <p className="text-secondary mb-4">
                  Web sitemiz, kullanıcı deneyimini geliştirmek için çerezler kullanır. Çerezler,
                  tarayıcınız tarafından saklanan küçük metin dosyalarıdır. Çerezleri tarayıcı
                  ayarlarınızdan yönetebilir veya silebilirsiniz.
                </p>
                <p className="text-secondary">
                  Kullandığımız çerez türleri:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4 mt-3">
                  <li><strong className="text-dark">Zorunlu Çerezler:</strong> Web sitesinin çalışması için gerekli</li>
                  <li><strong className="text-dark">Performans Çerezleri:</strong> Site performansını ölçmek için</li>
                  <li><strong className="text-dark">İşlevsellik Çerezleri:</strong> Tercihlerinizi hatırlamak için</li>
                  <li><strong className="text-dark">Pazarlama Çerezleri:</strong> Size özel içerik sunmak için</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">5. Veri Güvenliği</h2>
                <p className="text-secondary">
                  Kişisel verilerinizi korumak için SSL şifreleme, güvenli sunucular ve düzenli
                  güvenlik testleri gibi teknik ve idari önlemler alıyoruz. Ancak internet üzerinden
                  yapılan hiçbir veri aktarımı %100 güvenli değildir.
                </p>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">6. Haklarınız</h2>
                <p className="text-secondary mb-4">
                  KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                  <li>Verilerin silinmesini veya yok edilmesini isteme</li>
                </ul>
              </div>

              <div className="modern-card p-8">
                <h2 className="text-2xl font-semibold text-dark mb-4">7. Değişiklikler</h2>
                <p className="text-secondary">
                  Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler
                  olduğunda sizi bilgilendireceğiz. Güncellenmiş politikayı düzenli olarak
                  gözden geçirmenizi öneririz.
                </p>
              </div>

              <div className="modern-card p-8 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                <h2 className="text-2xl font-semibold text-dark mb-4">İletişim</h2>
                <p className="text-secondary mb-4">
                  Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="space-y-2 text-secondary">
                  <p><strong className="text-dark">E-posta:</strong> kvkk@nisayapimarket.com</p>
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
