<?php

namespace Database\Seeders;

use App\Models\Governorate;
use Illuminate\Database\Seeder;

class GovernorateSeeder extends Seeder
{
    public function run(): void
    {
        Governorate::truncate();

        $governorates = $this->getGovernorates();

        foreach ($governorates as $gov) {
            Governorate::create($gov);
        }
    }

    private function getGovernorates(): array
    {
        return [
            // 1. Cairo
            [
                'name_ar' => 'القاهرة',
                'name_en' => 'Cairo',
                'slug_ar' => 'القاهرة',
                'slug_en' => 'cairo',
                'capital_ar' => 'القاهرة',
                'capital_en' => 'Cairo',
                'latitude' => 30.0444196,
                'longitude' => 31.2357116,
                'map_zoom' => 12,
                'region_ar' => 'القاهرة الكبرى',
                'region_en' => 'Greater Cairo',
                'population' => '10,100,166',
                'area_km2' => '3,085',
                'meta_title_ar' => 'شركة سياحة في القاهرة | إيز ترافل - رحلات وحجوزات من القاهرة',
                'meta_title_en' => 'Travel Agency in Cairo | Ease Travel - Tours & Bookings',
                'meta_description_ar' => 'إيز ترافل شركة سياحة في القاهرة تقدم رحلات داخلية وخارجية، حجوزات فنادق، استخراج فيزا شنغن، ورحلات عمرة من القاهرة. احجز الآن!',
                'meta_description_en' => 'Ease Travel is a Cairo-based travel agency offering domestic tours, Schengen visa services, Umrah packages, and hotel bookings from Cairo, Egypt.',
                'excerpt_ar' => 'القاهرة، عاصمة مصر وأكبر مدنها، مدينة لا تنام تجمع بين عراقة التاريخ ونبض الحياة العصرية. من أهرامات الجيزة إلى خان الخليلي، ومن نيل القاهرة إلى القاهرة الجديدة.',
                'excerpt_en' => 'Cairo, the capital and largest city of Egypt, is a vibrant metropolis blending ancient history with modern life. From the Pyramids of Giza to Khan El Khalili, Cairo is the heart of Egyptian civilization.',
                'body_ar' => '<h2>إيز ترافل — شركة سياحة في القاهرة</h2>
<p>إيز ترافل هي شركة سياحة مرخصة في القاهرة تخدم عملاءها من جميع أحياء العاصمة: مصر الجديدة، مدينة نصر، المعادي، التجمع الخامس، 6 أكتوبر، وسط البلد، والمهندسين. نوفر لك كل ما تحتاجه لرحلة مثالية من قلب القاهرة.</p>

<h3>خدماتنا في القاهرة</h3>
<ul>
<li><strong>رحلات داخلية من القاهرة:</strong> رحلات يومية وأسبوعية إلى شرم الشيخ، الغردقة، دهب، الأقصر وأسوان، الساحل الشمالي، والفيوم. نوفر أتوبيسات مكيفة، فنادق 4 و5 نجوم، وبرامج متنوعة تناسب العائلات والشباب.</li>
<li><strong>رحلات خارجية من القاهرة:</strong> رحلات إلى اسطنبول، دبي، كوالالمبور، وأوروبا. نتولى حجز الطيران والفنادق والبرنامج السياحي بالكامل.</li>
<li><strong>استخراج فيزا شنغن من القاهرة:</strong> نساعدك في تجهيز ملف التأشيرة وحجز موعد السفارة. خبرة في التعامل مع سفارات إسبانيا، إيطاليا، ألمانيا، فرنسا، وهولندا في القاهرة.</li>
<li><strong>رحلات عمرة من القاهرة:</strong> باقات عمرة تشمل الطيران، الفنادق القريبة من الحرم، والنقل الداخلي. عمرة اقتصادية وعمرة VIP.</li>
<li><strong>حجز فنادق وطيران:</strong> أسعار تنافسية لحجز فنادق في مصر والعالم، مع حجز تذاكر طيران على جميع الخطوط الجوية.</li>
</ul>

<h3>لماذا تختار إيز ترافل في القاهرة؟</h3>
<p>لأننا نفهم احتياجات المسافر المصري. أسعارنا بالجنيه المصري، فريقنا متاح 24/7 على الواتساب، ونوفر باقات تناسب كل الميزانيات. سواء كنت تبحث عن رحلة عائلية إلى شرم الشيخ أو إجازة رومانسية في اسطنبول أو عمرة مباركة — إيز ترافل هي خيارك الأول في القاهرة.</p>

<h3>أهم المعالم السياحية في القاهرة</h3>
<ul>
<li>أهرامات الجيزة وأبو الهول</li>
<li>المتحف المصري الكبير (GEM)</li>
<li>خان الخليلي وشارع المعز</li>
<li>قلعة صلاح الدين الأيوبي</li>
<li>برج القاهرة وكورنيش النيل</li>
<li>حديقة الأزهر</li>
<li>مسجد محمد علي ومسجد الحسين</li>
<li>الكنيسة المعلقة والمتحف القبطي</li>
</ul>

<h3>أفضل رحلات يوم واحد من القاهرة</h3>
<p>من القاهرة يمكنك الانطلاق إلى الفيوم (ساعة ونصف)، الإسكندرية (ساعتين ونصف)، العين السخنة (ساعة ونصف)، أو الإسماعيلية (ساعتين). كلها رحلات يوم واحد مثالية لعطلة نهاية الأسبوع مع إيز ترافل.</p>',

                'body_en' => '<h2>Ease Travel — Travel Agency in Cairo</h2>
<p>Ease Travel is a licensed travel agency serving clients across Cairo: Heliopolis, Nasr City, Maadi, New Cairo (Fifth Settlement), 6th of October, Downtown, and Mohandeseen. We provide everything you need for the perfect trip from the heart of Egypt\'s capital.</p>

<h3>Our Services in Cairo</h3>
<ul>
<li><strong>Domestic Tours from Cairo:</strong> Daily and weekly trips to Sharm El Sheikh, Hurghada, Dahab, Luxor & Aswan, North Coast, and Fayoum. Air-conditioned buses, 4 & 5-star hotels, and diverse programs for families and groups.</li>
<li><strong>International Tours from Cairo:</strong> Trips to Istanbul, Dubai, Kuala Lumpur, and Europe. We handle flights, hotels, and complete tour programs.</li>
<li><strong>Schengen Visa from Cairo:</strong> We assist with visa file preparation and embassy appointment booking. Expert handling of Spain, Italy, Germany, France, and Netherlands visa applications in Cairo.</li>
<li><strong>Umrah Packages from Cairo:</strong> Umrah packages including flights, hotels near the Haram, and internal transfers. Economy and VIP options available.</li>
<li><strong>Hotel & Flight Bookings:</strong> Competitive prices for hotel bookings in Egypt and worldwide, plus flight tickets on all airlines.</li>
</ul>

<h3>Why Choose Ease Travel in Cairo?</h3>
<p>Because we understand Egyptian travelers. Our prices are in Egyptian Pounds, our team is available 24/7 on WhatsApp, and we offer packages for every budget. Whether you\'re looking for a family trip to Sharm El Sheikh, a romantic getaway in Istanbul, or a blessed Umrah — Ease Travel is your top choice in Cairo.</p>

<h3>Top Tourist Attractions in Cairo</h3>
<ul>
<li>The Pyramids of Giza and the Sphinx</li>
<li>The Grand Egyptian Museum (GEM)</li>
<li>Khan El Khalili and Al-Muizz Street</li>
<li>Saladin Citadel</li>
<li>Cairo Tower and the Nile Corniche</li>
<li>Al-Azhar Park</li>
<li>Mohamed Ali Mosque and Al-Hussein Mosque</li>
<li>The Hanging Church and Coptic Museum</li>
</ul>

<h3>Best Day Trips from Cairo</h3>
<p>From Cairo, you can reach Fayoum (1.5 hours), Alexandria (2.5 hours), Ain Sokhna (1.5 hours), or Ismailia (2 hours). All perfect weekend day trips with Ease Travel.</p>',

                'faqs' => [
                    ['question_ar' => 'هل إيز ترافل موجودة في القاهرة؟', 'question_en' => 'Is Ease Travel located in Cairo?', 'answer_ar' => 'نعم، إيز ترافل شركة سياحة مرخصة مقرها القاهرة وتخدم جميع أحياء العاصمة والمحافظات المجاورة عبر الإنترنت والواتساب.', 'answer_en' => 'Yes, Ease Travel is a licensed travel agency based in Cairo, serving all neighborhoods and nearby governorates via online booking and WhatsApp.'],
                    ['question_ar' => 'كيف أحجز رحلة من القاهرة؟', 'question_en' => 'How do I book a trip from Cairo?', 'answer_ar' => 'يمكنك الحجز من خلال موقعنا ease-travel.online أو التواصل معنا على الواتساب. نوفر خدمة عملاء 24/7.', 'answer_en' => 'You can book through our website ease-travel.online or contact us on WhatsApp. We provide 24/7 customer service.'],
                    ['question_ar' => 'ما هي أرخص رحلة من القاهرة؟', 'question_en' => 'What is the cheapest trip from Cairo?', 'answer_ar' => 'رحلات الفيوم ورحلات يوم واحد إلى العين السخنة تبدأ من أسعار اقتصادية جداً. تابع عروضنا على الموقع.', 'answer_en' => 'Fayoum day trips and Ain Sokhna trips start from very affordable prices. Follow our deals on the website.'],
                    ['question_ar' => 'هل تقدمون خدمة استخراج فيزا شنغن في القاهرة؟', 'question_en' => 'Do you offer Schengen visa services in Cairo?', 'answer_ar' => 'نعم، نساعد في تجهيز ملف الفيزا بالكامل وحجز مواعيد السفارات في القاهرة لجميع دول شنغن.', 'answer_en' => 'Yes, we assist with complete visa file preparation and embassy appointment booking in Cairo for all Schengen countries.'],
                    ['question_ar' => 'ما هي مواعيد عمل إيز ترافل؟', 'question_en' => 'What are Ease Travel working hours?', 'answer_ar' => 'فريقنا متاح 24/7 على الواتساب. الحجوزات الأونلاين متاحة على مدار الساعة.', 'answer_en' => 'Our team is available 24/7 on WhatsApp. Online bookings are available around the clock.'],
                ],
                'is_published' => true,
                'is_featured' => true,
                'sort_order' => 1,
            ],

            // 2. Giza
            [
                'name_ar' => 'الجيزة',
                'name_en' => 'Giza',
                'slug_ar' => 'الجيزة',
                'slug_en' => 'giza',
                'capital_ar' => 'الجيزة',
                'capital_en' => 'Giza',
                'latitude' => 30.0131,
                'longitude' => 31.2089,
                'map_zoom' => 12,
                'region_ar' => 'القاهرة الكبرى',
                'region_en' => 'Greater Cairo',
                'population' => '9,200,000',
                'area_km2' => '85,153',
                'meta_title_ar' => 'شركة سياحة في الجيزة | إيز ترافل - رحلات من الجيزة و6 أكتوبر',
                'meta_title_en' => 'Travel Agency in Giza | Ease Travel - Tours from Giza & 6th October',
                'meta_description_ar' => 'إيز ترافل تخدم سكان الجيزة و6 أكتوبر والشيخ زايد. رحلات داخلية وخارجية، عمرة، واستخراج فيزا شنغن. احجز رحلتك الآن!',
                'meta_description_en' => 'Ease Travel serves Giza, 6th October, and Sheikh Zayed residents with domestic tours, Umrah, Schengen visa services. Book now!',
                'excerpt_ar' => 'الجيزة، موطن الأهرامات وأبو الهول، وأحد أكبر محافظات مصر. تضم مدينة 6 أكتوبر والشيخ زايد والفيوم.',
                'excerpt_en' => 'Giza, home of the Pyramids and the Sphinx, is one of Egypt\'s largest governorates. It includes 6th October City and Sheikh Zayed.',
                'body_ar' => '<h2>إيز ترافل — شركة سياحة تخدم الجيزة</h2>
<p>سكان الجيزة و6 أكتوبر والشيخ زايد وحدائق الأهرام والهرم وفيصل والدقي والعجوزة — إيز ترافل أقرب إليكم. نقدم رحلات سياحية من الجيزة إلى جميع وجهات مصر والعالم.</p>

<h3>خدماتنا لسكان الجيزة</h3>
<ul>
<li><strong>رحلات من 6 أكتوبر والشيخ زايد:</strong> باصات تقل المسافرين من مدينة 6 أكتوبر إلى شرم الشيخ والغردقة والعين السخنة.</li>
<li><strong>رحلات عائلية:</strong> برامج مخصصة للعائلات تشمل الإقامة والانتقالات والوجبات.</li>
<li><strong>استخراج تأشيرات:</strong> خدمة استخراج فيزا شنغن وفيزا أمريكا وإنجلترا لسكان الجيزة.</li>
<li><strong>عمرة من الجيزة:</strong> باقات عمرة اقتصادية و VIP تشمل الطيران من مطار القاهرة والفنادق القريبة من الحرم.</li>
</ul>

<h3>أهم معالم الجيزة</h3>
<ul>
<li>أهرامات الجيزة — إحدى عجائب الدنيا السبع</li>
<li>المتحف المصري الكبير (GEM) — أكبر متحف أثري في العالم</li>
<li>قرية الحرانية — قرية النسيج اليدوي الشهيرة</li>
<li>حديقة الحيوان بالجيزة</li>
<li>شارع الأهرام وطريق الفيوم</li>
</ul>

<h3>رحلات اليوم الواحد من الجيزة</h3>
<p>الجيزة نقطة انطلاق مثالية: الفيوم (ساعة واحدة)، العين السخنة (ساعتين)، الإسكندرية (ساعتين ونصف). احجز رحلتك مع إيز ترافل.</p>',

                'body_en' => '<h2>Ease Travel — Serving Giza Residents</h2>
<p>Residents of Giza, 6th of October, Sheikh Zayed, Haram, Faisal, Dokki, and Agouza — Ease Travel is your nearest travel partner. We offer tours from Giza to all destinations in Egypt and worldwide.</p>

<h3>Our Services for Giza Residents</h3>
<ul>
<li><strong>Tours from 6th October & Sheikh Zayed:</strong> Buses picking up travelers from 6th October City to Sharm El Sheikh, Hurghada, and Ain Sokhna.</li>
<li><strong>Family Trips:</strong> Customized family programs including accommodation, transfers, and meals.</li>
<li><strong>Visa Services:</strong> Schengen, US, and UK visa processing for Giza residents.</li>
<li><strong>Umrah from Giza:</strong> Economy and VIP Umrah packages with flights from Cairo Airport and hotels near the Haram.</li>
</ul>

<h3>Top Attractions in Giza</h3>
<ul>
<li>Pyramids of Giza — One of the Seven Wonders of the World</li>
<li>Grand Egyptian Museum (GEM) — World\'s largest archaeological museum</li>
<li>Haraniya Village — Famous for handmade textiles</li>
<li>Giza Zoo</li>
<li>Al-Ahram Street and Fayoum Road</li>
</ul>

<h3>Day Trips from Giza</h3>
<p>Giza is the perfect starting point: Fayoum (1 hour), Ain Sokhna (2 hours), Alexandria (2.5 hours). Book with Ease Travel.</p>',

                'faqs' => [
                    ['question_ar' => 'هل تخدم إيز ترافل سكان 6 أكتوبر؟', 'question_en' => 'Does Ease Travel serve 6th October residents?', 'answer_ar' => 'نعم، نخدم جميع سكان 6 أكتوبر والشيخ زايد وحدائق الأهرام والجيزة بالكامل.', 'answer_en' => 'Yes, we serve all residents of 6th October, Sheikh Zayed, Hadayek El Ahram, and all of Giza.'],
                    ['question_ar' => 'كيف أحجز رحلة من الجيزة؟', 'question_en' => 'How do I book a trip from Giza?', 'answer_ar' => 'احجز أونلاين من ease-travel.online أو تواصل معنا واتساب. نوفر التقاط المسافرين من نقاط تجمع في الجيزة.', 'answer_en' => 'Book online at ease-travel.online or contact us on WhatsApp. We provide pickup points across Giza.'],
                    ['question_ar' => 'ما هي أقرب رحلة يومية من الجيزة؟', 'question_en' => 'What is the nearest day trip from Giza?', 'answer_ar' => 'الفيوم هي الأقرب (ساعة واحدة بالسيارة)، تليها العين السخنة (ساعتين).', 'answer_en' => 'Fayoum is the closest (1 hour drive), followed by Ain Sokhna (2 hours).'],
                ],
                'is_published' => true,
                'is_featured' => true,
                'sort_order' => 2,
            ],

            // 3. Alexandria
            [
                'name_ar' => 'الإسكندرية',
                'name_en' => 'Alexandria',
                'slug_ar' => 'الاسكندرية',
                'slug_en' => 'alexandria',
                'capital_ar' => 'الإسكندرية',
                'capital_en' => 'Alexandria',
                'latitude' => 31.2001,
                'longitude' => 29.9187,
                'map_zoom' => 12,
                'region_ar' => 'الإسكندرية',
                'region_en' => 'Alexandria',
                'population' => '5,381,000',
                'area_km2' => '2,679',
                'meta_title_ar' => 'شركة سياحة في الإسكندرية | إيز ترافل - رحلات من الإسكندرية',
                'meta_title_en' => 'Travel Agency in Alexandria | Ease Travel - Tours & Bookings',
                'meta_description_ar' => 'إيز ترافل تخدم سكان الإسكندرية. رحلات داخلية وخارجية، عمرة، استخراج فيزا شنغن، وحجز فنادق من الإسكندرية.',
                'meta_description_en' => 'Ease Travel serves Alexandria with domestic tours, Umrah packages, Schengen visa services, and hotel bookings.',
                'excerpt_ar' => 'الإسكندرية، عروس البحر المتوسط وثاني أكبر مدن مصر. يكنة التاريخ والثقافة والشواطئ الجميلة.',
                'excerpt_en' => 'Alexandria, the Mediterranean bride and Egypt\'s second-largest city. A hub of history, culture, and beautiful beaches.',
                'body_ar' => '<h2>إيز ترافل — شركة سياحة تخدم الإسكندرية</h2>
<p>لو أنت من سكان الإسكندرية — سيدي بشر، ستانلي، المنتزه، سموحة، العجمي، أو برج العرب — إيز ترافل توفرلك رحلات سياحية بأسعار مميزة من الإسكندرية.</p>

<h3>خدماتنا في الإسكندرية</h3>
<ul>
<li><strong>رحلات داخلية من الإسكندرية:</strong> شرم الشيخ، الغردقة، الأقصر وأسوان، مرسى مطروح، والساحل الشمالي.</li>
<li><strong>رحلات خارجية:</strong> اسطنبول، دبي، ماليزيا، وأوروبا من مطار برج العرب.</li>
<li><strong>استخراج فيزا شنغن:</strong> تجهيز الملفات وحجز مواعيد السفارات. معظم السفارات في القاهرة لكن نتولى كل الإجراءات عنك.</li>
<li><strong>رحلات عمرة:</strong> باقات عمرة من الإسكندرية تشمل الطيران والفندق والنقل.</li>
</ul>

<h3>أهم معالم الإسكندرية</h3>
<ul>
<li>مكتبة الإسكندرية الجديدة</li>
<li>قلعة قايتباي</li>
<li>عمود السواري</li>
<li>المسرح الروماني (كوم الدكة)</li>
<li>كورنيش الإسكندرية</li>
<li>قصر المنتزه وحدائقه</li>
<li>سوق الأنفوشي وأسماك الإسكندرية الشهيرة</li>
</ul>

<h3>لماذا تسافر مع إيز ترافل من الإسكندرية؟</h3>
<p>نوفر حجوزات أونلاين سهلة، دعم واتساب على مدار الساعة، وأسعار بالجنيه المصري. لا تحتاج للسفر إلى القاهرة للحجز — كل شيء يتم إلكترونياً.</p>',

                'body_en' => '<h2>Ease Travel — Serving Alexandria</h2>
<p>If you\'re in Alexandria — Sidi Bishr, Stanley, Montaza, Smouha, Agami, or Borg El Arab — Ease Travel offers tours at great prices from Alexandria.</p>

<h3>Our Services in Alexandria</h3>
<ul>
<li><strong>Domestic Tours from Alexandria:</strong> Sharm El Sheikh, Hurghada, Luxor & Aswan, Marsa Matrouh, and North Coast.</li>
<li><strong>International Tours:</strong> Istanbul, Dubai, Malaysia, and Europe from Borg El Arab Airport.</li>
<li><strong>Schengen Visa:</strong> Complete file preparation and embassy appointment handling.</li>
<li><strong>Umrah Packages:</strong> Umrah from Alexandria including flights, hotels, and transfers.</li>
</ul>

<h3>Top Attractions in Alexandria</h3>
<ul>
<li>Bibliotheca Alexandrina</li>
<li>Qaitbay Citadel</li>
<li>Pompey\'s Pillar</li>
<li>Roman Amphitheatre (Kom El Dikka)</li>
<li>Alexandria Corniche</li>
<li>Montaza Palace and Gardens</li>
<li>Anfushi Market and Alexandria\'s famous seafood</li>
</ul>

<h3>Why Travel with Ease Travel from Alexandria?</h3>
<p>Easy online bookings, 24/7 WhatsApp support, and prices in Egyptian Pounds. No need to travel to Cairo to book — everything is done digitally.</p>',

                'faqs' => [
                    ['question_ar' => 'هل يمكنني حجز رحلة من الإسكندرية بدون زيارة مكتب؟', 'question_en' => 'Can I book from Alexandria without visiting an office?', 'answer_ar' => 'نعم، كل الحجوزات تتم أونلاين أو عبر الواتساب. لا حاجة لزيارة مكتب.', 'answer_en' => 'Yes, all bookings are done online or via WhatsApp. No office visit needed.'],
                    ['question_ar' => 'هل يوجد رحلات من مطار برج العرب؟', 'question_en' => 'Are there trips from Borg El Arab Airport?', 'answer_ar' => 'نعم، نوفر رحلات خارجية تنطلق من مطار برج العرب بالإسكندرية.', 'answer_en' => 'Yes, we offer international trips departing from Borg El Arab Airport in Alexandria.'],
                    ['question_ar' => 'ما هي أرخص رحلة من الإسكندرية؟', 'question_en' => 'What is the cheapest trip from Alexandria?', 'answer_ar' => 'رحلات مرسى مطروح والساحل الشمالي هي الأقرب والأرخص من الإسكندرية.', 'answer_en' => 'Marsa Matrouh and North Coast trips are the closest and cheapest from Alexandria.'],
                ],
                'is_published' => true,
                'is_featured' => true,
                'sort_order' => 3,
            ],

            // 4. Qalyubia
            [
                'name_ar' => 'القليوبية',
                'name_en' => 'Qalyubia',
                'slug_ar' => 'القليوبية',
                'slug_en' => 'qalyubia',
                'capital_ar' => 'بنها',
                'capital_en' => 'Banha',
                'latitude' => 30.4628,
                'longitude' => 31.1785,
                'map_zoom' => 12,
                'region_ar' => 'القاهرة الكبرى',
                'region_en' => 'Greater Cairo',
                'population' => '5,950,000',
                'area_km2' => '1,001',
                'meta_title_ar' => 'شركة سياحة في القليوبية | إيز ترافل - رحلات من بنها وشبرا الخيمة',
                'meta_title_en' => 'Travel Agency in Qalyubia | Ease Travel - Tours from Banha',
                'meta_description_ar' => 'إيز ترافل تخدم القليوبية وبنها وشبرا الخيمة. رحلات داخلية وخارجية واستخراج تأشيرات.',
                'meta_description_en' => 'Ease Travel serves Qalyubia, Banha, and Shubra El Kheima with tours and visa services.',
                'excerpt_ar' => 'القليوبية، محافظة في قلب الدلتا تضم بنها وشبرا الخيمة والقناطر الخيرية. قريبة من القاهرة ومتصلة بشبكة مواصلات ممتازة.',
                'excerpt_en' => 'Qalyubia, a Nile Delta governorate home to Banha and Shubra El Kheima. Close to Cairo with excellent transport connections.',
                'body_ar' => '<h2>إيز ترافل — خدمات سياحة في القليوبية</h2>
<p>سكان بنها وشبرا الخيمة والقناطر الخيرية وقليوب والعبور — إيز ترافل توفر لكم رحلات سياحية بأسعار مناسبة وحجز سهل عبر الإنترنت.</p>

<h3>خدماتنا لسكان القليوبية</h3>
<ul>
<li><strong>رحلات شاطئية:</strong> شرم الشيخ، الغردقة، العين السخنة من القليوبية.</li>
<li><strong>رحلات خارجية:</strong> اسطنبول، دبي من مطار القاهرة (45 دقيقة من بنها).</li>
<li><strong>فيزا وتأشيرات:</strong> استخراج فيزا شنغن وتأشيرات أخرى.</li>
<li><strong>عمرة:</strong> باقات عمرة شاملة الطيران والفنادق.</li>
</ul>

<h3>أهم معالم القليوبية</h3>
<ul>
<li>القناطر الخيرية — متنزه تاريخي على النيل</li>
<li>جسر بنها — إطلالة رائعة على فرع دمياط</li>
<li>مدينة العبور — مركز تجاري حديث</li>
</ul>',

                'body_en' => '<h2>Ease Travel — Tourism Services in Qalyubia</h2>
<p>Residents of Banha, Shubra El Kheima, Qanatir El Khairiya, and El Obour — Ease Travel offers great-value tours with easy online booking.</p>

<h3>Our Services for Qalyubia</h3>
<ul>
<li><strong>Beach Trips:</strong> Sharm El Sheikh, Hurghada, Ain Sokhna from Qalyubia.</li>
<li><strong>International Tours:</strong> Istanbul, Dubai from Cairo Airport (45 min from Banha).</li>
<li><strong>Visa Services:</strong> Schengen and other visa processing.</li>
<li><strong>Umrah:</strong> Complete Umrah packages with flights and hotels.</li>
</ul>

<h3>Top Attractions in Qalyubia</h3>
<ul>
<li>Qanatir El Khairiya — Historic Nile park</li>
<li>Banha Bridge — Beautiful Damietta Branch views</li>
<li>El Obour City — Modern commercial hub</li>
</ul>',

                'faqs' => [
                    ['question_ar' => 'هل إيز ترافل تخدم بنها وشبرا الخيمة؟', 'question_en' => 'Does Ease Travel serve Banha and Shubra?', 'answer_ar' => 'نعم، نخدم كل القليوبية عبر الحجز الأونلاين والواتساب.', 'answer_en' => 'Yes, we serve all of Qalyubia through online booking and WhatsApp.'],
                    ['question_ar' => 'كم تبعد القليوبية عن مطار القاهرة؟', 'question_en' => 'How far is Qalyubia from Cairo Airport?', 'answer_ar' => 'بنها تبعد حوالي 45 دقيقة عن مطار القاهرة الدولي.', 'answer_en' => 'Banha is about 45 minutes from Cairo International Airport.'],
                ],
                'is_published' => true,
                'is_featured' => false,
                'sort_order' => 4,
            ],

            // 5-27: Remaining governorates with essential data
            ...$this->getRemainingGovernorates(),
        ];
    }

    private function getRemainingGovernorates(): array
    {
        $remaining = [
            ['name_ar' => 'الشرقية', 'name_en' => 'Sharqia', 'slug_ar' => 'الشرقية', 'slug_en' => 'sharqia', 'capital_ar' => 'الزقازيق', 'capital_en' => 'Zagazig', 'latitude' => 30.5877, 'longitude' => 31.5020, 'region_ar' => 'دلتا النيل', 'region_en' => 'Nile Delta', 'population' => '7,400,000', 'area_km2' => '4,180'],
            ['name_ar' => 'الدقهلية', 'name_en' => 'Dakahlia', 'slug_ar' => 'الدقهلية', 'slug_en' => 'dakahlia', 'capital_ar' => 'المنصورة', 'capital_en' => 'Mansoura', 'latitude' => 31.0409, 'longitude' => 31.3785, 'region_ar' => 'دلتا النيل', 'region_en' => 'Nile Delta', 'population' => '6,900,000', 'area_km2' => '3,471'],
            ['name_ar' => 'الغربية', 'name_en' => 'Gharbia', 'slug_ar' => 'الغربية', 'slug_en' => 'gharbia', 'capital_ar' => 'طنطا', 'capital_en' => 'Tanta', 'latitude' => 30.7865, 'longitude' => 31.0004, 'region_ar' => 'دلتا النيل', 'region_en' => 'Nile Delta', 'population' => '5,200,000', 'area_km2' => '1,942'],
            ['name_ar' => 'المنوفية', 'name_en' => 'Monufia', 'slug_ar' => 'المنوفية', 'slug_en' => 'monufia', 'capital_ar' => 'شبين الكوم', 'capital_en' => 'Shebin El Kom', 'latitude' => 30.5579, 'longitude' => 31.0097, 'region_ar' => 'دلتا النيل', 'region_en' => 'Nile Delta', 'population' => '4,500,000', 'area_km2' => '1,532'],
            ['name_ar' => 'كفر الشيخ', 'name_en' => 'Kafr El Sheikh', 'slug_ar' => 'كفر-الشيخ', 'slug_en' => 'kafr-el-sheikh', 'capital_ar' => 'كفر الشيخ', 'capital_en' => 'Kafr El Sheikh', 'latitude' => 31.1107, 'longitude' => 30.9388, 'region_ar' => 'دلتا النيل', 'region_en' => 'Nile Delta', 'population' => '3,500,000', 'area_km2' => '3,437'],
            ['name_ar' => 'البحيرة', 'name_en' => 'Beheira', 'slug_ar' => 'البحيرة', 'slug_en' => 'beheira', 'capital_ar' => 'دمنهور', 'capital_en' => 'Damanhur', 'latitude' => 31.0344, 'longitude' => 30.4688, 'region_ar' => 'دلتا النيل', 'region_en' => 'Nile Delta', 'population' => '6,700,000', 'area_km2' => '10,130'],
            ['name_ar' => 'دمياط', 'name_en' => 'Damietta', 'slug_ar' => 'دمياط', 'slug_en' => 'damietta', 'capital_ar' => 'دمياط', 'capital_en' => 'Damietta', 'latitude' => 31.4175, 'longitude' => 31.8144, 'region_ar' => 'دلتا النيل', 'region_en' => 'Nile Delta', 'population' => '1,500,000', 'area_km2' => '589'],
            ['name_ar' => 'بورسعيد', 'name_en' => 'Port Said', 'slug_ar' => 'بورسعيد', 'slug_en' => 'port-said', 'capital_ar' => 'بورسعيد', 'capital_en' => 'Port Said', 'latitude' => 31.2565, 'longitude' => 32.2841, 'region_ar' => 'قناة السويس', 'region_en' => 'Suez Canal', 'population' => '787,000', 'area_km2' => '1,345'],
            ['name_ar' => 'الإسماعيلية', 'name_en' => 'Ismailia', 'slug_ar' => 'الاسماعيلية', 'slug_en' => 'ismailia', 'capital_ar' => 'الإسماعيلية', 'capital_en' => 'Ismailia', 'latitude' => 30.5965, 'longitude' => 32.2715, 'region_ar' => 'قناة السويس', 'region_en' => 'Suez Canal', 'population' => '1,400,000', 'area_km2' => '5,067'],
            ['name_ar' => 'السويس', 'name_en' => 'Suez', 'slug_ar' => 'السويس', 'slug_en' => 'suez', 'capital_ar' => 'السويس', 'capital_en' => 'Suez', 'latitude' => 29.9668, 'longitude' => 32.5498, 'region_ar' => 'قناة السويس', 'region_en' => 'Suez Canal', 'population' => '750,000', 'area_km2' => '17,840'],
            ['name_ar' => 'شمال سيناء', 'name_en' => 'North Sinai', 'slug_ar' => 'شمال-سيناء', 'slug_en' => 'north-sinai', 'capital_ar' => 'العريش', 'capital_en' => 'El Arish', 'latitude' => 31.1313, 'longitude' => 33.7981, 'region_ar' => 'سيناء', 'region_en' => 'Sinai', 'population' => '490,000', 'area_km2' => '27,574'],
            ['name_ar' => 'جنوب سيناء', 'name_en' => 'South Sinai', 'slug_ar' => 'جنوب-سيناء', 'slug_en' => 'south-sinai', 'capital_ar' => 'الطور', 'capital_en' => 'El Tor', 'latitude' => 28.2358, 'longitude' => 33.6209, 'region_ar' => 'سيناء', 'region_en' => 'Sinai', 'population' => '110,000', 'area_km2' => '33,140'],
            ['name_ar' => 'البحر الأحمر', 'name_en' => 'Red Sea', 'slug_ar' => 'البحر-الاحمر', 'slug_en' => 'red-sea', 'capital_ar' => 'الغردقة', 'capital_en' => 'Hurghada', 'latitude' => 27.2579, 'longitude' => 33.8116, 'region_ar' => 'الصحراء الشرقية', 'region_en' => 'Upper Egypt', 'population' => '380,000', 'area_km2' => '203,685'],
            ['name_ar' => 'بني سويف', 'name_en' => 'Beni Suef', 'slug_ar' => 'بني-سويف', 'slug_en' => 'beni-suef', 'capital_ar' => 'بني سويف', 'capital_en' => 'Beni Suef', 'latitude' => 29.0744, 'longitude' => 31.0998, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '3,400,000', 'area_km2' => '1,322'],
            ['name_ar' => 'الفيوم', 'name_en' => 'Fayoum', 'slug_ar' => 'الفيوم', 'slug_en' => 'fayoum', 'capital_ar' => 'الفيوم', 'capital_en' => 'Fayoum', 'latitude' => 29.3084, 'longitude' => 30.8428, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '3,800,000', 'area_km2' => '6,068'],
            ['name_ar' => 'المنيا', 'name_en' => 'Minya', 'slug_ar' => 'المنيا', 'slug_en' => 'minya', 'capital_ar' => 'المنيا', 'capital_en' => 'Minya', 'latitude' => 28.0871, 'longitude' => 30.7618, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '5,900,000', 'area_km2' => '32,279'],
            ['name_ar' => 'أسيوط', 'name_en' => 'Assiut', 'slug_ar' => 'اسيوط', 'slug_en' => 'assiut', 'capital_ar' => 'أسيوط', 'capital_en' => 'Assiut', 'latitude' => 27.1783, 'longitude' => 31.1859, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '4,800,000', 'area_km2' => '25,926'],
            ['name_ar' => 'سوهاج', 'name_en' => 'Sohag', 'slug_ar' => 'سوهاج', 'slug_en' => 'sohag', 'capital_ar' => 'سوهاج', 'capital_en' => 'Sohag', 'latitude' => 26.5590, 'longitude' => 31.6948, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '5,400,000', 'area_km2' => '11,022'],
            ['name_ar' => 'قنا', 'name_en' => 'Qena', 'slug_ar' => 'قنا', 'slug_en' => 'qena', 'capital_ar' => 'قنا', 'capital_en' => 'Qena', 'latitude' => 26.1551, 'longitude' => 32.7160, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '3,400,000', 'area_km2' => '10,798'],
            ['name_ar' => 'الأقصر', 'name_en' => 'Luxor', 'slug_ar' => 'الاقصر', 'slug_en' => 'luxor', 'capital_ar' => 'الأقصر', 'capital_en' => 'Luxor', 'latitude' => 25.6872, 'longitude' => 32.6396, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '1,300,000', 'area_km2' => '2,960'],
            ['name_ar' => 'أسوان', 'name_en' => 'Aswan', 'slug_ar' => 'اسوان', 'slug_en' => 'aswan', 'capital_ar' => 'أسوان', 'capital_en' => 'Aswan', 'latitude' => 24.0889, 'longitude' => 32.8998, 'region_ar' => 'صعيد مصر', 'region_en' => 'Upper Egypt', 'population' => '1,600,000', 'area_km2' => '62,726'],
            ['name_ar' => 'مطروح', 'name_en' => 'Matrouh', 'slug_ar' => 'مطروح', 'slug_en' => 'matrouh', 'capital_ar' => 'مرسى مطروح', 'capital_en' => 'Marsa Matrouh', 'latitude' => 31.3543, 'longitude' => 27.2373, 'region_ar' => 'الصحراء الغربية', 'region_en' => 'Western Desert', 'population' => '500,000', 'area_km2' => '212,112'],
            ['name_ar' => 'الوادي الجديد', 'name_en' => 'New Valley', 'slug_ar' => 'الوادي-الجديد', 'slug_en' => 'new-valley', 'capital_ar' => 'الخارجة', 'capital_en' => 'Kharga', 'latitude' => 25.4379, 'longitude' => 30.5503, 'region_ar' => 'الصحراء الغربية', 'region_en' => 'Western Desert', 'population' => '250,000', 'area_km2' => '440,098'],
        ];

        $result = [];
        $order = 5;

        foreach ($remaining as $gov) {
            $nameEn = $gov['name_en'];
            $nameAr = $gov['name_ar'];
            $capitalEn = $gov['capital_en'];
            $capitalAr = $gov['capital_ar'];

            $result[] = array_merge($gov, [
                'map_zoom' => 12,
                'meta_title_ar' => "شركة سياحة في {$nameAr} | إيز ترافل - رحلات من {$capitalAr}",
                'meta_title_en' => "Travel Agency in {$nameEn} | Ease Travel - Tours from {$capitalEn}",
                'meta_description_ar' => "إيز ترافل تخدم سكان {$nameAr} و{$capitalAr}. رحلات داخلية وخارجية، عمرة، استخراج فيزا شنغن. احجز الآن!",
                'meta_description_en' => "Ease Travel serves {$nameEn} and {$capitalEn} with domestic tours, Umrah, and Schengen visa services. Book now!",
                'excerpt_ar' => "محافظة {$nameAr}، عاصمتها {$capitalAr}. إيز ترافل توفر خدمات سياحية متكاملة لسكان {$nameAr} تشمل رحلات داخلية وخارجية وعمرة واستخراج تأشيرات.",
                'excerpt_en' => "{$nameEn} Governorate, capital: {$capitalEn}. Ease Travel provides complete tourism services for {$nameEn} residents including domestic tours, international trips, Umrah, and visa services.",
                'body_ar' => "<h2>إيز ترافل — شركة سياحة تخدم {$nameAr}</h2>
<p>سكان محافظة {$nameAr} و{$capitalAr} — إيز ترافل توفر لكم رحلات سياحية بأسعار مميزة وحجز أونلاين سهل عبر الموقع أو الواتساب.</p>

<h3>خدماتنا في {$nameAr}</h3>
<ul>
<li><strong>رحلات داخلية:</strong> رحلات إلى شرم الشيخ، الغردقة، دهب، الأقصر وأسوان، والساحل الشمالي من {$capitalAr}. فنادق 4 و5 نجوم مع أتوبيسات مكيفة.</li>
<li><strong>رحلات خارجية:</strong> اسطنبول، دبي، ماليزيا، وأوروبا. نتولى حجز الطيران والفنادق والبرنامج السياحي.</li>
<li><strong>استخراج فيزا شنغن:</strong> تجهيز ملف التأشيرة بالكامل وحجز مواعيد السفارات لسكان {$nameAr}.</li>
<li><strong>رحلات عمرة:</strong> باقات عمرة شاملة الطيران والفندق والنقل الداخلي من أقرب مطار.</li>
<li><strong>حجز فنادق وطيران:</strong> أسعار تنافسية لحجز الفنادق وتذاكر الطيران من {$capitalAr}.</li>
</ul>

<h3>لماذا تحجز مع إيز ترافل من {$nameAr}؟</h3>
<ul>
<li>حجز أونلاين سهل من أي مكان — لا تحتاج للسفر للقاهرة</li>
<li>دعم واتساب على مدار الساعة 24/7</li>
<li>أسعار بالجنيه المصري بدون رسوم خفية</li>
<li>خبرة في خدمة المسافرين من جميع محافظات مصر</li>
<li>باقات تناسب كل الميزانيات — من الاقتصادية إلى VIP</li>
</ul>

<h3>اتصل بنا من {$nameAr}</h3>
<p>تواصل معنا الآن عبر الواتساب أو الموقع واحجز رحلتك القادمة من {$capitalAr}. فريق إيز ترافل جاهز لمساعدتك في اختيار أفضل رحلة تناسب ميزانيتك وجدولك.</p>",

                'body_en' => "<h2>Ease Travel — Serving {$nameEn}</h2>
<p>Residents of {$nameEn} Governorate and {$capitalEn} — Ease Travel offers great-value tours with easy online booking via our website or WhatsApp.</p>

<h3>Our Services in {$nameEn}</h3>
<ul>
<li><strong>Domestic Tours:</strong> Trips to Sharm El Sheikh, Hurghada, Dahab, Luxor & Aswan, and North Coast from {$capitalEn}. 4 & 5-star hotels with air-conditioned transport.</li>
<li><strong>International Tours:</strong> Istanbul, Dubai, Malaysia, and Europe. We handle flights, hotels, and tour programs.</li>
<li><strong>Schengen Visa:</strong> Complete visa file preparation and embassy appointments for {$nameEn} residents.</li>
<li><strong>Umrah Packages:</strong> Complete Umrah packages including flights, hotels, and internal transfers from the nearest airport.</li>
<li><strong>Hotel & Flight Bookings:</strong> Competitive prices for hotels and flight tickets from {$capitalEn}.</li>
</ul>

<h3>Why Book with Ease Travel from {$nameEn}?</h3>
<ul>
<li>Easy online booking from anywhere — no need to travel to Cairo</li>
<li>24/7 WhatsApp support</li>
<li>Prices in Egyptian Pounds with no hidden fees</li>
<li>Experience serving travelers from all Egyptian governorates</li>
<li>Packages for every budget — from economy to VIP</li>
</ul>

<h3>Contact Us from {$nameEn}</h3>
<p>Reach out now via WhatsApp or our website and book your next trip from {$capitalEn}. The Ease Travel team is ready to help you choose the perfect trip for your budget and schedule.</p>",

                'faqs' => [
                    ['question_ar' => "هل إيز ترافل تخدم سكان {$nameAr}؟", 'question_en' => "Does Ease Travel serve {$nameEn} residents?", 'answer_ar' => "نعم، إيز ترافل تخدم جميع سكان {$nameAr} و{$capitalAr} من خلال الحجز الأونلاين والواتساب.", 'answer_en' => "Yes, Ease Travel serves all {$nameEn} and {$capitalEn} residents through online booking and WhatsApp."],
                    ['question_ar' => "كيف أحجز رحلة من {$capitalAr}؟", 'question_en' => "How do I book a trip from {$capitalEn}?", 'answer_ar' => "احجز من خلال موقعنا ease-travel.online أو تواصل معنا على الواتساب. كل الحجوزات تتم إلكترونياً.", 'answer_en' => "Book through our website ease-travel.online or contact us on WhatsApp. All bookings are done digitally."],
                    ['question_ar' => "ما هي أنواع الرحلات المتاحة من {$nameAr}؟", 'question_en' => "What types of trips are available from {$nameEn}?", 'answer_ar' => "نوفر رحلات داخلية (شرم الشيخ، الغردقة، الأقصر)، رحلات خارجية (اسطنبول، دبي، أوروبا)، عمرة، واستخراج تأشيرات.", 'answer_en' => "We offer domestic tours (Sharm, Hurghada, Luxor), international trips (Istanbul, Dubai, Europe), Umrah, and visa services."],
                ],
                'is_published' => true,
                'is_featured' => false,
                'sort_order' => $order++,
            ]);
        }

        return $result;
    }
}
