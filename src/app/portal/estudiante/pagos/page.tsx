'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  CreditCard, 
  ArrowLeft, 
  DollarSign, 
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PagosEstudiantePage() {
  const [pagos, setPagos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('pagos')
        .select('*')
        .eq('alumno_id', user.id)
        .order('fecha_pago', { ascending: false });
      if (data) setPagos(data);
    }
    setLoading(false);
  };

  const totalPagado = pagos.filter(p => p.estatus_pago === 'Pagado').reduce((acc, p) => acc + Number(p.monto), 0);
  const pendiente = pagos.filter(p => p.estatus_pago === 'Pendiente').reduce((acc, p) => acc + Number(p.monto), 0);

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
            <CreditCard className="text-primary" />
            Mis Pagos
          </h1>
          <p className="text-slate-500 mt-1">Historial de colegiaturas y estatus de cuenta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-600/20 flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Total Pagado</p>
            <h3 className="text-4xl font-black">${totalPagado.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/20 flex items-center gap-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-orange-400">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Pendiente por Pagar</p>
            <h3 className="text-4xl font-black text-orange-400">${pendiente.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Concepto</th>
                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Monto</th>
                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Estatus</th>
                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Recibo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="p-10 bg-slate-50/30"></td></tr>)
              ) : pagos.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center text-slate-400 font-medium">No se encontraron registros de pagos.</td></tr>
              ) : (
                pagos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-slate-700 dark:text-slate-200">{p.concepto}</p>
                      <p className="text-[10px] text-slate-400 uppercase">{p.metodo_pago || 'Normal'}</p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar size={14} />
                        {new Date(p.fecha_pago).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-6 text-right font-black text-slate-800 dark:text-slate-100">
                      ${p.monto.toLocaleString()}
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          p.estatus_pago === 'Pagado' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {p.estatus_pago}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      {p.estatus_pago === 'Pagado' ? (
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 rounded-xl">
                          <Download size={18} />
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
