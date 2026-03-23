// src/app/api/cron/healthcheck/route.ts
export const runtime = "nodejs";

export async function GET(request: Request) {
    // Verifica che la chiamata venga da Vercel Cron e non da chiunque
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
    }

    await fetch(process.env.HEALTHCHECKS_URL!);

    return new Response("ok", { status: 200 });
}