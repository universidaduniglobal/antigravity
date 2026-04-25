'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Video, 
  Play, 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen,
  Clock,
  Lock,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ClasesEstudiantePage() {
  const [clases, setClases] = useState<any[]>([]);
  const [progreso, setProgreso] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

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
        // 2. Get assignments (to get materias)
        const { data: asigs } = await supabase
          .from('asignaciones')
          .select('materia_id')
          .eq('grupo_id', inscripcion.grupo_id);
        
        const materiaIds = asigs?.map(a => a.materia_id) || [];

        // 3. Get recorded classes for those materias
        const [clasesRes, progresoRes] = await Promise.all([
          supabase.from('clases_grabadas').select('*, materias(nombre)').in('materia_id', materiaIds).order('orden'),
          supabase.from('progreso_videos').select('*').eq('alumno_id', user.id)
        ]);

        if (clasesRes.data) setClases(clasesRes.data);
        if (progresoRes.data) setProgreso(progresoRes.data);
      }
    }
    setLoading(false);
  };

  const isCompletado = (claseId: string) => progreso.some(p => p.clase_id === claseId && p.completado);

  const toggleCompletado = async (claseId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const exists = progreso.find(p => p.clase_id === claseId);
    
    if (exists) {
      await supabase.from('progreso_videos').update({ completado: !exists.completado }).eq('id', exists.id);
    } else {
      await supabase.from('progreso_videos').insert({ alumno_id: user.id, clase_id: claseId, completado: true });
    }
    fetchData();
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
            <Video className="text-primary" />
            Clases Grabadas
          </h1>
          <p className="text-slate-500 mt-1">Repasa tus lecciones en cualquier momento.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Video Player Section */}
        <div className="lg:col-span-2 space-y-6">
          {selectedVideo ? (
            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtube_url.split('v=')[1] || selectedVideo.youtube_url.split('/').pop()}`}
                  title={selectedVideo.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{selectedVideo.titulo}</h2>
                  <p className="text-slate-500 font-bold">{selectedVideo.materias?.nombre}</p>
                </div>
                <Button 
                  onClick={() => toggleCompletado(selectedVideo.id)}
                  className={`rounded-2xl px-8 py-6 font-bold flex items-center gap-2 ${
                    isCompletado(selectedVideo.id) ? 'bg-emerald-100 text-emerald-600' : 'bg-primary text-white'
                  }`}
                >
                  {isCompletado(selectedVideo.id) ? <><CheckCircle2 size={20} /> Clase Completada</> : 'Marcar como Completada'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Video size={64} className="opacity-20" />
              <p className="font-bold">Selecciona una clase de la lista para comenzar.</p>
            </div>
          )}
        </div>

        {/* Playlist Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm h-[600px] flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 sticky top-0 bg-white dark:bg-slate-900 z-10 pb-2">
              <BookOpen className="text-primary" />
              Contenido del Curso
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
              ) : clases.length === 0 ? (
                <p className="text-center text-slate-400 py-10">No hay videos disponibles aún.</p>
              ) : (
                clases.map((clase, i) => (
                  <div 
                    key={clase.id}
                    onClick={() => setSelectedVideo(clase)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start relative group ${
                      selectedVideo?.id === clase.id ? 'bg-primary/5 border-primary shadow-sm' : 'border-slate-100 dark:border-slate-800 hover:border-primary/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      {isCompletado(clase.id) ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Play size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${selectedVideo?.id === clase.id ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}>
                        {i + 1}. {clase.titulo}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{clase.materias?.nombre}</p>
                    </div>
                    {isCompletado(clase.id) && (
                      <div className="absolute top-2 right-2 text-emerald-500">
                        <CheckCircle2 size={12} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-primary p-6 rounded-3xl text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold opacity-70 uppercase tracking-widest">Tu Progreso</span>
              <span className="text-xs font-black">{Math.round((progreso.filter(p => p.completado).length / (clases.length || 1)) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500" 
                style={{ width: `${(progreso.filter(p => p.completado).length / (clases.length || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
