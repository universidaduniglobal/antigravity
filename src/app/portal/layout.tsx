'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Library, 
  UsersRound, 
  ClipboardCheck, 
  GraduationCap, 
  CreditCard, 
  Video, 
  LogOut,
  ChevronLeft,
  Menu,
  ShieldCheck,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        if (pathname !== '/portal/login') {
          router.push('/portal/login');
        }
        setLoading(false);
        return;
      }

      setUser(session.user);

      const { data: profileData } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', session.user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    checkUser();

    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        router.push('/portal/login');
      } else if (session) {
        setUser(session.user);
        const { data: profileData } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profileData);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si estamos en la página de login, no mostramos el layout del portal
  if (pathname === '/portal/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { 
      label: 'Dashboard', 
      icon: <LayoutDashboard size={20} />, 
      href: `/portal/${profile?.rol?.toLowerCase()}`,
      roles: ['Administrador', 'Director', 'Estudiante', 'Docente', 'Administrativo', 'Editor']
    },
    { 
      label: 'Usuarios', 
      icon: <Users size={20} />, 
      href: '/portal/administrador/usuarios',
      roles: ['Administrador']
    },
    { 
      label: 'Carreras', 
      icon: <Library size={20} />, 
      href: '/portal/administrador/carreras',
      roles: ['Administrador']
    },
    { 
      label: 'Materias', 
      icon: <BookOpen size={20} />, 
      href: '/portal/administrador/materias',
      roles: ['Administrador']
    },
    { 
      label: 'Grupos', 
      icon: <UsersRound size={20} />, 
      href: '/portal/administrador/grupos',
      roles: ['Administrador']
    },
    { 
      label: 'Pagos', 
      icon: <CreditCard size={20} />, 
      href: '/portal/administrativo/pagos',
      roles: ['Administrativo', 'Administrador', 'Director']
    },
    { 
      label: 'Clases Grabadas', 
      icon: <Video size={20} />, 
      href: '/portal/editor/clases',
      roles: ['Editor', 'Docente', 'Estudiante']
    },
    { 
      label: 'Mi Horario', 
      icon: <ClipboardCheck size={20} />, 
      href: '/portal/estudiante/horario',
      roles: ['Estudiante', 'Docente']
    },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(profile?.rol));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-primary text-white transition-all duration-300 flex flex-col fixed inset-y-0 z-50 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-3 overflow-hidden transition-all ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary font-bold">U</div>
            <span className="font-bold text-xl whitespace-nowrap">UniGlobal</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {filteredMenu.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/10 group ${
                pathname === item.href ? 'bg-accent text-primary' : ''
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              <span className={`transition-all whitespace-nowrap ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {item.label}
              </span>
              {!sidebarOpen && (
                <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center gap-3 mb-6 transition-all ${sidebarOpen ? 'px-2' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-primary shrink-0 overflow-hidden">
              <UserCircle size={28} />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{profile?.nombre} {profile?.apellido_paterno}</p>
                <p className="text-xs text-white/60 truncate">{profile?.rol}</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/20 text-red-300 transition-all ${
              sidebarOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white dark:bg-slate-900 h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 capitalize">
            {pathname.split('/').pop()?.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-200">
              <ShieldCheck size={14} />
              CONECTADO
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
