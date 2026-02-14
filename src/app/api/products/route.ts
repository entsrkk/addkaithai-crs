import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET
export async function GET() {
    try {
        const db = await getDatabase();
        const products = await db.collection('products').find({}).sort({ _id: 1 }).toArray();

        return NextResponse.json(products, {
            headers: {
                // เก็บ cache ไว้ที่ Vercel Edge เป็นเวลา 60 วินาที
                // ถ้าเกิน 60 วินาที จะยังส่งข้อมูลเดิมให้คนใช้ก่อนในระหว่างที่ไปดึงข้อมูลใหม่จาก MongoDB (เบื้องหลัง)
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}