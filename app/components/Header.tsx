'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { cartCount } = useCart();
  const { isLoggedIn, user } = useUser();

  const categories = [
    { id: 'el-aletleri', name: 'El Aletleri', icon: '🔨' },
    { id: 'elektrikli-aletler', name: 'Elektrikli Aletler', icon: '⚡' },
    { id: 'boya', name: 'Boya & Badana', icon: '🎨' },
    { id: 'hirdavat', name: 'Hırdavat', icon: '🔩' },
    { id: 'yapi', name: 'Yapı Malzemeleri', icon: '🏗️' },
    { id: 'bahce', name: 'Bahçe & Dış Mekan', icon: '🌱' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b border-border py-2.5 text-sm">
          <div className="flex justify-between items-center">
            <a href="tel:05458527726" className="text-secondary hover:text-dark transition-colors">
              Tel: 0545 852 77 26
            </a>
            <p className="hidden md:block text-secondary">
              Ücretsiz Kargo - 500 TL ve Üzeri
            </p>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo with Mascot */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/maskot.png"
                  alt="Nisa Yapı Market Maskot"
                  width={60}
                  height={60}
                  className="transition-transform group-hover:scale-110"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-dark">Nisa Yapı Market</h1>
                <p className="text-xs md:text-sm text-gray">Hırdavat & Yapı Malzemeleri</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-dark hover:text-dark/70 transition-colors text-sm">Ana Sayfa</Link>
              <Link href="/urunler" className="text-dark hover:text-dark/70 transition-colors text-sm">Ürünler</Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className="text-dark hover:text-dark/70 transition-colors text-sm flex items-center gap-1 py-2">
                  Kategoriler
                  <svg className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white border border-border rounded-lg shadow-xl">
                      <div className="p-2">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/urunler?category=${category.id}`}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-light rounded-lg transition-colors group"
                          >
                            <span className="text-2xl">{category.icon}</span>
                            <span className="text-dark group-hover:text-dark/70 text-sm font-medium">{category.name}</span>
                            <svg className="w-4 h-4 ml-auto text-secondary group-hover:text-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                        <div className="border-t border-border my-2"></div>
                        <Link
                          href="/urunler"
                          className="flex items-center justify-center gap-2 px-4 py-3 hover:bg-dark hover:text-white rounded-lg transition-all text-sm font-semibold"
                        >
                          Tüm Ürünleri Gör
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/kampanyalar" className="text-dark hover:text-dark/70 transition-colors text-sm">Kampanyalar</Link>
              <Link href="/hakkimizda" className="text-dark hover:text-dark/70 transition-colors text-sm">Hakkımızda</Link>
              <Link href="/iletisim" className="text-dark hover:text-dark/70 transition-colors text-sm">İletişim</Link>
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="hidden md:flex items-center justify-center w-9 h-9 hover:bg-gray-lighter text-secondary hover:text-dark transition-colors rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Account */}
              <Link
                href={isLoggedIn ? "/hesabim" : "/hesap"}
                className="hidden md:flex items-center justify-center w-9 h-9 hover:bg-gray-lighter text-secondary hover:text-dark transition-colors rounded"
                title={isLoggedIn ? user?.name : "Giriş Yap"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Cart */}
              <Link href="/sepet" className="relative flex items-center justify-center w-9 h-9 hover:bg-gray-lighter text-secondary hover:text-dark transition-colors rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-dark text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 hover:bg-gray-lighter text-dark transition-colors rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t border-border">
            <nav className="flex flex-col gap-1">
              <Link href="/" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">Ana Sayfa</Link>
              <Link href="/urunler" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">Ürünler</Link>

              {/* Mobile Categories */}
              <div>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full text-left text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm flex items-center justify-between"
                >
                  Kategoriler
                  <svg className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCategoriesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/urunler?category=${category.id}`}
                        className="flex items-center gap-2 text-secondary hover:text-dark hover:bg-gray-lighter transition-colors py-2 px-3 rounded text-sm"
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/kampanyalar" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">Kampanyalar</Link>
              <Link href="/hakkimizda" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">Hakkımızda</Link>
              <Link href="/iletisim" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">İletişim</Link>

              <div className="border-t border-border my-2"></div>

              <Link
                href={isLoggedIn ? "/hesabim" : "/hesap"}
                className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {isLoggedIn ? user?.name : "Giriş Yap / Kayıt Ol"}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
