<x-mail::message>
# 🎉 حجز جديد

تم استلام حجز جديد من الموقع:

<x-mail::table>
| | |
|:---|:---|
| **اسم العميل** | {{ $booking->customer_name }} |
| **البريد الإلكتروني** | {{ $booking->customer_email }} |
| **الهاتف** | {{ $booking->customer_phone }} |
| **الرحلة** | {{ $booking->trip->title_ar }} |
| **عدد المسافرين** | {{ $booking->num_passengers }} |
| **السعر الإجمالي** | {{ number_format($booking->total_price) }} {{ $booking->currency }} |
| **التاريخ** | {{ $booking->created_at->format('Y-m-d H:i') }} |
</x-mail::table>

@if($booking->notes)
### 📝 ملاحظات:
{{ $booking->notes }}
@endif

<x-mail::button :url="config('app.url') . '/admin/bookings/' . $booking->id . '/edit'">
عرض في لوحة التحكم
</x-mail::button>

{{ config('app.name') }}
</x-mail::message>
