'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  TrendingUp, 
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  PieChart,
  BarChart3,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DirectorDashboard() {
  const [stats, setStats] = useState({
    totalAlumnos: 0,
    alumnosActivos: 0,
    totalCarreras: 0,
    totalMaterias: 0,
    pagosPendientes: 0,
    montoRecaudado: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    
    try {
      const [alumnos, carreras, materias, pagos] = await Promise.all([
        supabase.from('usuarios').select('id, estatus').eq('rol', 'Estudiante'),
        supabase.from('carreras').select('id'),
        supabase.from('materias').select('id'),
        supabase.from('pagos').select('monto, estatus_pago, fecha_pago, usuarios!alumno_id(nombre, apellido_paterno)')
      ]);

      const activos = alumnos.data?.filter(a => a.estatus === 'Activo').length || 0;
      const pendientes = pagos.data?.filter(p => p.estatus_pago === 'Pendiente').length || 0;
      const recaudado = pagos.data?.filter(p => p.estatus_pago === 'Pagado').reduce((acc, p) => acc + Number(p.monto), 0) || 0;

      setStats({
        totalAlumnos: alumnos.data?.length || 0,
        alumnosActivos: activos,
        totalCarreras: carreras.data?.length || 0,
        totalMaterias: materias.data?.length || 0,
        pagosPendientes: pendientes,
        montoRecaudado: recaudado
      });

      setRecentPayments(pagos.data?.slice(0, 5) || []);
    } catch (err) {
      console.error('Error fetching director stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Alumnos Inscritos', value: stats.totalAlumnos, icon: <Users />, color: 'bg-blue-500', trend: `${stats.alumnosActivos} activos` },
    { label: 'Carreras Activas', value: stats.totalCarreras, icon: <GraduationCap />, color: 'bg-indigo-500', trend: 'Programas vigentes' },
    { label: 'Total Materias', value: stats.totalMaterias, icon: <BookOpen />, color: 'bg-purple-500', trend: 'Mapa curricular' },
    { label: 'Recaudación Total', value: `$${stats.montoRecaudado.toLocaleString()}`, icon: <CreditCard />, color: 'bg-emerald-500', trend: `${stats.pagosPendientes} pagos pendientes` },
  ];

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <BarChart3 className="text-primary" />
            Panel de Dirección
          </h1>
          <p className="text-slate-500 mt-1">Supervisión académica y financiera institucional.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Calendar size={18} className="mr-2" />
            Reporte Mensual
          </Button>
          <Button onClick={fetchStats} variant="outline" className="rounded-xl border-slate-200">
            <TrendingUp size={18} className="mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-125`}></div>
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${card.color} text-white shadow-lg`}>
                {card.icon}
              </div>
            </div>
            <h3 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-1">{card.value}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <TrendingUp size={12} className="text-emerald-500" />
              {card.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Payments Monitor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <CreditCard className="text-emerald-500" />
                Monitoreo de Pagos Recientes
              </h3>
              <Button variant="ghost" className="text-primary font-bold text-sm">Ver todos</Button>
            </div>
            <div className="space-y-4">
              {recentPayments.length === 0 ? (
                <p className="text-center py-10 text-slate-400">No hay pagos registrados recientemente.</p>
              ) : (
                recentPayments.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-emerald-500 shadow-sm">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 dark:text-slate-200">{p.usuarios?.nombre} {p.usuarios?.apellido_paterno}</p>
                        <p className="text-xs text-slate-400">{new Date(p.fecha_pago).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-800 dark:text-slate-100">${Number(p.monto).toLocaleString()}</p>
                      <span className={`text-[10px] font-bold uppercase ${p.estatus_pago === 'Pagado' ? 'text-emerald-500' : 'text-orange-500'}`}>
                        {p.estatus_pago}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Links / Alerts */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20">
            <h3 className="text-xl font-bold mb-4">Reporte del Día</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-white/70 text-sm">Alumnos Nuevos</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-white/70 text-sm">Asistencia Personal</span>
                <span className="font-bold text-green-300">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Clases en Curso</span>
                <span className="font-bold">0</span>
              </div>
            </div>
            <Button className="w-full mt-8 bg-white text-primary font-bold rounded-xl py-6 hover:bg-slate-50">
              Generar PDF
            </Button>
          </div>

          <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-wider">
              <AlertCircle size={18} />
              Alertas de Cobro
            </div>
            <p className="text-xs text-orange-700">Hay {stats.pagosPendientes} alumnos con pagos próximos a vencer o vencidos.</p>
            <Button variant="link" className="p-0 h-auto text-orange-700 font-bold text-xs underline">Ver lista de deudores</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  )
}
