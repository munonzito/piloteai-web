import { H3Event } from "h3";
import crypto from "crypto";

export async function validateWebhook(event: H3Event) {
    const xSignature = getHeader(event, "x-signature");
    const xRequestId = getHeader(event, "x-request-id");
    const { "data.id": dataId } = getQuery(event);

    if (!xSignature) {
        return false;
    }

    const parts = xSignature.split(",");
    let ts: string | undefined;
    let v1: string | undefined;

    for (const part of parts) {
        const [key, value] = part.split("=");
        if (key === "ts") {
            ts = value;
        } else if (key === "v1") {
            v1 = value;
        }
    }

    if (!ts || !v1) {
        return false;
    }

    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;

    if (!secret) {
        throw new Error("MERCADO_PAGO_WEBHOOK_SECRET is not defined");
    }

    let manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
    if (!dataId) {
        manifest = `request-id:${xRequestId};ts:${ts};`;
    }
    if (!xRequestId) {
        manifest = `id:${dataId};ts:${ts};`;
    }
    if (!xRequestId && !dataId) {
        manifest = `ts:${ts};`;
    }

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(manifest);
    const sha = hmac.digest("hex");

    return sha === v1;
}
