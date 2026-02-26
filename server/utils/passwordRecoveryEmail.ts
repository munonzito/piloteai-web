import { firebaseAuth } from "~~/server/lib/firebase";
import { resend } from "~~/server/lib/resend";

export async function sendPasswordRecoveryEmail({ email }: { email: string }) {
    const normalizedEmail = email.toLowerCase().trim();

    try {
        await firebaseAuth.getUserByEmail(normalizedEmail);
    } catch (error: any) {
        if (error.code === "auth/user-not-found") {
            return {
                success: true,
                message: "Si el correo existe, recibirás un enlace de recuperación",
            };
        }
        throw error;
    }

    const firebaseResetLink = await firebaseAuth.generatePasswordResetLink(
        normalizedEmail,
        {
            url: `${process.env.APP_URL}/cambiar-contrasena`,
            handleCodeInApp: false,
        }
    );

    const url = new URL(firebaseResetLink);
    const oobCode = url.searchParams.get("oobCode");
    const apiKey = url.searchParams.get("apiKey");

    if (!oobCode) {
        throw new Error("No se pudo extraer el código de recuperación");
    }

    const customResetLink = `${process.env.APP_URL}/cambiar-contrasena?oobCode=${oobCode}&apiKey=${apiKey}`;

    const result = await resend.emails.send({
        from: "Piloteai <noreply@mail.piloteai.cl>",
        to: normalizedEmail,
        subject: "Recupera tu contraseña de Piloteai",
        html: generatePasswordRecoveryTemplate(customResetLink, normalizedEmail),
    });

    return {
        success: true,
        message: "Email de recuperación enviado correctamente",
        messageId: result.data?.id,
    };
}

function generatePasswordRecoveryTemplate(resetLink: string, email: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Recupera tu contraseña - Piloteai</title>
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
        .alert-box { background-color: rgba(245, 158, 11, 0.08); border-left: 4px solid #F59E0B; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .alert-box p { margin: 0; color: #94A7BE; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Recuperación de Contraseña</h1>
        </div>
        <div class="content">
          <h2>Hola,</h2>
          <p>Hemos recibido una solicitud para crear o restablecer la contraseña de tu cuenta de <strong>Piloteai</strong> asociada al correo <strong>${email}</strong>.</p>
          <p style="text-align: center;">
            <a href="${resetLink}" class="button">Crear o Restablecer Contraseña</a>
          </p>
          <p>Si no puedes hacer clic, copia y pega este enlace:</p>
          <p style="word-break: break-all;"><a href="${resetLink}">${resetLink}</a></p>
          <p><strong>Información importante:</strong></p>
          <ul>
            <li>Este enlace expira en <strong>1 hora</strong></li>
            <li>Solo puede usarse <strong>una vez</strong></li>
          </ul>
          <div class="alert-box">
            <p><strong>¿No solicitaste este cambio?</strong> Puedes ignorar este mensaje. Tu contraseña actual seguirá siendo válida.</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2025 Piloteai. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
