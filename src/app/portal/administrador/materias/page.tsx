'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  BookOpen, 
  Plus, 
  X, 
  CheckCircle2, 
  Loader2,
  Tag,
  Info,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MateriasPage() {
  const [materias, setMaterias] = useState<any[]>([]);
  const [carreras, setCarreras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    creditos: 0,
    carrera_id: '',
    modalidad: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [materiasRes, carrerasRes] = await Promise.all([
      supabase.from('materias').select('*, carreras(nombre)').order('nombre'),
      supabase.from('carreras').select('*').order('nombre')
    ]);

    if (!materiasRes.error) setMaterias(materiasRes.data);
    if (!carrerasRes.error) setCarreras(carrerasRes.data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { error } = await supabase.from('materias').insert(formData);
    
    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        fetchData();
        setFormData({ nombre: '', descripcion: '', creditos: 0, carrera_id: '', modalidad: '' });
      }, 1500);
    }
    setFormLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><BookOpen className="text-primary" /> Materias</h1>
          <p className="text-slate-500">Administra las asignaturas por carrera.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-6 py-6 rounded-2xl font-bold shadow-lg flex items-center gap-2">
          <Plus /> Nueva Materia
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-40 bg-slate-200 animate-pulse rounded-3xl"></div>)
        ) : materias.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">No hay materias.</div>
        ) : (
          materias.map((m) => (
            <div key={m.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                  <Tag size={20} />
                </div>
                <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">{m.modalidad}</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">{m.nombre}</h3>
              <p className="text-xs text-primary font-bold mb-3 flex items-center gap-1">
                <Layers size={12} /> {m.carreras?.nombre}
              </p>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">{m.descripcion || 'Sin descripción.'}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl">
                <Info size={14} /> {m.creditos} Créditos
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3"><Plus /> Nueva Materia</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-4">
              {success ? (
                <div className="text-center py-8"><CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} /> ¡Creado con éxito!</div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Carrera *</label>
                    <select required value={formData.carrera_id} onChange={e => setFormData({...formData, carrera_id: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <option value="">Seleccionar Carrera...</option>
                      {carreras.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre de la Materia *</label>
                    <input type="text" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Créditos</label>
                      <input type="number" value={formData.creditos} onChange={e => setFormData({...formData, creditos: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
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
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descripción</label>
                    <textarea value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-24 resize-none" />
                  </div>
                  <Button type="submit" disabled={formLoading} className="w-full h-12 rounded-xl bg-primary text-white font-bold">
                    {formLoading ? <Loader2 className="animate-spin" /> : 'Crear Materia'}
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
