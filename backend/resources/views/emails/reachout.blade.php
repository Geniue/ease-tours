<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $reachout->subject }}</title>
</head>
<body style="margin:0;background:#f6f7fb;color:#111827;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7fb;padding:24px 12px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
                    <tr>
                        <td style="padding:24px 28px;border-bottom:1px solid #eef2f7;">
                            <strong style="font-size:18px;color:#1a73a7;">Ease Travel</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px;">
                            {!! $reachout->body !!}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #eef2f7;color:#6b7280;font-size:13px;">
                            Ease Travel<br>
                            <a href="https://ease-travel.online" style="color:#1a73a7;">ease-travel.online</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
