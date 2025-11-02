'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

export default function Account() {
  const router = useRouter();
  const { isLoggedIn, login, register } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/hesabim');
    }
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login
      const success = login(formData.email, formData.password);
      if (!success) {
        setError('E-posta veya şifre hatalı');
      }
    } else {
      // Register
      if (formData.password !== formData.confirmPassword) {
        setError('Şifreler eşleşmiyor');
        return;
      }

      if (formData.password.length < 6) {
        setError('Şifre en az 6 karakter olmalıdır');
        return;
      }

      const success = register(formData.name, formData.email, formData.password, formData.phone);
      if (!success) {
        setError('Bu e-posta adresi zaten kayıtlı');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </h1>
            <p className="text-secondary">
              {isLogin ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun'}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="modern-card p-8">
              {/* Tab Buttons */}
              <div className="flex gap-2 mb-8 bg-light p-1 rounded-lg">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className={`flex-1 py-2.5 rounded font-medium text-sm transition-all ${
                    isLogin
                      ? 'bg-white text-dark shadow-sm'
                      : 'text-secondary hover:text-dark'
                  }`}
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  className={`flex-1 py-2.5 rounded font-medium text-sm transition-all ${
                    !isLogin
                      ? 'bg-white text-dark shadow-sm'
                      : 'text-secondary hover:text-dark'
                  }`}
                >
                  Kayıt Ol
                </button>
              </div>

              {/* Demo Account Info */}
              {isLogin && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-blue-900 text-sm font-medium mb-2">Demo Hesap Bilgileri:</p>
                      <div className="text-blue-800 text-sm space-y-1 font-mono">
                        <p><strong>E-posta:</strong> okan6226@gmail.com</p>
                        <p><strong>Şifre:</strong> Portakal1999!</p>
                      </div>
                      <p className="text-blue-700 text-xs mt-2">3 adet kayıtlı adres ile test edebilirsiniz</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Login/Register Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-dark font-medium mb-2 text-sm">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                    placeholder="ornek@email.com"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="0555 123 45 67"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-dark font-medium mb-2 text-sm">
                    Şifre *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                    placeholder="••••••••"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-dark font-medium mb-2 text-sm">
                      Şifre Tekrar *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-secondary hover:text-dark transition-colors">
                      Şifremi Unuttum
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-dark text-white py-3 rounded modern-button font-medium hover:bg-primary-hover"
                >
                  {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-secondary">
                  {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                  {' '}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                    }}
                    className="text-dark font-medium hover:underline"
                  >
                    {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                  </button>
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-light rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-1 text-sm">Hızlı Alışveriş</h3>
                <p className="text-xs text-secondary">Kayıtlı adreslerinizle hızlı ödeme</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-light rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-1 text-sm">Sipariş Takibi</h3>
                <p className="text-xs text-secondary">Siparişlerinizi kolayca takip edin</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-light rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-dark mb-1 text-sm">Kişisel Deneyim</h3>
                <p className="text-xs text-secondary">Size özel kampanya ve fırsatlar</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
