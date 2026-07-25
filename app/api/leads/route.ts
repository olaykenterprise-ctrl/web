import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, phone, optInSource } = await request.json();

    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Insert the lead into the database
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          email: email || null, 
          phone: phone || null, 
          opt_in_source: optInSource || 'unknown' 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error inserting lead:', error);
      return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data }, { status: 201 });
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
