<?php

namespace Database\Seeders;

use App\Models\Trip;
use App\Models\Category;
use Illuminate\Database\Seeder;

class TripSeeder extends Seeder
{
    public function run(): void
    {
        $inbound = Category::where('type', 'inbound')->first();
        $outbound = Category::where('type', 'outbound')->first();
        $religious = Category::where('type', 'religious')->first();

        $trips = [
            // Religious trips
            [
                'category_id' => $religious->id,
                'title_ar' => 'رحلة عمرة مميزة',
                'title_en' => 'Premium Umrah Package',
                'slug_ar' => 'رحلة-عمرة-مميزة',
                'slug_en' => 'premium-umrah-package',
                'description_ar' => 'رحلة عمرة متكاملة تشمل الإقامة في فنادق 5 نجوم بالقرب من الحرم المكي والمسجد النبوي مع مرشد ديني متخصص',
                'description_en' => 'Complete Umrah trip including 5-star hotel accommodation near the Holy Mosque and the Prophet\'s Mosque with a specialized religious guide',
                'destination_ar' => 'مكة المكرمة',
                'destination_en' => 'Mecca',
                'duration_days' => 7,
                'base_price' => 25000.00,
                'discounted_price' => null,
                'currency' => 'EGP',
                'featured_image' => 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80',
                'is_featured' => true,
                'is_active' => true,
                'start_date' => now()->addDays(30),
                'end_date' => now()->addDays(37),
                'max_participants' => 50,
            ],
            // Inbound trips
            [
                'category_id' => $inbound->id,
                'title_ar' => 'شرم الشيخ - فندق 5 نجوم',
                'title_en' => 'Sharm El Sheikh - 5 Star Hotel',
                'slug_ar' => 'شرم-الشيخ-فندق-5-نجوم',
                'slug_en' => 'sharm-el-sheikh-5-star',
                'description_ar' => 'استمتع بإجازة رائعة في شرم الشيخ مع إقامة فاخرة وأنشطة بحرية ممتعة',
                'description_en' => 'Enjoy a wonderful vacation in Sharm El Sheikh with luxury accommodation and fun water activities',
                'destination_ar' => 'شرم الشيخ',
                'destination_en' => 'Sharm El Sheikh',
                'duration_days' => 4,
                'base_price' => 5500.00,
                'discounted_price' => 4800.00,
                'currency' => 'EGP',
                'featured_image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
                'is_featured' => true,
                'is_active' => true,
                'start_date' => now()->addDays(14),
                'end_date' => now()->addDays(18),
                'max_participants' => 30,
            ],
            [
                'category_id' => $inbound->id,
                'title_ar' => 'الأقصر وأسوان - رحلة نيلية',
                'title_en' => 'Luxor & Aswan - Nile Cruise',
                'slug_ar' => 'الاقصر-واسوان-رحلة-نيلية',
                'slug_en' => 'luxor-aswan-nile-cruise',
                'description_ar' => 'رحلة نيلية فاخرة من الأقصر إلى أسوان لاكتشاف أعظم الآثار الفرعونية',
                'description_en' => 'Luxury Nile cruise from Luxor to Aswan to discover the greatest pharaonic monuments',
                'destination_ar' => 'الأقصر وأسوان',
                'destination_en' => 'Luxor & Aswan',
                'duration_days' => 5,
                'base_price' => 8500.00,
                'discounted_price' => 7200.00,
                'currency' => 'EGP',
                'featured_image' => 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&q=80',
                'is_featured' => true,
                'is_active' => true,
                'start_date' => now()->addDays(21),
                'end_date' => now()->addDays(26),
                'max_participants' => 40,
            ],
            [
                'category_id' => $inbound->id,
                'title_ar' => 'الغردقة - أكوا بارك',
                'title_en' => 'Hurghada - Aqua Park',
                'slug_ar' => 'الغردقة-اكوا-بارك',
                'slug_en' => 'hurghada-aqua-park',
                'description_ar' => 'رحلة عائلية ممتعة في الغردقة مع أفضل فنادق الأكوا بارك',
                'description_en' => 'Fun family trip in Hurghada with the best Aqua Park hotels',
                'destination_ar' => 'الغردقة',
                'destination_en' => 'Hurghada',
                'duration_days' => 3,
                'base_price' => 4200.00,
                'discounted_price' => null,
                'currency' => 'EGP',
                'featured_image' => 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80',
                'is_featured' => false,
                'is_active' => true,
                'start_date' => now()->addDays(10),
                'end_date' => now()->addDays(13),
                'max_participants' => 25,
            ],
            // Outbound trips
            [
                'category_id' => $outbound->id,
                'title_ar' => 'إسطنبول - بوابة الشرق',
                'title_en' => 'Istanbul - Gateway to the East',
                'slug_ar' => 'اسطنبول-بوابة-الشرق',
                'slug_en' => 'istanbul-gateway-east',
                'description_ar' => 'اكتشف سحر إسطنبول مع جولات سياحية شاملة تشمل المساجد التاريخية والبازارات',
                'description_en' => 'Discover the charm of Istanbul with comprehensive tours including historic mosques and bazaars',
                'destination_ar' => 'إسطنبول',
                'destination_en' => 'Istanbul',
                'duration_days' => 6,
                'base_price' => 15000.00,
                'discounted_price' => 12500.00,
                'currency' => 'EGP',
                'featured_image' => 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
                'is_featured' => true,
                'is_active' => true,
                'start_date' => now()->addDays(45),
                'end_date' => now()->addDays(51),
                'max_participants' => 35,
            ],
            [
                'category_id' => $outbound->id,
                'title_ar' => 'دبي - مدينة الأحلام',
                'title_en' => 'Dubai - City of Dreams',
                'slug_ar' => 'دبي-مدينة-الاحلام',
                'slug_en' => 'dubai-city-of-dreams',
                'description_ar' => 'رحلة مميزة إلى دبي تشمل زيارة برج خليفة ودبي مول وسفاري الصحراء',
                'description_en' => 'Special trip to Dubai including Burj Khalifa, Dubai Mall and Desert Safari visits',
                'destination_ar' => 'دبي',
                'destination_en' => 'Dubai',
                'duration_days' => 5,
                'base_price' => 18000.00,
                'discounted_price' => null,
                'currency' => 'EGP',
                'featured_image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
                'is_featured' => false,
                'is_active' => true,
                'start_date' => now()->addDays(60),
                'end_date' => now()->addDays(65),
                'max_participants' => 30,
            ],
        ];

        foreach ($trips as $trip) {
            Trip::create($trip);
        }
    }
}
