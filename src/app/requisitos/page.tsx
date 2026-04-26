'use client';

import { 
  FileText, 
  UserCheck, 
  HeartPulse, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function RequisitosPage() {
  const secciones = [
    {
      titulo: "1. Documentación Académica",
      icon: <FileText className="text-blue-600" />,
      items: [
        { label: "Título de Bachillerato / Secundaria", desc: "Copia legalizada y original para cotejo." },
        { label: "Certificado de Calificaciones", desc: "Registro oficial de notas del último nivel de estudios." },
        { label: "Documento de Identidad", desc: "Copia ampliada de tu cédula, INE o pasaporte vigente." },
        { label: "Fotografías", desc: "2 fotos tamaño carnet (fondo blanco, vestimenta formal)." }
      ]
    },
    {
      titulo: "2. Perfil Ministerial y Personal",
      icon: <UserCheck className="text-emerald-600" />,
      items: [
        { label: "Carta de Recomendación", desc: "Emitida por tu pastor o líder de comunidad, avalando tu compromiso y carácter cristiano." },
        { label: "Testimonio de Vida", desc: "Un escrito breve (máximo 2 páginas) sobre tu llamado al servicio y por qué deseas estudiar con nosotros." },
        { label: "Entrevista de Admisión", desc: "Una charla presencial o virtual con el Comité Académico para conocer tu perfil y expectativas." }
      ]
    },
    {
      titulo: "3. Salud y Bienestar",
      icon: <HeartPulse className="text-rose-600" />,
      items: [
        { label: "Evaluación Psicobásica", desc: "Aplicada por la institución para asegurar que cuentas con las herramientas emocionales iniciales para el manejo de casos." }
      ]
    }
  ];

  const fechas = [
    { evento: "Apertura de inscripciones", fecha: "Próximamente" },
    { evento: "Límite para entrega de documentos", fecha: "Pendiente" },
    { evento: "Semana de inducción", fecha: "Pendiente" },
    { evento: "Inicio de clases", fecha: "Ciclo 2025" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 -z-10"></div>
        <div className="container mx-auto px-4 text-center">
          <span className="bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block">
            Proceso de Admisión
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
            Tu camino empieza <span className="text-primary italic">aquí</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Para garantizar la excelencia académica y ministerial, solicitamos a nuestros aspirantes completar los siguientes pasos y documentos.
          </p>
        </div>
      </section>

      {/* Requisitos Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {secciones.map((seccion, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                  {seccion.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8">{seccion.titulo}</h3>
                <div className="space-y-6">
                  {seccion.items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 size={18} className="text-primary opacity-40" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 dark:text-slate-200 text-sm leading-tight mb-1">{item.label}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fechas e Inversión */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Fechas */}
            <div className="bg-slate-900 text-white rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
              <Calendar className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 -rotate-12" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  Fechas Importantes
                  <span className="text-xs font-bold bg-primary px-3 py-1 rounded-full uppercase tracking-widest text-white ml-2">Ciclo 2025 - 2027</span>
                </h3>
                <div className="space-y-6">
                  {fechas.map((f, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0">
                      <span className="text-slate-400 font-medium">{f.evento}</span>
                      <span className="font-bold text-white">{f.fecha}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inversión */}
            <div className="space-y-8">
              <div className="bg-primary/5 border border-primary/10 rounded-[3rem] p-12">
                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <DollarSign size={24} />
                  </div>
                  Inversión Educativa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Matrícula Única</p>
                    <p className="text-3xl font-black text-primary">$ [Monto]</p>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mensualidad</p>
                    <p className="text-3xl font-black text-primary">$ [Monto]</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
                  <Info className="text-blue-600 shrink-0" size={24} />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Pregunta por nuestro <strong>programa de becas</strong> por convenio ministerial y descuentos por pago de contado.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center md:text-left">
                <Button asChild className="px-12 py-10 rounded-[2rem] text-xl font-black bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-4 group">
                  <Link href="/inscripcion">
                    Comenzar Inscripción Digital
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
