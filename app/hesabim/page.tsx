'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

export default function MyAccount() {
  const router = useRouter();
  const { user, isLoggedIn, logout, addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('addresses');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    isDefault: false,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/hesap');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setAddressFormData({
      ...addressFormData,
      [target.name]: target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value,
    });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAddressId) {
      updateAddress(editingAddressId, addressFormData);
    } else {
      addAddress(addressFormData);
    }

    // Reset form
    setAddressFormData({
      title: '',
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      district: '',
      address: '',
      isDefault: false,
    });
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  const handleEditAddress = (id: string) => {
    const address = addresses.find(addr => addr.id === id);
    if (address) {
      setAddressFormData({
        title: address.title,
        firstName: address.firstName,
        lastName: address.lastName,
        phone: address.phone,
        city: address.city,
        district: address.district,
        address: address.address,
        isDefault: address.isDefault,
      });
      setEditingAddressId(id);
      setShowAddressForm(true);
    }
  };

  const handleCancelEdit = () => {
    setAddressFormData({
      title: '',
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      district: '',
      address: '',
      isDefault: false,
    });
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-light border-b border-border py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-2">Hesabım</h1>
            <p className="text-secondary">Hoş geldiniz, {user.name}</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="modern-card p-4 space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2.5 rounded text-sm transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-dark text-white'
                      : 'text-dark hover:bg-light'
                  }`}
                >
                  Profil Bilgilerim
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-2.5 rounded text-sm transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-dark text-white'
                      : 'text-dark hover:bg-light'
                  }`}
                >
                  Adreslerim
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2.5 rounded text-sm transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-dark text-white'
                      : 'text-dark hover:bg-light'
                  }`}
                >
                  Siparişlerim
                </button>
                <div className="border-t border-border my-2"></div>
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="w-full text-left px-4 py-2.5 rounded text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="modern-card p-8">
                  <h2 className="text-xl font-semibold text-dark mb-6">Profil Bilgilerim</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Ad Soyad</label>
                        <p className="text-dark">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">E-posta</label>
                        <p className="text-dark">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Telefon</label>
                        <p className="text-dark">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  {/* Add Address Button */}
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="w-full modern-card p-6 text-center hover:shadow-lg transition-all border-2 border-dashed border-border hover:border-dark group"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center group-hover:bg-dark transition-colors">
                          <svg className="w-6 h-6 text-dark group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="font-medium text-dark group-hover:text-primary transition-colors">Yeni Adres Ekle</span>
                      </div>
                    </button>
                  )}

                  {/* Address Form */}
                  {showAddressForm && (
                    <div className="modern-card p-8">
                      <h2 className="text-xl font-semibold text-dark mb-6">
                        {editingAddressId ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                      </h2>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div>
                          <label className="block text-dark font-medium mb-2 text-sm">Adres Başlığı *</label>
                          <input
                            type="text"
                            name="title"
                            value={addressFormData.title}
                            onChange={handleAddressFormChange}
                            required
                            className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                            placeholder="Örn: Ev, İş, Diğer"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-dark font-medium mb-2 text-sm">Ad *</label>
                            <input
                              type="text"
                              name="firstName"
                              value={addressFormData.firstName}
                              onChange={handleAddressFormChange}
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
                              value={addressFormData.lastName}
                              onChange={handleAddressFormChange}
                              required
                              className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                              placeholder="Soyadınız"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-dark font-medium mb-2 text-sm">Telefon *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={addressFormData.phone}
                            onChange={handleAddressFormChange}
                            required
                            className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                            placeholder="0555 123 45 67"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-dark font-medium mb-2 text-sm">İl *</label>
                            <input
                              type="text"
                              name="city"
                              value={addressFormData.city}
                              onChange={handleAddressFormChange}
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
                              value={addressFormData.district}
                              onChange={handleAddressFormChange}
                              required
                              className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark"
                              placeholder="İlçe"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-dark font-medium mb-2 text-sm">Adres *</label>
                          <textarea
                            name="address"
                            value={addressFormData.address}
                            onChange={handleAddressFormChange}
                            required
                            rows={3}
                            className="w-full px-4 py-2.5 rounded border border-border bg-white text-dark outline-none focus:border-dark resize-none"
                            placeholder="Mahalle, sokak, bina no, daire no"
                          ></textarea>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="isDefault"
                            id="isDefault"
                            checked={addressFormData.isDefault}
                            onChange={handleAddressFormChange}
                            className="w-4 h-4"
                          />
                          <label htmlFor="isDefault" className="text-sm text-dark cursor-pointer">
                            Varsayılan adres olarak ayarla
                          </label>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="submit"
                            className="flex-1 bg-dark text-white py-3 rounded modern-button font-medium hover:bg-primary-hover"
                          >
                            {editingAddressId ? 'Güncelle' : 'Kaydet'}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex-1 border-2 border-border text-dark py-3 rounded modern-button font-medium hover:bg-light"
                          >
                            İptal
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Address List */}
                  {addresses.length === 0 && !showAddressForm && (
                    <div className="modern-card p-12 text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-secondary">Henüz kayıtlı adresiniz bulunmamaktadır</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="modern-card p-6 relative">
                        {address.isDefault && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded">
                              Varsayılan
                            </span>
                          </div>
                        )}

                        <h3 className="font-semibold text-dark mb-3">{address.title}</h3>
                        <div className="text-sm text-secondary space-y-1 mb-4">
                          <p className="text-dark font-medium">
                            {address.firstName} {address.lastName}
                          </p>
                          <p>{address.phone}</p>
                          <p>{address.address}</p>
                          <p>
                            {address.district} / {address.city}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditAddress(address.id)}
                            className="flex-1 text-sm py-2 px-3 border border-border rounded hover:bg-light transition-colors"
                          >
                            Düzenle
                          </button>
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="flex-1 text-sm py-2 px-3 border border-border rounded hover:bg-light transition-colors"
                            >
                              Varsayılan Yap
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
                                deleteAddress(address.id);
                              }
                            }}
                            className="text-sm py-2 px-3 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="modern-card p-12 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-secondary mb-4">Henüz siparişiniz bulunmamaktadır</p>
                  <button
                    onClick={() => router.push('/urunler')}
                    className="bg-dark text-white py-2.5 px-6 rounded modern-button font-medium hover:bg-primary-hover"
                  >
                    Alışverişe Başla
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
