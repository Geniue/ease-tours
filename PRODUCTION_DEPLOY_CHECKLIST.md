# Production Deploy Checklist

Run these checks before restarting production services:

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

After deploy, confirm the main production paths render:

- `/ar`
- `/ar/blog`
- `/ar/blog/author/%D9%85%D8%B5%D8%B7%D9%81%D9%89-%D9%87%D9%86%D8%A7`
- `/ar/blog/tag/group-trips`
- `/ar/tours`
- `/ar/services`
- `/sitemap.xml`
