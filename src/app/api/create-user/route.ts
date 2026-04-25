import { NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const supabase = getSupabaseService();
  const body = await request.json();

  const {
    email,
    password,
    rol,
    curp,
    nombre,
    apellido_paterno,
    apellido_materno,
    celular,
    modalidad,
    estatus,
    comentarios
  } = body;

  try {
    // 1. Create User in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { rol }
    });

    if (authError) throw authError;

    const userId = authData.user.id;

    // 2. Create Profile in 'usuarios' table
    const { error: profileError } = await supabase
      .from('usuarios')
      .insert({
        id: userId,
        rol,
        curp,
        nombre,
        apellido_paterno,
        apellido_materno,
        email,
        celular,
        modalidad,
        estatus,
        comentarios
      });

    if (profileError) {
      // Rollback auth user if profile fails
      await supabase.auth.admin.deleteUser(userId);
      throw profileError;
    }

    return NextResponse.json({ message: 'Usuario creado con éxito', user: authData.user });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
