'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Clock, 
  Calendar as CalendarIcon,
  User,
  X,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Timer,
  LogIn,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AsistenciaPersonalPage() {
  const [asistencias, setAsistencias] = useState<any[]>([]);
  const [personal, setPersonal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    usuario_id: '',
    fecha: new Date().toISOString().split('T')[0],
    hora_entrada: '',
    hora_salida: '',
    estatus: 'Presente'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [asistRes, personalRes] = await Promise.all([
      supabase.from('asistencia_personal').select('*, usuarios!usuario_id(nombre, apellido_paterno, rol)').order('fecha', { ascending: false }),
      supabase.from('usuarios').select('*').in('rol', ['Docente', 'Administrativo', 'Director']).order('nombre')
    ]);

    if (!asistRes.error) setAsistencias(asistRes.data);
    if (!personalRes.error) setPersonal(personalRes.data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { error } = await supabase.from('asistencia_personal').insert(formData);
    
    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        fetchData();
        setFormData({
          usuario_id: '',
          fecha: new Date().toISOString().split('T')[0],
          hora_entrada: '',
          hora_salida: '',
          estatus: 'Presente'
        });
      }, 1500);
    }
    setFormLoading(false);
  };

  const filteredAsistencias = asistencias.filter(a => 
    `${a.usuarios?.nombre} ${a.usuarios?.apellido_paterno}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <UserCheck className="text-primary" />
            Asistencia de Personal
          </h1>
          <p className="text-slate-500 mt-1">Control de entradas y salidas de docentes y administrativos.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-6 rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Registrar Asistencia
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre del personal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Personal</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Rol</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Entrada / Salida</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="p-10 bg-slate-50/30"></td></tr>)
              ) : filteredAsistencias.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center text-slate-400">No hay registros de asistencia.</td></tr>
              ) : (
                filteredAsistencias.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                          {a.usuarios?.nombre[0]}
                        </div>
                        <p className="font-bold text-slate-700 dark:text-slate-200">{a.usuarios?.nombre} {a.usuarios?.apellido_paterno}</p>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-xs font-bold text-slate-500">{a.usuarios?.rol}</span>
                    </td>
                    <td className="p-5 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(a.fecha).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-green-600 font-bold">
                          <LogIn size={14} />
                          {a.hora_entrada ? a.hora_entrada.substring(0, 5) : '--:--'}
                        </div>
                        <div className="flex items-center gap-1.5 text-red-600 font-bold">
                          <LogOut size={14} />
                          {a.hora_salida ? a.hora_salida.substring(0, 5) : '--:--'}
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        a.estatus === 'Presente' ? 'bg-green-100 text-green-700' : 
                        a.estatus === 'Retardo' ? 'bg-orange-100 text-orange-700' : 
                        a.estatus === 'Falta' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {a.estatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <UserCheck />
                Registro de Asistencia
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-8 space-y-6">
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">¡Asistencia Guardada!</h3>
                  <p className="text-slate-500">El registro se ha completado correctamente.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Personal *</label>
                      <select 
                        required
                        value={formData.usuario_id}
                        onChange={(e) => setFormData({...formData, usuario_id: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Seleccionar Personal...</option>
                        {personal.map(p => <option key={p.id} value={p.id}>[{p.rol}] {p.nombre} {p.apellido_paterno}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha *</label>
                      <input 
                        type="date" 
                        required
                        value={formData.fecha}
                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 text-green-600">
                          <LogIn size={14} /> Hora Entrada
                        </label>
                        <input 
                          type="time" 
                          value={formData.hora_entrada}
                          onChange={(e) => setFormData({...formData, hora_entrada: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 text-red-600">
                          <LogOut size={14} /> Hora Salida
                        </label>
                        <input 
                          type="time" 
                          value={formData.hora_salida}
                          onChange={(e) => setFormData({...formData, hora_salida: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Presente', 'Falta', 'Retardo', 'Permiso'].map(est => (
                          <label key={est} className="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:bg-primary/5 has-[:checked]:border-primary has-[:checked]:text-primary">
                            <input 
                              type="radio" 
                              name="estatus" 
                              value={est} 
                              checked={formData.estatus === est}
                              onChange={(e) => setFormData({...formData, estatus: e.target.value})}
                              className="hidden"
                            />
                            <span className="text-sm font-bold">{est}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 h-12 rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={formLoading}
                      className="flex-1 h-12 rounded-xl bg-primary text-white font-bold"
                    >
                      {formLoading ? <Loader2 className="animate-spin" /> : 'Guardar Registro'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
