<x-mail::message>
# 📩 رسالة جديدة من الموقع

تم استلام رسالة جديدة من نموذج التواصل:

<x-mail::table>
| | |
|:---|:---|
| **الاسم** | {{ $contact->name }} |
| **البريد الإلكتروني** | {{ $contact->email }} |
| **الهاتف** | {{ $contact->phone ?? 'غير محدد' }} |
| **التاريخ** | {{ $contact->created_at->format('Y-m-d H:i') }} |
</x-mail::table>

### 💬 الرسالة:
{{ $contact->message }}

<x-mail::button :url="config('app.url') . '/admin/contact-messages/' . $contact->id . '/edit'">
عرض في لوحة التحكم
</x-mail::button>

{{ config('app.name') }}
</x-mail::message>
