'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Library, 
  BookOpen, 
  UsersRound, 
  ArrowUpRight,
  TrendingUp,
  UserPlus,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    usuarios: 0,
    carreras: 0,
    materias: 0,
    grupos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: usuariosCount },
        { count: carrerasCount },
        { count: materiasCount },
        { count: gruposCount }
      ] = await Promise.all([
        supabase.from('usuarios').select('*', { count: 'exact', head: true }),
        supabase.from('carreras').select('*', { count: 'exact', head: true }),
        supabase.from('materias').select('*', { count: 'exact', head: true }),
        supabase.from('grupos').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        usuarios: usuariosCount || 0,
        carreras: carrerasCount || 0,
        materias: materiasCount || 0,
        grupos: gruposCount || 0
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Usuarios Totales', value: stats.usuarios, icon: <Users className="text-blue-600" />, color: 'bg-blue-50', link: '/portal/administrador/usuarios' },
    { title: 'Carreras y Cursos', value: stats.carreras, icon: <Library className="text-indigo-600" />, color: 'bg-indigo-50', link: '/portal/administrador/carreras' },
    { title: 'Materias', value: stats.materias, icon: <BookOpen className="text-violet-600" />, color: 'bg-violet-50', link: '/portal/administrador/materias' },
    { title: 'Grupos Activos', value: stats.grupos, icon: <UsersRound className="text-purple-600" />, color: 'bg-purple-50', link: '/portal/administrador/grupos' },
  ];

  if (loading) {
    return <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-3xl"></div>)}
      </div>
      <div className="h-96 bg-slate-100 rounded-3xl"></div>
    </div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Resumen del Sistema</h1>
          <p className="text-slate-500 mt-1">Monitoreo general de la plataforma UniGlobal.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/portal/administrador/usuarios" 
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
          >
            <UserPlus size={20} />
            Nuevo Usuario
          </Link>
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-white px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all">
            <Plus size={20} />
            Nueva Carrera
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link 
            key={index} 
            href={card.link}
            className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.color} p-4 rounded-2xl`}>
                {card.icon}
              </div>
              <ArrowUpRight className="text-slate-300 group-hover:text-primary transition-colors" size={20} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{card.title}</p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">{card.value}</h3>
          </Link>
        ))}
      </div>

      {/* Quick Actions / Recent Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="text-green-500" />
              Actividad Reciente
            </h3>
            <button className="text-primary text-sm font-bold hover:underline">Ver todo</button>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Usuario registrado', desc: 'María López se unió como Estudiante', time: 'Hace 5 min', color: 'bg-blue-100' },
              { label: 'Clase cargada', desc: 'Teología I - Sesión 4', time: 'Hace 1 hora', color: 'bg-purple-100' },
              { label: 'Pago recibido', desc: 'Mensualidad Marzo - Juan Pérez', time: 'Hace 3 horas', color: 'bg-green-100' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.color.replace('100', '500')}`}></div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-center text-white">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent rounded-full opacity-20 blur-3xl"></div>
          <h3 className="text-2xl font-bold mb-4 relative z-10">Estado del Sistema</h3>
          <p className="text-primary-foreground/80 mb-8 relative z-10">Todos los módulos están funcionando correctamente. La base de datos de Supabase está sincronizada.</p>
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
              <span>Auth Service</span>
              <span className="text-accent font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
              <span>Database</span>
              <span className="text-accent font-bold">STABLE</span>
            </div>
            <div className="flex justify-between text-sm pb-2">
              <span>Storage</span>
              <span className="text-accent font-bold">READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
