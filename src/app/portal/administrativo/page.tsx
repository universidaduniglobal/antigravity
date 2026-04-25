'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  CreditCard, 
  UserCheck, 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  ArrowRight,
  Clock,
  LayoutDashboard,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdministrativoDashboard() {
  const [stats, setStats] = useState({
    pagosHoy: 0,
    montoHoy: 0,
    asistenciaPersonal: 0,
    totalPersonal: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const hoy = new Date().toISOString().split('T')[0];
    
    const [pagos, asistencia, personal] = await Promise.all([
      supabase.from('pagos').select('monto').eq('fecha_pago', hoy),
      supabase.from('asistencia_personal').select('id').eq('fecha', hoy).eq('estatus', 'Presente'),
      supabase.from('usuarios').select('id').in('rol', ['Docente', 'Administrativo'])
    ]);

    setStats({
      pagosHoy: pagos.data?.length || 0,
      montoHoy: pagos.data?.reduce((acc, p) => acc + Number(p.monto), 0) || 0,
      asistenciaPersonal: asistencia.data?.length || 0,
      totalPersonal: personal.data?.length || 0
    });
    setLoading(false);
  };

  const actions = [
    { 
      label: 'Registrar Pago', 
      desc: 'Cobro de colegiaturas y trámites', 
      icon: <CreditCard />, 
      href: '/portal/administrativo/pagos', 
      color: 'bg-emerald-500' 
    },
    { 
      label: 'Pasar Asistencia', 
      desc: 'Control de entrada de personal', 
      icon: <UserCheck />, 
      href: '/portal/administrativo/asistencia', 
      color: 'bg-blue-500' 
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <LayoutDashboard className="text-primary" />
            Panel Administrativo
          </h1>
          <p className="text-slate-500 mt-1">Gestión diaria de cobranza y recursos humanos.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-400 uppercase">Fecha de hoy</p>
            <p className="text-sm font-bold text-slate-700">{new Date().toLocaleDateString('es-MX', { dateStyle: 'long' })}</p>
          </div>
          <Button variant="outline" className="w-12 h-12 rounded-2xl p-0 border-slate-200 relative">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <DollarSign size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Recaudación Hoy</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">${stats.montoHoy.toLocaleString()}</h3>
            <p className="text-xs text-emerald-600 font-bold">{stats.pagosHoy} transacciones</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <UserCheck size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Asistencia Personal</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">{stats.asistenciaPersonal}/{stats.totalPersonal}</h3>
            <p className="text-xs text-blue-600 font-bold">Presentes hoy</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Horario de Oficina</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">09:00 - 18:00</h3>
            <p className="text-xs text-purple-600 font-bold">Turno Matutino</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 ${action.color} text-white rounded-3xl flex items-center justify-center shadow-lg`}>
                  {action.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">{action.label}</h4>
                  <p className="text-slate-400 text-sm">{action.desc}</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
