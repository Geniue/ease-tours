<?php

namespace App\Filament\Resources\EmailReachoutResource\Pages;

use App\Filament\Resources\EmailReachoutResource;
use App\Mail\EmailReachoutMail;
use App\Models\EmailReachout;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Throwable;

class CreateEmailReachout extends CreateRecord
{
    protected static string $resource = EmailReachoutResource::class;

    protected static bool $canCreateAnother = false;

    protected ?bool $hasDatabaseTransactions = false;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $recipients = EmailReachoutResource::resolveRecipients(
            $data['recipient_sources'] ?? [],
            $data['manual_recipients'] ?? null
        );

        if ($recipients === []) {
            throw ValidationException::withMessages([
                'data.recipient_sources' => 'Choose at least one recipient source with valid email addresses.',
            ]);
        }

        $data['recipient_emails'] = $recipients;
        $data['recipient_count'] = count($recipients);
        $data['sent_count'] = 0;
        $data['failed_recipients'] = [];
        $data['status'] = 'pending';
        $data['user_id'] = auth()->id();
        $data['reply_to'] = EmailReachout::OPERATIONS_EMAIL;

        return $data;
    }

    protected function handleRecordCreation(array $data): Model
    {
        $record = parent::handleRecordCreation($data);

        $this->sendReachout($record);

        return $record;
    }

    protected function getCreatedNotification(): ?Notification
    {
        return null;
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }

    private function sendReachout(EmailReachout $reachout): void
    {
        $sentCount = 0;
        $failures = [];

        foreach ($reachout->recipient_emails as $email) {
            try {
                Mail::to($email)->send(new EmailReachoutMail($reachout));
                $sentCount++;
            } catch (Throwable $exception) {
                report($exception);

                $failures[] = [
                    'email' => $email,
                    'error' => $exception->getMessage(),
                ];
            }
        }

        $status = match (true) {
            $sentCount === 0 => 'failed',
            $failures !== [] => 'partial',
            default => 'sent',
        };

        $reachout->update([
            'sent_count' => $sentCount,
            'failed_recipients' => $failures,
            'status' => $status,
            'sent_at' => now(),
        ]);

        $notification = Notification::make()
            ->title($this->notificationTitle($reachout->recipient_count, $sentCount, count($failures)));

        if ($status === 'sent') {
            $notification->success();
        } elseif ($status === 'partial') {
            $notification->warning();
        } else {
            $notification->danger();
        }

        $notification->send();
    }

    private function notificationTitle(int $recipientCount, int $sentCount, int $failedCount): string
    {
        if ($failedCount === 0) {
            return "Reachout sent to {$sentCount} recipient" . ($sentCount === 1 ? '' : 's') . '.';
        }

        return "Reachout sent to {$sentCount} of {$recipientCount} recipients. {$failedCount} failed.";
    }
}
