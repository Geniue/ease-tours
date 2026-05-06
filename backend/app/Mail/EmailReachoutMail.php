<?php

namespace App\Mail;

use App\Models\EmailReachout;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class EmailReachoutMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public EmailReachout $reachout)
    {
    }

    public function envelope(): Envelope
    {
        $operationsAddress = new Address(
            EmailReachout::OPERATIONS_EMAIL,
            EmailReachout::OPERATIONS_NAME
        );

        return new Envelope(
            from: $operationsAddress,
            replyTo: [$operationsAddress],
            subject: $this->reachout->subject,
        );
    }

    public function content(): Content
    {
        $locale = $this->reachout->emailLocale();
        $copy = $this->emailCopy($locale);

        return new Content(
            view: 'emails.reachout',
            text: 'emails.reachout-text',
            with: [
                'reachout' => $this->reachout,
                'plainBody' => $this->plainBody(),
                'locale' => $locale,
                'dir' => $locale === EmailReachout::LOCALE_AR ? 'rtl' : 'ltr',
                'isRtl' => $locale === EmailReachout::LOCALE_AR,
                'copy' => $copy,
                'websiteUrl' => EmailReachout::WEBSITE_URL,
                'contactUrl' => EmailReachout::contactUrlForLocale($locale),
                'logoUrl' => EmailReachout::LOGO_URL,
                'operationsEmail' => EmailReachout::OPERATIONS_EMAIL,
                'hasAttachments' => count($this->reachout->attachments ?? []) > 0,
            ],
        );
    }

    public function attachments(): array
    {
        return collect($this->reachout->attachments ?? [])
            ->filter(fn (string $path): bool => Storage::disk('local')->exists($path))
            ->map(fn (string $path): Attachment => Attachment::fromStorageDisk('local', $path)
                ->as($this->attachmentDisplayName($path)))
            ->all();
    }

    private function plainBody(): string
    {
        $body = str_replace(['<br>', '<br/>', '<br />', '</p>', '</li>'], "\n", $this->reachout->body);

        return trim(html_entity_decode(strip_tags($body)));
    }

    private function attachmentDisplayName(string $path): string
    {
        return preg_replace('/^[0-9a-f-]{36}-/i', '', basename($path)) ?: basename($path);
    }

    private function emailCopy(string $locale): array
    {
        if ($locale === EmailReachout::LOCALE_AR) {
            return [
                'preheader' => 'فريق عمليات Ease Travel لدعم سفر الشركات والتأشيرات والطيران والفنادق وترتيبات المجموعات.',
                'eyebrow' => 'دعم سفر الشركات',
                'headline' => 'دعم السفر والتأشيرات والحجوزات من فريق عمليات واحد.',
                'subheadline' => 'طيران، فنادق، تنسيق تأشيرات، رحلات مجموعات، وترتيبات سفر مصممة للشركات.',
                'attachmentsTitle' => 'تم إرفاق ملفات:',
                'attachmentsText' => 'يرجى مراجعة الملفات المرفقة للاطلاع على العرض أو المقترح أو التفاصيل الداعمة.',
                'cta' => 'الرد على فريق عمليات Ease Travel',
                'preferForm' => 'تفضل نموذج التواصل؟',
                'contactPage' => 'زيارة صفحة التواصل',
                'footerName' => 'فريق عمليات Ease Travel',
            ];
        }

        return [
            'preheader' => 'Ease Travel operations support for corporate travel, visas, flights, hotels, and group arrangements.',
            'eyebrow' => 'Corporate Travel Support',
            'headline' => 'Travel, visa, and booking support from one operations team.',
            'subheadline' => 'Flights, hotels, visa coordination, group trips, and tailored travel arrangements for companies.',
            'attachmentsTitle' => 'Attachments included:',
            'attachmentsText' => 'Please review the attached files for the offer, proposal, or supporting details.',
            'cta' => 'Reply to Ease Travel Operations',
            'preferForm' => 'Prefer a form?',
            'contactPage' => 'Visit our contact page',
            'footerName' => 'Ease Travel Operations',
        ];
    }
}
