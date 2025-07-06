<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Your Password</title>
</head>
<body style="font-family: sans-serif; background: #f9f9f9; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 6px;">
    <h2 style="color: #333;">Reset Your Password</h2>
    <p>Hi {{ $notifiable->name ?? 'there' }},</p>
    <p>We received a request to reset your password. Click the button below:</p>
    <p style="text-align: center;">
      <a href="{{ $url }}" style="display: inline-block; padding: 10px 20px; background: #3490dc; color: white; text-decoration: none; border-radius: 4px;">
        Reset Password
      </a>
    </p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Thanks,<br>{{ config('app.name') }}</p>
  </div>
</body>
</html>
