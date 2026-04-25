'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  ClipboardList, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Calendar,
  Users,
  Loader2,
  Save,
  ArrowLeft,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function AsistenciaContent() {
  const searchParams = useSearchParams();
  const asigIdFromUrl = searchParams.get('asig');

  const [asignaciones, setAsignaciones] = useState<any[]>([]);
  const [selectedAsig, setSelectedAsig] = useState<string>(asigIdFromUrl || '');
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

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
        .select('*, materias(nombre), grupos(grado)')
        .eq('docente_id', user.id);
      if (data) setAsignaciones(data);
    }
  };

  const fetchAlumnos = async () => {
    setLoading(true);
    // Find the group_id for the selected assignment
    const asig = asignaciones.find(a => a.id === selectedAsig);
    if (!asig) {
      // If asignaciones hasn't loaded yet, fetch it specifically
      const { data } = await supabase.from('asignaciones').select('grupo_id').eq('id', selectedAsig).single();
      if (data) fetchAlumnosByGrupo(data.grupo_id);
    } else {
      fetchAlumnosByGrupo(asig.grupo_id);
    }
  };

  const fetchAlumnosByGrupo = async (grupoId: string) => {
    const { data } = await supabase
      .from('inscripciones')
      .select('*, usuarios!alumno_id(nombre, apellido_paterno, email)')
      .eq('grupo_id', grupoId);
    
    if (data) {
      // Initialize with 'Presente'
      setAlumnos(data.map(i => ({
        ...i,
        presente: true,
        comentarios: ''
      })));
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaveLoading(true);
    const asig = asignaciones.find(a => a.id === selectedAsig);
    
    const records = alumnos.map(a => ({
      alumno_id: a.alumno_id,
      grupo_id: asig?.grupo_id,
      materia_id: asig?.materia_id,
      fecha: fecha,
      presente: a.presente,
      comentarios: a.comentarios
    }));

    const { error } = await supabase.from('asistencias_alumnos').insert(records);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaveLoading(true);
    setSaveLoading(false);
  };

  const toggleAsistencia = (id: string) => {
    setAlumnos(alumnos.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
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
              <ClipboardList className="text-primary" />
              Pase de Lista
            </h1>
            <p className="text-slate-500 mt-1">Registra la asistencia de tus alumnos hoy.</p>
          </div>
        </div>
        
        <div className="flex gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 border-r pr-4 border-slate-100">
            <Calendar size={18} className="text-slate-400" />
            <input 
              type="date" 
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="bg-transparent text-sm font-bold focus:outline-none"
            />
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
            <Users size={40} />
          </div>
          <h2 className="text-xl font-bold text-slate-600">Por favor, selecciona una materia arriba para pasar lista.</h2>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Alumno</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Acción</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Comentarios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="p-10 bg-slate-50/30"></td></tr>)
                ) : alumnos.length === 0 ? (
                  <tr><td colSpan={4} className="p-20 text-center text-slate-400">No hay alumnos inscritos en este grupo.</td></tr>
                ) : (
                  alumnos.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                            {a.usuarios?.nombre[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-200">{a.usuarios?.nombre} {a.usuarios?.apellido_paterno}</p>
                            <p className="text-[10px] text-slate-400">{a.usuarios?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        {a.presente ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Presente</span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Falta</span>
                        )}
                      </td>
                      <td className="p-5">
                        <Button 
                          onClick={() => toggleAsistencia(a.id)}
                          variant={a.presente ? "outline" : "default"}
                          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                            a.presente ? 'border-red-200 text-red-600 hover:bg-red-50' : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {a.presente ? <><XCircle size={14} className="mr-2" /> Poner Falta</> : <><CheckCircle2 size={14} className="mr-2" /> Marcar Asistencia</>}
                        </Button>
                      </td>
                      <td className="p-5">
                        <input 
                          type="text" 
                          placeholder="Obs..."
                          value={a.comentarios}
                          onChange={(e) => setAlumnos(alumnos.map(al => al.id === a.id ? { ...al, comentarios: e.target.value } : al))}
                          className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
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
                ¡Asistencia guardada!
              </div>
            )}
            <Button 
              disabled={alumnos.length === 0 || saveLoading}
              onClick={handleSave}
              className="bg-primary text-white px-8 py-6 rounded-2xl font-bold shadow-lg flex items-center gap-2"
            >
              {saveLoading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Guardar Lista Completa</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AsistenciaPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse">Cargando módulo de asistencia...</div>}>
      <AsistenciaContent />
    </Suspense>
  );
}
