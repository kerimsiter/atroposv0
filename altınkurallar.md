

### **Atropos - Proje Anayasası**

#### **I. Mimari ve Yapı Kuralları**

1.  **Tek Sorumluluk Prensibi (SRP):** Her dosya, her fonksiyon, her bileşen ve her servis **sadece bir iş yapar** ve onu iyi yapar. Bir fonksiyon hem veri çekip hem de formatlıyorsa, o fonksiyon ikiye bölünmelidir.

2.  **Backend: Her Özellik Kendi Modülünde Yaşar (NestJS):** Siparişler `OrdersModule`'de, kullanıcılar `UsersModule`'de, ürünler `ProductsModule`'de. Birbiriyle konuşması gereken modüller, `exports` ve `imports` ile resmi yollarla konuşur. Asla "arka kapıdan" kod çalınmaz.

3.  **Backend: Controller'lar Zayıf, Servisler Güçlüdür:** Controller'lar sadece gelen isteği karşılar, gerekli veriyi (body, param) alır ve doğru servise paslar. Tüm iş mantığı, veritabanı sorguları ve hesaplamalar servis katmanında yapılır. Controller'da `if/else` veya `for` döngüsü varsa, muhtemelen yanlış yerdesiniz.

4.  **Frontend: Sayfa, Bileşen, Düzen (Pages, Components, Layouts) Ayrımı:**
    *   `frontend/src/renderer/src/pages`: Route'lara karşılık gelen, birden çok bileşeni bir araya getiren sayfalar. (Örn: `LoginPage.tsx`, `DashboardPage.tsx`).
    *   `frontend/src/renderer/src/components`: Uygulamanın her yerinde tekrar kullanılabilen atomik parçalar. (Örn: `PrimaryButton.tsx`, `DataGrid.tsx`, `Modal.tsx`).
    *   `frontend/src/renderer/src/layouts`: Sayfaların genel iskeleti. (Örn: Menü, sidebar ve ana içeriği barındıran `MainLayout.tsx`).

5.  **Frontend: Bir Bileşeni Üç Kez Tekrarlıyorsan, Soyutla (DRY - Don't Repeat Yourself):** Kodda veya JSX'te aynı yapıyı üçüncü kez kopyala-yapıştır yapıyorsan, dur. Onu hemen ayrı bir bileşene (`component`) taşı.

#### **II. Teknoloji Kullanım Kuralları**

6.  **Styling: Stil, JSX'in Yanındadır (Tailwind CSS):** Ayrı `.css` dosyalarına özel class'lar yazmak **YASAKTIR**. Stil, doğrudan `className` içinde Tailwind utility class'ları ile verilir. İstisnalar yalnızca global dosyalardır:
    *   `frontend/src/renderer/src/assets/main.css` → temel `@tailwind` direktifleri ve global importlar
    *   `frontend/src/renderer/src/assets/base.css` → reset, değişkenler, global yardımcı kurallar
    Bu iki dosya dışında bileşen-özel stil oluşturulmaz.

7.  **State: Zustand Store Sadece Global Durumlar İçindir:** Zustand'a her şey konulmaz. Sadece birden fazla, birbiriyle ilgisiz bileşenin ihtiyaç duyduğu global veriler konulur. Örnek: Giriş yapmış kullanıcı bilgisi, tema (karanlık/aydınlık), seçili olan şube bilgisi. Bir formun içindeki geçici veriler için `useState` yeterlidir.

8.  **State: Gereksiz Render'dan Kaçın, Atomik Selector'lar Kullan:** Zustand store'dan veri çekerken tüm state'i çekme. Sadece ihtiyacın olan parçayı çek.
    *   **YANLIŞ:** `const { user, token } = useAuthStore();` (State'deki her değişiklikte bu bileşen yeniden render olur).
    *   **DOĞRU:** `const user = useAuthStore(state => state.user);` ve `const token = useAuthStore(state => state.token);` (Sadece `user` veya `token` değiştiğinde render olur).

9.  **API: API İstekleri Merkezidir:** `fetch` veya `axios` çağrıları component'lerin içinde dağınık halde bulunmaz. Tüm API çağrıları, `frontend/src/renderer/src/services/api.ts` gibi merkezi bir dosyada veya `useApi.ts` gibi özel bir hook içinde toplanır. Yol alias'ı olarak `@renderer/services` tercih edilir. Bu, gelecekte token eklemeyi, hata yönetimini ve loading durumlarını tek yerden yönetmemizi sağlar.

10. **Dil Desteği (i18n): Dil Dosyaları Özellik Bazlıdır:** Tek bir devasa `tr.json` dosyası olmaz. Her sayfanın veya büyük özelliğin kendi dil dosyası olur: `login.tr.json`, `dashboard.tr.json`, `orders.tr.json`. Bu, yönetimi kolaylaştırır.

#### **III. İsimlendirme ve Formatlama Kuralları**

11. **Dosya İsimleri:**
    *   React Bileşenleri: **`PascalCase.tsx`** (Örn: `PrimaryButton.tsx`).
    *   Diğer tüm `.ts`, `.tsx` dosyaları (servisler, store'lar, sayfalar): **`kebab-case.ts`** (Örn: `auth.store.ts`, `orders.service.ts`, `main-layout.tsx`).

12. **Kod İçi İsimlendirme:**
    *   Değişkenler ve Fonksiyonlar: **`camelCase`** (Örn: `const currentUser`, `function getUserData()`).
    *   Sınıflar, Tipler ve Interface'ler: **`PascalCase`** (Örn: `class UsersService`, `type UserProfile`).

13. **Veritabanı ve Prisma:** `schema.prisma` içindeki isimlendirme projenin geri kalanıyla tutarlıdır.
    *   Modeller (Tablolar): **`PascalCase`** (Örn: `model OrderItem`).
    *   Alanlar (Kolonlar): **`camelCase`** (Örn: `orderId`).

#### **I. Frontend (Masaüstü Uygulaması - Renderer Process)**


| **Framework** | React 18 + TypeScript |
| **Build Aracı** | Vite |
| **Stil (Styling)** | Tailwind CSS v3 + PostCSS |
| **State Yönetimi** | Zustand |
| **Yönlendirme (Routing)** | React Router DOM v6 |
| **API İletişimi** | Axios |
| **Form Yönetimi** | React Hook Form + Zod |
| **Dil Desteği (i18n)** | i18next + react-i18next |
| **Grafik/Raporlama**| Recharts |

#### **II. Desktop Shell (Ana Süreç - Main Process)**

| **Çerçeve (Framework)** | Electron |
| **Build & Geliştirme** | electron-vite |
| **Güvenli Depolama** | electron-store |

#### **III. Backend (Sunucu - API)**

| **Framework** | NestJS |
| **Veritabanı İletişimi**| Prisma |
| **Kimlik Doğrulama** | Passport.js (JWT Stratejisi) + bcrypt |
| **Validasyon** | class-validator & class-transformer |
| **Anlık İletişim** | Socket.IO |
| **API Dokümantasyonu**| Swagger (OpenAPI) |

#### **IV. Veritabanı (Database)**

| **Sistem** | PostgreSQL |

#### **V. Geliştirme & Altyapı (Dev & DevOps)**

| **Paket Yöneticisi** | pnpm |
| **Kod Kalitesi** | ESLint + Prettier |
| **Versiyon Kontrolü** | Git |
| **Runtime** | Node.js |


#### **yardımcı komutlar**

Lint çalıştırma:
Backend: pnpm -C backend lint
Frontend: pnpm -C frontend lint
Formatlama:
Backend: pnpm -C backend format
Frontend: pnpm -C frontend format