'use client';

import { 
  GraduationCap, 
  Globe, 
  Heart, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Calendar,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function BecasPage() {
  const becas = [
    {
      titulo: "Instituto de Becas y Crédito Educativo (Sonora)",
      subtitulo: "Fuente principal de apoyo gubernamental",
      icon: <Building2 className="text-blue-600" />,
      desc: "Ofrecen la Beca Sonora de Oportunidades tanto para escuelas públicas como privadas.",
      detalles: "Las convocatorias suelen abrirse en periodos específicos, como entre enero y febrero para el primer semestre del año."
    },
    {
      titulo: "Becas por 'Cadena de Favores' (ILC)",
      subtitulo: "Financiamiento por donaciones",
      icon: <Heart className="text-rose-600" />,
      desc: "Se ofrecen clases financiadas por donantes externos para que el costo para el estudiante sea mínimo o nulo.",
      detalles: "Sujeto a disponibilidad de fondos y cumplimiento de perfil ministerial."
    },
    {
      titulo: "Apoyo Directo de la Universidad",
      subtitulo: "Evaluación institucional",
      icon: <GraduationCap className="text-emerald-600" />,
      desc: "Solicitud de beca durante el proceso de admisión, evaluando tu situación económica y disposición para colaborar.",
      detalles: "Requiere una entrevista con el comité de becas."
    },
    {
      titulo: "Convenios Específicos (Adveniat-KAAD)",
      subtitulo: "Misión evangelizadora",
      icon: <Globe className="text-purple-600" />,
      desc: "Becas destinadas a personas involucradas activamente en la misión evangelizadora en México y América Latina.",
      detalles: "Requiere aval de la organización eclesiástica."
    }
  ];

  const requisitos = [
    { label: "Carta de respaldo pastoral", desc: "Para validar tu compromiso con una iglesia local." },
    { label: "Promedio académico", desc: "Para becas estatales de Sonora, generalmente se requiere un promedio mínimo de 8.0." },
    { label: "Comprobante de ingresos", desc: "Necesario para demostrar necesidad económica en solicitudes institucionales." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 -z-10"></div>
        <div className="container mx-auto px-4 text-center">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block">
            Financiamiento
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
            Opciones de <span className="text-emerald-600 italic">Becas</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Creemos que el aspecto económico no debe ser un obstáculo para tu formación. Explora las diversas formas de apoyo financiero disponibles.
          </p>
        </div>
      </section>

      {/* Becas Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {becas.map((beca, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    {beca.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{beca.titulo}</h3>
                    <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider mb-4">{beca.subtitulo}</p>
                    <p className="text-slate-500 leading-relaxed mb-6">{beca.desc}</p>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Calendar size={12} /> Nota Clave
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 italic">{beca.detalles}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos Hermosillo */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
            <Wallet className="absolute -right-8 -bottom-8 w-64 h-64 text-white/5 -rotate-12" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-4xl font-black mb-6">Requisitos para aplicar <span className="text-emerald-400">en Hermosillo</span></h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Para acceder a cualquier tipo de apoyo financiero, es indispensable contar con la documentación completa y cumplir con los criterios de elegibilidad.
                </p>
                <Link 
                  href="/requisitos"
                  className="inline-flex items-center justify-center px-10 py-8 rounded-2xl text-lg font-black bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all gap-4 group"
                >
                  Ver Proceso de Admisión
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="space-y-6">
                {requisitos.map((req, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="mt-1">
                      <CheckCircle2 className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-xl mb-1">{req.label}</p>
                      <p className="text-slate-400 text-sm">{req.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
              <Info size={32} />
            </div>
            <div>
              <p className="text-blue-700 dark:text-blue-300 font-bold text-xl">¿Tienes dudas sobre los costos?</p>
              <p className="text-blue-600/80 dark:text-blue-400/80">
                Nuestro departamento de tesorería puede diseñar un plan de pagos personalizado según tus necesidades. No dudes en consultarnos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
