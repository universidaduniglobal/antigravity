'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { LogIn, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Normalize 'Admin' username to an email if the user typed 'Admin'
    const loginEmail = email.toLowerCase() === 'admin' ? 'admin@uniglobal.edu.mx' : email;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setError('Error de configuración: Las variables de entorno de Supabase no están configuradas en el servidor.');
      setLoading(false);
      return;
    }

    try {
      console.log('Iniciando sesión para:', loginEmail);
      
      // Timeout de 10 segundos
      const loginPromise = supabase.auth.signInWithPassword({
        email: loginEmail,
        password: password,
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Tiempo de espera agotado. Revisa tu conexión.')), 10000)
      );

      const { data, error: authError }: any = await Promise.race([loginPromise, timeoutPromise]);

      if (authError) throw authError;

      if (data.user) {
        console.log('Sesión iniciada, buscando perfil...');
        const { data: profile, error: profileError } = await supabase
          .from('usuarios')
          .select('rol')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Error de perfil:', profileError);
          throw new Error('Usuario autenticado pero no se encontró su perfil en la tabla "usuarios". ¿Ejecutaste el SQL?');
        }

        if (!profile || !profile.rol) {
          throw new Error('El usuario no tiene un rol asignado.');
        }

        const role = profile.rol.toLowerCase();
        const targetUrl = `/portal/${role}`;
        console.log('Redirigiendo a:', targetUrl);
        
        // Intento de redirección normal
        router.push(targetUrl);
        
        // Fallback agresivo: si después de 1 segundo no ha cambiado, forzar recarga
        setTimeout(() => {
          if (window.location.pathname !== targetUrl) {
            window.location.href = targetUrl;
          }
        }, 1000);
      }
    } catch (err: any) {
      console.error('Captura de error en login:', err);
      setError(err.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Banner Superior */}
        <div className="bg-primary p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-accent rounded-full opacity-20 blur-2xl"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Portal Académico</h1>
            <p className="text-primary-foreground/80 text-sm">Bienvenido de nuevo a UniGlobal</p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="shrink-0 w-5 h-5" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Usuario o Correo
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Ej. Admin"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Ingresar al Portal
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Universidad UniGlobal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
