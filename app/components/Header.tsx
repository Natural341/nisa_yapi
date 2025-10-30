'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b border-border py-2.5 text-sm">
          <div className="flex justify-between items-center">
            <p className="text-secondary">
              Tel: 0555 123 45 67
            </p>
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
              <Link href="/kategoriler" className="text-dark hover:text-dark/70 transition-colors text-sm">Kategoriler</Link>
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
              <Link href="/kategoriler" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">Kategoriler</Link>
              <Link href="/kampanyalar" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">Kampanyalar</Link>
              <Link href="/hakkimizda" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">Hakkımızda</Link>
              <Link href="/iletisim" className="text-dark hover:bg-gray-lighter transition-colors py-2.5 px-3 rounded text-sm">İletişim</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
