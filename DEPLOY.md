# VDS'ye Deployment Rehberi

## Değişen Dosyalar
✅ **next.config.ts** - Production optimizasyonları eklendi
✅ **ecosystem.config.js** - PM2 yapılandırması oluşturuldu
✅ **nginx.conf** - Nginx reverse proxy yapılandırması
✅ **.env.production.example** - Environment variables örneği

## VDS Kurulum Adımları

### 1. VDS'ye Bağlanın
```bash
ssh root@VDS_IP_ADRESI
```

### 2. Node.js Kurulumu (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs
node --version  # Kontrol edin
```

### 3. PM2 Kurulumu
```bash
npm install -g pm2
```

### 4. Projeyi VDS'ye Yükleyin
```bash
# Yerel bilgisayarınızdan (Git kullanarak)
git init
git add .
git commit -m "Initial deployment"
git remote add origin YOUR_GIT_REPO
git push -u origin main

# VDS'de
cd /var/www
git clone YOUR_GIT_REPO nalbur
cd nalbur
```

VEYA

```bash
# FTP/SFTP ile dosyaları /var/www/nalbur klasörüne yükleyin
```

### 5. Bağımlılıkları Yükleyin ve Build Edin
```bash
cd /var/www/nalbur
npm install
npm run build
```

### 6. Environment Variables Oluşturun
```bash
cp .env.production.example .env.production
nano .env.production
# Alan adınızı yazın ve kaydedin
```

### 7. PM2 ile Başlatın
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Sunucu yeniden başladığında otomatik başlat
```

### 8. Nginx Kurulumu ve Yapılandırması
```bash
# Nginx kurulumu
apt-get install -y nginx

# Yapılandırma dosyasını kopyalayın
cp /var/www/nalbur/nginx.conf /etc/nginx/sites-available/nisayapimarket.com

# Symbolic link oluşturun
ln -s /etc/nginx/sites-available/nisayapimarket.com /etc/nginx/sites-enabled/

# Default siteyi devre dışı bırakın (opsiyonel)
rm /etc/nginx/sites-enabled/default

# Nginx'i test edin ve yeniden başlatın
nginx -t
systemctl restart nginx
```

### 9. SSL Sertifikası (Let's Encrypt - ÜCRETSİZ)
```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d nisayapimarket.com -d www.nisayapimarket.com
```

### 10. Hostinger Alan Adı DNS Ayarları (nisayapimarket.com)
Hostinger panelinden:
1. Alan adınızı seçin (nisayapimarket.com)
2. DNS/Nameservers → DNS Kayıtları
3. A kaydı ekleyin:
   - Type: A
   - Name: @ (veya boş)
   - Value: VDS_IP_ADRESI (Hostinger'den aldığınız)
   - TTL: 3600

4. www için A kaydı:
   - Type: A
   - Name: www
   - Value: VDS_IP_ADRESI
   - TTL: 3600

DNS yayılması genelde 15-30 dakika, maksimum 24 saat sürebilir.

## Yararlı PM2 Komutları
```bash
pm2 list              # Çalışan uygulamaları listele
pm2 logs nalbur       # Logları görüntüle
pm2 restart nalbur    # Uygulamayı yeniden başlat
pm2 stop nalbur       # Uygulamayı durdur
pm2 delete nalbur     # Uygulamayı PM2'den kaldır
```

## Güncelleme Yaparken
```bash
cd /var/www/nalbur
git pull  # veya FTP ile dosyaları güncelleyin
npm install
npm run build
pm2 restart nalbur
```

## Güvenlik Duvarı (UFW)
```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH için
ufw enable
```

## Test
- http://VDS_IP_ADRESI → Next.js siteniz görünmeli
- http://nisayapimarket.com → DNS yayıldıktan sonra siteniz görünmeli
- https://nisayapimarket.com → SSL sertifikası kurduktan sonra güvenli bağlantı
