# Ease Tours / Ease Travel - Full Project Index

Generated: 2026-05-20  
Workspace: `f:\ease-tours`  
Scope: repository structure, backend, frontend, content, data model, APIs, admin, deployment, SEO, and operational notes.

## Important Redaction Note

This index intentionally documents `.env` variable names and behavior, but does not copy secret values from `backend/.env` or `frontend/.env.local`. The local backend `.env` contains mail/database/application credentials, so values are treated as private.

## Executive Summary

Ease Tours is a bilingual Arabic/English tourism platform for Ease Travel. The project is split into:

- `backend`: Laravel 11 API and Filament admin panel.
- `frontend`: Next.js 16 App Router site using React 19, TypeScript, Tailwind CSS 4, and `next-intl`.
- `blog-content`: standalone Markdown content drafts for SEO/article production.
- `scripts`: operational helper scripts, currently an SEO audit crawler.
- Root Markdown files: strategy, review, roadmap, deployment, and high-volume blog content planning documents.

The backend owns content, tours, bookings, contact messages, newsletters, embassy appointment statuses, governorate service-area pages, email reachouts, accounting, and lead-event tracking. The frontend consumes the public API, renders localized pages, emits structured data, and tracks lead conversions.

## Top-Level Repository Layout

```text
f:\ease-tours
├── .claude/                         Local assistant/tooling context
├── .git/                            Git repository metadata
├── backend/                         Laravel 11 API/admin application
├── blog-content/                    Markdown article drafts/content inputs
├── frontend/                        Next.js 16 public website
├── scripts/                         Utility scripts
├── .github                          Zero-byte file named .github, not a directory
├── .gitignore                       Root ignore rules
├── blog-banner-saudi-visa*.svg      SVG blog banner assets
├── BLOG_*.md                        Large SEO/blog article drafts and plans
├── copilot-instructions.md          Development/copilot instructions
├── ease-travel.online-seo-report.md SEO report document
├── PRODUCTION_DEPLOY_CHECKLIST.md   Production verification checklist
├── PRODUCTION_ROADMAP.md            Production architecture roadmap
├── REVIEW.md                        Existing review document
└── SEO_STRATEGY.md                  Structured data and SEO strategy
```

## Technology Stack

Backend:

- PHP `^8.2`
- Laravel Framework `^11.31`
- Filament `3.3`
- Laravel Sanctum `^4.0`
- Laravel Tinker
- Maatwebsite Excel `^3.1`
- PHPUnit `^11`
- Laravel Pint, Sail, Pail, Collision, Mockery for dev/test
- Vite, Tailwind CSS 3, PostCSS, Axios for Laravel frontend/admin asset pipeline

Frontend:

- Next.js `16.2.1`
- React `19.2.4`
- TypeScript `^5`
- Tailwind CSS `^4`
- `next-intl` `^4.8.3`
- `framer-motion`
- `lucide-react`
- `@tailwindcss/typography`
- ESLint 9 with Next config

Operational:

- `scripts/seo-audit.mjs` crawls sitemap pages and checks status, title length, descriptions, H1 count, canonicals, and page size.
- `php artisan route:list` currently reports 79 backend routes, including Filament, Livewire, Sanctum, storage, and public API routes.

## Install And Development Commands

Backend:

```bash
cd backend
composer install
npm install
php artisan key:generate
php artisan migrate
php artisan serve
npm run dev
```

Backend combined dev script from `composer.json`:

```bash
composer run dev
```

This starts Laravel server, queue listener, pail logs, and Vite through `concurrently`.

Frontend:

```bash
cd frontend
npm install
npm run dev
npm run build
npm run lint
npm run seo:audit
```

Production checklist in `PRODUCTION_DEPLOY_CHECKLIST.md` recommends:

```bash
cd ~/ease-tours/frontend
npm run lint
npx tsc --noEmit
npm run build
npm run seo:audit -- https://ease-travel.online

cd ~/ease-tours/backend
php artisan test
php artisan migrate --force

pm2 restart frontend --update-env
pm2 status frontend
curl -I https://ease-travel.online/ar
curl -I https://ease-travel.online/sitemap.xml
```

## Environment Variables

Backend `.env` keys present locally:

```text
APP_NAME, APP_ENV, APP_KEY, APP_DEBUG, APP_TIMEZONE, APP_URL,
APP_LOCALE, APP_FALLBACK_LOCALE, APP_FAKER_LOCALE,
APP_MAINTENANCE_DRIVER, PHP_CLI_SERVER_WORKERS, BCRYPT_ROUNDS,
LOG_CHANNEL, LOG_STACK, LOG_DEPRECATIONS_CHANNEL, LOG_LEVEL,
DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD,
SESSION_DRIVER, SESSION_LIFETIME, SESSION_ENCRYPT, SESSION_PATH, SESSION_DOMAIN,
BROADCAST_CONNECTION, FILESYSTEM_DISK, QUEUE_CONNECTION, CACHE_STORE, CACHE_PREFIX,
MEMCACHED_HOST, REDIS_CLIENT, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT,
MAIL_MAILER, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_ENCRYPTION,
MAIL_FROM_ADDRESS, MAIL_FROM_NAME,
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_BUCKET,
AWS_USE_PATH_STYLE_ENDPOINT, VITE_APP_NAME
```

Backend `.env.example` additionally includes:

```text
MAIL_SUPPORT_ADDRESS, MAIL_BOOKING_ADDRESS, MAIL_SALES_ADDRESS
```

Frontend `.env.example`:

```text
NEXT_PUBLIC_API_URL=https://api.ease-travel.online/api/v1
NEXT_PUBLIC_SITE_URL=https://ease-travel.online
```

Frontend `.env.local` locally contains `NEXT_PUBLIC_API_URL`; value redacted here.

Frontend conversion IDs can be configured by these optional variables used in `frontend/src/lib/tracking.ts`:

```text
NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION
NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION
NEXT_PUBLIC_GOOGLE_ADS_NEWSLETTER_CONVERSION
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION
```

Backend IndexNow variables used through `config/services.php`:

```text
INDEXNOW_KEY
INDEXNOW_HOST
```

## Backend Application

### Backend Purpose

The Laravel app provides:

- Public JSON API under `/api/v1`.
- Filament admin panel under `/admin`.
- Data persistence and schema migrations.
- Email notifications for bookings, contact messages, and email reachout campaigns.
- Accounting/client transaction management.
- Lead-event collection from frontend interactions.
- IndexNow URL submission.
- Storage URL accessors for uploaded images/videos.

### Backend Package Files

`backend/composer.json`:

- Project type: Laravel application.
- Runtime dependencies: Laravel, Filament, Sanctum, Tinker, Maatwebsite Excel.
- Dev dependencies: Faker, Pail, Pint, Sail, Mockery, Collision, PHPUnit.
- Autoload namespace: `App\` -> `app/`.
- Dev namespace: `Tests\` -> `tests/`.
- Post autoload dump runs package discovery and `filament:upgrade`.

`backend/package.json`:

- Private module package.
- Scripts: `npm run build` -> Vite build, `npm run dev` -> Vite dev server.
- Dev dependencies include Vite 6, Tailwind 3, Laravel Vite plugin, PostCSS, Autoprefixer, Axios, Concurrently.

### Backend Routing

`backend/bootstrap/app.php` configures:

- Web routes: `routes/web.php`
- API routes: `routes/api.php`
- Console routes: `routes/console.php`
- Health route: `/up`

`routes/web.php`:

- `GET /` returns the default `welcome` Blade view.

`routes/api.php`:

- `GET /api/user` guarded by Sanctum.
- Public API v1 group under `/api/v1`.

### Public API Endpoints

All API responses generally wrap data in:

```json
{
  "status": "success",
  "data": "..."
}
```

Paginated endpoints may also include:

```json
{
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 9,
    "total": 0
  }
}
```

#### Trips

`GET /api/v1/trips`

- Controller: `TripController@index`
- Model: `Trip`
- Only returns `is_active = true`.
- Query params:
  - `type`: filters through related category type (`inbound`, `outbound`, `religious`).
  - `category_id`
  - `min_price`
  - `max_price`
  - `featured=1`
  - `fields=card`: reduced card payload and category relation.
  - `fields=sitemap`: only `id`, `slug_ar`, `slug_en`, `updated_at`, limited to max 500.
  - `per_page`: default 12, max 50.
- Default sort: newest first.

`GET /api/v1/trips/{slug}`

- Controller: `TripController@show`
- Matches either `slug_en` or `slug_ar`.
- Loads `category` and `images`.
- Requires `is_active = true`.

#### Categories

`GET /api/v1/categories`

- Controller: `CategoryController@index`
- Only active categories.
- Adds `trips_count`.
- Sorts by `sort_order`.

`GET /api/v1/categories/{slug}`

- Controller: `CategoryController@show`
- Matches `slug_en` or `slug_ar`.
- Loads active trips sorted newest first.

#### Bookings

`POST /api/v1/bookings`

- Controller: `BookingController@store`
- Middleware: `throttle:6,1`
- Validates:
  - `trip_id`: required, exists in trips.
  - `customer_name`: required string max 255.
  - `customer_email`: required email max 255.
  - `customer_phone`: required string max 255.
  - `num_passengers`: required integer min 1.
  - `notes`: optional string max 1000.
- Calculates total from discounted price when present, otherwise base price.
- Creates booking with `pending` status.
- Sends `BookingNotification` to `config('mail.addresses.sales')`, fallback `sales@ease-travel.online`.

#### Lead Events

`POST /api/v1/lead-events`

- Controller: `LeadEventController@store`
- Middleware: `throttle:30,1`
- Event types:
  - `booking_success`
  - `contact_success`
  - `newsletter_success`
  - `whatsapp_click`
- Accepts page, referrer, UTM, source, related entity IDs, metadata, locale.
- Stores IP address and truncated user agent.

#### Contact Messages

`POST /api/v1/contact`

- Controller: `ContactMessageController@store`
- Middleware: `throttle:6,1`
- Validates name, email, optional phone, and message.
- Creates contact message with `new` status.
- Sends `ContactMessageNotification` to sales mailbox.

#### Blogs

`GET /api/v1/blogs`

- Controller: `BlogController@index`
- Only returns `is_published = true`.
- Query params:
  - `category_id`
  - `category_slug`: matches category `slug_en` or `slug_ar`.
  - `tag_slug`: filters blogs by tag slug.
  - `author_slug`: filters by author slug.
  - `q`: searches title, excerpt, and keyword fields in Arabic and English.
  - `featured=1`
  - `limit`: returns a flat list instead of paginated response.
  - `fields=card`: reduced blog card fields plus category, author, tags.
  - `fields=sitemap`: only `id`, `slug_ar`, `slug_en`, `updated_at`.
  - `per_page`: default 9, max 50.
- Sorts by `published_at` descending.
- Unknown category/tag/author slug returns empty paginated result.

`GET /api/v1/blogs/{slug}`

- Controller: `BlogController@show`
- Matches either `slug_en` or `slug_ar`.
- Loads:
  - `category`
  - `author`
  - `tags`
  - `relatedTrips.category`
  - `relatedServices`
  - `relatedEmbassies`

#### Tags

`GET /api/v1/tags`

- Controller: `TagController@index`
- Loads count of published blogs.
- Hides tags with zero published blogs.
- Sorts by `name_en`.

`GET /api/v1/tags/{slug}`

- Controller: `TagController@show`
- Matches `slug_en` or `slug_ar`.

#### Authors

`GET /api/v1/authors`

- Controller: `AuthorController@index`
- Only active authors.
- Loads count of published blogs.
- Sorts by `name_en`.

`GET /api/v1/authors/{slug}`

- Controller: `AuthorController@show`
- Only active authors.
- Matches `slug_en` or `slug_ar`.

#### Subscribers

`POST /api/v1/subscribe`

- Controller: `SubscriberController@store`
- Middleware: `throttle:6,1`
- Validates:
  - `email`: required, email, max 160.
  - `locale`: optional, `ar` or `en`.
  - `source`: optional string max 80.
- Uses `firstOrCreate` on lowercased email.
- Returns 201 for new subscriber, 200 for existing subscriber.

#### Services

`GET /api/v1/services`

- Controller: `ServiceController@index`
- Only active services.
- Sorts by `sort_order`.
- Query params:
  - `featured=1`
  - `limit`: flat list, max 500.
  - `all=1`: flat list.
  - `fields=card`: reduced service card fields.
  - `fields=sitemap`: `id`, `slug_ar`, `slug_en`, `updated_at`.
  - `per_page`: default 9, max 50.

`GET /api/v1/services/{slug}`

- Controller: `ServiceController@show`
- Only active services.
- Matches `slug_en` or `slug_ar`.

#### Embassies

`GET /api/v1/embassies`

- Controller: `EmbassyController@index`
- Only active embassies.
- Sorts by `sort_order`.
- Query params:
  - `status`: filters `appointment_status`.

`GET /api/v1/embassies/{slug}`

- Controller: `EmbassyController@show`
- Only active embassies.
- Matches single `slug` field.

#### Governorates

`GET /api/v1/governorates`

- Controller: `GovernorateController@index`
- Only published governorates.
- Sorts by `sort_order`.
- Query params:
  - `featured=1`
  - `region`
  - `limit`: flat list, max 100.
  - `per_page`: default 27, max 50.

`GET /api/v1/governorates/{slug}`

- Controller: `GovernorateController@show`
- Only published governorates.
- Matches `slug_en` or `slug_ar`.

### Backend Models And Relationships

`Author`

- Fillable: bilingual names/slugs, expertise, bios, photo, email, social links, active flag.
- Casts: `is_active` boolean.
- Appends: `photo_url`.
- Relationships: `blogs()` has many `Blog`.

`Blog`

- Fillable: category, author, bilingual title/slug/excerpt/body, SEO fields, keywords, image, direction, published/featured flags, published date.
- Casts: `is_published`, `is_featured`, `published_at`.
- Appends: `featured_image_url`.
- Relationships:
  - belongs to `Category`
  - belongs to `Author`
  - belongs to many `Tag`
  - belongs to many `Trip` through `blog_trip`
  - belongs to many `Service` through `blog_service`
  - belongs to many `Embassy` through `blog_embassy`

`Booking`

- Fillable: trip, customer details, passenger count, notes, status, total price, currency.
- Casts: `total_price` decimal.
- Relationships: belongs to `Trip`.

`Category`

- Fillable: bilingual name/slug/description, type, image, active flag, sort order.
- Casts: `is_active`.
- Relationships: has many `Trip`, has many `Blog`.

`Client`

- Fillable: name, phone, email, passport number, nationality, notes.
- Relationships: has many `ClientTransaction`.
- Computed attributes:
  - `total_revenue`
  - `total_profit`
  - `total_collected`
  - `outstanding_balance`

`ClientTransaction`

- Fillable: client, transaction date, client name, service, status, follow-up date, completion date, net price, sell price, profit, current money, notes.
- Casts: dates and decimal money fields.
- Relationships: belongs to `Client`.
- Boot behavior:
  - Recalculates `profit = sell_price - net_price` on save.
  - Sets `completed_at` when status becomes `done`.
  - Clears `completed_at` when status is not `done`.

`ContactMessage`

- Fillable: name, email, phone, message, status.

`EmailReachout`

- Constants:
  - locales: `en`, `ar`
  - operations email: `operations@ease-travel.online`
  - website/contact/logo URLs.
- Fillable: user, locale, recipient sources, manual recipients, recipient emails, counts, failed recipients, status, subject, body, reply-to, attachments, sent date.
- Casts: JSON arrays and `sent_at`.
- Relationships: belongs to `User`.
- Helpers normalize locale and produce localized contact URLs.

`Embassy`

- Fillable: bilingual country names, slug, flag, appointment status, next open/close dates, price/currency, notes, stopped visas, active flag, sort order.
- Casts: active boolean, dates, appointment price decimal.
- Relationships: belongs to many `Blog` through `blog_embassy`.

`Governorate`

- Fillable: bilingual names/slugs/capitals, coordinates, map zoom, SEO fields, excerpts, body HTML, FAQ JSON, images, population, area, region, published/featured flags, sort order.
- Casts: FAQ array, booleans, latitude/longitude decimals.
- Appends: `featured_image_url`, `cover_image_url`.

`LeadEvent`

- Fillable: event type, locale, page/referrer/landing fields, CTA/source fields, related entity IDs, UTM fields, metadata, IP, user agent.
- Casts: metadata array.

`Service`

- Fillable: bilingual title/slug/excerpt/body, icon, featured image, active/featured flags, sort order.
- Casts: active and featured booleans.
- Appends: `featured_image_url`.
- Relationships: belongs to many `Blog` through `blog_service`.

`Subscriber`

- Fillable: email, locale, source, active flag, verified date.
- Casts: active boolean, verified date.

`Tag`

- Fillable: bilingual name/slug/description.
- Relationships: belongs to many `Blog`.

`Trip`

- Fillable: category, bilingual title/slug/description/itinerary/inclusions/destination, duration, prices, currency, image, video, video thumbnail, featured/active/coming soon flags, dates, max participants.
- Casts: prices, booleans, dates.
- Appends: `featured_image_url`, `video_url`, `video_thumbnail_url`.
- Relationships:
  - belongs to `Category`
  - has many `TripImage`
  - has many `Booking`
  - belongs to many `Blog` through `blog_trip`

`TripImage`

- Fillable: trip, path, bilingual alt text, sort order.
- Relationships: belongs to `Trip`.

`User`

- Authenticatable and Filament user.
- Fillable: name, email, password.
- Hidden: password and remember token.
- Casts: email verification date, hashed password.
- Filament panel access currently returns `true` for every authenticated user.

### Database Schema

Core Laravel tables:

- `users`: name, email, email verification, password, remember token, timestamps.
- `password_reset_tokens`: email, token, created date.
- `sessions`: id, user, IP, user agent, payload, last activity.
- `cache` and `cache_locks`.
- `jobs`, `job_batches`, `failed_jobs`.
- `personal_access_tokens` from Sanctum.

Tourism/content tables:

- `categories`: bilingual names/slugs/descriptions, `type` enum (`inbound`, `outbound`, `religious`), image, active flag, sort order.
- `trips`: category, bilingual title/slug/description/itinerary/inclusions/destination, duration, base and discounted price, currency, featured image, video, video thumbnail, featured/active/coming-soon flags, dates, max participants.
- `trip_images`: trip, path, bilingual alt text, sort order.
- `bookings`: trip, customer name/email/phone, passenger count, notes, status enum (`pending`, `confirmed`, `cancelled`), total price, currency.
- `blogs`: category, author, bilingual title/slug/excerpt/body, SEO title/description/keywords, image, direction, published/featured flags, published date.
- `authors`: bilingual names/slugs, expertise, bios, photo, email, social links, active flag.
- `tags`: bilingual names/slugs/descriptions.
- `blog_tag`: blog/tag pivot.
- `blog_trip`: blog/trip pivot.
- `blog_service`: blog/service pivot.
- `blog_embassy`: blog/embassy pivot.
- `services`: bilingual title/slug/excerpt/body, icon, featured image, active/featured flags, sort order.
- `embassies`: bilingual country names, slug, flag, appointment status enum (`open`, `closed`, `stopped`), next open/close dates, appointment price/currency, notes, stopped visas, active flag, sort order.
- `governorates`: bilingual names/slugs/capitals, coordinates, map zoom, SEO fields, excerpts, body HTML, FAQ JSON, featured/cover images, population, area, region, published/featured flags, sort order.
- `subscribers`: unique email, locale, source, active flag, verified date.
- `lead_events`: event/source/page/UTM/related-ID metadata plus IP and user agent.

Accounting and operations tables:

- `clients`: name, phone, email, passport number, nationality, notes.
- `client_transactions`: client, date, client name, service, status enum (`done`, `waiting`, `lost`), follow-up date, completed date, net price, sell price, profit, current money, notes.
- `email_reachouts`: user, locale, recipient sources, manual recipients, recipient emails, recipient counts, failed recipients, status, subject, body, reply-to, attachments, sent date.

Migration notes:

- `2026_04_21_044556_add_completed_at_to_client_transactions.php` is an empty migration after `completed_at` was added by `2026_04_21_000001_add_completed_at_to_client_transactions.php`.
- `2026_04_21_000001_add_completed_at_to_client_transactions.php` backfills done transactions from `transaction_date`.

### Seeders

Seeders present:

- `CategorySeeder`: creates categories.
- `TripSeeder`: creates base trip data.
- `UaeVisaTourSeeder`: uses `Trip::updateOrCreate` for UAE visa tour entries.
- `BlogSeeder`: creates blog content.
- `EmbassySeeder`: creates embassy appointment/status data.
- `GovernorateSeeder`: creates governorate service-area content.
- `DatabaseSeeder`: orchestrates seeders.

### Filament Admin Panel

Panel provider:

- Path: `/admin`
- Login enabled.
- Primary color: amber.
- Discovers resources under `app/Filament/Resources`.
- Discovers pages under `app/Filament/Pages`.
- Discovers widgets under `app/Filament/Widgets`.
- Built-in dashboard plus account/info widgets.
- Auth middleware uses Filament authentication.

Resources:

- `AuthorResource`: Content group. Manages author identity, slugs, expertise, bios, photo, email, socials, active flag.
- `BlogResource`: Content group. Manages category, author, tags, related trips/services/embassies, bilingual titles/slugs/excerpts/body, SEO fields, featured image, published/featured state.
- `BookingResource`: Operations group. Manages trip booking records and statuses.
- `CategoryResource`: Tourism group. Manages category type, bilingual names/slugs/descriptions, image, active state, sort order.
- `ClientResource`: Accounting group. Manages client records and profile view.
- `ClientTransactionResource`: Accounting group. Manages transactions, import sheet action, status/date filters, report link, profile link for client-linked rows.
- `ContactMessageResource`: Manages contact form messages.
- `EmailReachoutResource`: Operations group. Creates and views email campaigns. Recipient sources include manual list, subscribers, clients, and contact-message emails. Attachments stored privately on local disk.
- `EmbassyResource`: Content group. Manages embassy appointment status, dates, prices, notes, stopped visas, active state.
- `GovernorateResource`: Content group. Manages Egypt governorate SEO pages, coordinates, regions, body HTML, FAQ JSON, images, publishing.
- `ServiceResource`: Content group. Manages services and service detail content.
- `SubscriberResource`: Content group. Manages newsletter subscribers.
- `TagResource`: Content group. Manages blog tags.
- `TripResource`: Tourism group. Manages tours/trips, media, price/date fields, active/featured/coming-soon flags.

Custom Filament pages/widgets:

- `AccountingReport`: dashboard-style report under `admin/accounting-report`.
- `AccountingStatsWidget`: KPI stats for total transactions, done/waiting/lost counts, revenue, profit, collected money, pending revenue.

Accounting report computes:

- Total, done, waiting, lost transaction counts.
- Done revenue and profit.
- Total collected.
- Pending and lost revenue.
- Profit margin and collection rate.
- Revenue/profit/cost by service.
- Month aggregation using `completed_at` fallback to `transaction_date`.
- Top clients by profit.
- Outstanding done transactions where collected amount is less than sell price.

### Imports

`ClientTransactionImport`:

- Loads XLS/XLSX/CSV through PhpSpreadsheet.
- Finds a header row containing date plus client/clint.
- Maps loose column names such as `clint`, `follow up`, `current mony`.
- Parses Excel and string dates.
- Parses numeric amounts.
- Detects red row background as `lost`.
- Creates or finds `Client` by name.
- Creates `ClientTransaction` rows.

### Mail

`BookingNotification`:

- From booking mailbox config fallback `booking@ease-travel.online`.
- Subject contains booking/customer/trip context.
- Markdown view: `emails.booking`.

`ContactMessageNotification`:

- From support mailbox config fallback `support@ease-travel.online`.
- Markdown view: `emails.contact-message`.

`EmailReachoutMail`:

- From and reply-to: `operations@ease-travel.online`.
- Uses HTML view `emails.reachout` and text view `emails.reachout-text`.
- Localizes copy for Arabic or English.
- Attaches private local files from reachout attachment paths.

### IndexNow

`IndexNowService`:

- Submits one or many URLs to `https://api.indexnow.org/indexnow`.
- Uses configured host/key.
- Logs success, warning, or error.
- Helpers submit blog URLs, trip URLs, embassy listing pages, and all published content.

`IndexNowSubmitAll` command:

```bash
php artisan indexnow:submit-all
```

- Builds URLs for published blogs in both languages.
- Builds URLs for active trips in both languages.
- Adds static pages.
- Note: service static page list currently contains 14 URLs, while command success text says "Static pages: 12 URLs".

### Backend Tests

Current tests are skeleton Laravel examples:

- `backend/tests/Feature/ExampleTest.php`
- `backend/tests/Unit/ExampleTest.php`
- `backend/tests/TestCase.php`

There are no focused tests for API validation, public query filtering, Filament behavior, mail dispatch, lead tracking, or accounting import/report logic.

### Backend Storage And Public Assets

Storage:

- `storage/app/public` has `.gitignore`; upload paths are returned through public disk URLs.
- `storage/app/private` and `storage/framework/*` include `.gitignore` placeholders.
- `database/database.sqlite` exists and is empty locally.

Public:

- `backend/public/index.php`
- `backend/public/favicon.ico`
- `backend/public/robots.txt`
- `backend/public/6e32cb6065354c40beee3c20507e165d.txt` likely IndexNow verification key file.
- Published Filament assets under:
  - `backend/public/css/filament/...`
  - `backend/public/js/filament/...`

## Frontend Application

### Frontend Purpose

The frontend is the public website for Ease Travel. It renders localized Arabic/English pages using Next.js App Router and consumes the Laravel API. The default locale is Arabic.

### Frontend Config

`next.config.ts`:

- Wraps config with `next-intl` plugin using `./src/i18n/request.ts`.
- Enables AVIF and WebP image formats.
- Allows remote images from:
  - `images.unsplash.com`
  - `http://127.0.0.1:8000`
  - `https://api.ease-travel.online`

`src/proxy.ts`:

- Runs `next-intl` middleware.
- Redirects `www.` hosts to non-www.
- Corrects `http://` location headers to `https://` when forwarded protocol is HTTPS.
- Matcher excludes API, `_next`, `_vercel`, and static-file paths.

`src/i18n/routing.ts`:

- Locales: `ar`, `en`.
- Default locale: `ar`.
- `alternateLinks` disabled to avoid bad HTTP hreflang behind Cloudflare Flexible SSL; pages provide hreflang metadata instead.

`src/i18n/request.ts`:

- Selects requested locale if valid; otherwise falls back to default.
- Loads messages from `src/messages/{locale}.json`.

`src/i18n/navigation.ts`:

- Creates localized navigation helpers for `Link`, redirect, pathname, router.

### Frontend Locale Messages

Both `en.json` and `ar.json` contain these top-level namespaces:

```text
metadata, nav, hero, categories, tourCard, tourDetail, booking,
whyUs, reviews, footer, about, contact, tours, services, embassy, blog
```

### Frontend App Routes

Global app files:

- `src/app/layout.tsx`: root layout imports global CSS and returns children.
- `src/app/globals.css`: Tailwind import, typography plugin, CSS variables, Cairo font token, smooth scroll.
- `src/app/robots.ts`: allows all except `/api/` and `/_next/`, points to sitemap.
- `src/app/sitemap.ts`: builds sitemap from static pages plus API-provided trips, blogs, services, categories, tags, authors.

Localized layout:

- `src/app/[locale]/layout.tsx`
  - Validates locale.
  - Sets `<html lang>` and text direction.
  - Loads Cairo font.
  - Provides `NextIntlClientProvider`.
  - Renders global `Navbar`, `Footer`, floating `WhatsAppButton`.
  - Emits organization and website JSON-LD.
  - Loads Ahrefs analytics script.
  - Loads Google Ads script `AW-18050243563` with denied default consent.

Localized pages:

- `/[locale]`: homepage. Fetches featured trips, featured blogs, featured services. Renders hero, cards, service/blog sections, why choose us.
- `/[locale]/tours`: all tours page. Fetches trips and categories. Renders hero, intro, Dahab video gallery, filterable tours, destinations, FAQ, structured data.
- `/[locale]/tours/[slug]`: trip detail. Fetches trip by slug, redirects to locale-correct slug, renders detail, related blogs, TouristTrip schema.
- `/[locale]/blog`: blog listing. Fetches first page, categories, featured blogs, tags. Renders featured strip, popular tags, filter/pagination UI, collection schemas.
- `/[locale]/blog/page/[n]`: paginated blog listing. Redirects page 1 back to `/blog`.
- `/[locale]/blog/[slug]`: blog detail. Fetches blog, redirects to locale-correct slug, renders article, FAQ extraction, related content, schemas.
- `/[locale]/blog/category/[slug]`: category archive. Fetches category and paginated blogs by category slug.
- `/[locale]/blog/tag/[slug]`: tag archive. Fetches tag and paginated blogs by tag slug.
- `/[locale]/blog/author/[slug]`: author profile archive. Fetches author and paginated blogs by author slug.
- `/[locale]/services`: service listing. Fetches paginated services and renders `ServiceGrid`.
- `/[locale]/services/[slug]`: service detail. Fetches service, redirects to locale-correct slug, renders service content and Service schema.
- `/[locale]/areas`: governorate service areas. Fetches governorates, groups by region, renders all 27 governorates plus WhatsApp CTA.
- `/[locale]/areas/[slug]`: governorate detail. Fetches governorate, redirects to locale-correct slug, emits LocalBusiness and FAQ schemas.
- `/[locale]/embassy`: embassy appointment status page. Fetches embassies, emits GovernmentService schemas per embassy, renders filterable status UI and SEO FAQ.
- `/[locale]/contact`: contact page. Renders contact details, WhatsApp tracking, contact form.
- `/[locale]/about`: about page. Renders mission, vision, values.
- `/[locale]/hajj-umrah`: religious tourism landing page. Fetches religious category trips and related blog articles, emits FAQ schema.
- `/[locale]/booking/flights`: flight booking landing page. Renders Travelpayouts/Jetradar widget, SEO content, popular routes, airlines, FAQ, WhatsApp CTA.

### Frontend Data Layer

`src/lib/api.ts`:

- `API_URL`: `NEXT_PUBLIC_API_URL` or `https://api.ease-travel.online/api/v1`.
- `BACKEND_URL`: strips `/api/v1` from API URL.
- `getImageUrl(path)`: returns absolute URL for uploaded storage files.

Main TypeScript API types:

- `ApiTrip`
- `ApiTripSitemapEntry`
- `ApiCategory`
- `ApiAuthor`
- `ApiTag`
- `ApiBlog`
- `ApiBlogSitemapEntry`
- `ApiService`
- `ApiServiceSitemapEntry`
- `ApiEmbassy`
- `PaginatedMeta`
- `ApiGovernorate`

Main fetch helpers:

- `getTrips`, `getTripsForSitemap`, `getTrip`
- `createBooking`
- `sendContactMessage`
- `getCategories`, `getCategoryBySlug`
- `getBlogs`, `getBlogsForSitemap`, `getBlog`, `searchBlogs`, `getBlogsPaginated`
- `getTags`, `getTag`
- `getAuthors`, `getAuthor`
- `subscribeNewsletter`
- `getServices`, `getServicesForSitemap`, `getService`, `getServicesPaginated`
- `getEmbassies`, `getEmbassy`
- `getGovernorates`, `getGovernorate`

Caching behavior:

- Most read requests use `next: { revalidate: 60 }`.
- Search and paginated blog/services requests use `cache: "no-store"`.
- Most list calls default to `fields=card`.

### Frontend SEO Helpers

`src/lib/seo.ts`:

- Cleans HTML/text and decodes common HTML entities.
- Removes script/style tags and HTML markup.
- Truncates descriptions to 155 chars by default.
- Builds SEO titles up to 60 chars.
- Removes site suffixes like `Ease Travel` and `Ease Travel Tourism`.

`src/lib/schemas.tsx`:

Provides JSON-LD builders:

- TravelAgency / Organization.
- WebSite with SearchAction.
- BreadcrumbList.
- TouristTrip for trip detail.
- BlogPosting for blog detail.
- Blog ItemList.
- CollectionPage.
- ProfilePage for authors.
- Service.
- LocalBusiness for governorates/service areas.
- FAQPage.
- Tour ItemList.
- `JsonLd` React component safely escapes `</script>`.

### Frontend Tracking

`src/lib/tracking.ts`:

- Lead event types mirror backend validation:
  - `booking_success`
  - `contact_success`
  - `newsletter_success`
  - `whatsapp_click`
- Captures locale, full URL, path/search, referrer, landing page, UTM fields, CTA location, source details, related IDs, metadata.
- Fires Google Ads conversion event if matching `NEXT_PUBLIC_GOOGLE_ADS_*` ID exists.
- Sends backend event to `/lead-events` using `navigator.sendBeacon` when possible, then `fetch` with `keepalive` fallback.

Frontend triggers:

- `BookingForm` after successful booking.
- `ContactContent` after successful contact form submission and WhatsApp clicks.
- `NewsletterCTA` after successful subscription.
- `WhatsAppButton` and `WhatsAppTrackedLink` on WhatsApp clicks.

### Frontend Components

Core layout/navigation:

- `Navbar`: localized navigation.
- `Footer`: localized footer.
- `Hero`: homepage hero.
- `Breadcrumbs`: localized breadcrumb UI.
- `WhatsAppButton`: floating tracked WhatsApp CTA.
- `WhatsAppTrackedLink`: reusable tracked WhatsApp anchor.
- `HtmlAttrs`: client helper for html attrs, currently available but not central.

Cards and grids:

- `TourCard`: localized trip card.
- `ServiceCard`: localized service card.
- `BlogCard`: localized blog card.
- `ServiceGrid`: services listing and pagination/filter surface.
- `RelatedBlogs`: related blog card section.
- `RelatedContent`: blog detail related trips/services/embassies.

Tour flow:

- `ToursFilter`: client-side tour category/filter UI.
- `TourDetailContent`: trip hero, accordion sections, video, price sidebar, booking modal.
- `BookingForm`: booking modal with validation state, total price calculation, API submission, conversion tracking.
- `VideoSlider`: YouTube Shorts/Dahab video carousel.

Blog flow:

- `BlogFilter`: client-side blog listing filter/search/pagination UI.
- `BlogFeaturedStrip`: featured blog strip.
- `BlogDetailContent`: blog article hero, metadata, body rendering, table of contents, social share, author, related content, newsletter.
- `blog/TableOfContents`: extracts headings from article HTML.
- `blog/SocialShare`: social share UI.
- `blog/AuthorByline`: author detail snippet.
- `blog/NewsletterCTA`: newsletter signup and tracking.
- `blog/extractFaqs`: extracts FAQ data from HTML for schema.
- `blog/BrandIcons`: Facebook, X, LinkedIn icons.

Contact/conversion:

- `ContactContent`: contact hero, contact channels, tracked WhatsApp, contact form.

Embassy:

- `EmbassyList`: filterable embassy list, status cards, detail panel, status table, tracked appointment CTA.

Areas/governorates:

- `GovernorateDetailContent`: governorate page content, facts, body, FAQs.

Flights:

- `FlightsContent`: flight landing page, Travelpayouts widget script, popular routes, airlines, FAQ accordion, WhatsApp CTA.

Other:

- `WhyChooseUs`: homepage trust/value section.
- `GoogleReviewsSection`: review widget section exists but homepage import is commented.

### Frontend Public Assets

`frontend/public` contains:

- Logos: `logo.png`, `logo.jpg`, `logo-white.png`, `fav-ico.png`.
- Hero/travel images: `hero-travel.jpg`, `hero-egypt.jpg`, `hero-beach.jpg`.
- Unsplash/local images: `felix-rostig-UmV2wr-Vbq8-unsplash.jpg`, `rui-silvestre-NYbbON5Afs0-unsplash.jpg`, `pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg`.
- Default Next assets: `globe.svg`, `file.svg`, `next.svg`, `vercel.svg`, `window.svg`.
- `copilot-instructions.md`.

### Frontend Styling

Global CSS:

- Tailwind CSS imported.
- Typography plugin enabled.
- CSS custom properties:
  - `--background`
  - `--foreground`
  - `--primary`
  - `--primary-dark`
  - `--accent`
  - `--accent-dark`
- Body uses Cairo font variable.
- Smooth scrolling enabled on `html`.

Visual design traits:

- Brand colors centered on blue primary `#1a73a7` and amber accent `#f59e0b`.
- Many hero sections use real remote Unsplash images.
- Blog and tour detail heroes use uploaded API images where available.
- Several UI cards use rounded-2xl styling.

## Content Inventory

### Root Content And Strategy Files

- `BLOG_CONTENT_HIGH_VOLUME.md`: large high-volume blog content plan/draft.
- `BLOG_SAUDI_VISA_RESTRICTIONS.md`: Saudi visa restrictions article draft.
- `BLOG_SCHENGEN_COUNTRIES.md`: Schengen countries article draft.
- `BLOG_SCHENGEN_VISA.md`: Schengen visa article draft.
- `BLOG_SHAM_EL_NASEEM.md`: Sham El Naseem article draft.
- `BLOG_UMRAH_COSTS_ENHANCED.md`: Umrah costs article draft.
- `blog-banner-saudi-visa.svg` and `blog-banner-saudi-visa-en.svg`: Saudi visa banner assets.
- `ease-travel.online-seo-report.md`: SEO report.
- `SEO_STRATEGY.md`: structured data and multilingual SEO strategy.
- `PRODUCTION_ROADMAP.md`: deployment architecture roadmap.
- `PRODUCTION_DEPLOY_CHECKLIST.md`: deployment validation checklist.
- `REVIEW.md`: existing project review.
- `copilot-instructions.md`: development instructions.

### `blog-content` Markdown Files

- `fifa-world-cup-2026-egypt-tickets-and-usa-visa.md`
- `fifa-world-cup-2026-egypt-tickets-and-usa-visa-en.md`
- `flower-exhibition-agricultural-museum-spring-2026.md`
- `heliopolis-ancient-egypt-city-of-the-sun.md`
- `marassi-marina-guide.md`
- `marassi-north-coast-egypt-ultimate-guide.md`
- `marassi-north-coast-hotels.md`
- `marassi-north-coast-summer-guide.md`
- `netherlands-schengen-tourist-visa-from-egypt-2026.md`
- `netherlands-schengen-tourist-visa-from-egypt-2026-en.md`
- `uae-visa-from-egypt-in-7-days-ease-travel-ar.md`
- `uae-visa-from-egypt-in-7-days-ease-travel-en.md`

These appear to be editorial source files separate from seeded or database-backed blog content.

## SEO And Structured Data

Implemented SEO features:

- Locale-aware metadata on most pages.
- Canonical URLs.
- `alternates.languages` for Arabic/English and `x-default` on major pages.
- Dynamic sitemap from backend API content.
- Robots route.
- JSON-LD for:
  - TravelAgency
  - WebSite
  - BreadcrumbList
  - TouristTrip
  - BlogPosting
  - ItemList
  - CollectionPage
  - ProfilePage
  - Service
  - LocalBusiness
  - FAQPage
  - GovernmentService on embassy page
  - VideoObject on tours page

SEO script:

- `scripts/seo-audit.mjs` fetches `/sitemap.xml`, audits pages, and prints summary plus top issues.
- Checks title/description length, H1 count, canonical presence, HTTP status, and oversized pages.

## Deployment And Infrastructure Notes

From `PRODUCTION_ROADMAP.md`:

- Frontend intended for Vercel.
- Backend intended for VPS Ubuntu 24.04 with Nginx and PHP 8.2.
- Database intended as managed MySQL or self-hosted with backups.
- Suggested storage migration from local public disk to Cloudflare R2 or AWS S3.
- Recommended hardening:
  - CORS restricted to production frontend URL.
  - `APP_DEBUG=false`.
  - `APP_ENV=production`.
  - Error monitoring such as Sentry.
  - Loading skeletons for feed pages.

Current CORS config:

- `backend/config/cors.php` uses `CORS_ALLOWED_ORIGINS`, default `*`.

Mail config:

- `backend/config/mail.php` adds address aliases for support, booking, and sales.

Queue config:

- Default queue connection comes from env, default `database`.

Session/cache defaults:

- Session driver default `database`.
- Cache store default `database`.

## Security And Privacy Notes

- `.env` values are private and are not copied here.
- `User::canAccessPanel()` returns `true`, meaning any authenticated user can access Filament. If the app will have multiple users, panel authorization should be narrowed.
- Public POST routes have throttling:
  - Bookings: `6/minute`
  - Contact: `6/minute`
  - Subscribe: `6/minute`
  - Lead events: `30/minute`
- Lead events store IP address and user agent, so retention/privacy policy should be considered.
- Email reachouts can send to subscribers, clients, and contact-message emails; consent and unsubscribe handling should be reviewed before large sends.
- Contact/booking forms send email synchronously with `Mail::send`, so slow SMTP could affect API response time.

## Generated Or Build Artifacts

Ignored or generated directories/files present locally:

- `.git/`
- `frontend/node_modules/`
- `frontend/.next/`
- `frontend/tsconfig.tsbuildinfo`
- `backend/vendor/` may be present even though excluded from the source inventory.
- `backend/storage/framework/*`
- Published Filament frontend assets in backend public css/js folders.

## Source File Inventory

This inventory focuses on project-owned source and content files. Dependency/build folders are excluded.

### Backend Root And Config

```text
backend/.env.example
backend/artisan
backend/bootstrap/app.php
backend/bootstrap/providers.php
backend/composer.json
backend/composer.lock
backend/config/app.php
backend/config/auth.php
backend/config/cache.php
backend/config/cors.php
backend/config/database.php
backend/config/filesystems.php
backend/config/livewire.php
backend/config/logging.php
backend/config/mail.php
backend/config/queue.php
backend/config/sanctum.php
backend/config/services.php
backend/config/session.php
backend/package.json
backend/phpunit.xml
backend/postcss.config.js
backend/README.md
backend/tailwind.config.js
backend/vite.config.js
```

### Backend App Source

```text
backend/app/Console/Commands/IndexNowSubmitAll.php
backend/app/Filament/Pages/AccountingReport.php
backend/app/Filament/Resources/AuthorResource.php
backend/app/Filament/Resources/BlogResource.php
backend/app/Filament/Resources/BookingResource.php
backend/app/Filament/Resources/CategoryResource.php
backend/app/Filament/Resources/ClientResource.php
backend/app/Filament/Resources/ClientTransactionResource.php
backend/app/Filament/Resources/ContactMessageResource.php
backend/app/Filament/Resources/EmailReachoutResource.php
backend/app/Filament/Resources/EmbassyResource.php
backend/app/Filament/Resources/GovernorateResource.php
backend/app/Filament/Resources/ServiceResource.php
backend/app/Filament/Resources/SubscriberResource.php
backend/app/Filament/Resources/TagResource.php
backend/app/Filament/Resources/TripResource.php
backend/app/Filament/Widgets/AccountingStatsWidget.php
backend/app/Http/Controllers/Controller.php
backend/app/Http/Controllers/Api/V1/AuthorController.php
backend/app/Http/Controllers/Api/V1/BlogController.php
backend/app/Http/Controllers/Api/V1/BookingController.php
backend/app/Http/Controllers/Api/V1/CategoryController.php
backend/app/Http/Controllers/Api/V1/ContactMessageController.php
backend/app/Http/Controllers/Api/V1/EmbassyController.php
backend/app/Http/Controllers/Api/V1/GovernorateController.php
backend/app/Http/Controllers/Api/V1/LeadEventController.php
backend/app/Http/Controllers/Api/V1/ServiceController.php
backend/app/Http/Controllers/Api/V1/SubscriberController.php
backend/app/Http/Controllers/Api/V1/TagController.php
backend/app/Http/Controllers/Api/V1/TripController.php
backend/app/Imports/ClientTransactionImport.php
backend/app/Mail/BookingNotification.php
backend/app/Mail/ContactMessageNotification.php
backend/app/Mail/EmailReachoutMail.php
backend/app/Models/Author.php
backend/app/Models/Blog.php
backend/app/Models/Booking.php
backend/app/Models/Category.php
backend/app/Models/Client.php
backend/app/Models/ClientTransaction.php
backend/app/Models/ContactMessage.php
backend/app/Models/EmailReachout.php
backend/app/Models/Embassy.php
backend/app/Models/Governorate.php
backend/app/Models/LeadEvent.php
backend/app/Models/Service.php
backend/app/Models/Subscriber.php
backend/app/Models/Tag.php
backend/app/Models/Trip.php
backend/app/Models/TripImage.php
backend/app/Models/User.php
backend/app/Providers/AppServiceProvider.php
backend/app/Providers/Filament/AdminPanelProvider.php
backend/app/Services/IndexNowService.php
```

Filament page classes exist under each resource's `Pages` subdirectory for list/create/edit/view routes.

### Backend Database

```text
backend/database/database.sqlite
backend/database/factories/UserFactory.php
backend/database/seeders/BlogSeeder.php
backend/database/seeders/CategorySeeder.php
backend/database/seeders/DatabaseSeeder.php
backend/database/seeders/EmbassySeeder.php
backend/database/seeders/GovernorateSeeder.php
backend/database/seeders/TripSeeder.php
backend/database/seeders/UaeVisaTourSeeder.php
```

Migrations:

```text
0001_01_01_000000_create_users_table.php
0001_01_01_000001_create_cache_table.php
0001_01_01_000002_create_jobs_table.php
2026_03_28_143928_create_categories_table.php
2026_03_28_143929_create_trips_table.php
2026_03_28_143930_create_trip_images_table.php
2026_03_28_143931_create_bookings_table.php
2026_03_28_144348_create_personal_access_tokens_table.php
2026_03_29_103852_create_blogs_table.php
2026_03_29_122617_create_contact_messages_table.php
2026_03_31_162751_add_coming_soon_to_trips_table.php
2026_04_01_100438_add_is_featured_to_blogs_table.php
2026_04_02_023109_create_services_table.php
2026_04_02_043530_add_is_featured_to_services_table.php
2026_04_03_010000_create_embassies_table.php
2026_04_06_000001_add_video_to_trips_table.php
2026_04_09_000001_create_governorates_table.php
2026_04_16_000001_add_seo_fields_to_blogs_table.php
2026_04_18_000001_create_client_transactions_table.php
2026_04_18_000002_create_clients_table.php
2026_04_18_000003_add_client_id_to_client_transactions.php
2026_04_21_000001_add_completed_at_to_client_transactions.php
2026_04_21_044556_add_completed_at_to_client_transactions.php
2026_04_26_000001_create_authors_table.php
2026_04_26_000002_create_tags_table.php
2026_04_26_000003_create_blog_tag_table.php
2026_04_26_000004_add_author_id_to_blogs_table.php
2026_04_26_000005_create_blog_trip_table.php
2026_04_26_000006_create_blog_service_table.php
2026_04_26_000007_create_blog_embassy_table.php
2026_04_26_000008_create_subscribers_table.php
2026_04_28_000001_create_lead_events_table.php
2026_05_06_000001_create_email_reachouts_table.php
2026_05_06_000002_add_locale_to_email_reachouts_table.php
```

### Backend Routes, Resources, Views, Tests

```text
backend/routes/api.php
backend/routes/console.php
backend/routes/web.php
backend/resources/css/app.css
backend/resources/js/app.js
backend/resources/js/bootstrap.js
backend/resources/views/welcome.blade.php
backend/resources/views/emails/booking.blade.php
backend/resources/views/emails/contact-message.blade.php
backend/resources/views/emails/reachout.blade.php
backend/resources/views/emails/reachout-text.blade.php
backend/resources/views/filament/pages/accounting-report.blade.php
backend/resources/views/filament/pages/client-profile.blade.php
backend/tests/Feature/ExampleTest.php
backend/tests/Unit/ExampleTest.php
backend/tests/TestCase.php
```

### Frontend Root And Config

```text
frontend/.env.example
frontend/.gitignore
frontend/AGENTS.md
frontend/CLAUDE.md
frontend/eslint.config.mjs
frontend/next-env.d.ts
frontend/next.config.ts
frontend/package-lock.json
frontend/package.json
frontend/postcss.config.mjs
frontend/README.md
frontend/tsconfig.json
```

### Frontend App, Components, Libs, I18n

```text
frontend/src/app/globals.css
frontend/src/app/layout.tsx
frontend/src/app/robots.ts
frontend/src/app/sitemap.ts
frontend/src/app/[locale]/layout.tsx
frontend/src/app/[locale]/page.tsx
frontend/src/app/[locale]/about/page.tsx
frontend/src/app/[locale]/areas/page.tsx
frontend/src/app/[locale]/areas/[slug]/page.tsx
frontend/src/app/[locale]/blog/page.tsx
frontend/src/app/[locale]/blog/page/[n]/page.tsx
frontend/src/app/[locale]/blog/[slug]/page.tsx
frontend/src/app/[locale]/blog/author/[slug]/page.tsx
frontend/src/app/[locale]/blog/category/[slug]/page.tsx
frontend/src/app/[locale]/blog/tag/[slug]/page.tsx
frontend/src/app/[locale]/booking/flights/page.tsx
frontend/src/app/[locale]/contact/page.tsx
frontend/src/app/[locale]/embassy/page.tsx
frontend/src/app/[locale]/hajj-umrah/page.tsx
frontend/src/app/[locale]/services/page.tsx
frontend/src/app/[locale]/services/[slug]/page.tsx
frontend/src/app/[locale]/tours/page.tsx
frontend/src/app/[locale]/tours/[slug]/page.tsx
frontend/src/components/*.tsx
frontend/src/components/blog/*.tsx
frontend/src/components/blog/extractFaqs.ts
frontend/src/i18n/navigation.ts
frontend/src/i18n/request.ts
frontend/src/i18n/routing.ts
frontend/src/lib/api.ts
frontend/src/lib/blogUtils.ts
frontend/src/lib/readingTime.ts
frontend/src/lib/schemas.tsx
frontend/src/lib/seo.ts
frontend/src/lib/tracking.ts
frontend/src/lib/trustindex.ts
frontend/src/messages/ar.json
frontend/src/messages/en.json
frontend/src/proxy.ts
```

### Scripts

```text
scripts/seo-audit.mjs
```

## Observations And Maintenance Notes

- The frontend README is still the default create-next-app README and does not describe this app.
- Some Arabic text appeared mojibake in the PowerShell terminal output during inspection; the app is clearly intended to store and render Arabic content, so editor/file encoding should stay UTF-8.
- Several frontend pages are explicitly `dynamic = "force-dynamic"`, reducing static optimization but keeping API-backed content fresh.
- Blog detail normalizes Laravel relation names from `relatedTrips`, `relatedServices`, `relatedEmbassies` to snake-case equivalents for UI usage.
- `getTripsForSitemap` asks for `limit` and `fields=sitemap`; backend TripController keys off `fields=sitemap`.
- `getServices` defaults to `all=1` when called with no params, but card fields are still applied unless overridden.
- Contact and booking mail is synchronous; queueing mail would improve UX under slow SMTP.
- Lead tracking uses both Google Ads client events and backend server-side event logging.
- The project contains a lot of SEO content directly inside TSX pages. That is fast to ship, but a future CMS/database move could make editorial updates safer.

## Quick Mental Model

1. Admin creates categories, trips, blogs, services, embassies, governorates, authors, tags, and operational records in Filament.
2. Laravel exposes public `/api/v1/*` endpoints with active/published filters.
3. Next.js pages fetch those endpoints, choose Arabic or English fields by locale, and render canonical URLs plus structured data.
4. Users submit bookings/contact/newsletter actions through frontend forms.
5. Laravel stores the lead records and sends email notifications.
6. Frontend lead interactions also emit conversion events and backend `lead_events`.
7. SEO is supported by dynamic sitemap, robots, JSON-LD, hreflang/canonical metadata, and an SEO audit script.

