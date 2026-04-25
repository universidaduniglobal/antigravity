'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  Calendar,
  User,
  X,
  CheckCircle2,
  Loader2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PagosPage() {
  const [pagos, setPagos] = useState<any[]>([]);
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    alumno_id: '',
    concepto: '',
    monto: '',
    fecha_pago: new Date().toISOString().split('T')[0],
    estatus_pago: 'Pagado',
    metodo_pago: '',
    comprobante_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [pagosRes, alumnosRes] = await Promise.all([
      supabase.from('pagos').select('*, usuarios!alumno_id(nombre, apellido_paterno, email)').order('fecha_pago', { ascending: false }),
      supabase.from('usuarios').select('*').eq('rol', 'Estudiante').order('nombre')
    ]);

    if (!pagosRes.error) setPagos(pagosRes.data);
    if (!alumnosRes.error) setAlumnos(alumnosRes.data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { error } = await supabase.from('pagos').insert({
      ...formData,
      monto: parseFloat(formData.monto)
    });
    
    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        fetchData();
        setFormData({
          alumno_id: '',
          concepto: '',
          monto: '',
          fecha_pago: new Date().toISOString().split('T')[0],
          estatus_pago: 'Pagado',
          metodo_pago: '',
          comprobante_url: ''
        });
      }, 1500);
    }
    setFormLoading(false);
  };

  const filteredPagos = pagos.filter(p => 
    `${p.usuarios?.nombre} ${p.usuarios?.apellido_paterno}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.concepto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <CreditCard className="text-primary" />
            Gestión de Pagos
          </h1>
          <p className="text-slate-500 mt-1">Registra y supervisa los pagos de colegiaturas y trámites.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-6 rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Registrar Nuevo Pago
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por alumno o concepto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 rounded-xl border-slate-200">
          <Filter size={18} />
          Filtrar
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Alumno</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Concepto</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Monto</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Método</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={6} className="p-10 bg-slate-50/30"></td></tr>)
              ) : filteredPagos.length === 0 ? (
                <tr><td colSpan={6} className="p-20 text-center text-slate-400">No hay registros de pagos.</td></tr>
              ) : (
                filteredPagos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          {p.usuarios?.nombre[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 dark:text-slate-200">{p.usuarios?.nombre} {p.usuarios?.apellido_paterno}</p>
                          <p className="text-[10px] text-slate-400">{p.usuarios?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{p.concepto}</span>
                    </td>
                    <td className="p-5 text-right font-bold text-slate-800 dark:text-slate-100">
                      ${p.monto.toLocaleString('es-MX')}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar size={14} />
                        {new Date(p.fecha_pago).toLocaleDateString('es-MX')}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        p.estatus_pago === 'Pagado' ? 'bg-green-100 text-green-700' : 
                        p.estatus_pago === 'Pendiente' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {p.estatus_pago}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="text-xs text-slate-400">{p.metodo_pago || 'No especificado'}</span>
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
                <CreditCard />
                Nuevo Registro de Pago
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
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">¡Pago Registrado!</h3>
                  <p className="text-slate-500">El pago se ha guardado correctamente.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alumno *</label>
                      <select 
                        required
                        value={formData.alumno_id}
                        onChange={(e) => setFormData({...formData, alumno_id: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Seleccionar Alumno...</option>
                        {alumnos.map(a => <option key={a.id} value={a.id}>{a.nombre} {a.apellido_paterno}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Concepto *</label>
                        <select 
                          required
                          value={formData.concepto}
                          onChange={(e) => setFormData({...formData, concepto: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="Colegiatura Mensual">Colegiatura Mensual</option>
                          <option value="Inscripción">Inscripción</option>
                          <option value="Reinscripción">Reinscripción</option>
                          <option value="Recargo por Mora">Recargo por Mora</option>
                          <option value="Examen Extraordinario">Examen Extraordinario</option>
                          <option value="Título / Trámite">Título / Trámite</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monto ($) *</label>
                        <input 
                          type="number" 
                          required
                          value={formData.monto}
                          onChange={(e) => setFormData({...formData, monto: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha de Pago *</label>
                        <input 
                          type="date" 
                          required
                          value={formData.fecha_pago}
                          onChange={(e) => setFormData({...formData, fecha_pago: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Método de Pago</label>
                        <select 
                          value={formData.metodo_pago}
                          onChange={(e) => setFormData({...formData, metodo_pago: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="Efectivo">Efectivo</option>
                          <option value="Transferencia">Transferencia</option>
                          <option value="Tarjeta">Tarjeta (Terminal)</option>
                          <option value="Depósito">Depósito</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</label>
                      <div className="flex gap-4">
                        {['Pagado', 'Pendiente', 'Vencido'].map(est => (
                          <label key={est} className="flex-1 flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:bg-primary/5 has-[:checked]:border-primary has-[:checked]:text-primary">
                            <input 
                              type="radio" 
                              name="estatus" 
                              value={est} 
                              checked={formData.estatus_pago === est}
                              onChange={(e) => setFormData({...formData, estatus_pago: e.target.value})}
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
                      {formLoading ? <Loader2 className="animate-spin" /> : 'Confirmar Pago'}
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
