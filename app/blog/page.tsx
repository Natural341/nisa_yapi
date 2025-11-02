import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Ev Tadilatında Dikkat Edilmesi Gerekenler',
      excerpt: 'Evinizi tadilatı yaparken nelere dikkat etmelisiniz? İşte uzman önerileri...',
      date: '15 Ocak 2025',
      category: 'Tadilat',
      image: '🏠',
    },
    {
      id: 2,
      title: 'Doğru El Aleti Nasıl Seçilir?',
      excerpt: 'İhtiyacınıza uygun el aletini seçerken dikkat etmeniz gereken kriterler.',
      date: '10 Ocak 2025',
      category: 'Aletler',
      image: '🔨',
    },
    {
      id: 3,
      title: 'Boya Rengi Seçiminde İpuçları',
      excerpt: 'Eviniz için doğru boya rengini seçmek için rehber niteliğinde ipuçları.',
      date: '5 Ocak 2025',
      category: 'Boya',
      image: '🎨',
    },
    {
      id: 4,
      title: 'Kış Aylarında Bahçe Bakımı',
      excerpt: 'Kış aylarında bahçenizi nasıl korumalı ve bakım yapmalısınız?',
      date: '28 Aralık 2024',
      category: 'Bahçe',
      image: '🌱',
    },
    {
      id: 5,
      title: 'Elektrikli Alet Kullanım Güvenliği',
      excerpt: 'Elektrikli aletleri güvenli bir şekilde kullanmak için bilmeniz gerekenler.',
      date: '20 Aralık 2024',
      category: 'Güvenlik',
      image: '⚡',
    },
    {
      id: 6,
      title: 'Su Tasarrufu İçin Pratik Çözümler',
      excerpt: 'Evde su tasarrufu yapmanıza yardımcı olacak basit ve etkili yöntemler.',
      date: '15 Aralık 2024',
      category: 'Tasarruf',
      image: '💧',
    },
  ];

  const categories = ['Hepsi', 'Tadilat', 'Aletler', 'Boya', 'Bahçe', 'Güvenlik', 'Tasarruf'];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Blog</h1>
            <p className="text-secondary">Yapı ve tadilat dünyasından haberler, ipuçları ve rehberler</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-5 py-2.5 rounded-lg border border-border hover:border-dark hover:bg-light transition-all text-sm font-medium whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="modern-card overflow-hidden group cursor-pointer h-full">
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-gray-lighter to-light flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-6xl">{post.image}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-dark bg-light px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-secondary">{post.date}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-dark mb-3 group-hover:text-dark/70 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-secondary text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-dark font-medium text-sm group-hover:gap-3 transition-all">
                      Devamını Oku
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="px-4 py-2 border border-border rounded-lg modern-button font-medium hover:border-dark text-sm">
              ← Önceki
            </button>
            <button className="px-4 py-2 bg-dark text-white rounded-lg font-medium text-sm">1</button>
            <button className="px-4 py-2 border border-border rounded-lg modern-button hover:border-dark text-sm">2</button>
            <button className="px-4 py-2 border border-border rounded-lg modern-button hover:border-dark text-sm">3</button>
            <button className="px-4 py-2 border border-border rounded-lg modern-button font-medium hover:border-dark text-sm">
              Sonraki →
            </button>
          </div>

          {/* Newsletter */}
          <div className="modern-card p-8 mt-12 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-dark mb-3">Blog Bültenimize Abone Olun</h2>
              <p className="text-secondary mb-6">
                Yeni içerikler, özel kampanyalar ve ipuçları için e-posta listemize katılın.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-dark outline-none focus:border-dark transition-colors"
                />
                <button className="bg-dark hover:bg-primary-hover text-white px-6 py-3 rounded-lg modern-button font-semibold whitespace-nowrap">
                  Abone Ol
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
