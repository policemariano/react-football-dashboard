# ⚽ React Football Dashboard

React ve Redux ile geliştirilmiş kapsamlı bir futbol istatistik uygulaması. Ligler, takımlar, maçlar ve favori takımlarınızı takip edebileceğiniz modern bir web uygulaması.


## 🚀 Özellikler

### 🏆 Lig Yönetimi
- Popüler ligleri görüntüleme (Premier League, La Liga, Serie A, Bundesliga, vb.)
- Lig detay sayfası ile puan durumu takibi
- Gerçek zamanlı lig bilgileri

### 👥 Takım Takibi
- Popüler takımları keşfetme
- Detaylı takım bilgileri (stadyum, ülke, açıklama)
- Takım rozetleri ve görselleri

### 📊 Maç Takibi
- Son oynanan maçları görüntüleme
- Maç sonuçları ve skorlar
- Lig bazlı maç filtreleme

### ⭐ Favori Sistem
- Favori takımlarınızı kaydetme
- Favori takımları tek sayfada görüntüleme
- Favorilerden kaldırma ve toplu temizleme

### 🎨 Tema Desteği
- Karanlık/Aydınlık tema geçişi
- LocalStorage ile tema tercihi kaydetme
- Tüm sayfalarda tutarlı tema desteği

### ⚡ Performans
- Redux ile state yönetimi
- API istekleri için akıllı önbellekleme sistemi
- LocalStorage ile veri kalıcılığı

## 🛠️ Kullanılan Teknolojiler

- **React 18** - UI geliştirme
- **Redux Toolkit** - State yönetimi
- **React Router v6** - Sayfa yönlendirme
- **Axios** - HTTP istekleri
- **Bootstrap 5** - UI framework
- **TheSportsDB API** - Futbol verileri
- **LocalStorage** - Veri kalıcılığı

## 📦 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. Repoyu klonlayın
```bash
git clone https://github.com/Erdem-Baran/react-football-dashboard.git
cd react-football-dashboard
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Uygulamayı başlatın
```bash
npm run dev
```

4. Tarayıcınızda açın
```
http://localhost:5173
```

## 📁 Proje Yapısı
```
react-football-dashboard/
├── src/
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   │   ├── Error.jsx
│   │   └── Loading.jsx
│   ├── pages/               # Sayfa bileşenleri
│   │   ├── Home.jsx
│   │   ├── Teams.jsx
│   │   ├── TeamDetail.jsx
│   │   ├── LeagueDetail.jsx
│   │   ├── TodaysMatches.jsx
│   │   └── Favorites.jsx
│   ├── layout/              # Layout bileşenleri
│   │   └── MainLayout.jsx
│   ├── redux/               # Redux store ve slice'lar
│   │   ├── Store.jsx
│   │   ├── League.jsx
│   │   ├── GetTeams.jsx
│   │   ├── GetTeamDetail.jsx
│   │   ├── GetLeagueDetail.jsx
│   │   ├── TodaysMatchesSlice.jsx
│   │   ├── FavoritesSlice.jsx
│   │   └── ThemeSlice.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## 🎯 Kullanım

### Ana Sayfa
- Popüler ligleri kartlar halinde görüntüleyin
- Bir lige tıklayarak detay sayfasına gidin

### Popüler Takımlar
- 12 popüler takımı görüntüleyin
- Takımlara favori ekleyin/çıkarın (❤️)
- Takıma tıklayarak detay sayfasına gidin

### Lig Detayları
- Lig puan durumunu görüntüleyin
- Takım istatistiklerini inceleyin (P, W, D, L, GD, Pts)
- Takımlara tıklayarak detay sayfalarına gidin

### Takım Detayları
- Takım bilgilerini görüntüleyin
- Stadyum, ülke ve açıklama bilgilerine erişin
- Takımı favorilere ekleyin/çıkarın
- Takımın ligine tıklayarak lig sayfasına gidin

### Son Maçlar
- En son oynanan 15 maçı görüntüleyin
- Maç sonuçları ve skorlar
- Ev sahibi ve deplasman takımları

### Favorilerim
- Tüm favori takımlarınızı tek sayfada görün
- Favorilerden tek tek veya toplu kaldırma
- Takıma tıklayarak detay sayfasına gidin

### Tema Değiştirme
- Sağ üst köşedeki butonu kullanarak tema değiştirin
- Tercihleriniz otomatik olarak kaydedilir

## 🔧 Redux Store Yapısı
```javascript
{
  League: {
    leagues: [],
    loading: false,
    error: null,
    lastFetch: timestamp
  },
  Teams: {
    teams: [],
    loading: false,
    error: null,
    lastFetch: timestamp
  },
  TeamDetail: {
    teamDetail: {},
    cache: {},
    loading: false
  },
  LeagueDetail: {
    standings: [],
    leagueInfo: {},
    loading: false
  },
  TodaysMatch: {
    todaysMatches: [],
    loading: false
  },
  Favorites: {
    favoriteTeams: []
  },
  Theme: {
    mode: "dark" | "light"
  }
}
```

## 💾 Önbellekleme Sistemi

API isteklerini optimize etmek için akıllı önbellekleme sistemi:

- **Ligler**: 10 dakika
- **Takımlar**: 15 dakika
- **Takım Detayları**: 30 dakika
- **Maçlar**: 5 dakika
- **Lig Detayları**: 10 dakika

## ⚠️ Bilinen Sınırlamalar

- **Arama Özelliği**: API rate limit kısıtlamaları nedeniyle arama özelliği eklenmemiştir
- **API Limitleri**: TheSportsDB ücretsiz tier kullanımı nedeniyle istek sayısı sınırlıdır
- **Canlı Skorlar**: Sadece geçmiş maç sonuçları gösterilmektedir

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun


## 👤 İletişim

Erdem Baran - [@Erdem-Baran](https://github.com/Erdem-Baran)

Proje Linki: [https://github.com/Erdem-Baran/react-football-dashboard](https://github.com/Erdem-Baran/react-football-dashboard)

## 🙏 Teşekkürler

- [TheSportsDB](https://www.thesportsdb.com/) - Futbol verileri için
- [Bootstrap](https://getbootstrap.com/) - UI bileşenleri için
- [React](https://reactjs.org/) - Framework için

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
