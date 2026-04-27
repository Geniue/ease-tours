<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Trip;
use Illuminate\Database\Seeder;

class UaeVisaTourSeeder extends Seeder
{
    public function run(): void
    {
        $outbound = Category::where('type', 'outbound')->first();

        if (!$outbound) {
            return;
        }

        $sharedImage = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80';

        $tours = [
            [
                'match' => ['slug_en' => 'dubai-city-of-dreams'],
                'data' => [
                    'category_id' => $outbound->id,
                    'title_ar' => 'دبي - تأشيرة الإمارات ملف مؤهل عالي',
                    'title_en' => 'Dubai UAE Visa - High Qualification Profile',
                    'slug_ar' => 'دبي-مدينة-الاحلام',
                    'slug_en' => 'dubai-city-of-dreams',
                    'description_ar' => '<h2>تأشيرة الإمارات من مصر لملف المؤهل العالي</h2><p>لو بتخطط تسافر دبي أو أبوظبي أو أي إمارة في الإمارات، Ease Travel بتساعدك في تجهيز وتقديم طلب تأشيرة الإمارات بخطوات واضحة وسريعة. هذا العرض مناسب للمتقدمين أصحاب المؤهل العالي أو الملف الأقوى، مع متابعة من فريقنا حتى صدور نتيجة الطلب.</p><p><strong>العرض الحالي:</strong> تأشيرة الإمارات بسعر 6500 جنيه، ومدة المعالجة المتوقعة حوالي 7 أيام بعد اكتمال الأوراق المطلوبة، حسب قرار جهة إصدار التأشيرة.</p><h3>الأوراق الأساسية المطلوبة</h3><ul><li>صورة واضحة من جواز السفر.</li><li>صورة شخصية حديثة بخلفية بيضاء أو واضحة.</li><li>قد يتم طلب مستندات إضافية حسب حالة المتقدم ونوع التأشيرة.</li></ul><p>يمكننا أيضًا مساعدتك في حجز طيران القاهرة دبي، الفنادق، التأمين، وبرنامج سياحي مناسب لرحلتك.</p>',
                    'description_en' => '<h2>UAE Visa from Egypt for High Qualification Profile</h2><p>Planning to travel to Dubai, Abu Dhabi, or any emirate in the UAE? Ease Travel helps you prepare and submit your UAE visa application with clear steps, fast handling, and proper follow-up until the result is issued.</p><p><strong>Current offer:</strong> UAE visa for EGP 6,500, with expected processing in around 7 days after completing the required documents, subject to the UAE visa authority decision.</p><h3>Basic required documents</h3><ul><li>Clear passport copy.</li><li>Recent personal photo with a white or clear background.</li><li>Additional documents may be requested depending on applicant profile and visa type.</li></ul><p>We can also help with Cairo to Dubai flights, hotel booking, insurance, and a custom UAE travel package.</p>',
                    'itinerary_ar' => '<h3>خطوات التقديم</h3><ol><li>تواصل معنا على واتساب أو الهاتف.</li><li>أرسل صورة جواز السفر والصورة الشخصية.</li><li>نراجع بياناتك ونؤكد السعر والمتطلبات النهائية.</li><li>نقدم الطلب ونتابع معك حتى صدور النتيجة.</li><li>بعد صدور التأشيرة، نساعدك في ترتيب الطيران والفندق عند الحاجة.</li></ol>',
                    'itinerary_en' => '<h3>Application Steps</h3><ol><li>Contact us by WhatsApp or phone.</li><li>Send your passport copy and personal photo.</li><li>We review your details and confirm final requirements.</li><li>We submit the application and follow up until the result is issued.</li><li>After visa issuance, we can help arrange flights and hotels if needed.</li></ol>',
                    'inclusions_ar' => '<h3>الخدمة تشمل</h3><ul><li>مراجعة الأوراق الأساسية قبل التقديم.</li><li>تجهيز طلب تأشيرة الإمارات.</li><li>متابعة حالة الطلب خلال مدة المعالجة.</li><li>إرشاد بخصوص الحجوزات المطلوبة للسفر.</li></ul><p><strong>تنبيه:</strong> الموافقة النهائية ومدة الإصدار حسب جهة إصدار التأشيرة في الإمارات، ولا يمكن ضمان قبول التأشيرة.</p>',
                    'inclusions_en' => '<h3>Service Includes</h3><ul><li>Review of basic documents before submission.</li><li>UAE visa application preparation.</li><li>Application follow-up during processing.</li><li>Guidance on travel bookings required for the trip.</li></ul><p><strong>Important:</strong> Final approval and processing time are controlled by the relevant UAE visa authority, and visa approval cannot be guaranteed.</p>',
                    'destination_ar' => 'دبي',
                    'destination_en' => 'Dubai',
                    'duration_days' => 7,
                    'base_price' => 6500.00,
                    'discounted_price' => null,
                    'currency' => 'EGP',
                    'featured_image' => $sharedImage,
                    'is_featured' => true,
                    'is_active' => true,
                    'coming_soon' => false,
                    'start_date' => now()->addDays(7),
                    'end_date' => now()->addDays(14),
                    'max_participants' => 30,
                ],
            ],
            [
                'match' => ['slug_en' => 'dubai-uae-visa-regular-profile'],
                'data' => [
                    'category_id' => $outbound->id,
                    'title_ar' => 'دبي - تأشيرة الإمارات ملف عادي',
                    'title_en' => 'Dubai UAE Visa - Regular Profile',
                    'slug_ar' => 'دبي-تأشيرة-الإمارات-ملف-عادي',
                    'slug_en' => 'dubai-uae-visa-regular-profile',
                    'description_ar' => '<h2>تأشيرة الإمارات من مصر للملف العادي</h2><p>هذا العرض مناسب للمتقدمين أصحاب الملف العادي أو الأساسي الراغبين في السفر إلى دبي أو الإمارات للسياحة، الزيارة، التسوق، أو رحلة قصيرة. Ease Travel تساعدك في تجهيز الأوراق وتقديم طلب تأشيرة الإمارات بطريقة منظمة وسهلة.</p><p><strong>العرض الحالي:</strong> تأشيرة الإمارات بسعر 7600 جنيه، ومدة المعالجة المتوقعة حوالي 7 أيام بعد اكتمال الأوراق المطلوبة، حسب قرار جهة إصدار التأشيرة.</p><h3>الأوراق الأساسية المطلوبة</h3><ul><li>صورة واضحة من جواز السفر.</li><li>صورة شخصية حديثة بخلفية بيضاء أو واضحة.</li><li>أي مستندات داعمة تطلب حسب حالة المتقدم.</li></ul><p>فريقنا يوضح لك المتطلبات قبل التقديم، ويتابع الطلب معك حتى صدور النتيجة.</p>',
                    'description_en' => '<h2>UAE Visa from Egypt for Regular Profile</h2><p>This offer is suitable for regular or basic applicant profiles travelling to Dubai or the UAE for tourism, visits, shopping, or a short personal trip. Ease Travel helps you prepare your documents and submit your UAE visa application in a clear, organized way.</p><p><strong>Current offer:</strong> UAE visa for EGP 7,600, with expected processing in around 7 days after completing the required documents, subject to the UAE visa authority decision.</p><h3>Basic required documents</h3><ul><li>Clear passport copy.</li><li>Recent personal photo with a white or clear background.</li><li>Any supporting documents requested based on applicant profile.</li></ul><p>Our team explains the requirements before submission and follows up with you until the result is issued.</p>',
                    'itinerary_ar' => '<h3>خطوات التقديم</h3><ol><li>تواصل مع Ease Travel لتأكيد نوع الملف والسعر.</li><li>أرسل صورة جواز السفر والصورة الشخصية.</li><li>نراجع الأوراق ونوضح إذا كان هناك مستندات إضافية.</li><li>يتم تقديم الطلب ومتابعته خلال فترة المعالجة.</li><li>بعد صدور التأشيرة، يمكنك طلب حجز الطيران أو الفندق من نفس الفريق.</li></ol>',
                    'itinerary_en' => '<h3>Application Steps</h3><ol><li>Contact Ease Travel to confirm profile type and price.</li><li>Send your passport copy and personal photo.</li><li>We review the documents and explain whether additional items are needed.</li><li>The application is submitted and followed up during processing.</li><li>After visa issuance, you can request flight or hotel booking from the same team.</li></ol>',
                    'inclusions_ar' => '<h3>الخدمة تشمل</h3><ul><li>مراجعة المستندات الأساسية.</li><li>تجهيز وتقديم طلب تأشيرة الإمارات.</li><li>متابعة الطلب خلال فترة المعالجة.</li><li>إمكانية تنسيق حجز الطيران والفندق حسب رغبتك.</li></ul><p><strong>تنبيه:</strong> قبول التأشيرة ومدة الإصدار حسب جهة إصدار التأشيرة في الإمارات. لا تؤكد حجوزات غير قابلة للاسترداد قبل التأكد من حالة التأشيرة.</p>',
                    'inclusions_en' => '<h3>Service Includes</h3><ul><li>Basic document review.</li><li>UAE visa application preparation and submission.</li><li>Application follow-up during processing.</li><li>Optional support for flights and hotel booking.</li></ul><p><strong>Important:</strong> Visa approval and processing time are controlled by the relevant UAE visa authority. Do not confirm non-refundable bookings before checking your visa status.</p>',
                    'destination_ar' => 'دبي',
                    'destination_en' => 'Dubai',
                    'duration_days' => 7,
                    'base_price' => 7600.00,
                    'discounted_price' => null,
                    'currency' => 'EGP',
                    'featured_image' => $sharedImage,
                    'is_featured' => false,
                    'is_active' => true,
                    'coming_soon' => false,
                    'start_date' => now()->addDays(7),
                    'end_date' => now()->addDays(14),
                    'max_participants' => 30,
                ],
            ],
        ];

        foreach ($tours as $tour) {
            Trip::updateOrCreate($tour['match'], $tour['data']);
        }
    }
}
