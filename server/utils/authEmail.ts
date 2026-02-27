import { firebaseAuth } from "~~/server/lib/firebase";
import { resend } from "~~/server/lib/resend";

interface SendSignInLinkOptions {
    email: string;
    isSubscriptionConfirmation?: boolean;
}

export async function sendSignInLinkEmail({
    email,
    isSubscriptionConfirmation = false,
}: SendSignInLinkOptions) {
    const normalizedEmail = email.toLowerCase().trim();

    const actionCodeSettings = {
        url: `${process.env.APP_URL}/acceder/callback?email=${encodeURIComponent(normalizedEmail)}`,
        handleCodeInApp: true,
    };

    const signInLink = await firebaseAuth.generateSignInWithEmailLink(
        normalizedEmail,
        actionCodeSettings
    );

    const subject = isSubscriptionConfirmation
        ? "¡Suscripción confirmada! Accede a Piloteai"
        : "Tu enlace de acceso a Piloteai";

    const result = await resend.emails.send({
        from: "Piloteai <noreply@mail.piloteai.com>",
        to: normalizedEmail,
        subject,
        html: generateEmailTemplate(signInLink, normalizedEmail, isSubscriptionConfirmation),
    });

    return {
        success: true,
        message: "Email enviado correctamente",
        messageId: result.data?.id,
    };
}

function generateEmailTemplate(
    signInLink: string,
    email: string,
    isSubscriptionConfirmation: boolean
): string {
    const title = isSubscriptionConfirmation
        ? "¡Suscripción confirmada!"
        : "¡Bienvenido a Piloteai!";

    const welcomeText = isSubscriptionConfirmation
        ? "¡Genial! Tu suscripción ha sido confirmada exitosamente. Ahora puedes acceder a todo el contenido de Piloteai para preparar tus exámenes DGAC."
        : `Hemos recibido una solicitud para acceder a tu cuenta de Piloteai con el correo <strong>${email}</strong>.`;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Accede a Piloteai</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #060E1A; }
        .container { max-width: 600px; margin: 0 auto; background: #0C1A2E; border-radius: 12px; overflow: hidden; border: 1px solid #3EBD4F; }
        .header { background: linear-gradient(135deg, #1A2B45 0%, #0C1A2E 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
        .content { padding: 40px 20px; color: #94A7BE; }
        .content h2 { color: #F0F4F8; }
        .content a { color: #3EBD4F; }
        .button { display: inline-block; background: #3EBD4F; color: white !important; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; color: #5A6F87; font-size: 14px; background-color: #060E1A; }
        .success-badge { background: #3EBD4F; color: white; padding: 8px 16px; display: inline-block; font-size: 14px; font-weight: bold; margin-bottom: 20px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${isSubscriptionConfirmation ? '<div class="success-badge">Suscripción Activa</div>' : ""}
          <h2>Hola,</h2>
          <p>${welcomeText}</p>
          <p style="text-align: center;">
            <a href="${signInLink}" class="button">Acceder a Piloteai</a>
          </p>
          <p>Si no puedes hacer clic, copia y pega este enlace en tu navegador:</p>
          <p><a href="${signInLink}">${signInLink}</a></p>
          <p><strong>Importante:</strong></p>
          <ul>
            <li>Este enlace expira en 1 hora</li>
            <li>Solo puede usarse una vez</li>
            <li>Debe abrirse en el mismo navegador donde solicitaste el acceso</li>
          </ul>
          ${isSubscriptionConfirmation
            ? "<p>¡Prepárate para aprobar tus exámenes DGAC!</p>"
            : "<p>Si no solicitaste este acceso, puedes ignorar este mensaje.</p>"
          }
        </div>
        <div class="footer">
          <p>&copy; 2025 Piloteai. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
