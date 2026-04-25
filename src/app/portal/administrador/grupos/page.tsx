'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  UsersRound, 
  Plus, 
  X, 
  CheckCircle2, 
  Loader2,
  Clock,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GruposPage() {
  const [grupos, setGrupos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    grado: '',
    modalidad: '',
    horario_semanal: {}
  });

  useEffect(() => {
    fetchGrupos();
  }, []);

  const fetchGrupos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('grupos').select('*').order('grado');
    if (!error) setGrupos(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { error } = await supabase.from('grupos').insert(formData);
    
    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        fetchGrupos();
        setFormData({ grado: '', modalidad: '', horario_semanal: {} });
      }, 1500);
    }
    setFormLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><UsersRound className="text-primary" /> Grupos</h1>
          <p className="text-slate-500">Administra los grupos académicos y sus horarios.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-6 py-6 rounded-2xl font-bold shadow-lg flex items-center gap-2">
          <Plus /> Nuevo Grupo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-40 bg-slate-200 animate-pulse rounded-3xl"></div>)
        ) : grupos.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">No hay grupos.</div>
        ) : (
          grupos.map((g) => (
            <div key={g.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <UsersRound size={20} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl mb-1">{g.grado}</h3>
              <p className="text-xs font-bold text-primary mb-4">{g.modalidad}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl">
                <Clock size={14} /> Ver Horario Semanal
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3"><Plus /> Nuevo Grupo</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-6">
              {success ? (
                <div className="text-center py-8"><CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} /> ¡Creado con éxito!</div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grado / Nombre del Grupo *</label>
                    <input type="text" required value={formData.grado} onChange={e => setFormData({...formData, grado: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Ej. 1er Semestre - Teología" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modalidad *</label>
                    <select required value={formData.modalidad} onChange={e => setFormData({...formData, modalidad: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <option value="">Seleccionar...</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Mixta">Mixta</option>
                    </select>
                  </div>
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl flex gap-3 items-start">
                    <Calendar size={20} className="shrink-0" />
                    <p className="text-xs">El horario semanal podrá ser configurado detalladamente una vez creado el grupo en la sección de ediciones.</p>
                  </div>
                  <Button type="submit" disabled={formLoading} className="w-full h-12 rounded-xl bg-primary text-white font-bold">
                    {formLoading ? <Loader2 className="animate-spin" /> : 'Crear Grupo'}
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
