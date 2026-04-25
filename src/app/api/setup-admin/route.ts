import { NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabaseService();
  
  const adminEmail = 'admin@uniglobal.edu.mx';
  const adminPassword = 'Un1Global';

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    });

    if (authError) {
      // If user already exists, just try to create the profile
      if (authError.message.includes('already registered')) {
        // Fallback: get the user ID if possible or just try to insert profile
        console.log('User already exists in Auth');
      } else {
        return NextResponse.json({ error: authError.message }, { status: 400 });
      }
    }

    const userId = authData.user?.id;

    if (userId) {
      // 2. Create profile
      const { error: profileError } = await supabase
        .from('usuarios')
        .upsert({
          id: userId,
          rol: 'Administrador',
          nombre: 'Administrador',
          apellido_paterno: 'Sistema',
          email: adminEmail,
          estatus: 'Activo'
        });

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 400 });
      }

      return NextResponse.json({ message: 'Admin user created successfully' });
    }

    return NextResponse.json({ message: 'Process finished (check if user existed)' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
