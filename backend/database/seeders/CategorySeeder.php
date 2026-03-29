<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name_ar' => 'السياحة الداخلية',
                'name_en' => 'Domestic Tourism',
                'slug_ar' => 'سياحة-داخلية',
                'slug_en' => 'domestic-tourism',
                'type' => 'inbound',
                'description_ar' => 'اكتشف أجمل المعالم السياحية في مصر من شواطئ البحر الأحمر إلى آثار الأقصر وأسوان',
                'description_en' => 'Discover the most beautiful tourist attractions in Egypt from Red Sea beaches to Luxor and Aswan monuments',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name_ar' => 'السياحة الخارجية',
                'name_en' => 'Outbound Tourism',
                'slug_ar' => 'سياحة-خارجية',
                'slug_en' => 'outbound-tourism',
                'type' => 'outbound',
                'description_ar' => 'رحلات سياحية إلى أجمل الوجهات العالمية في أوروبا وآسيا وأفريقيا',
                'description_en' => 'Travel tours to the most beautiful global destinations in Europe, Asia and Africa',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name_ar' => 'الحج والعمرة',
                'name_en' => 'Hajj & Umrah',
                'slug_ar' => 'حج-وعمرة',
                'slug_en' => 'hajj-umrah',
                'type' => 'religious',
                'description_ar' => 'برامج حج وعمرة متكاملة بأعلى مستوى من الخدمة والراحة',
                'description_en' => 'Complete Hajj and Umrah programs with the highest level of service and comfort',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
