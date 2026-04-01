<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new \Illuminate\Mail\Mailables\Address(
                config('mail.addresses.booking', 'booking@ease-travel.online'),
                'Ease Travel Bookings'
            ),
            subject: '🎉 حجز جديد - ' . $this->booking->customer_name . ' | ' . $this->booking->trip->title_ar,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.booking',
            with: ['booking' => $this->booking],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
