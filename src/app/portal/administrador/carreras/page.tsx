'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Library, 
  Plus, 
  Search, 
  X, 
  CheckCircle2, 
  Loader2, 
  BookOpen, 
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CarrerasPage() {
  const [carreras, setCarreras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    modalidad: '',
    num_materias: 0
  });

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('carreras').select('*').order('nombre');
    if (!error) setCarreras(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { error } = await supabase.from('carreras').insert(formData);
    
    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        fetchCarreras();
        setFormData({ nombre: '', modalidad: '', num_materias: 0 });
      }, 1500);
    }
    setFormLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <Library className="text-primary" />
            Carreras y Cursos
          </h1>
          <p className="text-slate-500 mt-1">Administra la oferta académica de la institución.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-6 py-6 rounded-2xl font-bold shadow-lg flex items-center gap-2">
          <Plus size={20} />
          Nueva Carrera
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-3xl"></div>)
        ) : carreras.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400">
            No hay carreras registradas.
          </div>
        ) : (
          carreras.map((c) => (
            <div key={c.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{c.nombre}</h3>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{c.modalidad}</span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <BookOpen size={14} /> {c.num_materias} Materias
                </span>
              </div>
              <Button variant="outline" className="w-full rounded-xl border-slate-200">Ver Detalles</Button>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3"><Plus /> Nueva Carrera</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-6">
              {success ? (
                <div className="text-center py-8"><CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} /> ¡Creado con éxito!</div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre de la Carrera *</label>
                    <input type="text" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
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
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Número de Materias</label>
                    <input type="number" value={formData.num_materias} onChange={e => setFormData({...formData, num_materias: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
                  </div>
                  <Button type="submit" disabled={formLoading} className="w-full h-12 rounded-xl bg-primary text-white font-bold">
                    {formLoading ? <Loader2 className="animate-spin" /> : 'Crear Carrera'}
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
