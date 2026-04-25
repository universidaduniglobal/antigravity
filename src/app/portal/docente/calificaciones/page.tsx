'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Star, 
  Save, 
  Loader2, 
  Search, 
  Users, 
  CheckCircle2, 
  ArrowLeft,
  Filter,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CalificacionesContent() {
  const searchParams = useSearchParams();
  const asigIdFromUrl = searchParams.get('asig');

  const [asignaciones, setAsignaciones] = useState<any[]>([]);
  const [selectedAsig, setSelectedAsig] = useState<string>(asigIdFromUrl || '');
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [periodo, setPeriodo] = useState('Parcial 1');

  useEffect(() => {
    fetchAsignaciones();
  }, []);

  useEffect(() => {
    if (selectedAsig) {
      fetchAlumnos();
    }
  }, [selectedAsig]);

  const fetchAsignaciones = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('asignaciones')
        .select('*, materias(nombre, id), grupos(grado)')
        .eq('docente_id', user.id);
      if (data) setAsignaciones(data);
    }
  };

  const fetchAlumnos = async () => {
    setLoading(true);
    const asig = asignaciones.find(a => a.id === selectedAsig);
    const grupoId = asig?.grupo_id;
    
    if (!grupoId) {
       // Just in case asignaciones hasn't loaded
       const { data } = await supabase.from('asignaciones').select('grupo_id').eq('id', selectedAsig).single();
       if (data) fetchAlumnosByGrupo(data.grupo_id);
    } else {
       fetchAlumnosByGrupo(grupoId);
    }
  };

  const fetchAlumnosByGrupo = async (grupoId: string) => {
    const { data } = await supabase
      .from('inscripciones')
      .select('*, usuarios!alumno_id(nombre, apellido_paterno, email)')
      .eq('grupo_id', grupoId);
    
    if (data) {
      // Initialize with default empty grades
      setAlumnos(data.map(i => ({
        ...i,
        calificacion_num: '',
        comentarios: ''
      })));
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaveLoading(true);
    const asig = asignaciones.find(a => a.id === selectedAsig);
    
    const records = alumnos.map(a => ({
      inscripcion_id: a.id,
      materia_id: asig?.materia_id,
      calificacion_num: parseFloat(a.calificacion_num) || 0,
      periodo: periodo,
      comentarios: a.comentarios
    }));

    const { error } = await supabase.from('calificaciones').insert(records);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaveLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/portal/docente">
            <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-slate-200">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
              <Star className="text-primary" />
              Captura de Calificaciones
            </h1>
            <p className="text-slate-500 mt-1">Registra las evaluaciones finales o parciales.</p>
          </div>
        </div>
        
        <div className="flex gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 border-r pr-4 border-slate-100">
            <TrendingUp size={18} className="text-slate-400" />
            <select 
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="bg-transparent text-sm font-bold focus:outline-none"
            >
              <option value="Parcial 1">Parcial 1</option>
              <option value="Parcial 2">Parcial 2</option>
              <option value="Examen Final">Examen Final</option>
              <option value="Extraordinario">Extraordinario</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <Filter size={18} className="text-slate-400" />
            <select 
              value={selectedAsig}
              onChange={(e) => setSelectedAsig(e.target.value)}
              className="bg-transparent text-sm font-bold focus:outline-none"
            >
              <option value="">Seleccionar Clase...</option>
              {asignaciones.map(a => (
                <option key={a.id} value={a.id}>{a.materias?.nombre} ({a.grupos?.grado})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!selectedAsig ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-20 text-center border border-slate-100 flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
            <FileText size={40} />
          </div>
          <h2 className="text-xl font-bold text-slate-600">Selecciona una materia para capturar calificaciones.</h2>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Alumno</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Calificación (0-10)</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Comentarios / Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={3} className="p-10 bg-slate-50/30"></td></tr>)
                ) : (
                  alumnos.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                            {a.usuarios?.nombre[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-200">{a.usuarios?.nombre} {a.usuarios?.apellido_paterno}</p>
                            <p className="text-xs text-slate-400">{a.usuarios?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 flex justify-center">
                        <input 
                          type="number" 
                          step="0.1"
                          min="0"
                          max="10"
                          placeholder="0.0"
                          value={a.calificacion_num}
                          onChange={(e) => setAlumnos(alumnos.map(al => al.id === a.id ? { ...al, calificacion_num: e.target.value } : al))}
                          className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center font-black text-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </td>
                      <td className="p-5">
                        <input 
                          type="text" 
                          placeholder="Nota adicional..."
                          value={a.comentarios}
                          onChange={(e) => setAlumnos(alumnos.map(al => al.id === a.id ? { ...al, comentarios: e.target.value } : al))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 flex justify-end gap-4">
            {success && (
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm animate-in fade-in slide-in-from-right-4">
                <CheckCircle2 size={20} />
                ¡Calificaciones guardadas!
              </div>
            )}
            <Button 
              disabled={alumnos.length === 0 || saveLoading}
              onClick={handleSave}
              className="bg-primary text-white px-10 py-6 rounded-2xl font-bold shadow-lg flex items-center gap-2"
            >
              {saveLoading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Publicar Calificaciones</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalificacionesPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse">Cargando módulo de calificaciones...</div>}>
      <CalificacionesContent />
    </Suspense>
  );
}
