import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, BookOpen, HeartHandshake, Users, GraduationCap, Clock, Award, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Licenciatura en Teología y Consejería para la Familia | UniGlobal",
  description: "Prepárate para servir en el Ministerio Pastoral con enfoque en Liderazgo Cristiano y Consejería a la Familia.",
};

export default function TeologiaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/degree-bg.png"
            alt="Estudiante tecleando en laptop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-accent/20 text-accent border border-accent/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 backdrop-blur-md">
              LICENCIATURA INTEGRAL
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Teología y Consejería para la Familia
            </h1>
            <p className="text-xl text-foreground/90 max-w-2xl mx-auto">
              Prepara tu llamado. Restaura relaciones. Transforma comunidades.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background relative z-20 -mt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introducción */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-16">
              <p className="text-2xl text-primary font-medium mb-8 leading-snug">
                La Licenciatura en Teología y Consejería para la Familia, tiene el objetivo de preparar profesionales comprometidos con la búsqueda de sólidos fundamentos bíblicos, éticos y espirituales, orientados a la atención de las problemáticas familiares, pastorales y misionales.
              </p>
              <p>
                Equipando a los ministros y líderes contemporáneos en su oficio eclesiástico y hacia las comunidades en sus diversas problemáticas, ayudando en la formación de valores humanos y cristianos.
              </p>
              <div className="bg-primary/5 border-l-4 border-accent p-6 my-8 rounded-r-2xl">
                <p className="text-xl italic text-foreground font-medium m-0">
                  Si tu anhelo es iniciar o continuar tu preparación para servir en el Ministerio Pastoral, con un enfoque en Liderazgo cristiano, Consejería y Orientación a la Familia, Matrimonio, Juventud y la Niñez, entonces, <strong className="text-primary font-bold">¡Te estamos esperando!</strong>
                </p>
              </div>
            </div>

            {/* Características del Programa */}
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">¿Por qué estudiar con nosotros?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-20">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full h-fit">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Flexibilidad Total</h3>
                  <p className="text-muted-foreground text-sm">Sin dejar tu trabajo o ministerio. Adapta tus estudios a tu ritmo de vida.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full h-fit">
                  <HeartHandshake className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Formación Integral</h3>
                  <p className="text-muted-foreground text-sm">Formación integral y práctica orientada a resultados reales en el ministerio.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full h-fit">
                  <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Modalidad Mixta</h3>
                  <p className="text-muted-foreground text-sm">Clases 100% presenciales y opción virtual. Estudia desde donde estés.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full h-fit">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Enfoque Especializado</h3>
                  <p className="text-muted-foreground text-sm">Diseñado específicamente para pastores, líderes y obreros cristianos.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4 hover:shadow-md transition-shadow md:col-span-2 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="bg-accent/20 p-3 rounded-full h-fit">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-primary">Validez Oficial</h3>
                  <p className="text-muted-foreground text-sm">Licenciatura con RVOE oficial de la SEP. Sistema modular. ¡Puedes iniciar ya!</p>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div id="informacion" className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent rounded-full opacity-20 blur-3xl mix-blend-screen"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Necesitas más Información?</h2>
                  <p className="text-primary-foreground/80 text-lg">
                    ¡Nos encantaría ponernos en contacto contigo! Por favor, rellena el formulario y te enviaremos información sobre la escuela y/o el programa de tu preferencia.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium text-white/90">Nombre Completo</label>
                      <input 
                        type="text" 
                        id="nombre" 
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="telefono" className="text-sm font-medium text-white/90">Teléfono</label>
                      <input 
                        type="tel" 
                        id="telefono" 
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="Ej. 55 1234 5678"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="correo" className="text-sm font-medium text-white/90">Correo Electrónico</label>
                    <input 
                      type="email" 
                      id="correo" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="tu@correo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="conocido" className="text-sm font-medium text-white/90">¿Cómo nos has conocido?</label>
                    <select 
                      id="conocido" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none"
                    >
                      <option value="" className="text-slate-900">Selecciona una opción...</option>
                      <option value="redes" className="text-slate-900">Redes Sociales (Facebook, Instagram)</option>
                      <option value="recomendacion" className="text-slate-900">Recomendación de un amigo/pastor</option>
                      <option value="busqueda" className="text-slate-900">Búsqueda en Google</option>
                      <option value="evento" className="text-slate-900">Evento / Conferencia</option>
                      <option value="otro" className="text-slate-900">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="comentarios" className="text-sm font-medium text-white/90">Comentarios</label>
                    <textarea 
                      id="comentarios" 
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                      placeholder="Escribe tus dudas aquí..."
                    ></textarea>
                  </div>

                  <Button className="w-full h-14 text-lg font-bold bg-accent text-primary hover:bg-accent/90 rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
                    Enviar Información
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
