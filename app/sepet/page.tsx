'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Alışveriş Sepeti</h1>
            <p className="text-secondary">{cartItems.length} ürün sepetinizde</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {cartItems.length === 0 ? (
            <div className="modern-card p-16 text-center">
              <svg className="w-20 h-20 mx-auto mb-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-dark mb-2">Sepetiniz Boş</h2>
              <p className="text-secondary mb-8">Henüz sepetinize ürün eklemediniz.</p>
              <Link
                href="/urunler"
                className="bg-dark text-white px-8 py-3 rounded modern-button font-medium inline-block"
              >
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="modern-card p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-light rounded flex items-center justify-center">
                          <div className="w-16 h-16 bg-gray-lighter rounded"></div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-dark text-lg mb-2">{item.name}</h3>
                        <p className="text-dark font-semibold text-xl mb-4">{item.price} ₺</p>

                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="border border-border hover:border-dark w-8 h-8 rounded font-medium"
                            >
                              -
                            </button>
                            <span className="border border-border px-4 py-1.5 rounded font-medium min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="border border-border hover:border-dark w-8 h-8 rounded font-medium"
                            >
                              +
                            </button>
                          </div>

                          {/* Subtotal & Remove */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-secondary">Ara Toplam</p>
                              <p className="font-semibold text-dark">{item.price * item.quantity} ₺</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="border border-border hover:border-dark text-dark px-3 py-1.5 rounded font-medium text-sm"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <Link
                  href="/urunler"
                  className="text-dark hover:text-dark/70 font-medium inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Alışverişe Devam Et
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="modern-card p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-dark mb-6">Sipariş Özeti</h2>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="block text-dark font-medium mb-2 text-sm">İndirim Kuponu</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Kupon kodu"
                        className="flex-1 px-4 py-2 rounded border border-border bg-white text-dark text-sm outline-none focus:border-dark"
                      />
                      <button className="bg-dark text-white px-4 py-2 rounded modern-button font-medium text-sm">
                        Uygula
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Ara Toplam</span>
                      <span className="font-medium text-dark">{subtotal} ₺</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Kargo</span>
                      <span className="font-medium text-dark">
                        {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost} ₺`}
                      </span>
                    </div>
                    {subtotal < 500 && subtotal > 0 && (
                      <p className="text-xs text-secondary bg-light p-3 rounded">
                        500 TL ve üzeri alışverişlerde kargo ücretsiz!
                        <br />
                        <strong className="text-dark">{500 - subtotal} ₺</strong> daha ekleyin
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold text-dark">Toplam</span>
                    <span className="font-semibold text-dark text-xl">{total} ₺</span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/odeme"
                    className="w-full bg-dark hover:bg-primary-hover text-white py-3 rounded modern-button font-medium block text-center mb-4"
                  >
                    Ödemeye Geç
                  </Link>

                  {/* Security Badge */}
                  <div className="bg-light border border-border p-4 rounded text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <p className="text-xs font-medium text-dark">Güvenli Ödeme</p>
                    </div>
                    <p className="text-xs text-secondary">
                      256-bit SSL ile korunmaktadır
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
