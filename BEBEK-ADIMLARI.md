# nisayapimarket.com - Bebek Adımlarıyla Kurulum

## 🎯 ADIM 1: GOOGLE CLOUD VDS IP ADRESİNİ BULUN

### 1.1 Google Cloud Console'a Girin
- https://console.cloud.google.com adresine gidin
- Giriş yapın

### 1.2 VDS IP Adresinizi Bulun
- Sol menüden **Compute Engine** → **VM instances** seçin
- VDS'nizin yanındaki **External IP** (Dış IP) adresini kopyalayın (örn: `35.123.45.67`)
- **Bu IP'yi bir yere not edin!**

---

## 🎯 ADIM 2: HOSTINGER'DE DNS AYARLARI (5 dakika)

### 2.1 Hostinger Panele Girin
- https://hpanel.hostinger.com adresine gidin
- Giriş yapın

### 2.2 DNS Ayarlarına Gidin
- Sol menüden **Domains** (Alan Adları) seçin
- **nisayapimarket.com** üzerine tıklayın
- **DNS / Name Servers** butonuna tıklayın
- **DNS records** (DNS kayıtları) sekmesine gidin

### 2.3 A Kayıtlarını Ekleyin
Eğer varsa eski A kayıtlarını silin, sonra yeni ekleyin:

**İlk Kayıt (ana domain):**
```
Type: A
Name: @ (veya boş bırakın)
Points to: GOOGLE_CLOUD_IP_ADRESI (örn: 35.123.45.67)
TTL: 3600 (veya 1 Hour)
```
**Add Record** veya **Ekle** butonuna tıklayın

**İkinci Kayıt (www):**
```
Type: A
Name: www
Points to: GOOGLE_CLOUD_IP_ADRESI (aynı IP)
TTL: 3600
```
**Add Record** butonuna tıklayın

✅ **DNS ayarı tamam!** (15-30 dakikada aktif olur)

---

## 🎯 ADIM 3: GOOGLE CLOUD FİREWALL AYARLARI

### 3.1 Firewall Kuralları Ekleyin
Google Cloud Console'da:
- Sol menü → **VPC Network** → **Firewall**
- **CREATE FIREWALL RULE** tıklayın

**Kural 1: HTTP (Port 80)**
```
Name: allow-http
Targets: All instances in the network
Source IP ranges: 0.0.0.0/0
Protocols and ports: tcp:80
```
**CREATE** tıklayın

**Kural 2: HTTPS (Port 443)**
```
Name: allow-https
Targets: All instances in the network
Source IP ranges: 0.0.0.0/0
Protocols and ports: tcp:443
```
**CREATE** tıklayın

✅ SSH (port 22) genelde zaten açık olur.

---

## 🎯 ADIM 4: VDS'YE SSH İLE BAĞLANMA

### 4.1 Google Cloud Console'dan Bağlan (EN KOLAY)
- **Compute Engine** → **VM instances**
- VDS'nizin yanındaki **SSH** butonuna tıklayın
- Otomatik terminal açılacak!

### 4.2 Veya Kendi Terminalinizden Bağlan

**Windows PowerShell/CMD:**
```bash
ssh KULLANICI_ADI@GOOGLE_CLOUD_IP
```
Kullanıcı adı genelde ilk oluştururken belirlediğiniz ad (örn: okan, admin, vb.)

**Bağlandınız! Artık VDS terminalindesiniz.**

---

## 🎯 ADIM 5: NODE.JS KURULUMU

VDS terminalinde sırayla şu komutları çalıştırın:

```bash
# Node.js deposunu ekle
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js'i kur
apt-get install -y nodejs

# Kontrol et
node --version
npm --version
```

✅ Version numaraları görünüyorsa başarılı!

---

## 🎯 ADIM 6: PM2 KURULUMU

```bash
npm install -g pm2
pm2 --version
```

✅ Version numarası görünüyorsa başarılı!

---

## 🎯 ADIM 7: PROJEYİ VDS'YE YÜKLEME

### 5.1 Klasör Oluştur
```bash
mkdir -p /var/www
cd /var/www
```

### 5.2 Projeyi Yükleyin

**SEÇENEK A: FileZilla ile (Kolay)**
1. FileZilla indirin: https://filezilla-project.org/
2. Bağlantı bilgileri:
   - Host: sftp://GOOGLE_CLOUD_IP
   - Username: KULLANICI_ADINIZ (Google Cloud'da oluşturduğunuz)
   - Password: Şifreniz (veya SSH key kullanıyorsanız key dosyası)
   - Port: 22
3. Sol taraf: `C:\Users\okan\Downloads\dark-1\nalbur` klasörünü açın
4. Sağ taraf: `/var/www/` yoluna gidin (yoksa oluşturun)
5. Sol taraftaki TÜM dosyaları sağ tarafa sürükleyin
6. Sağ tarafta `/var/www/nalbur` klasörü oluşacak

**SEÇENEK B: Git ile**
```bash
# Eğer Git yoksa kur
apt-get install -y git

# Projeyi klonla (GitHub/GitLab reponuz varsa)
cd /var/www
git clone REPO_URL nalbur
```

**SEÇENEK C: ZIP ile**
1. Bilgisayarınızda `nalbur` klasörünü zip yapın
2. FileZilla ile `/var/www/` içine atın
3. VDS'de:
```bash
cd /var/www
apt-get install -y unzip
unzip nalbur.zip
```

### 5.3 Kontrol Et
```bash
cd /var/www/nalbur
ls
```
✅ Dosyalarınız görünüyorsa başarılı!

---

## 🎯 ADIM 8: BAĞIMLILIKLARI KUR VE BUILD ET

```bash
cd /var/www/nalbur

# Bağımlılıkları kur (5-10 dakika sürebilir)
npm install

# Production build yap (3-5 dakika)
npm run build
```

✅ "Compiled successfully" görürseniz başarılı!

---

## 🎯 ADIM 9: ENVIRONMENT VARIABLES

```bash
cd /var/www/nalbur

# .env.production dosyası oluştur
cp .env.production.example .env.production

# Düzenle (nano editör açılacak)
nano .env.production
```

**Nano editörde:**
- Okları kullanarak git
- `NEXT_PUBLIC_SITE_URL=https://nisayapimarket.com` olduğundan emin ol
- `Ctrl + O` → Enter (kaydet)
- `Ctrl + X` (çık)

---

## 🎯 ADIM 10: PM2 İLE BAŞLAT

```bash
cd /var/www/nalbur

# Uygulamayı başlat
pm2 start ecosystem.config.js

# Kontrol et
pm2 list
```

✅ "online" durumunda görünüyorsa başarılı!

```bash
# Sunucu yeniden başladığında otomatik başlasın
pm2 save
pm2 startup
# Ekrana çıkan komutu kopyalayıp çalıştırın!
```

---

## 🎯 ADIM 11: NGINX KURULUMU

```bash
# Nginx kur
apt-get install -y nginx

# Yapılandırma dosyasını kopyala
cp /var/www/nalbur/nginx.conf /etc/nginx/sites-available/nisayapimarket.com

# Aktif et
ln -s /etc/nginx/sites-available/nisayapimarket.com /etc/nginx/sites-enabled/

# Varsayılan siteyi kaldır
rm /etc/nginx/sites-enabled/default

# Nginx'i test et
nginx -t
```

✅ "test is successful" görürseniz:

```bash
# Nginx'i başlat
systemctl restart nginx
systemctl enable nginx
```

---

## 🎯 ADIM 12: TEST EDIN!

Tarayıcıda açın:
```
http://GOOGLE_CLOUD_IP
```

✅ Siteniz görünüyorsa başarılı!

**DNS yayıldıktan sonra (15-30 dakika):**
```
http://nisayapimarket.com
```

---

## 🎯 ADIM 13: SSL SERTİFİKASI (ÜCRETSİZ)

DNS yayıldıktan sonra (nisayapimarket.com açılıyor mu kontrol edin):

```bash
# Certbot kur
apt-get install -y certbot python3-certbot-nginx

# SSL sertifikası al
certbot --nginx -d nisayapimarket.com -d www.nisayapimarket.com
```

Sorular:
- Email adresi soracak → girin
- Terms of Service → `Y` yazın
- Share email? → `N` yazın

✅ "Congratulations!" görürseniz başarılı!

Artık:
```
https://nisayapimarket.com
```
açılacak! 🎉

---

## 🎯 ADIM 14: GÜVENLİK DUVARI

Google Cloud'da firewall kurallarını zaten ADIM 3'te ayarladık.

Ek olarak VDS içinde UFW kullanmak isterseniz:
```bash
# UFW kur (opsiyonel)
apt-get install -y ufw

# Port açılımları
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

# Aktif et
ufw enable
```

✅ Güvenlik tamam!

---

## 🔧 FAYDALI KOMUTLAR

### PM2 Komutları
```bash
pm2 list            # Uygulamaları listele
pm2 logs nalbur     # Logları görüntüle
pm2 restart nalbur  # Yeniden başlat
pm2 stop nalbur     # Durdur
```

### Nginx Komutları
```bash
systemctl status nginx   # Durum kontrol
systemctl restart nginx  # Yeniden başlat
nginx -t                 # Yapılandırma test
```

### Güncelleme Yaparken
```bash
cd /var/www/nalbur
# Dosyaları FileZilla ile tekrar yükleyin
npm install
npm run build
pm2 restart nalbur
```

---

## ❓ SORUN GİDERME

### Site açılmıyor?
```bash
pm2 logs nalbur    # Hata loglarına bak
```

### Nginx hatası?
```bash
nginx -t           # Yapılandırma kontrol
systemctl status nginx
```

### Port kullanımda hatası?
```bash
# 3000 portunu kim kullanıyor bak
lsof -i :3000

# Gerekirse PM2'yi yeniden başlat
pm2 restart nalbur
```

---

## ✅ BAŞARILI!

Artık siteniz yayında:
- 🌐 http://nisayapimarket.com
- 🔒 https://nisayapimarket.com (SSL sonrası)

Herhangi bir adımda takılırsanız bana söyleyin!
