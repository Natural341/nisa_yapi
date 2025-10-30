'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const { cartItems, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'bank-transfer' | 'cash-on-delivery'>('credit-card');
  const [installment, setInstallment] = useState('1');

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const shippingCost = cartTotal >= 500 ? 0 : 49;
  const total = cartTotal + shippingCost;

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) return;
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      if (value.length > 5) return;
    }

    // Format CVV
    if (name === 'cvv' && value.length > 3) return;

    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (cartItems.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

    // Simulate payment
    alert('Siparişiniz başarıyla oluşturuldu! Teşekkür ederiz.');
    router.push('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <section className="bg-light border-b border-border py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Ödeme</h1>
            </div>
          </section>
          <div className="container mx-auto px-4 py-12">
            <div className="modern-card p-16 text-center">
              <svg className="w-20 h-20 mx-auto mb-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-dark mb-2">Sepetiniz Boş</h2>
              <p className="text-secondary mb-8">Ödeme yapabilmek için önce sepetinize ürün eklemelisiniz.</p>
              <Link href="/urunler" className="bg-dark text-white px-8 py-3 rounded modern-button font-medium inline-block">
                Alışverişe Başla
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Ödeme</h1>
            <p className="text-secondary">Sipariş bilgilerinizi tamamlayın</p>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <div className="modern-card p-6">
                <h2 className="text-xl font-semibold text-dark mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Teslimat Bilgileri
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">Ad *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={deliveryInfo.firstName}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">Soyad *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={deliveryInfo.lastName}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">E-posta *</label>
                    <input
                      type="email"
                      name="email"
                      value={deliveryInfo.email}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">Telefon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryInfo.phone}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="0555 123 45 67"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-dark font-medium mb-2 text-sm">Adres *</label>
                    <textarea
                      name="address"
                      value={deliveryInfo.address}
                      onChange={handleDeliveryChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark resize-none"
                      placeholder="Tam adresiniz"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">İl *</label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryInfo.city}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="İl"
                    />
                  </div>
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">İlçe *</label>
                    <input
                      type="text"
                      name="district"
                      value={deliveryInfo.district}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="İlçe"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="modern-card p-6">
                <h2 className="text-xl font-semibold text-dark mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Ödeme Yöntemi
                </h2>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 border-2 rounded cursor-pointer hover:border-dark transition-colors"
                    style={{ borderColor: paymentMethod === 'credit-card' ? 'var(--dark)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-dark">Kredi/Banka Kartı</p>
                      <p className="text-xs text-secondary">Güvenli ödeme ile taksit seçenekleri</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded cursor-pointer hover:border-dark transition-colors"
                    style={{ borderColor: paymentMethod === 'bank-transfer' ? 'var(--dark)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-dark">Havale/EFT</p>
                      <p className="text-xs text-secondary">Banka hesabımıza havale yapın</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded cursor-pointer hover:border-dark transition-colors"
                    style={{ borderColor: paymentMethod === 'cash-on-delivery' ? 'var(--dark)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-dark">Kapıda Ödeme</p>
                      <p className="text-xs text-secondary">Ürün tesliminde nakit veya kart ile ödeyin</p>
                    </div>
                  </label>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4 p-4 bg-light rounded">
                    <div>
                      <label className="block text-dark font-medium mb-2 text-sm">Kart Numarası *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardChange}
                        required={paymentMethod === 'credit-card'}
                        className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-dark font-medium mb-2 text-sm">Kart Üzerindeki İsim *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardChange}
                        required={paymentMethod === 'credit-card'}
                        className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                        placeholder="AD SOYAD"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-dark font-medium mb-2 text-sm">Son Kullanma *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={handleCardChange}
                          required={paymentMethod === 'credit-card'}
                          className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-dark font-medium mb-2 text-sm">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardChange}
                          required={paymentMethod === 'credit-card'}
                          className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    {/* Installment Options */}
                    <div>
                      <label className="block text-dark font-medium mb-3 text-sm">Taksit Seçenekleri</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { value: '1', label: 'Tek Çekim', total: total },
                          { value: '3', label: '3 Taksit', total: total * 1.05 },
                          { value: '6', label: '6 Taksit', total: total * 1.08 },
                          { value: '9', label: '9 Taksit', total: total * 1.12 },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex flex-col p-3 border-2 rounded cursor-pointer hover:border-dark transition-colors text-center"
                            style={{ borderColor: installment === option.value ? 'var(--dark)' : 'var(--border)' }}
                          >
                            <input
                              type="radio"
                              name="installment"
                              value={option.value}
                              checked={installment === option.value}
                              onChange={(e) => setInstallment(e.target.value)}
                              className="hidden"
                            />
                            <span className="text-sm font-medium text-dark">{option.label}</span>
                            <span className="text-xs text-secondary mt-1">
                              {option.value === '1'
                                ? `${option.total.toFixed(2)} ₺`
                                : `${(option.total / parseInt(option.value)).toFixed(2)} ₺ x ${option.value}`
                              }
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank-transfer' && (
                  <div className="p-4 bg-light rounded">
                    <p className="text-sm text-dark mb-3 font-medium">Havale Bilgileri:</p>
                    <div className="space-y-2 text-sm text-secondary">
                      <p><strong className="text-dark">Banka:</strong> İş Bankası</p>
                      <p><strong className="text-dark">Hesap Sahibi:</strong> Nisa Yapı Market Ltd. Şti.</p>
                      <p><strong className="text-dark">IBAN:</strong> TR00 0000 0000 0000 0000 0000 00</p>
                      <p className="text-xs mt-3 p-2 bg-white rounded">
                        Havale açıklamasına sipariş numaranızı yazmayı unutmayın.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash-on-delivery' && (
                  <div className="p-4 bg-light rounded">
                    <p className="text-sm text-secondary">
                      Ürün teslim edildiğinde kargo görevlisine nakit veya kredi kartı ile ödeme yapabilirsiniz.
                      Kapıda ödeme için ekstra 10 ₺ ücret uygulanır.
                    </p>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="modern-card p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 mt-1" />
                  <span className="text-sm text-secondary">
                    <Link href="/kullanim-kosullari" className="text-dark hover:underline">Kullanım koşullarını</Link> ve{' '}
                    <Link href="/gizlilik-politikasi" className="text-dark hover:underline">gizlilik politikasını</Link> okudum ve kabul ediyorum.
                  </span>
                </label>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="modern-card p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-dark mb-4">Sipariş Özeti</h2>

                {/* Products */}
                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-light rounded flex-shrink-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-gray-lighter rounded"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-dark font-medium truncate">{item.name}</p>
                        <p className="text-xs text-secondary">Adet: {item.quantity}</p>
                        <p className="text-sm text-dark font-semibold">{item.price * item.quantity} ₺</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Ara Toplam</span>
                    <span className="font-medium text-dark">{cartTotal} ₺</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Kargo</span>
                    <span className="font-medium text-dark">
                      {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost} ₺`}
                    </span>
                  </div>
                  {paymentMethod === 'cash-on-delivery' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Kapıda Ödeme Ücreti</span>
                      <span className="font-medium text-dark">10 ₺</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-dark">Toplam</span>
                  <span className="font-semibold text-dark text-xl">
                    {paymentMethod === 'cash-on-delivery' ? total + 10 : total} ₺
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-dark hover:bg-primary-hover text-white py-3 rounded modern-button font-medium mb-4"
                >
                  Siparişi Tamamla
                </button>

                {/* Security */}
                <div className="bg-light border border-border p-3 rounded text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-xs font-medium text-dark">Güvenli Ödeme</p>
                  </div>
                  <p className="text-xs text-secondary">256-bit SSL şifrelemesi</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
