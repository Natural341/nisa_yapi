'use client';

import { useState, useEffect } from 'react';

interface PayTRPaymentProps {
  token: string;
  onClose: () => void;
}

export default function PayTRPayment({ token, onClose }: PayTRPaymentProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // PayTR iframe yüklendiğinde loading'i kapat
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark">Güvenli Ödeme</h2>
              <p className="text-xs text-secondary">PayTR ile güvenli ödeme</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-light rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <svg
              className="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-light border-t-dark rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary">Ödeme sayfası yükleniyor...</p>
            </div>
          </div>
        )}

        {/* PayTR iFrame */}
        <div className="relative bg-white" style={{ height: '600px' }}>
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${token}`}
            id="paytriframe"
            frameBorder="0"
            scrolling="no"
            className="w-full h-full"
            style={{ minHeight: '600px' }}
          ></iframe>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 p-3 bg-light border-t border-border">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="text-xs text-secondary">
            256-bit SSL şifreleme ile güvenli ödeme
          </p>
        </div>
      </div>
    </div>
  );
}
