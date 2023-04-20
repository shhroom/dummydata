import { NextResponse } from 'next/server';
import { FieldType } from '../../../Models';
import { mongoose } from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;

export async function GET() {
  await mongoose.connect(MONGO_URL);

  // const { searchParams } = new URL(request.url);
  // const field = searchParams.get('field');
  const fieldTypes = await FieldType.find();

  return NextResponse.json(fieldTypes);
}

export async function POST() {
  return NextResponse.json('now I can take POST requests');
}
