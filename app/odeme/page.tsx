'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const PayTRPayment = dynamic(() => import('../components/PayTRPayment'), {
  ssr: false,
});

export default function Checkout() {
  const router = useRouter();
  const { cartItems, cartTotal } = useCart();
  const { isLoggedIn, addresses, getDefaultAddress } = useUser();
  const [paymentMethod, setPaymentMethod] = useState<'paytr' | 'bank-transfer' | 'cash-on-delivery'>('paytr');
  const [installment, setInstallment] = useState('1');
  const [showPayTR, setShowPayTR] = useState(false);
  const [paytrToken, setPaytrToken] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [useManualAddress, setUseManualAddress] = useState(false);

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

  // Load default address on mount if logged in
  useEffect(() => {
    if (isLoggedIn && addresses.length > 0) {
      const defaultAddr = getDefaultAddress();
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
        setDeliveryInfo({
          firstName: defaultAddr.firstName,
          lastName: defaultAddr.lastName,
          email: deliveryInfo.email, // Keep email from state
          phone: defaultAddr.phone,
          address: defaultAddr.address,
          city: defaultAddr.city,
          district: defaultAddr.district,
          zipCode: '',
        });
      }
    }
  }, [isLoggedIn, addresses]);

  // Update delivery info when address selection changes
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      setDeliveryInfo({
        firstName: selectedAddress.firstName,
        lastName: selectedAddress.lastName,
        email: deliveryInfo.email,
        phone: selectedAddress.phone,
        address: selectedAddress.address,
        city: selectedAddress.city,
        district: selectedAddress.district,
        zipCode: '',
      });
      setUseManualAddress(false);
    }
  };

  const shippingCost = cartTotal >= 500 ? 0 : 49;
  const cashOnDeliveryFee = paymentMethod === 'cash-on-delivery' ? 10 : 0;
  const total = cartTotal + shippingCost + cashOnDeliveryFee;

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return '127.0.0.1';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

    // Banka havalesi veya kapıda ödeme için
    if (paymentMethod === 'bank-transfer' || paymentMethod === 'cash-on-delivery') {
      alert('Siparişiniz başarıyla oluşturuldu! Teşekkür ederiz.');
      router.push('/');
      return;
    }

    // PayTR ödeme işlemi
    if (paymentMethod === 'paytr') {
      setIsProcessing(true);

      try {
        const userIP = await getClientIP();
        const merchantOid = `ORDER_${Date.now()}`;

        // Sepet içeriğini base64 formatında hazırla
        const userBasket = btoa(
          JSON.stringify(
            cartItems.map((item) => [item.name, (item.price * 100).toString(), item.quantity])
          )
        );

        const paymentData = {
          user_name: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
          user_address: `${deliveryInfo.address}, ${deliveryInfo.district}/${deliveryInfo.city}`,
          user_phone: deliveryInfo.phone,
          user_email: deliveryInfo.email,
          merchant_oid: merchantOid,
          payment_amount: total.toFixed(2),
          user_basket: userBasket,
          user_ip: userIP,
        };

        const response = await fetch('/api/payment/initiate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const data = await response.json();

        if (data.success && data.token) {
          setPaytrToken(data.token);
          setShowPayTR(true);
        } else {
          alert(data.error || 'Ödeme başlatılamadı. Lütfen tekrar deneyin.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setIsProcessing(false);
      }
    }
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-dark flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Teslimat Bilgileri
                  </h2>
                  {!isLoggedIn && (
                    <Link href="/hesap" className="text-sm text-secondary hover:text-dark flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Giriş Yap
                    </Link>
                  )}
                </div>

                {/* Saved Addresses */}
                {isLoggedIn && addresses.length > 0 && !useManualAddress && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-dark font-medium text-sm">Kayıtlı Adreslerim</label>
                      <button
                        type="button"
                        onClick={() => setUseManualAddress(true)}
                        className="text-sm text-secondary hover:text-dark"
                      >
                        Farklı adres kullan
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {addresses.map((address) => (
                        <label
                          key={address.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedAddressId === address.id
                              ? 'border-dark bg-light'
                              : 'border-border hover:border-dark/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="savedAddress"
                            checked={selectedAddressId === address.id}
                            onChange={() => handleAddressSelect(address.id)}
                            className="mr-3"
                          />
                          <span className="font-medium text-dark">{address.title}</span>
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              Varsayılan
                            </span>
                          )}
                          <div className="ml-6 mt-2 text-sm text-secondary">
                            <p className="text-dark font-medium">
                              {address.firstName} {address.lastName}
                            </p>
                            <p>{address.phone}</p>
                            <p>{address.address}</p>
                            <p>
                              {address.district} / {address.city}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <Link
                      href="/hesabim"
                      className="mt-3 text-sm text-secondary hover:text-dark flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Yeni adres ekle
                    </Link>
                  </div>
                )}

                {/* Manual Address Form Header */}
                {isLoggedIn && useManualAddress && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        setUseManualAddress(false);
                        if (addresses.length > 0) {
                          handleAddressSelect(selectedAddressId || addresses[0].id);
                        }
                      }}
                      className="text-sm text-secondary hover:text-dark flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Kayıtlı adreslerimi kullan
                    </button>
                  </div>
                )}

                {/* Manual Address Form - Show if not logged in OR manually selected OR no saved addresses */}
                {(!isLoggedIn || useManualAddress || addresses.length === 0) && (
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
                )}
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
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-dark hover:shadow-sm transition-all"
                    style={{ borderColor: paymentMethod === 'paytr' ? 'var(--dark)' : 'var(--border)', backgroundColor: paymentMethod === 'paytr' ? 'var(--light)' : 'white' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paytr"
                      checked={paymentMethod === 'paytr'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-5 h-5 accent-dark"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-dark">Kredi/Banka Kartı</p>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Önerilen</span>
                      </div>
                      <p className="text-xs text-secondary mt-1">PayTR ile güvenli ödeme - Tüm kartlar ve taksit seçenekleri</p>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                      <div className="w-10 h-7 bg-gradient-to-br from-red-600 to-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-dark hover:shadow-sm transition-all"
                    style={{ borderColor: paymentMethod === 'bank-transfer' ? 'var(--dark)' : 'var(--border)', backgroundColor: paymentMethod === 'bank-transfer' ? 'var(--light)' : 'white' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-5 h-5 accent-dark"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-dark">Havale/EFT</p>
                      <p className="text-xs text-secondary mt-1">Banka hesabımıza havale yaparak ödeyin</p>
                    </div>
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-dark hover:shadow-sm transition-all"
                    style={{ borderColor: paymentMethod === 'cash-on-delivery' ? 'var(--dark)' : 'var(--border)', backgroundColor: paymentMethod === 'cash-on-delivery' ? 'var(--light)' : 'white' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-5 h-5 accent-dark"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-dark">Kapıda Ödeme</p>
                      <p className="text-xs text-secondary mt-1">Ürün tesliminde nakit veya kart ile ödeyin (+10 ₺)</p>
                    </div>
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </label>
                </div>

                {/* PayTR Info */}
                {paymentMethod === 'paytr' && (
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark mb-2">Güvenli PayTR Ödeme</h4>
                        <ul className="space-y-1.5 text-sm text-secondary">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Tüm banka kartları kabul edilir
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            9 taksit seçeneği ile ödeme yapabilirsiniz
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            256-bit SSL şifreleme ile korumalı
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            3D Secure güvenli alışveriş
                          </li>
                        </ul>
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
                  disabled={isProcessing}
                  className="w-full bg-dark hover:bg-primary-hover text-white py-3.5 rounded-lg modern-button font-semibold mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>İşleniyor...</span>
                    </>
                  ) : paymentMethod === 'paytr' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Güvenli Ödemeye Geç</span>
                    </>
                  ) : (
                    'Siparişi Tamamla'
                  )}
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

      {/* PayTR Payment Modal */}
      {showPayTR && paytrToken && (
        <PayTRPayment
          token={paytrToken}
          onClose={() => {
            setShowPayTR(false);
            setPaytrToken('');
          }}
        />
      )}
    </div>
  );
}
