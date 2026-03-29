<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            // ─── Domestic Tourism (category_id: 1) ───
            [
                'category_id'  => 1,
                'title_ar'     => 'أفضل 10 أماكن سياحية في مصر يجب زيارتها في 2026',
                'title_en'     => 'Top 10 Must-Visit Tourist Destinations in Egypt for 2026',
                'slug_ar'      => 'أفضل-10-أماكن-سياحية-في-مصر-2026',
                'slug_en'      => 'top-10-tourist-destinations-egypt-2026',
                'excerpt_ar'   => 'اكتشف أجمل الوجهات السياحية في مصر من شرم الشيخ إلى الأقصر وأسوان والغردقة. دليلك الشامل لأفضل الأماكن السياحية المصرية.',
                'excerpt_en'   => 'Discover the most beautiful tourist destinations in Egypt from Sharm El Sheikh to Luxor, Aswan, and Hurghada. Your complete guide to Egypt\'s best attractions.',
                'body_ar'      => '<h2>أفضل الوجهات السياحية في مصر لعام 2026</h2>
<p>تُعد مصر من أعرق الوجهات السياحية في العالم، حيث تجمع بين الحضارة الفرعونية العريقة والشواطئ الساحرة والطبيعة الخلابة. إليك أفضل 10 أماكن سياحية يجب زيارتها:</p>

<h3>1. شرم الشيخ - جوهرة البحر الأحمر</h3>
<p>تشتهر شرم الشيخ بشعابها المرجانية الرائعة ومياهها الصافية، مما يجعلها الوجهة المثالية لعشاق الغوص والسنوركل. تضم المدينة فنادق 5 نجوم عالمية ومنتجعات سياحية فاخرة تناسب العائلات والأزواج.</p>

<h3>2. الأقصر وأسوان - متحف مصر المفتوح</h3>
<p>رحلات النيل بين الأقصر وأسوان تُعد من أروع التجارب السياحية في العالم. زيارة معبد الكرنك ووادي الملوك ومعبد فيلة تأخذك في رحلة عبر 5000 عام من التاريخ.</p>

<h3>3. الغردقة - عاصمة الرياضات المائية</h3>
<p>الغردقة وجهة مثالية للرياضات المائية والاستجمام على الشاطئ. تتميز بأسعارها المناسبة مقارنة بشرم الشيخ مع نفس جودة الخدمات والمرافق السياحية.</p>

<h3>4. القاهرة - أهرامات الجيزة والمتحف المصري الكبير</h3>
<p>لا تكتمل زيارة مصر بدون رؤية أهرامات الجيزة وأبو الهول. المتحف المصري الكبير الجديد يضم أكبر مجموعة آثار فرعونية في العالم.</p>

<h3>5. الإسكندرية - عروس البحر المتوسط</h3>
<p>الإسكندرية تجمع بين التاريخ والثقافة والشواطئ الجميلة. قلعة قايتباي ومكتبة الإسكندرية الجديدة من أبرز معالمها.</p>

<h3>6. مرسى علم - الشعاب المرجانية البكر</h3>
<p>لعشاق الطبيعة البكر والهدوء، مرسى علم هي الوجهة المثالية مع شواطئها الخاصة وفرص مشاهدة الدلافين والسلاحف البحرية.</p>

<h3>7. واحة سيوة - جنة الصحراء الغربية</h3>
<p>واحة سيوة تقدم تجربة سياحية فريدة تجمع بين الاستشفاء بالرمال الساخنة والسباحة في عيون المياه الطبيعية واستكشاف الثقافة الأمازيغية.</p>

<h3>8. دهب - جنة الباكباكرز</h3>
<p>دهب تشتهر بـ Blue Hole وهي من أشهر مواقع الغوص في العالم. المدينة مثالية للميزانيات المحدودة مع أجواء بوهيمية مميزة.</p>

<h3>9. الفيوم - بحيرة قارون ووادي الريان</h3>
<p>الفيوم قريبة من القاهرة وتقدم تجربة ممتازة لرحلات اليوم الواحد أو عطلة نهاية الأسبوع مع شلالات وادي الريان الساحرة.</p>

<h3>10. العين السخنة - أقرب شاطئ للقاهرة</h3>
<p>على بُعد ساعتين فقط من القاهرة، العين السخنة مثالية لرحلات عطلة نهاية الأسبوع مع منتجعات فاخرة وشواطئ هادئة.</p>

<h2>احجز رحلتك السياحية في مصر مع إيز ترافل</h2>
<p>في <strong>إيز ترافل</strong>، نقدم أفضل باقات السياحة الداخلية في مصر بأسعار تنافسية تشمل الإقامة والانتقالات والجولات السياحية. تواصل معنا الآن لحجز رحلتك القادمة!</p>',

                'body_en'      => '<h2>Best Tourist Destinations in Egypt for 2026</h2>
<p>Egypt is one of the world\'s oldest and most fascinating tourist destinations, combining ancient Pharaonic civilization with stunning beaches and breathtaking nature. Here are the top 10 places you must visit:</p>

<h3>1. Sharm El Sheikh - The Red Sea Gem</h3>
<p>Sharm El Sheikh is famous for its magnificent coral reefs and crystal-clear waters, making it the perfect destination for diving and snorkeling enthusiasts. The city features world-class 5-star hotels and luxury resorts suitable for families and couples.</p>

<h3>2. Luxor & Aswan - Egypt\'s Open-Air Museum</h3>
<p>Nile cruises between Luxor and Aswan are among the most spectacular tourist experiences in the world. Visiting Karnak Temple, Valley of the Kings, and Philae Temple takes you on a journey through 5,000 years of history.</p>

<h3>3. Hurghada - Water Sports Capital</h3>
<p>Hurghada is an ideal destination for water sports and beach relaxation. It offers competitive prices compared to Sharm El Sheikh while maintaining the same quality of services and tourist facilities.</p>

<h3>4. Cairo - Giza Pyramids & The Grand Egyptian Museum</h3>
<p>No visit to Egypt is complete without seeing the Giza Pyramids and the Sphinx. The new Grand Egyptian Museum houses the largest collection of Pharaonic artifacts in the world.</p>

<h3>5. Alexandria - Mediterranean Bride</h3>
<p>Alexandria combines history, culture, and beautiful beaches. Qaitbay Citadel and the modern Bibliotheca Alexandrina are among its most prominent landmarks.</p>

<h3>6. Marsa Alam - Pristine Coral Reefs</h3>
<p>For lovers of pristine nature and tranquility, Marsa Alam is the perfect destination with private beaches and opportunities to see dolphins and sea turtles.</p>

<h3>7. Siwa Oasis - Western Desert Paradise</h3>
<p>Siwa Oasis offers a unique tourism experience combining sand therapy, swimming in natural springs, and exploring Amazigh culture.</p>

<h3>8. Dahab - Backpacker\'s Paradise</h3>
<p>Dahab is famous for the Blue Hole, one of the world\'s most renowned diving sites. The town is perfect for budget travelers with its distinctive bohemian atmosphere.</p>

<h3>9. Fayoum - Lake Qarun & Wadi El Rayan</h3>
<p>Fayoum is close to Cairo and offers an excellent experience for day trips or weekend getaways with the enchanting Wadi El Rayan waterfalls.</p>

<h3>10. Ain Sokhna - Cairo\'s Nearest Beach</h3>
<p>Just two hours from Cairo, Ain Sokhna is perfect for weekend getaways with luxury resorts and peaceful beaches.</p>

<h2>Book Your Egypt Tour with Ease Travel</h2>
<p>At <strong>Ease Travel</strong>, we offer the best domestic tourism packages in Egypt at competitive prices including accommodation, transportation, and guided tours. Contact us now to book your next trip!</p>',

                'featured_image' => 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80',
                'direction'    => 'rtl',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(2),
            ],

            [
                'category_id'  => 1,
                'title_ar'     => 'دليلك الشامل لرحلات شرم الشيخ: الأسعار والفنادق والأنشطة',
                'title_en'     => 'Complete Guide to Sharm El Sheikh Trips: Prices, Hotels & Activities',
                'slug_ar'      => 'دليل-رحلات-شرم-الشيخ-الاسعار-الفنادق',
                'slug_en'      => 'complete-guide-sharm-el-sheikh-trips-prices-hotels',
                'excerpt_ar'   => 'كل ما تحتاج معرفته عن رحلات شرم الشيخ: أفضل الفنادق، أسعار الرحلات، أنشطة الغوص والسنوركل، والمطاعم الموصى بها.',
                'excerpt_en'   => 'Everything you need to know about Sharm El Sheikh trips: best hotels, trip prices, diving and snorkeling activities, and recommended restaurants.',
                'body_ar'      => '<h2>دليل شامل لرحلات شرم الشيخ 2026</h2>
<p>شرم الشيخ هي الوجهة السياحية الأولى في مصر للسياحة الشاطئية والغوص. تقع في جنوب سيناء وتطل على البحر الأحمر بمياهه الفيروزية الصافية.</p>

<h3>أفضل أوقات الزيارة</h3>
<p>يمكنك زيارة شرم الشيخ طوال العام، لكن أفضل الأوقات هي من أكتوبر إلى أبريل حيث يكون الطقس معتدلاً ومثالياً للأنشطة الخارجية والغوص.</p>

<h3>أفضل الفنادق في شرم الشيخ</h3>
<ul>
<li><strong>فنادق 5 نجوم:</strong> ريكسوس، فور سيزونز، هيلتون شاركس باي</li>
<li><strong>فنادق 4 نجوم:</strong> أكوا بلو، ماريوت، شيراتون</li>
<li><strong>فنادق اقتصادية:</strong> كورال هيلز، نعمة بلو</li>
</ul>

<h3>أنشطة لا تفوتك</h3>
<ul>
<li>الغوص في محمية رأس محمد الطبيعية</li>
<li>السنوركل في خليج نعمة</li>
<li>رحلة بحرية لجزيرة تيران</li>
<li>سفاري في الصحراء مع ركوب الجمال</li>
<li>زيارة السوق القديم (Old Market)</li>
</ul>

<h3>أسعار رحلات شرم الشيخ 2026</h3>
<p>تبدأ أسعار رحلات شرم الشيخ من 4,500 جنيه مصري للفرد لمدة 4 أيام و3 ليالٍ شاملة الإقامة والانتقالات. الأسعار تختلف حسب تصنيف الفندق وموسم السفر.</p>

<h3>احجز رحلتك لشرم الشيخ مع إيز ترافل</h3>
<p>نوفر في <strong>إيز ترافل</strong> باقات شاملة لرحلات شرم الشيخ تشمل الطيران والإقامة والانتقالات والجولات البحرية بأسعار تنافسية. احجز الآن!</p>',

                'body_en'      => '<h2>Complete Guide to Sharm El Sheikh Trips 2026</h2>
<p>Sharm El Sheikh is Egypt\'s top destination for beach tourism and diving. Located in South Sinai overlooking the Red Sea with its crystal-clear turquoise waters.</p>

<h3>Best Time to Visit</h3>
<p>You can visit Sharm El Sheikh year-round, but the best time is from October to April when the weather is moderate and perfect for outdoor activities and diving.</p>

<h3>Best Hotels in Sharm El Sheikh</h3>
<ul>
<li><strong>5-Star Hotels:</strong> Rixos, Four Seasons, Hilton Sharks Bay</li>
<li><strong>4-Star Hotels:</strong> Aqua Blu, Marriott, Sheraton</li>
<li><strong>Budget Hotels:</strong> Coral Hills, Naama Blue</li>
</ul>

<h3>Must-Do Activities</h3>
<ul>
<li>Diving at Ras Mohammed National Park</li>
<li>Snorkeling in Naama Bay</li>
<li>Boat trip to Tiran Island</li>
<li>Desert safari with camel riding</li>
<li>Visit the Old Market</li>
</ul>

<h3>Sharm El Sheikh Trip Prices 2026</h3>
<p>Sharm El Sheikh trip prices start from EGP 4,500 per person for 4 days and 3 nights including accommodation and transfers. Prices vary based on hotel classification and travel season.</p>

<h3>Book Your Sharm El Sheikh Trip with Ease Travel</h3>
<p>At <strong>Ease Travel</strong>, we provide comprehensive Sharm El Sheikh packages including flights, accommodation, transfers, and marine tours at competitive prices. Book now!</p>',

                'featured_image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
                'direction'    => 'rtl',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(5),
            ],

            // ─── Outbound Tourism (category_id: 2) ───
            [
                'category_id'  => 2,
                'title_ar'     => 'أفضل الوجهات السياحية من مصر: دبي واسطنبول وجورجيا',
                'title_en'     => 'Best Outbound Travel Destinations from Egypt: Dubai, Istanbul & Georgia',
                'slug_ar'      => 'أفضل-الوجهات-السياحية-من-مصر-دبي-اسطنبول',
                'slug_en'      => 'best-outbound-travel-destinations-from-egypt',
                'excerpt_ar'   => 'اكتشف أفضل الوجهات السياحية الخارجية من مصر: دبي، اسطنبول، جورجيا وماليزيا. أسعار ونصائح ومعلومات شاملة لرحلتك القادمة.',
                'excerpt_en'   => 'Discover the best outbound travel destinations from Egypt: Dubai, Istanbul, Georgia, and Malaysia. Prices, tips, and comprehensive information for your next trip.',
                'body_ar'      => '<h2>أفضل الوجهات السياحية الخارجية من مصر</h2>
<p>السفر للخارج أصبح أسهل من أي وقت مضى مع باقات السياحة الخارجية المتنوعة. إليك أفضل الوجهات التي يفضلها المسافرون المصريون:</p>

<h3>1. دبي - مدينة الأحلام</h3>
<p>دبي وجهة سياحية عالمية تجمع بين ناطحات السحاب والمولات الضخمة والشواطئ الرائعة. تتميز بـ:</p>
<ul>
<li>برج خليفة - أطول مبنى في العالم (828 متر)</li>
<li>دبي مول - أكبر مركز تسوق في العالم</li>
<li>نافورة دبي الراقصة - عرض مائي مبهر كل 30 دقيقة</li>
<li>صحراء دبي - سفاري ومخيمات بدوية تقليدية</li>
<li>أكواريوم دبي ومدينة الألعاب</li>
</ul>
<p><strong>متوسط تكلفة الرحلة:</strong> من 15,000 إلى 25,000 جنيه مصري لمدة 5 أيام شاملة الطيران والإقامة.</p>

<h3>2. اسطنبول - بوابة الشرق والغرب</h3>
<p>اسطنبول مدينة ساحرة تجمع بين التاريخ العثماني والحياة العصرية. أبرز معالمها:</p>
<ul>
<li>مسجد آيا صوفيا - تحفة معمارية عمرها 1500 عام</li>
<li>المسجد الأزرق (السلطان أحمد)</li>
<li>البازار الكبير - أقدم وأكبر سوق مغطى في العالم</li>
<li>رحلة بحرية في مضيق البوسفور</li>
<li>شارع الاستقلال وميدان تقسيم</li>
</ul>
<p><strong>متوسط تكلفة الرحلة:</strong> من 12,000 إلى 20,000 جنيه مصري لمدة 6 أيام.</p>

<h3>3. جورجيا - جوهرة القوقاز</h3>
<p>جورجيا أصبحت من أكثر الوجهات شعبية للمصريين وتتميز بـ:</p>
<ul>
<li>تبليسي العاصمة - مدينة قديمة ساحرة</li>
<li>باتومي - مدينة ساحلية على البحر الأسود</li>
<li>جبال القوقاز - مناظر طبيعية خلابة</li>
<li>لا تحتاج تأشيرة دخول للمصريين</li>
<li>أسعار مناسبة جداً مقارنة بأوروبا</li>
</ul>

<h3>احجز رحلتك الخارجية مع إيز ترافل</h3>
<p>نقدم في <strong>إيز ترافل</strong> باقات سياحة خارجية شاملة تشمل تذاكر الطيران، الإقامة في فنادق مختارة، الانتقالات، والجولات السياحية بأسعار لا تُقارن. تواصل معنا الآن!</p>',

                'body_en'      => '<h2>Best Outbound Travel Destinations from Egypt</h2>
<p>International travel has become easier than ever with diverse outbound tourism packages. Here are the best destinations preferred by Egyptian travelers:</p>

<h3>1. Dubai - City of Dreams</h3>
<p>Dubai is a world-class tourist destination combining skyscrapers, massive malls, and beautiful beaches. Highlights include:</p>
<ul>
<li>Burj Khalifa - The tallest building in the world (828 meters)</li>
<li>Dubai Mall - The largest shopping center in the world</li>
<li>Dubai Fountain - A spectacular water show every 30 minutes</li>
<li>Dubai Desert - Safari and traditional Bedouin camps</li>
<li>Dubai Aquarium and theme parks</li>
</ul>
<p><strong>Average trip cost:</strong> From EGP 15,000 to 25,000 for 5 days including flights and accommodation.</p>

<h3>2. Istanbul - Gateway Between East and West</h3>
<p>Istanbul is an enchanting city combining Ottoman history with modern life. Top attractions include:</p>
<ul>
<li>Hagia Sophia - A 1,500-year-old architectural masterpiece</li>
<li>Blue Mosque (Sultan Ahmed Mosque)</li>
<li>Grand Bazaar - The oldest and largest covered market in the world</li>
<li>Bosphorus cruise</li>
<li>Istiklal Avenue and Taksim Square</li>
</ul>
<p><strong>Average trip cost:</strong> From EGP 12,000 to 20,000 for 6 days.</p>

<h3>3. Georgia - Jewel of the Caucasus</h3>
<p>Georgia has become one of the most popular destinations for Egyptians, featuring:</p>
<ul>
<li>Tbilisi - A charming ancient capital city</li>
<li>Batumi - A coastal city on the Black Sea</li>
<li>Caucasus Mountains - Breathtaking natural scenery</li>
<li>No visa required for Egyptians</li>
<li>Very affordable prices compared to Europe</li>
</ul>

<h3>Book Your International Trip with Ease Travel</h3>
<p>At <strong>Ease Travel</strong>, we offer comprehensive outbound tourism packages including flight tickets, selected hotel accommodation, transfers, and guided tours at unbeatable prices. Contact us now!</p>',

                'featured_image' => 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
                'direction'    => 'rtl',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(3),
            ],

            [
                'category_id'  => 2,
                'title_ar'     => 'نصائح ذهبية للسفر من مصر لأول مرة: تأشيرات وميزانية وتجهيزات',
                'title_en'     => 'Golden Tips for First-Time International Travelers from Egypt: Visas, Budget & Preparation',
                'slug_ar'      => 'نصائح-السفر-من-مصر-لاول-مرة-تاشيرات-ميزانية',
                'slug_en'      => 'tips-first-time-international-travelers-egypt-visas-budget',
                'excerpt_ar'   => 'دليلك الكامل للسفر من مصر لأول مرة: كيفية استخراج التأشيرات، تحديد الميزانية، حجز الطيران والفنادق، ونصائح مهمة قبل السفر.',
                'excerpt_en'   => 'Your complete guide for first-time international travel from Egypt: visa procedures, budgeting, booking flights and hotels, and essential pre-travel tips.',
                'body_ar'      => '<h2>نصائح ذهبية للمسافرين من مصر لأول مرة</h2>
<p>إذا كانت هذه أول رحلة دولية لك من مصر، فهذا الدليل سيساعدك على التخطيط لرحلة ناجحة وممتعة بدون أي مفاجآت غير سارة.</p>

<h3>1. استخراج جواز السفر</h3>
<p>تأكد من أن جواز سفرك ساري لمدة 6 أشهر على الأقل من تاريخ السفر. يمكنك استخراج أو تجديد جواز السفر من مصلحة الجوازات والهجرة.</p>

<h3>2. التأشيرات - الدول التي لا تحتاج فيزا للمصريين</h3>
<p>هناك العديد من الدول التي يمكن للمصريين زيارتها بدون تأشيرة مسبقة أو بتأشيرة عند الوصول:</p>
<ul>
<li><strong>بدون تأشيرة:</strong> تركيا، ماليزيا، جورجيا، أذربيجان، المالديف</li>
<li><strong>تأشيرة عند الوصول:</strong> إندونيسيا، الأردن، لبنان</li>
<li><strong>تأشيرة إلكترونية:</strong> الهند، سريلانكا، كينيا</li>
</ul>

<h3>3. تحديد الميزانية</h3>
<p>خطط لميزانيتك بعناية وتشمل:</p>
<ul>
<li>تذاكر الطيران (30-40% من الميزانية)</li>
<li>الإقامة (25-30%)</li>
<li>الطعام والمواصلات (15-20%)</li>
<li>الأنشطة والتسوق (10-15%)</li>
<li>احتياطي للطوارئ (10%)</li>
</ul>

<h3>4. حجز الطيران والفنادق</h3>
<p>احجز قبل السفر بـ 2-3 أشهر للحصول على أفضل الأسعار. قارن الأسعار عبر مواقع متعددة أو اترك الأمر لشركة سياحة موثوقة مثل إيز ترافل للحصول على أفضل العروض.</p>

<h3>5. تأمين السفر</h3>
<p>لا تسافر بدون تأمين سفر طبي. التكاليف الطبية في الخارج قد تكون باهظة جداً دون تأمين مناسب.</p>

<h3>6. نصائح مهمة قبل السفر</h3>
<ul>
<li>صوّر جواز سفرك وجميع المستندات المهمة</li>
<li>أبلغ بنكك بخطط سفرك لتفعيل الكارت في الخارج</li>
<li>حمّل خرائط المدينة أوفلاين على هاتفك</li>
<li>تعرف على العملة المحلية وسعر الصرف</li>
<li>احزم أدوية أساسية ومحول كهرباء عالمي</li>
</ul>

<h3>دع إيز ترافل تنظم رحلتك</h3>
<p>في <strong>إيز ترافل</strong>، نتولى كل تفاصيل رحلتك من الألف إلى الياء: التأشيرات، الطيران، الفنادق، الانتقالات، والجولات السياحية. كل ما عليك هو الاستمتاع بالرحلة!</p>',

                'body_en'      => '<h2>Golden Tips for First-Time International Travelers from Egypt</h2>
<p>If this is your first international trip from Egypt, this guide will help you plan a successful and enjoyable journey without any unpleasant surprises.</p>

<h3>1. Passport Requirements</h3>
<p>Ensure your passport is valid for at least 6 months from your travel date. You can issue or renew your passport at the Passport and Immigration Authority.</p>

<h3>2. Visas - Countries Without Visa Requirements for Egyptians</h3>
<p>Many countries can be visited by Egyptians without a prior visa or with a visa on arrival:</p>
<ul>
<li><strong>Visa-free:</strong> Turkey, Malaysia, Georgia, Azerbaijan, Maldives</li>
<li><strong>Visa on arrival:</strong> Indonesia, Jordan, Lebanon</li>
<li><strong>E-visa:</strong> India, Sri Lanka, Kenya</li>
</ul>

<h3>3. Budget Planning</h3>
<p>Plan your budget carefully, including:</p>
<ul>
<li>Flight tickets (30-40% of budget)</li>
<li>Accommodation (25-30%)</li>
<li>Food and transportation (15-20%)</li>
<li>Activities and shopping (10-15%)</li>
<li>Emergency reserve (10%)</li>
</ul>

<h3>4. Booking Flights and Hotels</h3>
<p>Book 2-3 months in advance for the best prices. Compare prices across multiple platforms or let a trusted travel company like Ease Travel get you the best deals.</p>

<h3>5. Travel Insurance</h3>
<p>Never travel without medical travel insurance. Medical costs abroad can be extremely expensive without proper coverage.</p>

<h3>6. Essential Pre-Travel Tips</h3>
<ul>
<li>Photograph your passport and all important documents</li>
<li>Notify your bank of your travel plans to activate your card abroad</li>
<li>Download offline city maps on your phone</li>
<li>Learn about the local currency and exchange rates</li>
<li>Pack essential medications and a universal power adapter</li>
</ul>

<h3>Let Ease Travel Organize Your Trip</h3>
<p>At <strong>Ease Travel</strong>, we handle every detail of your trip from A to Z: visas, flights, hotels, transfers, and guided tours. All you need to do is enjoy the journey!</p>',

                'featured_image' => 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
                'direction'    => 'rtl',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(7),
            ],

            // ─── Hajj & Umrah (category_id: 3) ───
            [
                'category_id'  => 3,
                'title_ar'     => 'دليل العمرة الشامل 2026: المناسك والأسعار ونصائح مهمة',
                'title_en'     => 'Complete Umrah Guide 2026: Rituals, Prices & Essential Tips',
                'slug_ar'      => 'دليل-العمرة-الشامل-2026-المناسك-الاسعار',
                'slug_en'      => 'complete-umrah-guide-2026-rituals-prices-tips',
                'excerpt_ar'   => 'دليلك الكامل لأداء العمرة: خطوات المناسك بالتفصيل، أسعار باقات العمرة من مصر 2026، أفضل أوقات العمرة، ونصائح ذهبية للمعتمرين.',
                'excerpt_en'   => 'Your complete guide to performing Umrah: detailed ritual steps, Umrah package prices from Egypt 2026, best times for Umrah, and golden tips for pilgrims.',
                'body_ar'      => '<h2>دليل العمرة الشامل من مصر 2026</h2>
<p>العمرة من أعظم العبادات وأحبها إلى الله. إذا كنت تخطط لأداء العمرة من مصر، فهذا الدليل يوفر لك كل المعلومات التي تحتاجها.</p>

<h3>مناسك العمرة بالتفصيل</h3>
<ol>
<li><strong>الإحرام:</strong> النية والتلبية من الميقات. يرتدي الرجال ثوبي الإحرام الأبيضين، وترتدي النساء ملابس ساترة عادية.</li>
<li><strong>الطواف:</strong> الطواف حول الكعبة المشرفة 7 أشواط بدءاً من الحجر الأسود مع الدعاء والذكر.</li>
<li><strong>السعي:</strong> السعي بين الصفا والمروة 7 أشواط إحياءً لسنة السيدة هاجر عليها السلام.</li>
<li><strong>الحلق أو التقصير:</strong> حلق أو تقصير الشعر للرجال، وقص أطراف الشعر للنساء.</li>
</ol>

<h3>أفضل أوقات العمرة</h3>
<ul>
<li><strong>رمضان:</strong> عمرة في رمضان تعدل حجة (أفضل الأوقات لكنها الأكثر ازدحاماً)</li>
<li><strong>شهور الشتاء (نوفمبر - فبراير):</strong> طقس معتدل وأسعار مناسبة</li>
<li><strong>رجب وشعبان:</strong> أوقات فاضلة وازدحام أقل من رمضان</li>
</ul>

<h3>أسعار باقات العمرة من مصر 2026</h3>
<p>تختلف أسعار باقات العمرة حسب عدة عوامل:</p>
<ul>
<li><strong>فنادق 5 نجوم قريبة من الحرم:</strong> من 20,000 إلى 35,000 جنيه مصري</li>
<li><strong>فنادق 4 نجوم:</strong> من 15,000 إلى 22,000 جنيه مصري</li>
<li><strong>فنادق 3 نجوم:</strong> من 10,000 إلى 16,000 جنيه مصري</li>
</ul>
<p>الأسعار تشمل عادة: تذاكر الطيران، الإقامة، التأشيرة، الانتقالات بين المدينة المنورة ومكة المكرمة.</p>

<h3>نصائح ذهبية للمعتمرين</h3>
<ul>
<li>احجز مبكراً خاصة في المواسم للحصول على أفضل الأسعار والفنادق</li>
<li>اختر فندقاً قريباً من الحرم لتوفير الوقت والجهد</li>
<li>احمل مظلة شمسية ومقص أظافر صغير وحذاء مريح للمشي</li>
<li>تعلم أدعية الطواف والسعي قبل السفر</li>
<li>احمل نسخة من جواز سفرك والتأشيرة في هاتفك</li>
<li>اشرب ماء زمزم بكثرة وادع الله بما تشاء</li>
</ul>

<h3>باقات العمرة من إيز ترافل</h3>
<p>نقدم في <strong>إيز ترافل</strong> باقات عمرة متكاملة تشمل الطيران، الإقامة في فنادق بالقرب من الحرم المكي والمسجد النبوي، التأشيرة، الانتقالات، ومرشد ديني متخصص. نسعد بخدمتكم لأداء عمرة مقبولة إن شاء الله.</p>',

                'body_en'      => '<h2>Complete Umrah Guide from Egypt 2026</h2>
<p>Umrah is one of the greatest and most beloved acts of worship to Allah. If you\'re planning to perform Umrah from Egypt, this guide provides all the information you need.</p>

<h3>Umrah Rituals in Detail</h3>
<ol>
<li><strong>Ihram:</strong> Intention and Talbiyah from the Miqat. Men wear two white Ihram garments, and women wear regular modest clothing.</li>
<li><strong>Tawaf:</strong> Circling the Holy Kaaba 7 times starting from the Black Stone while making supplications and remembrance of Allah.</li>
<li><strong>Sa\'i:</strong> Walking between Safa and Marwa 7 times, following the tradition of Lady Hajar (peace be upon her).</li>
<li><strong>Halq or Taqsir:</strong> Shaving or shortening hair for men, and trimming hair ends for women.</li>
</ol>

<h3>Best Times for Umrah</h3>
<ul>
<li><strong>Ramadan:</strong> Umrah during Ramadan equals a Hajj in reward (best time but most crowded)</li>
<li><strong>Winter months (November - February):</strong> Moderate weather and reasonable prices</li>
<li><strong>Rajab and Sha\'ban:</strong> Virtuous months with less crowding than Ramadan</li>
</ul>

<h3>Umrah Package Prices from Egypt 2026</h3>
<p>Umrah package prices vary based on several factors:</p>
<ul>
<li><strong>5-star hotels near the Haram:</strong> EGP 20,000 to 35,000</li>
<li><strong>4-star hotels:</strong> EGP 15,000 to 22,000</li>
<li><strong>3-star hotels:</strong> EGP 10,000 to 16,000</li>
</ul>
<p>Prices typically include: flight tickets, accommodation, visa, and transfers between Madinah and Makkah.</p>

<h3>Golden Tips for Umrah Pilgrims</h3>
<ul>
<li>Book early, especially during peak seasons, for the best prices and hotels</li>
<li>Choose a hotel close to the Haram to save time and effort</li>
<li>Bring a sun umbrella, small nail clipper, and comfortable walking shoes</li>
<li>Learn Tawaf and Sa\'i supplications before traveling</li>
<li>Keep copies of your passport and visa on your phone</li>
<li>Drink plenty of Zamzam water and make your supplications</li>
</ul>

<h3>Umrah Packages from Ease Travel</h3>
<p>At <strong>Ease Travel</strong>, we offer comprehensive Umrah packages including flights, accommodation near the Holy Mosque and the Prophet\'s Mosque, visa processing, transfers, and a specialized religious guide. We are honored to serve you for an accepted Umrah, God willing.</p>',

                'featured_image' => 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
                'direction'    => 'rtl',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(1),
            ],

            [
                'category_id'  => 3,
                'title_ar'     => 'الفرق بين الحج والعمرة: شروط وأركان ومواقيت',
                'title_en'     => 'Difference Between Hajj and Umrah: Requirements, Pillars & Timings',
                'slug_ar'      => 'الفرق-بين-الحج-والعمرة-شروط-اركان',
                'slug_en'      => 'difference-between-hajj-and-umrah-requirements-pillars',
                'excerpt_ar'   => 'تعرف على الفرق بين الحج والعمرة: الشروط والأركان والواجبات والمواقيت. دليل شامل يوضح كل ما تحتاج معرفته عن شعائر الحج والعمرة.',
                'excerpt_en'   => 'Learn the differences between Hajj and Umrah: requirements, pillars, obligations, and timings. A comprehensive guide explaining everything you need to know about Hajj and Umrah rituals.',
                'body_ar'      => '<h2>الفرق بين الحج والعمرة</h2>
<p>كثير من المسلمين يتساءلون عن الفرق بين الحج والعمرة. رغم التشابه في بعض المناسك، هناك فروقات جوهرية بينهما.</p>

<h3>ما هو الحج؟</h3>
<p>الحج هو الركن الخامس من أركان الإسلام، وهو فرض على كل مسلم بالغ عاقل مستطيع مرة واحدة في العمر. يؤدى في أشهر معينة (شوال، ذو القعدة، ذو الحجة).</p>

<h3>ما هي العمرة؟</h3>
<p>العمرة سنة مؤكدة عند جمهور العلماء ويمكن أداؤها في أي وقت من العام. لا ترتبط بوقت محدد كالحج.</p>

<h3>أركان الحج</h3>
<ol>
<li><strong>الإحرام:</strong> النية والتلبية</li>
<li><strong>الوقوف بعرفة:</strong> ركن الحج الأعظم (يوم 9 ذو الحجة)</li>
<li><strong>طواف الإفاضة:</strong> الطواف حول الكعبة بعد الوقوف بعرفة</li>
<li><strong>السعي بين الصفا والمروة:</strong> 7 أشواط</li>
</ol>

<h3>أركان العمرة</h3>
<ol>
<li><strong>الإحرام:</strong> النية والتلبية</li>
<li><strong>الطواف:</strong> 7 أشواط حول الكعبة</li>
<li><strong>السعي:</strong> 7 أشواط بين الصفا والمروة</li>
<li><strong>الحلق أو التقصير</strong></li>
</ol>

<h3>الفروقات الرئيسية</h3>
<table>
<tr><th>المقارنة</th><th>الحج</th><th>العمرة</th></tr>
<tr><td>الحكم</td><td>فرض (ركن من أركان الإسلام)</td><td>سنة مؤكدة</td></tr>
<tr><td>الوقت</td><td>أشهر محددة</td><td>أي وقت في العام</td></tr>
<tr><td>الوقوف بعرفة</td><td>نعم (ركن أساسي)</td><td>لا</td></tr>
<tr><td>رمي الجمرات</td><td>نعم</td><td>لا</td></tr>
<tr><td>المبيت بمزدلفة ومنى</td><td>نعم</td><td>لا</td></tr>
<tr><td>المدة</td><td>عدة أيام</td><td>ساعات إلى يوم</td></tr>
</table>

<h3>احجز رحلتك مع إيز ترافل</h3>
<p>سواء كنت تخطط لأداء الحج أو العمرة، <strong>إيز ترافل</strong> توفر لك باقات شاملة بأسعار تنافسية مع مرشدين متخصصين لمساعدتك في أداء مناسكك بيسر وراحة.</p>',

                'body_en'      => '<h2>Difference Between Hajj and Umrah</h2>
<p>Many Muslims wonder about the difference between Hajj and Umrah. Despite similarities in some rituals, there are fundamental differences between them.</p>

<h3>What is Hajj?</h3>
<p>Hajj is the fifth pillar of Islam, obligatory once in a lifetime for every Muslim who is adult, sane, and financially and physically capable. It is performed during specific months (Shawwal, Dhul Qi\'dah, Dhul Hijjah).</p>

<h3>What is Umrah?</h3>
<p>Umrah is a confirmed Sunnah according to the majority of scholars and can be performed at any time of the year. Unlike Hajj, it is not tied to a specific time.</p>

<h3>Pillars of Hajj</h3>
<ol>
<li><strong>Ihram:</strong> Intention and Talbiyah</li>
<li><strong>Standing at Arafat:</strong> The greatest pillar of Hajj (9th of Dhul Hijjah)</li>
<li><strong>Tawaf Al-Ifadah:</strong> Circling the Kaaba after standing at Arafat</li>
<li><strong>Sa\'i between Safa and Marwa:</strong> 7 rounds</li>
</ol>

<h3>Pillars of Umrah</h3>
<ol>
<li><strong>Ihram:</strong> Intention and Talbiyah</li>
<li><strong>Tawaf:</strong> 7 rounds around the Kaaba</li>
<li><strong>Sa\'i:</strong> 7 rounds between Safa and Marwa</li>
<li><strong>Halq or Taqsir:</strong> Shaving or shortening hair</li>
</ol>

<h3>Key Differences</h3>
<table>
<tr><th>Comparison</th><th>Hajj</th><th>Umrah</th></tr>
<tr><td>Ruling</td><td>Obligatory (Pillar of Islam)</td><td>Confirmed Sunnah</td></tr>
<tr><td>Timing</td><td>Specific months</td><td>Any time of year</td></tr>
<tr><td>Standing at Arafat</td><td>Yes (essential pillar)</td><td>No</td></tr>
<tr><td>Stoning the Jamarat</td><td>Yes</td><td>No</td></tr>
<tr><td>Staying in Muzdalifah & Mina</td><td>Yes</td><td>No</td></tr>
<tr><td>Duration</td><td>Several days</td><td>Hours to one day</td></tr>
</table>

<h3>Book Your Trip with Ease Travel</h3>
<p>Whether you\'re planning Hajj or Umrah, <strong>Ease Travel</strong> provides comprehensive packages at competitive prices with specialized guides to help you perform your rituals with ease and comfort.</p>',

                'featured_image' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
                'direction'    => 'rtl',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(10),
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::create($blog);
        }
    }
}
