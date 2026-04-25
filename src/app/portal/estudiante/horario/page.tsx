'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Calendar, 
  Video, 
  Clock, 
  ArrowLeft,
  BookOpen,
  User,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HorarioEstudiantePage() {
  const [asignaciones, setAsignaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 1. Get student's group
      const { data: inscripcion } = await supabase
        .from('inscripciones')
        .select('grupo_id')
        .eq('alumno_id', user.id)
        .single();

      if (inscripcion) {
        // 2. Get assignments for that group
        const { data } = await supabase
          .from('asignaciones')
          .select(`
            *,
            materias(nombre, descripcion),
            usuarios!docente_id(nombre, apellido_paterno)
          `)
          .eq('grupo_id', inscripcion.grupo_id);
        
        if (data) setAsignaciones(data);
      }
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/portal/estudiante">
          <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-slate-200">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <Calendar className="text-primary" />
            Mi Horario
          </h1>
          <p className="text-slate-500 mt-1">Consulta tus materias y accede a tus clases virtuales.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary w-12 h-12" />
        </div>
      ) : asignaciones.length === 0 ? (
        <div className="bg-white p-20 text-center rounded-[2.5rem] border border-dashed border-slate-300 text-slate-400">
          Aún no tienes materias asignadas en tu grupo actual.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {asignaciones.map((asig) => (
            <div key={asig.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all">
              <div className="p-8 space-y-6 flex-1">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Clock size={14} />
                    Consultar Programa
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{asig.materias?.nombre}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <User size={14} />
                    Docente: {asig.usuarios?.nombre} {asig.usuarios?.apellido_paterno}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                {asig.google_meet_url ? (
                  <Button 
                    asChild
                    className="w-full bg-emerald-600 text-white font-bold rounded-2xl py-6 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                  >
                    <a href={asig.google_meet_url} target="_blank" rel="noopener noreferrer">
                      <Video size={18} className="mr-2" />
                      Entrar a Google Meet
                      <ExternalLink size={14} className="ml-auto opacity-50" />
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="w-full bg-slate-200 text-slate-500 font-bold rounded-2xl py-6 cursor-not-allowed">
                    Meet No Disponible
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
