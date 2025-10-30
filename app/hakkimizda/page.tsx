import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const values = [
    { title: 'Kalite', description: 'Sadece güvenilir markalarla çalışıyoruz' },
    { title: 'Güven', description: '1995\'ten beri müşteri memnuniyeti' },
    { title: 'Hız', description: 'Aynı gün kargo imkanı' },
    { title: 'Garanti', description: 'Tüm ürünlerde resmi garanti' },
  ];

  const team = [
    { name: 'Nisa Yılmaz', role: 'Kurucu & CEO' },
    { name: 'Mehmet Demir', role: 'Satış Müdürü' },
    { name: 'Ayşe Kara', role: 'Müşteri Hizmetleri' },
    { name: 'Can Öztürk', role: 'Lojistik Sorumlusu' },
  ];

  const milestones = [
    { year: '1995', event: 'Nisa Yapı Market kuruldu' },
    { year: '2005', event: 'İkinci mağaza açıldı' },
    { year: '2015', event: 'Online satışa başladı' },
    { year: '2020', event: '50.000+ mutlu müşteri' },
    { year: '2025', event: 'Yeni nesil e-ticaret platformu' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Hakkımızda</h1>
            <p className="text-secondary">30 yıllık tecrübemizle, hayalinizdeki projeleri gerçeğe dönüştürmenize yardımcı oluyoruz.</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold text-dark mb-6">Hikayemiz</h2>
                <div className="space-y-4 text-secondary">
                  <p>
                    Nisa Yapı Market, 1995 yılında küçük bir hırdavat dükkanı olarak hayata başladı.
                    Kurucumuz Nisa Yılmaz'ın "kaliteli ürün, uygun fiyat, güler yüz" ilkesiyle
                    yola çıktığımız bu serüvende, bugün binlerce müşterimize hizmet vermenin
                    gururunu yaşıyoruz.
                  </p>
                  <p>
                    İlk günden bu yana değişmeyen prensiplerimiz: müşteri memnuniyeti, ürün kalitesi
                    ve dürüst ticaret anlayışı. Sektördeki 30 yıllık tecrübemizle, hem profesyonel
                    hem de bireysel müşterilerimize en iyi hizmeti sunmak için çalışıyoruz.
                  </p>
                  <p>
                    2015 yılında dijital dünyaya adım attık ve online satış platformumuzu kurduk.
                    Artık sadece mağazamızda değil, Türkiye'nin her yerinden müşterilerimize
                    ulaşabiliyoruz.
                  </p>
                </div>
              </div>
              <div className="modern-card p-8">
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/maskot.png"
                    alt="Nisa Yapı Market"
                    width={120}
                    height={120}
                  />
                </div>
                <h3 className="text-2xl font-semibold text-dark mb-6 text-center">30 Yıllık Tecrübe</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-light p-4 rounded text-center">
                    <div className="text-2xl font-semibold text-dark mb-1">50K+</div>
                    <div className="text-sm text-secondary">Mutlu Müşteri</div>
                  </div>
                  <div className="bg-light p-4 rounded text-center">
                    <div className="text-2xl font-semibold text-dark mb-1">5000+</div>
                    <div className="text-sm text-secondary">Ürün Çeşidi</div>
                  </div>
                  <div className="bg-light p-4 rounded text-center">
                    <div className="text-2xl font-semibold text-dark mb-1">98%</div>
                    <div className="text-sm text-secondary">Memnuniyet</div>
                  </div>
                  <div className="bg-light p-4 rounded text-center">
                    <div className="text-2xl font-semibold text-dark mb-1">24/7</div>
                    <div className="text-sm text-secondary">Destek</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-light">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-dark mb-8 text-center">Değerlerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="modern-card p-6 text-center">
                  <div className="w-12 h-12 bg-light border border-border rounded mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-dark mb-2">{value.title}</h3>
                  <p className="text-sm text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-dark mb-8 text-center">Kilometre Taşlarımız</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-dark text-white px-4 py-2 rounded font-semibold text-sm min-w-[80px] text-center">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 modern-card p-4">
                    <p className="text-dark">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-light">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-dark mb-2 text-center">Ekibimiz</h2>
            <p className="text-secondary text-center mb-8 max-w-2xl mx-auto">
              Uzman ve deneyimli ekibimiz, size en iyi hizmeti sunmak için burada
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="modern-card overflow-hidden">
                  <div className="aspect-square bg-light flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-lighter rounded-full"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-medium text-dark mb-1">{member.name}</h3>
                    <p className="text-sm text-secondary">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-dark mb-3">
              Hayallerinizi Birlikte Gerçekleştirelim!
            </h2>
            <p className="text-secondary mb-8 max-w-2xl mx-auto">
              Profesyonel danışmanlık ve kaliteli ürünlerle yanınızdayız
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/urunler"
                className="bg-dark text-white px-8 py-3 rounded modern-button text-center font-medium"
              >
                Ürünleri Keşfet
              </Link>
              <Link
                href="/iletisim"
                className="border border-border hover:border-dark text-dark px-8 py-3 rounded modern-button text-center font-medium"
              >
                Bize Ulaşın
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
