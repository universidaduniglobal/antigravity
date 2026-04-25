'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  BookOpen, 
  Users, 
  Video, 
  Clock, 
  ChevronRight,
  GraduationCap,
  Calendar,
  ClipboardList,
  Star,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DocenteDashboard() {
  const [asignaciones, setAsignaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      const { data, error } = await supabase
        .from('asignaciones')
        .select(`
          *,
          grupos(grado, modalidad),
          materias(nombre)
        `)
        .eq('docente_id', user.id);

      if (!error) setAsignaciones(data);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <LayoutDashboard className="text-primary" />
            Panel del Docente
          </h1>
          <p className="text-slate-500 mt-1">Gestiona tus clases, asistencias y evaluaciones.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div className="pr-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Docente</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mis Clases */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="text-primary" />
            Mis Clases Asignadas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-3xl"></div>)
            ) : asignaciones.length === 0 ? (
              <div className="col-span-2 p-12 bg-white rounded-3xl border border-dashed border-slate-300 text-center text-slate-400">
                Aún no tienes materias asignadas. Contacta al administrador.
              </div>
            ) : (
              asignaciones.map((asig) => (
                <div key={asig.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <GraduationCap size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">
                      {asig.grupos?.modalidad}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                    {asig.materias?.nombre}
                  </h4>
                  <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                    <Users size={14} />
                    Grupo: {asig.grupos?.grado}
                  </p>
                  
                  <div className="flex gap-2">
                    <Link href={`/portal/docente/asistencia?asig=${asig.id}`} className="flex-1">
                      <Button variant="outline" className="w-full text-xs font-bold rounded-xl h-10 border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all">
                        Asistencia
                      </Button>
                    </Link>
                    <Link href={`/portal/docente/calificaciones?asig=${asig.id}`} className="flex-1">
                      <Button variant="outline" className="w-full text-xs font-bold rounded-xl h-10 border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all">
                        Calificar
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Atajos Rápidos */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Star className="text-orange-500" />
            Acciones Rápidas
          </h3>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm">
            <Link href="/portal/docente/asistencia">
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ClipboardList />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Pasar Lista</p>
                  <p className="text-xs text-slate-400">Registro de hoy</p>
                </div>
                <ChevronRight className="ml-auto text-slate-300" />
              </div>
            </Link>

            <Link href="/portal/docente/calificaciones">
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Calificaciones</p>
                  <p className="text-xs text-slate-400">Captura de notas</p>
                </div>
                <ChevronRight className="ml-auto text-slate-300" />
              </div>
            </Link>

            <div className="p-6 bg-gradient-to-br from-indigo-600 to-primary rounded-3xl text-white mt-4 relative overflow-hidden">
              <Video className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
              <h5 className="font-bold mb-1">Google Meet</h5>
              <p className="text-xs text-white/80 mb-4 leading-relaxed">Inicia tus sesiones virtuales directamente desde el portal.</p>
              <Button className="w-full bg-white text-primary text-xs font-bold rounded-xl py-5 hover:bg-slate-50">
                Abrir Meet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
