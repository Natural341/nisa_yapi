'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sipariş takibi özelliği yakında eklenecek!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Sipariş Takibi</h1>
            <p className="text-secondary">Siparişinizin durumunu kontrol edin</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="modern-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-dark rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-dark">Sipariş Sorgula</h2>
                  <p className="text-sm text-secondary">Sipariş bilgilerinizi girerek sorgulayın</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-dark font-medium mb-2 text-sm">
                    Sipariş Numarası *
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                    placeholder="ORDER_1234567890"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-dark outline-none focus:border-dark transition-colors"
                  />
                  <p className="text-xs text-secondary mt-1">
                    Sipariş numaranızı onay e-postasında bulabilirsiniz
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-dark hover:bg-primary-hover text-white py-3.5 rounded-lg modern-button font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Siparişi Sorgula
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="modern-card p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">E-posta Bildirimleri</h3>
                <p className="text-sm text-secondary">
                  Sipariş durumunuz değiştiğinde size e-posta ile bilgilendirme yapıyoruz.
                </p>
              </div>

              <div className="modern-card p-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Müşteri Desteği</h3>
                <p className="text-sm text-secondary">
                  Sorularınız için 0545 852 77 26 numaralı telefondan bize ulaşabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
