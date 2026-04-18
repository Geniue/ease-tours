<?php

namespace App\Filament\Resources\ClientResource\Pages;

use App\Filament\Resources\ClientResource;
use App\Models\Client;
use App\Models\ClientTransaction;
use Filament\Actions;
use Filament\Forms;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\Page;

class ViewClient extends Page
{
    protected static string $resource = ClientResource::class;

    protected static string $view = 'filament.pages.client-profile';

    public Client $record;

    public function mount(Client $record): void
    {
        $this->record = $record->load('transactions');
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('add_transaction')
                ->label('Add Service')
                ->icon('heroicon-o-plus-circle')
                ->color('success')
                ->form([
                    Forms\Components\DatePicker::make('transaction_date')
                        ->label('Date')
                        ->required()
                        ->default(now()),
                    Forms\Components\TextInput::make('service')
                        ->label('Service')
                        ->maxLength(255),
                    Forms\Components\Select::make('status')
                        ->options([
                            'waiting' => 'Waiting',
                            'done'    => 'Done',
                            'lost'    => 'Lost',
                        ])
                        ->default('waiting')
                        ->required(),
                    Forms\Components\DatePicker::make('follow_up_date')
                        ->label('Follow Up'),
                    Forms\Components\Grid::make(3)->schema([
                        Forms\Components\TextInput::make('net_price')
                            ->label('Net Price (Cost)')
                            ->numeric()
                            ->prefix('EGP')
                            ->default(0),
                        Forms\Components\TextInput::make('sell_price')
                            ->label('Sell Price')
                            ->numeric()
                            ->prefix('EGP')
                            ->default(0),
                        Forms\Components\TextInput::make('current_money')
                            ->label('Collected (Deposit)')
                            ->numeric()
                            ->prefix('EGP'),
                    ]),
                    Forms\Components\Textarea::make('notes')
                        ->rows(2),
                ])
                ->action(function (array $data): void {
                    ClientTransaction::create([
                        'client_id'        => $this->record->id,
                        'client_name'      => $this->record->name,
                        'transaction_date' => $data['transaction_date'],
                        'service'          => $data['service'] ?? '',
                        'status'           => $data['status'],
                        'follow_up_date'   => $data['follow_up_date'] ?? null,
                        'net_price'        => $data['net_price'] ?? 0,
                        'sell_price'       => $data['sell_price'] ?? 0,
                        'current_money'    => $data['current_money'] ?? null,
                        'notes'            => $data['notes'] ?? null,
                    ]);

                    $this->record->load('transactions');

                    Notification::make()
                        ->title('Service added successfully')
                        ->success()
                        ->send();
                }),

            Actions\Action::make('edit')
                ->label('Edit Client')
                ->icon('heroicon-o-pencil')
                ->url(fn () => EditClient::getUrl(['record' => $this->record])),
        ];
    }

    public function getViewData(): array
    {
        $transactions = $this->record->transactions()->orderByDesc('transaction_date')->get();

        $done    = $transactions->where('status', 'done');
        $waiting = $transactions->where('status', 'waiting');
        $lost    = $transactions->where('status', 'lost');

        $totalRevenue   = (float) $done->sum('sell_price');
        $totalProfit    = (float) $done->sum('profit');
        $totalCollected = (float) $transactions->sum('current_money');
        $outstanding    = max(0, $totalRevenue - $totalCollected);

        return [
            'client'         => $this->record,
            'transactions'   => $transactions,
            'stats' => [
                'total'          => $transactions->count(),
                'done'           => $done->count(),
                'waiting'        => $waiting->count(),
                'lost'           => $lost->count(),
                'total_revenue'  => $totalRevenue,
                'total_profit'   => $totalProfit,
                'total_collected'=> $totalCollected,
                'outstanding'    => $outstanding,
            ],
        ];
    }
}
