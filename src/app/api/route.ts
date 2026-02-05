import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    let mongoStatus = {
        connected: false,
        latency: 0,
        database: process.env.MONGODB_DB || 'N/A',
        error: null as string | null,
    };

    try {
        const client = await clientPromise;
        const pingStart = Date.now();
        await client.db().command({ ping: 1 });
        mongoStatus.connected = true;
        mongoStatus.latency = Date.now() - pingStart;
    } catch (error) {
        mongoStatus.error = error instanceof Error ? error.message : 'Unknown error';
    }

    const html = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Status - AddKaiThai CRS</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes pulse-ring { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .animate-pulse-ring { animation: pulse-ring 2s infinite; }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-5" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);">
  <div class="w-full max-w-xl space-y-5">
    
    <!-- Header Card -->
    <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
      <div class="text-5xl mb-3">🍗</div>
      <h1 class="text-2xl font-bold text-white">AddKaiThai CRS API</h1>
      <p class="text-white/50 text-sm mt-1">Version 1.0.0</p>
      <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
        ${mongoStatus.connected
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'}">
        <span class="w-2.5 h-2.5 rounded-full animate-pulse-ring ${mongoStatus.connected ? 'bg-emerald-400' : 'bg-red-400'}"></span>
        ${mongoStatus.connected ? 'All Systems Operational' : 'Service Unavailable'}
      </div>
    </div>

    <!-- Database Status -->
    <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <h2 class="text-xs uppercase tracking-wider text-white/50 mb-4">📊 Database Status</h2>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white/5 rounded-xl p-4 border border-white/5">
          <p class="text-white/50 text-xs mb-1">Type</p>
          <p class="text-white font-semibold">MongoDB Atlas</p>
        </div>
        <div class="bg-white/5 rounded-xl p-4 border border-white/5">
          <p class="text-white/50 text-xs mb-1">Status</p>
          <p class="font-semibold ${mongoStatus.connected ? 'text-emerald-400' : 'text-red-400'}">
            ${mongoStatus.connected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        <div class="bg-white/5 rounded-xl p-4 border border-white/5">
          <p class="text-white/50 text-xs mb-1">Database</p>
          <p class="text-white font-semibold">${mongoStatus.database}</p>
        </div>
        <div class="bg-white/5 rounded-xl p-4 border border-white/5">
          <p class="text-white/50 text-xs mb-1">Latency</p>
          <p class="font-semibold ${mongoStatus.connected ? 'text-emerald-400' : 'text-white/50'}">
            ${mongoStatus.connected ? mongoStatus.latency + 'ms' : 'N/A'}
          </p>
        </div>
      </div>
      ${mongoStatus.error ? `
        <div class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm break-all">
          ⚠️ ${mongoStatus.error}
        </div>
      ` : ''}
    </div>

    <!-- Endpoints -->
    <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <h2 class="text-xs uppercase tracking-wider text-white/50 mb-4">🔗 Available Endpoints</h2>
      <div class="space-y-2">
        <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all hover:translate-x-1">
          <span class="px-2 py-1 text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded">GET</span>
          <code class="text-white text-sm">/api</code>
          <span class="text-white/50 text-sm ml-auto">API Status</span>
        </div>
        <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all hover:translate-x-1">
          <span class="px-2 py-1 text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded">GET</span>
          <a href="/api/products" class="text-white text-sm">/api/products</a>
          <span class="text-white/50 text-sm ml-auto">ดึงข้อมูลสินค้า</span>
        </div>
      </div>
    </div>

    <p class="text-center text-white/40 text-xs">
      Last checked: ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}
    </p>
  </div>
</body>
</html>
  `;

    return new NextResponse(html, {
        status: mongoStatus.connected ? 200 : 503,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}