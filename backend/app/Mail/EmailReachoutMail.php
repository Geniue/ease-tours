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
        return new Content(
            view: 'emails.reachout',
            text: 'emails.reachout-text',
            with: [
                'reachout' => $this->reachout,
                'plainBody' => $this->plainBody(),
                'websiteUrl' => EmailReachout::WEBSITE_URL,
                'contactUrl' => EmailReachout::CONTACT_URL,
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
}
