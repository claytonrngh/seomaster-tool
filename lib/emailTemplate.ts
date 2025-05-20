export function getVerificationEmailHtml({
  siteName,
  logoUrl,
  actionUrl,
}: {
  siteName: string;
  logoUrl: string;
  actionUrl: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <img src="${logoUrl}" alt="${siteName}" style="max-width: 120px; margin-bottom: 20px;" />
      <h2>Verify your email for ${siteName}</h2>
      <p>Click the button below to verify your email address:</p>
      <p><a href="${actionUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p><a href="${actionUrl}">${actionUrl}</a></p>
      <p>This link will expire in 24 hours.</p>
    </div>
  `;
}

export function getPasswordResetEmailHtml({
  siteName,
  logoUrl,
  actionUrl,
}: {
  siteName: string;
  logoUrl: string;
  actionUrl: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <img src="${logoUrl}" alt="${siteName}" style="max-width: 120px; margin-bottom: 20px;" />
      <h2>Reset your password for ${siteName}</h2>
      <p>Click the button below to reset your password:</p>
      <p><a href="${actionUrl}" style="display: inline-block; padding: 10px 20px; background-color: #EF4444; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p><a href="${actionUrl}">${actionUrl}</a></p>
      <p>This link is valid for 24 hours only.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;
}

export function getWelcomeEmailHtml({
  siteName,
  logoUrl,
  actionUrl,
}: {
  siteName: string;
  logoUrl: string;
  actionUrl: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <img src="${logoUrl}" alt="${siteName}" style="max-width: 120px; margin-bottom: 20px;" />
      <h2>Welcome to ${siteName}!</h2>
      <p>Your email has been successfully verified.</p>
      <p>Click the button below to start exploring:</p>
      <p><a href="${actionUrl}" style="display: inline-block; padding: 10px 20px; background-color: #10B981; color: white; text-decoration: none; border-radius: 5px;">Go to Dashboard</a></p>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p><a href="${actionUrl}">${actionUrl}</a></p>
      <p>We’re excited to have you on board!</p>
    </div>
  `;
}