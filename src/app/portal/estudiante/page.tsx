'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Video, 
  Star, 
  Clock,
  ChevronRight,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EstudianteDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [proximaClase, setProximaClase] = useState<any>(null);
  const [adeudos, setAdeudos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const [profileRes, inscripcionRes, pagosRes] = await Promise.all([
        supabase.from('usuarios').select('*').eq('id', user.id).single(),
        supabase.from('inscripciones').select('*, grupos(*)').eq('alumno_id', user.id).single(),
        supabase.from('pagos').select('monto, estatus_pago').eq('alumno_id', user.id).eq('estatus_pago', 'Pendiente')
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (pagosRes.data) {
        const total = pagosRes.data.reduce((acc, p) => acc + Number(p.monto), 0);
        setAdeudos(total);
      }

      if (inscripcionRes.data) {
        // Mocking proxima clase based on group assigned
        const { data: asig } = await supabase
          .from('asignaciones')
          .select('*, materias(nombre)')
          .eq('grupo_id', inscripcionRes.data.grupo_id)
          .limit(1)
          .single();
        if (asig) setProximaClase(asig);
      }
    }
    setLoading(false);
  };

  const menuActions = [
    { label: 'Mi Horario', desc: 'Clases y links de Meet', icon: <Calendar />, href: '/portal/estudiante/horario', color: 'bg-blue-500' },
    { label: 'Mis Pagos', desc: 'Historial y adeudos', icon: <CreditCard />, href: '/portal/estudiante/pagos', color: 'bg-emerald-500' },
    { label: 'Mis Clases', desc: 'Videos y materiales', icon: <Video />, href: '/portal/estudiante/clases', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">
            ¡Hola, {profile?.nombre}! 👋
          </h1>
          <p className="text-slate-500 flex items-center gap-2">
            <GraduationCap size={18} />
            Tu formación en <span className="font-bold text-primary">UniGlobal</span> continúa hoy.
          </p>
        </div>
        
        {adeudos > 0 ? (
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-600 uppercase">Adeudo Pendiente</p>
              <p className="text-lg font-black text-orange-800">${adeudos.toLocaleString()}</p>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase">Estatus de Cuenta</p>
              <p className="text-lg font-black text-emerald-800">Al Corriente</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Próxima Clase Highlight */}
          <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <Video className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">
                Siguiente Sesión
              </span>
              {proximaClase ? (
                <>
                  <h3 className="text-3xl font-black mb-2">{proximaClase.materias?.nombre}</h3>
                  <p className="text-white/80 mb-8 flex items-center gap-2">
                    <Clock size={16} />
                    Hoy • Consultar horario para detalles
                  </p>
                  <Button className="bg-white text-primary font-bold px-8 py-6 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2">
                    <Video size={20} />
                    Unirse a Google Meet
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-black mb-2">Sin clases programadas</h3>
                  <p className="text-white/80 mb-8">Disfruta tu día o revisa tus clases grabadas.</p>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer group">
                  <div className={`w-12 h-12 ${action.color} text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    {action.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{action.label}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-orange-500" />
              Calificaciones Recientes
            </h3>
            <div className="space-y-6">
              <p className="text-center py-10 text-slate-400 text-sm italic">
                Aún no tienes evaluaciones publicadas para este periodo.
              </p>
            </div>
            <Button variant="outline" className="w-full mt-4 rounded-xl py-6 border-slate-200 font-bold text-xs">
              Ver Historial Académico
            </Button>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <LayoutDashboard size={80} />
            </div>
            <h4 className="font-bold text-lg mb-2">Portal Estudiantil v1.0</h4>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Recuerda que tus clases grabadas están disponibles 24/7 en la sección de Clases.
            </p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
