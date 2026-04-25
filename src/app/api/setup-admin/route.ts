import { NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabaseService();
  
  const adminEmail = 'admin@uniglobal.edu.mx';
  const adminPassword = 'Un1Global';

  try {
    let userId: string | undefined;

    // 1. Try to create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        // If already exists, find the user to get the ID
        const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) return NextResponse.json({ error: 'Auth exists but could not list users: ' + listError.message }, { status: 400 });
        
        const existingUser = usersData.users.find(u => u.email === adminEmail);
        userId = existingUser?.id;
      } else {
        return NextResponse.json({ error: 'Auth Error: ' + authError.message }, { status: 400 });
      }
    } else {
      userId = authData.user?.id;
    }

    if (!userId) {
      return NextResponse.json({ error: 'Could not determine User ID' }, { status: 400 });
    }

    // 2. Create/Update profile in 'usuarios' table
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
      return NextResponse.json({ 
        error: 'Profile Error: ' + profileError.message,
        hint: 'Asegúrate de haber ejecutado el SQL en el editor de Supabase para crear la tabla "usuarios".'
      }, { status: 400 });
    }

    return NextResponse.json({ 
      message: 'Admin user created/updated successfully',
      email: adminEmail,
      password: adminPassword,
      role: 'Administrador'
    });

  } catch (err: any) {
    return NextResponse.json({ error: 'Server Error: ' + err.message }, { status: 500 });
  }
}
