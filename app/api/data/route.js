import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  console.log('field type:', searchParams.get('field_type'));
  return NextResponse.json('this is the data route');
}
