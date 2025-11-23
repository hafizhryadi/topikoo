# Topiko_v1

Brief Laravel + React + Inertia starter project (local fork). This repository uses Laravel for the backend with Inertia.js + React (TypeScript) for the frontend, built with Vite and pnpm.

**Tech stack**

- PHP (Laravel)
- MySQL / MariaDB (or other supported DB)
- Node.js + pnpm
- Vite + Inertia.js + React (TypeScript)
- Tailwind-like utility classes and small component library

**Quick start (Windows / PowerShell)**

1. Clone the repo

```powershell
git clone <repo-url> topiko_v1
cd topiko_v1
```

2. Install PHP dependencies

```powershell
composer install
```

3. Install JavaScript dependencies

```powershell
pnpm install
```

4. Copy environment file and generate app key

```powershell
copy .env.example .env
php artisan key:generate
```

5. Configure database

- Edit the `.env` file and set `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`.

6. Run migrations (and optional seeders)

```powershell
php artisan migrate
# php artisan db:seed
```

7. Start the frontend dev server and Laravel backend

Open two terminals.

Frontend (Vite):

```powershell
pnpm run dev
```

Backend (Laravel):

```powershell
php artisan serve
```

Then open the site at `http://127.0.0.1:8000`.

**Build for production**

```powershell
pnpm run build
php artisan migrate --force
# Deploy your PHP app as usual (Apache, nginx, etc.)
```

**Testing**

Run PHP tests (Pest/PHPUnit):

```powershell
./vendor/bin/pest
# or
php artisan test
```
