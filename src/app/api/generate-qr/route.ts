import { NextRequest, NextResponse } from 'next/server';
import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const amount = Number(searchParams.get('amount')) || 0;

    // ดึงค่าจาก environment variables ที่ฝั่ง server เท่านั้น
    const promptpayNumber = process.env.PROMPTPAY_NUMBER;
    const promptpayName = process.env.PROMPTPAY_NAME;

    if (!promptpayNumber) {
        return NextResponse.json({ error: 'PromptPay number is not configured on server' }, { status: 500 });
    }

    try {
        // สร้าง Payload สำหรับ PromptPay
        const payload = generatePayload(promptpayNumber, { amount });

        // สร้าง QR Code เป็น SVG string
        const svg = await new Promise<string>((resolve, reject) => {
            const options: QRCode.QRCodeToStringOptions = {
                type: 'svg',
                margin: 0,
                scale: 10,
                color: { dark: '#000', light: '#fff' },
            };
            QRCode.toString(payload, options, (err, string) => {
                if (err) reject(err);
                else resolve(string);
            });
        });

        // ส่งข้อมูลกลับไปที่หน้าบ้าน (คนข้างนอกจะเห็นแค่ SVG และชื่อร้าน)
        return NextResponse.json({
            svg,
            shopName: promptpayName,
            // ส่งเบอร์แบบ Masked เพื่อความปลอดภัย
            maskedNumber: promptpayNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-xxx-$3"),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating QR Code:', error);
        return NextResponse.json({ error: 'Failed to generate QR Code' }, { status: 500 });
    }
}
