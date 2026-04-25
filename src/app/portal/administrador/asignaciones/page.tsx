'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  ClipboardCheck, 
  Plus, 
  X, 
  CheckCircle2, 
  Loader2,
  User,
  UsersRound,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AsignacionesPage() {
  const [asignaciones, setAsignaciones] = useState<any[]>([]);
  const [docentes, setDocentes] = useState<any[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);
  const [grupos, setGrupos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    docente_id: '',
    materia_id: '',
    grupo_id: '',
    google_meet_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [asigRes, docRes, matRes, gruRes] = await Promise.all([
      supabase.from('asignaciones').select('*, usuarios!docente_id(nombre, apellido_paterno), materias(nombre), grupos(grado)').order('created_at'),
      supabase.from('usuarios').select('*').eq('rol', 'Docente').order('nombre'),
      supabase.from('materias').select('*').order('nombre'),
      supabase.from('grupos').select('*').order('grado')
    ]);

    if (!asigRes.error) setAsignaciones(asigRes.data);
    if (!docRes.error) setDocentes(docRes.data);
    if (!matRes.error) setMaterias(matRes.data);
    if (!gruRes.error) setGrupos(gruRes.data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { error } = await supabase.from('asignaciones').insert(formData);
    
    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        fetchData();
        setFormData({ docente_id: '', materia_id: '', grupo_id: '', google_meet_url: '' });
      }, 1500);
    }
    setFormLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><ClipboardCheck className="text-primary" /> Asignación de Materias</h1>
          <p className="text-slate-500">Vincula docentes con materias y grupos.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-6 py-6 rounded-2xl font-bold shadow-lg flex items-center gap-2">
          <Plus /> Nueva Asignación
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Maestro</th>
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Materia</th>
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Grupo</th>
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="p-10 text-center animate-pulse bg-slate-50/50">Cargando...</td></tr>
            ) : asignaciones.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-slate-400">No hay asignaciones.</td></tr>
            ) : (
              asignaciones.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><User size={14} /></div>
                      <span className="font-bold text-slate-700">{a.usuarios?.nombre} {a.usuarios?.apellido_paterno}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} className="text-violet-500" />
                      <span className="text-sm font-medium">{a.materias?.nombre}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <UsersRound size={14} className="text-purple-500" />
                      <span className="text-sm font-medium">{a.grupos?.grado}</span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">Eliminar</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3"><Plus /> Nueva Asignación</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-6">
              {success ? (
                <div className="text-center py-8"><CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} /> ¡Asignado con éxito!</div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Maestro / Docente *</label>
                    <select required value={formData.docente_id} onChange={e => setFormData({...formData, docente_id: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <option value="">Seleccionar Maestro...</option>
                      {docentes.map(d => <option key={d.id} value={d.id}>{d.nombre} {d.apellido_paterno}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Materia *</label>
                    <select required value={formData.materia_id} onChange={e => setFormData({...formData, materia_id: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <option value="">Seleccionar Materia...</option>
                      {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grupo *</label>
                    <select required value={formData.grupo_id} onChange={e => setFormData({...formData, grupo_id: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <option value="">Seleccionar Grupo...</option>
                      {grupos.map(g => <option key={g.id} value={g.id}>{g.grado}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">URL Google Meet</label>
                    <input type="url" value={formData.google_meet_url} onChange={e => setFormData({...formData, google_meet_url: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="https://meet.google.com/xxx-xxxx-xxx" />
                  </div>
                  <Button type="submit" disabled={formLoading} className="w-full h-12 rounded-xl bg-primary text-white font-bold">
                    {formLoading ? <Loader2 className="animate-spin" /> : 'Confirmar Asignación'}
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
