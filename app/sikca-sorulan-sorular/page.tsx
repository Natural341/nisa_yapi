'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Kargo ücreti ne kadar?',
      answer: '500 TL ve üzeri alışverişlerde kargo ücretsizdir. 500 TL altı siparişlerde kargo ücreti 49 TL\'dir.',
    },
    {
      question: 'Siparişim ne zaman teslim edilir?',
      answer: 'Siparişler genellikle 1-3 iş günü içinde kargoya verilir. Kargo teslimat süresi bölgenize göre 2-5 iş günü arasında değişmektedir.',
    },
    {
      question: 'İade ve değişim şartları nelerdir?',
      answer: 'Ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. Ürün kullanılmamış ve orijinal ambalajında olmalıdır.',
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini sunuyoruz. Kredi kartı ile 9 taksit imkanı mevcuttur.',
    },
    {
      question: 'Siparişimi nasıl takip edebilirim?',
      answer: 'Sipariş takibi sayfasından sipariş numaranız ile sipariş durumunuzu kontrol edebilirsiniz. Ayrıca kargo takip numarası e-posta ile gönderilir.',
    },
    {
      question: 'Fatura düzenliyor musunuz?',
      answer: 'Evet, tüm siparişler için e-fatura düzenliyoruz. Fatura bilgilerinizi sipariş sırasında girebilirsiniz.',
    },
    {
      question: 'Toplu alımlarda indirim var mı?',
      answer: 'Toplu alımlar için özel fiyat teklifleri sunuyoruz. Detaylı bilgi için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
    },
    {
      question: 'Ürün garantisi var mı?',
      answer: 'Tüm ürünlerimiz üretici firma garantisi ile satılmaktadır. Garanti süresi ürüne göre değişiklik göstermektedir.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Sıkça Sorulan Sorular</h1>
            <p className="text-secondary">Merak ettiklerinizin yanıtları burada</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="modern-card overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-light transition-colors"
                  >
                    <span className="font-semibold text-dark">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-secondary flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 pt-0">
                      <p className="text-secondary">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="modern-card p-8 mt-8 text-center">
              <h2 className="text-xl font-semibold text-dark mb-3">Sorunuz mu var?</h2>
              <p className="text-secondary mb-6">Aradığınız cevabı bulamadıysanız, bizimle iletişime geçin.</p>
              <a
                href="/iletisim"
                className="inline-flex items-center gap-2 bg-dark hover:bg-primary-hover text-white px-6 py-3 rounded-lg modern-button font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
