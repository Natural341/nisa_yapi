import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Career() {
  const positions = [
    {
      title: 'Satış Danışmanı',
      location: 'İstanbul - Merkez Mağaza',
      type: 'Tam Zamanlı',
      description: 'Müşterilerimize hizmet vermek için deneyimli satış danışmanı arıyoruz.',
    },
    {
      title: 'Depo Sorumlusu',
      location: 'İstanbul - Merkez Depo',
      type: 'Tam Zamanlı',
      description: 'Depo operasyonlarını yönetecek sorumlu arayışımız devam ediyor.',
    },
    {
      title: 'E-Ticaret Uzmanı',
      location: 'İstanbul - Merkez Ofis',
      type: 'Tam Zamanlı',
      description: 'Online satış kanallarımızı yönetecek deneyimli e-ticaret uzmanı arıyoruz.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Kariyer</h1>
            <p className="text-secondary">Bize katılın, birlikte büyüyelim</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="modern-card p-8 mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-4">Neden Nisa Yapı Market?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Dinamik Çalışma Ortamı</h3>
                    <p className="text-sm text-secondary">Gelişim fırsatları sunan modern çalışma ortamı</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Rekabetçi Maaş</h3>
                    <p className="text-sm text-secondary">Sektör standartlarının üzerinde ücret</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Eğitim Programları</h3>
                    <p className="text-sm text-secondary">Sürekli gelişim için eğitim imkanları</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Takım Ruhu</h3>
                    <p className="text-sm text-secondary">Birlikte çalışma ve gelişme kültürü</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-dark mb-6">Açık Pozisyonlar</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div key={index} className="modern-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-dark mb-2">{position.title}</h3>
                      <p className="text-secondary text-sm mb-3">{position.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1 text-xs text-secondary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-secondary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <button className="bg-dark hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg modern-button font-medium text-sm whitespace-nowrap">
                      Başvur
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="modern-card p-8 mt-8 text-center">
              <h2 className="text-xl font-semibold text-dark mb-3">Aradığınız Pozisyonu Bulamadınız mı?</h2>
              <p className="text-secondary mb-6">CV'nizi gönderin, uygun pozisyon açıldığında sizinle iletişime geçelim.</p>
              <a
                href="mailto:kariyer@nisayapimarket.com"
                className="inline-flex items-center gap-2 bg-dark hover:bg-primary-hover text-white px-6 py-3 rounded-lg modern-button font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                CV Gönder
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
