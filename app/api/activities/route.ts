import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const activities = await db.collection('activities').find({}).toArray();
    return NextResponse.json(activities);
  } catch (error: any) {
    console.error('MongoDB error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  const db = await getDb();
  const body = await request.json();

  const result = await db.collection('activities').insertOne(body);
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
    .collection('activities')
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
  await db.collection('activities').deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ ok: true });
}

