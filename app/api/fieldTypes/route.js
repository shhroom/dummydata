import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json("here's all the type stuff");
}

export async function POST() {
  return NextResponse.json('now I can take POST requests');
}
