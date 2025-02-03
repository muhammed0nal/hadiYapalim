# Hadiyapalım Frontend Dokümantasyonu

## 📱 Proje Hakkında

Bu proje, React Native ve Expo kullanılarak geliştirilmiş bir mobil uygulamanın frontend kısmıdır.

## 🛠️ Teknolojiler ve Araçlar

- **React Native**: ^0.74.5
- **Expo**: ^51.0.39
- **React Navigation**: ^6.x
- **Formik & Yup**: Form yönetimi ve validasyon için
- **Axios**: HTTP istekleri için
- **Expo Secure Store**: Güvenli depolama için
- **React Native Maps**: Harita entegrasyonu için

## 📁 Proje Yapısı

```
frontend/
├── assets/           # Resimler, fontlar ve diğer statik dosyalar
├── components/       # Yeniden kullanılabilir UI bileşenleri
├── config/          # Yapılandırma dosyaları
├── constants/       # Sabit değerler ve validasyon şemaları
├── contexts/        # React Context dosyaları
├── data/           # Statik veri dosyaları
├── navigation/     # Navigasyon yapılandırması
├── screens/        # Uygulama ekranları
├── utils/          # Yardımcı fonksiyonlar
└── App.js          # Ana uygulama bileşeni
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS için Xcode (macOS)
- Android için Android Studio

### Kurulum Adımları

1. Projeyi klonlayın

```bash
git clone [proje-url]
cd frontend
```

2. Bağımlılıkları yükleyin

```bash
npm install
# veya
yarn install
```

3. Uygulamayı başlatın

```bash
npm start
# veya
yarn start
```

## 📱 Kullanılabilir Komutlar

- `npm start`: Expo geliştirme sunucusunu başlatır
- `npm run android`: Android emülatörde uygulamayı başlatır
- `npm run ios`: iOS simülatörde uygulamayı başlatır
- `npm run web`: Web tarayıcıda uygulamayı başlatır

## 📦 Önemli Paketler ve Kullanımları

### 🧭 Navigasyon

- `@react-navigation/native`: Ana navigasyon paketi
- `@react-navigation/native-stack`: Stack navigasyonu için
- `@react-navigation/bottom-tabs`: Alt tab navigasyonu için
- `@react-navigation/drawer`: Çekmece menüsü için

### 📝 Form ve Validasyon

- `formik`: Form yönetimi
- `yup`: Form validasyonu
- Örnek kullanım `ValidationSchema.js` içinde bulunabilir

### 📍 Harita ve Konum

- `react-native-maps`: Harita entegrasyonu
- `expo-location`: Konum servisleri

### 🔒 Güvenlik ve Depolama

- `expo-secure-store`: Hassas verilerin güvenli depolanması
- `jwt-decode`: JWT token işlemleri

### 📸 Medya

- `expo-image-picker`: Resim seçme ve kamera işlemleri
- `react-native-image-viewing`: Resim görüntüleme

## 🔧 Yapılandırma

- `app.json`: Expo yapılandırması
- `babel.config.js`: Babel yapılandırması

## 📝 Önemli Notlar

- Uygulama geliştirirken Expo CLI kullanılmaktadır
- API istekleri için Axios kullanılmaktadır
- Form validasyonları için Yup şemaları kullanılmaktadır
- Güvenli depolama için Expo Secure Store kullanılmaktadır

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📫 İletişim

[İletişim bilgileri]
