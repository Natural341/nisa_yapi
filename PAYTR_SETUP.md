# PayTR Ödeme Entegrasyonu Kurulum Rehberi

Bu proje PayTR ödeme sistemi ile entegre edilmiştir. Aşağıdaki adımları takip ederek PayTR'ı aktif edebilirsiniz.

## 1. PayTR Hesabı Oluşturma

1. [PayTR](https://www.paytr.com) web sitesine gidin
2. Üye olun veya giriş yapın
3. Üye işyeri başvurusu yapın
4. Onay sürecini tamamlayın

## 2. PayTR API Bilgilerini Alma

PayTR paneline giriş yaptıktan sonra:

1. **Ayarlar** > **Bilgi** menüsüne gidin
2. Aşağıdaki bilgileri not edin:
   - **Mağaza No (Merchant ID)**
   - **Merchant Key**
   - **Merchant Salt**

## 3. Environment Variables Kurulumu

### Geliştirme Ortamı (Development)

1. Proje ana dizininde `.env.local` dosyası oluşturun
2. Aşağıdaki bilgileri ekleyin:

```env
PAYTR_MERCHANT_ID=your_merchant_id
PAYTR_MERCHANT_KEY=your_merchant_key
PAYTR_MERCHANT_SALT=your_merchant_salt
PAYTR_TEST_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production Ortamı

Production için `.env.production` veya hosting sağlayıcınızın environment variables bölümünde:

```env
PAYTR_MERCHANT_ID=your_production_merchant_id
PAYTR_MERCHANT_KEY=your_production_merchant_key
PAYTR_MERCHANT_SALT=your_production_merchant_salt
PAYTR_TEST_MODE=false
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 4. PayTR Panel Ayarları

PayTR panelinde yapılması gereken ayarlar:

### Callback URL'leri

1. PayTR panelde **Ayarlar** > **Bilgi** > **Bildirim URL** bölümüne gidin
2. Aşağıdaki URL'i ekleyin:
   - **Bildirim (Callback) URL**: `https://yourdomain.com/api/payment/callback`

### İzin Verilen IP Adresleri (Opsiyonel)

Güvenlik için sunucu IP adresinizi PayTR panelde beyaz listeye ekleyebilirsiniz.

## 5. Test Modu

Test modu aktifken gerçek ödeme yapılmaz. Test kartları kullanarak ödeme akışını test edebilirsiniz.

### Test Kartları

PayTR test kartları için [PayTR Dokümantasyon](https://www.paytr.com/odeme-altyapisi-api/test-kartlari) sayfasını ziyaret edin.

**Örnek Test Kartı:**
- Kart Numarası: `4355084355084358`
- Son Kullanma: Gelecek bir tarih (örn: `12/30`)
- CVV: `000`

## 6. Özellikler

Bu entegrasyon şunları içerir:

### Kullanıcı Tarafı
- Modern ve güvenli ödeme arayüzü
- PayTR iframe ile güvenli ödeme sayfası
- 9 taksit seçeneği
- Tüm banka kartları desteği
- 3D Secure güvenlik
- Havale/EFT seçeneği
- Kapıda ödeme seçeneği
- Ödeme başarı sayfası

### Teknik Özellikler
- Next.js App Router API Routes
- TypeScript desteği
- Güvenli token oluşturma (HMAC-SHA256)
- Callback işleme
- Hata yönetimi
- Loading states
- Responsive tasarım

## 7. API Endpoints

### Payment Initiation
- **URL**: `/api/payment/initiate`
- **Method**: `POST`
- **Description**: PayTR ödeme tokenı oluşturur

### Payment Callback
- **URL**: `/api/payment/callback`
- **Method**: `POST`
- **Description**: PayTR'dan gelen ödeme sonucunu işler

## 8. Güvenlik Notları

- ⚠️ `.env.local` dosyasını asla git'e commit etmeyin
- ⚠️ Merchant Key ve Salt bilgilerini asla client-side kodda kullanmayın
- ⚠️ Production'da `PAYTR_TEST_MODE=false` yapın
- ⚠️ HTTPS kullanmadan production'a geçmeyin
- ⚠️ PayTR callback'lerinde hash doğrulaması mutlaka yapın

## 9. Sorun Giderme

### Ödeme sayfası açılmıyor
- Environment variables'ların doğru girildiğinden emin olun
- Browser console'da hata mesajlarını kontrol edin
- PayTR panel ayarlarını kontrol edin

### Callback çalışmıyor
- Callback URL'inin PayTR panelde doğru tanımlandığından emin olun
- Sunucunuzun PayTR tarafından erişilebilir olduğundan emin olun
- Hash doğrulamasının düzgün çalıştığını kontrol edin

### Test modunda ödeme başarısız
- Test kartı bilgilerinin doğru girildiğinden emin olun
- `PAYTR_TEST_MODE=true` olduğundan emin olun

## 10. Destek

- **PayTR Dokümantasyon**: https://www.paytr.com/odeme-altyapisi-api
- **PayTR Destek**: destek@paytr.com
- **PayTR Telefon**: +90 850 532 59 99

## 11. Lisans

Bu entegrasyon MIT lisansı altındadır. PayTR kullanım koşulları için PayTR web sitesini ziyaret edin.
