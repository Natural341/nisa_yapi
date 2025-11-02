'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const order = searchParams.get('order');
    if (order) {
      setOrderNumber(order);
    }

    // Countdown for redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [searchParams, router]);

  return (
    <div className="max-w-2xl w-full">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Ödemeniz Başarıyla Alındı!
        </h1>
        <p className="text-lg text-secondary mb-8">
          Siparişiniz için teşekkür ederiz. Ödemeniz onaylandı ve siparişiniz hazırlanmaya başlandı.
        </p>

        {/* Order Info Card */}
        <div className="modern-card p-8 mb-8 text-left">
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex-shrink-0 w-12 h-12 bg-dark rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-dark mb-2">Sipariş Detayları</h2>
              <p className="text-sm text-secondary">
                Sipariş takip bilgileriniz e-posta adresinize gönderildi.
              </p>
            </div>
          </div>

          {orderNumber && (
            <div className="bg-light p-4 rounded-lg mb-6">
              <p className="text-sm text-secondary mb-1">Sipariş Numarası</p>
              <p className="text-xl font-bold text-dark font-mono">{orderNumber}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <p className="font-medium text-dark">Ödeme Onaylandı</p>
                <p className="text-sm text-secondary">
                  Ödemeniz başarıyla işleme alındı
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <div>
                <p className="font-medium text-dark">Sipariş Hazırlanıyor</p>
                <p className="text-sm text-secondary">
                  Siparişiniz hazırlanmaya başlandı
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-gray mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-medium text-dark">E-posta Gönderildi</p>
                <p className="text-sm text-secondary">
                  Sipariş detayları e-posta adresinize gönderildi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/"
            className="bg-dark hover:bg-primary-hover text-white px-6 py-3.5 rounded-lg modern-button font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ana Sayfa
          </Link>

          <Link
            href="/urunler"
            className="border-2 border-dark text-dark hover:bg-dark hover:text-white px-6 py-3.5 rounded-lg modern-button font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Alışverişe Devam
          </Link>
        </div>

        {/* Redirect Info */}
        <div className="mt-8 p-4 bg-light rounded-lg">
          <p className="text-sm text-secondary">
            {countdown} saniye içinde ana sayfaya yönlendirileceksiniz...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Suspense fallback={
          <div className="max-w-2xl w-full text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
            <p className="mt-4 text-secondary">Yükleniyor...</p>
          </div>
        }>
          <PaymentSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
