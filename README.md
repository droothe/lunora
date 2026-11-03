# HAIRPORT Luxury Salon

You are a world-class UI/UX Designer and Lead Frontend Engineer specializing in high-fashion, ultra-luxury editorial websites and prestige booking platforms. Your design standards rival those of top-tier global luxury brands (Vogue, Chanel, Cartier).



Create an exceptionally high-end, luxury editorial Landing Page and Interactive Salon Management System for "HAIRPORT Coiffure by Pınar Öztunç", a premier hair and beauty salon located in Atakent, Atakum / Samsun, Türkiye.



### 1. BRAND COLOR PALETTE & DESIGN SYSTEM (Quiet Luxury)

Implement this exact refined color palette using CSS variables:

- Primary Background (Ivory Cream): #F5F1EB

- Secondary Background (Warm Beige): #EAE2D8

- Primary Text (Deep Mocha): #55443B

- Secondary Text (Warm Taupe): #8E7D70

- Accent / Highlights (Dusty Rose): #C7A5A0

- Card / Modal Background (Pearl White): #FFFFFF

- Borders & Dividers (Soft Stone): #DED5CA



Typography:

- Headings: Editorial high-fashion serif font (Cormorant Garamond or Playfair Display).

- Body & UI: Ultra-clean modern sans-serif (Plus Jakarta Sans or Inter).



Visual Attributes:

- Soft micro-shadows, subtle rounded corners (rounded-2xl), delicate border strokes (#DED5CA).

- Glassmorphism overlays with soft blur effects.

- Fluid transitions and elegant micro-interactions on hover.

- Complete absence of any generic AI badges, third-party logos, or default system markers.



---



### 2. SALON HIGHLIGHTS & KEY VALUE PROPOSITIONS

Prominently position the following core salon attributes:

- Location: "Atakent, Atakum / Samsun"

- Specializations: "Master of Balyage & Blonde Specialist", "Natural & Blonde, Cut & Extension Expert"

- Dedicated VIP Feature: "Özel Tesettür Bölümümüz Mevcuttur" (A private, comfortable VIP section with dedicated female staff).



---



### 3. PUBLIC WEBSITE STRUCTURE



#### A. Sticky Luxury Header

- Brand logo: "HAIRPORT Coiffure by Pınar Öztunç".

- Nav links: Ana Sayfa, Hizmetler, Uzmanlıklarımız, Galeri, Hakkımızda, İletişim.

- CTA Button: "Hemen Randevu Al" (Dusty Rose #C7A5A0 button with Deep Mocha text).

- Responsive mobile drawer menu.



#### B. Hero Section

- High-fashion editorial hair transformation visual composition.

- Location Pill: "ATAKENT, ATAKUM - SAMSUN"

- Headline: "Güzelliğinizi Sanata Dönüştürüyoruz."

- Subheadline: "Samsun Atakum'un seçkin salonunda kişiye özel balyaj, doğal sarı tonlar, profesyonel kesim ve ayrıcalıklı güzellik deneyimi."

- Dual CTAs: "Hemen Randevu Al" & "Hizmetlerimizi Keşfedin".



#### C. Features & Badges Strip

Floating horizontal bar styled with #EAE2D8 background:

- 👑 Master of Balyage & Ombre

- ✂️ Cut & Extension Expert

- 🧕 Özel Tesettür Bölümümüz Mevcuttur

- 📍 Atakent, Atakum Konumu



#### D. Interactive Service Menu

Category filters: [Tüm Hizmetler, Renklendirme & Balyage, Kesim & Şekillendirme, Saç Bakımı, Kaynak & Uzatma, Özel Gün & Gelin].

Each card (#FFFFFF background, #DED5CA border) includes:

- Photography, Service Title, Description, Duration (e.g. 120 dk), Starting Price.

- "Randevu Seç" action button that pre-selects the service in the booking flow.



Include sample services: Master Balyage & Ombre, Premium Blonde Transformation, Dip Boyama, Profesyonel Saç Kesimi, Mikro Kaynak, Keratin Bakım, VIP Gelin Paketi, Profesyonel Makyaj.



#### E. Dedicated Private VIP / Tesettür Section

A standalone luxury section highlighting privacy and comfort:

- Title: "Size Özel, Size Ait Bir Güzellik Deneyimi."

- Description: "Özel tesettür bölümümüzde, tamamen size ayrılmış, konforlu ve mahremiyet odaklı bir ortamda güzellik hizmetlerimizi deneyimleyin."

- CTA: Opens booking modal with "Özel Tesettür Bölümü" checkbox automatically pre-selected.



#### F. Portfolio Gallery

- Filterable editorial masonry grid [Balyaj, Sarı Tonlar, Kesim, Kaynak, Gelin].

- Lightbox modal view on image click.



#### G. About, Reviews & Contact

- Pınar Öztunç profile & salon hygiene standards.

- Client reviews slider.

- Contact card with full address ("Atatürk Blv. 97B, Atakent, Samsun"), working hours, and direct WhatsApp button.



---



### 4. FRONTEND-ONLY BOOKING ENGINE (4-Step Wizard)

Implement using React state (no real backend required):

- Step 1: Select Services (Multi-selection with dynamic live duration and price calculation).

- Step 2: Select Specialist ("Pınar Öztunç - Master Colorist", "Senior Hair Stylist", "Makeup Artist", "Fark Etmez").

- Step 3: Date & Time Picker (Interactive slot picker + Checkbox: "Özel Tesettür Bölümü Tercih Ediyorum").

- Step 4: Customer Info Form (Ad Soyad, Telefon, E-posta, Notlar) -> Live Summary -> On submit, show success confirmation card with reference code and instant state insertion.



---



### 5. INTERACTIVE ADMIN DASHBOARD (/admin)

Access via demo route `/admin` (Demo Login Credentials shown on screen: admin@hairport.demo / 123456).

Dashboard Theme matches the brand system using #F5F1EB workspace and #55443B dark mocha accents.



Includes:

- Overview Metrics: Bugünkü Randevular, Bekleyen Randevular, Toplam Müşteri, Aylık Ciro.

- Appointment Management: Interactive table & list with status actions (Onayla, İptal Et, Tamamlandı) that update state globally across the demo.

- Live Calendar View: Visual color-coded slots.

- Service & Price Manager: Edit service names, durations, and prices — immediately reflecting changes on the public website menu during the session.

- Customer CRM: Customer list, appointment history, and preferences.



---



### 6. TECHNICAL REQUIREMENT

- Built entirely as a responsive React frontend application using local state / React Context for seamless synchronization between the public website and admin dashboard.

- Flawless visual Polish and presentation-ready quality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/622c063a-be83-45bb-9fb0-a173c008a64a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
