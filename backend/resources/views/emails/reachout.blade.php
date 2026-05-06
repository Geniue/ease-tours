<!doctype html>
<html lang="{{ $locale }}" dir="{{ $dir }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>{{ $reachout->subject }}</title>
    <style>
        @media only screen and (max-width: 620px) {
            .email-shell { width: 100% !important; }
            .email-padding { padding-left: 18px !important; padding-right: 18px !important; }
            .logo-box { width: 112px !important; height: 112px !important; }
            .brand-title { font-size: 22px !important; line-height: 28px !important; }
            .email-content { font-size: 15px !important; line-height: 24px !important; }
            .cta-button { display: block !important; width: auto !important; text-align: center !important; }
        }

        .email-content p { margin: 0 0 16px; }
        .email-content ul, .email-content ol { margin: 0 0 18px 22px; padding: 0; }
        .email-content li { margin: 0 0 8px; }
        .email-content a { color: #0f6f9f; font-weight: 700; text-decoration: underline; }
        .email-content h1, .email-content h2, .email-content h3 {
            color: #0b3558;
            line-height: 1.25;
            margin: 0 0 14px;
        }
    </style>
</head>
<body dir="{{ $dir }}" style="margin:0;padding:0;background:#eef3f8;color:#172033;font-family:Arial,Tahoma,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        {{ $copy['preheader'] }}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3f8;margin:0;padding:0;">
        <tr>
            <td align="center" style="padding:28px 12px;">
                <table role="presentation" width="680" cellpadding="0" cellspacing="0" class="email-shell" style="width:680px;max-width:680px;border-collapse:separate;border-spacing:0;">
                    <tr>
                        <td style="background:#0b3558;border-radius:20px 20px 0 0;overflow:hidden;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="email-padding" style="padding:30px 34px 26px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="{{ $dir }}">
                                            <tr>
                                                @if ($isRtl)
                                                    <td align="right" style="vertical-align:middle;padding-left:22px;text-align:right;">
                                                        <div style="font-size:12px;line-height:18px;letter-spacing:.08em;color:#d8ad4c;font-weight:700;">
                                                            {{ $copy['eyebrow'] }}
                                                        </div>
                                                        <div class="brand-title" style="margin-top:8px;font-size:28px;line-height:34px;color:#ffffff;font-weight:700;">
                                                            {{ $copy['headline'] }}
                                                        </div>
                                                        <div style="margin-top:10px;font-size:14px;line-height:22px;color:#dce8f2;">
                                                            {{ $copy['subheadline'] }}
                                                        </div>
                                                    </td>
                                                    <td align="right" style="vertical-align:middle;width:142px;">
                                                        <a href="{{ $websiteUrl }}" target="_blank" style="text-decoration:none;">
                                                            <img src="{{ $logoUrl }}" width="132" height="132" alt="Ease Travel" class="logo-box" style="display:block;width:132px;height:132px;border:0;border-radius:18px;background:#ffffff;object-fit:contain;">
                                                        </a>
                                                    </td>
                                                @else
                                                    <td align="left" style="vertical-align:middle;width:142px;">
                                                        <a href="{{ $websiteUrl }}" target="_blank" style="text-decoration:none;">
                                                            <img src="{{ $logoUrl }}" width="132" height="132" alt="Ease Travel" class="logo-box" style="display:block;width:132px;height:132px;border:0;border-radius:18px;background:#ffffff;object-fit:contain;">
                                                        </a>
                                                    </td>
                                                    <td align="left" style="vertical-align:middle;padding-left:22px;text-align:left;">
                                                        <div style="font-size:12px;line-height:18px;letter-spacing:.08em;text-transform:uppercase;color:#d8ad4c;font-weight:700;">
                                                            {{ $copy['eyebrow'] }}
                                                        </div>
                                                        <div class="brand-title" style="margin-top:8px;font-size:28px;line-height:34px;color:#ffffff;font-weight:700;">
                                                            {{ $copy['headline'] }}
                                                        </div>
                                                        <div style="margin-top:10px;font-size:14px;line-height:22px;color:#dce8f2;">
                                                            {{ $copy['subheadline'] }}
                                                        </div>
                                                    </td>
                                                @endif
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#ffffff;border-left:1px solid #dfe7ef;border-right:1px solid #dfe7ef;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="{{ $dir }}">
                                <tr>
                                    <td class="email-padding email-content" dir="{{ $dir }}" align="{{ $isRtl ? 'right' : 'left' }}" style="padding:34px;color:#172033;font-size:16px;line-height:26px;text-align:{{ $isRtl ? 'right' : 'left' }};">
                                        {!! $reachout->body !!}
                                    </td>
                                </tr>

                                @if ($hasAttachments)
                                    <tr>
                                        <td class="email-padding" style="padding:0 34px 8px;">
                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #dfe7ef;border-radius:12px;">
                                                <tr>
                                                    <td align="{{ $isRtl ? 'right' : 'left' }}" style="padding:14px 16px;color:#43536a;font-size:14px;line-height:22px;text-align:{{ $isRtl ? 'right' : 'left' }};">
                                                        <strong style="color:#0b3558;">{{ $copy['attachmentsTitle'] }}</strong>
                                                        {{ $copy['attachmentsText'] }}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                @endif

                                <tr>
                                    <td class="email-padding" align="{{ $isRtl ? 'right' : 'left' }}" style="padding:18px 34px 34px;text-align:{{ $isRtl ? 'right' : 'left' }};">
                                        <table role="presentation" cellpadding="0" cellspacing="0" align="{{ $isRtl ? 'right' : 'left' }}">
                                            <tr>
                                                <td style="background:#d8ad4c;border-radius:999px;">
                                                    <a href="mailto:{{ $operationsEmail }}" class="cta-button" style="display:inline-block;padding:13px 22px;color:#0b3558;font-size:15px;line-height:20px;font-weight:700;text-decoration:none;border-radius:999px;">
                                                        {{ $copy['cta'] }}
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <div style="margin-top:14px;color:#66758a;font-size:13px;line-height:21px;">
                                            {{ $copy['preferForm'] }}
                                            <a href="{{ $contactUrl }}" target="_blank" style="color:#0f6f9f;font-weight:700;text-decoration:underline;">{{ $copy['contactPage'] }}</a>.
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f8fafc;border:1px solid #dfe7ef;border-top:0;border-radius:0 0 20px 20px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="{{ $dir }}">
                                <tr>
                                    <td class="email-padding" align="{{ $isRtl ? 'right' : 'left' }}" style="padding:22px 34px;color:#66758a;font-size:13px;line-height:21px;text-align:{{ $isRtl ? 'right' : 'left' }};">
                                        <strong style="color:#0b3558;">{{ $copy['footerName'] }}</strong><br>
                                        <a href="mailto:{{ $operationsEmail }}" style="color:#0f6f9f;text-decoration:underline;">{{ $operationsEmail }}</a>
                                        <span style="color:#a2adba;"> | </span>
                                        <a href="{{ $websiteUrl }}" target="_blank" style="color:#0f6f9f;text-decoration:underline;">ease-travel.online</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
