import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  const db = await getDb();
  const features = await db
    .collection('features')
    .find({})
    .sort({ order_index: 1 })
    .toArray();

  return NextResponse.json(features);
}

export async function POST(request: Request) {
  const db = await getDb();
  const body = await request.json();

  const result = await db.collection('features').insertOne(body);
  return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
}

export async function PUT(request: Request) {
  const db = await getDb();
  const body = await request.json();

  const { id, ...update } = body;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const { ObjectId } = await import('mongodb');
  await db
    .collection('features')
    .updateOne({ _id: new ObjectId(id) }, { $set: update });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const db = await getDb();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const { ObjectId } = await import('mongodb');
  await db.collection('features').deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ ok: true });
}

