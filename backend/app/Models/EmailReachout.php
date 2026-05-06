<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmailReachout extends Model
{
    public const LOCALE_EN = 'en';

    public const LOCALE_AR = 'ar';

    public const SUPPORTED_LOCALES = [
        self::LOCALE_EN,
        self::LOCALE_AR,
    ];

    public const OPERATIONS_EMAIL = 'operations@ease-travel.online';

    public const OPERATIONS_NAME = 'Ease Travel Operations';

    public const WEBSITE_URL = 'https://ease-travel.online';

    public const CONTACT_URL = 'https://ease-travel.online/en/contact';

    public const LOGO_URL = 'https://ease-travel.online/logo.jpg';

    protected $fillable = [
        'user_id',
        'locale',
        'recipient_sources',
        'manual_recipients',
        'recipient_emails',
        'recipient_count',
        'sent_count',
        'failed_recipients',
        'status',
        'subject',
        'body',
        'reply_to',
        'attachments',
        'sent_at',
    ];

    protected $casts = [
        'recipient_sources' => 'array',
        'recipient_emails' => 'array',
        'failed_recipients' => 'array',
        'attachments' => 'array',
        'sent_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function normalizeLocale(?string $locale): string
    {
        return in_array($locale, self::SUPPORTED_LOCALES, true)
            ? $locale
            : self::LOCALE_EN;
    }

    public static function contactUrlForLocale(?string $locale): string
    {
        return self::WEBSITE_URL . '/' . self::normalizeLocale($locale) . '/contact';
    }

    public function emailLocale(): string
    {
        return self::normalizeLocale($this->locale ?? null);
    }
}
