import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Target, GraduationCap, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Plan de Estudios | Licenciatura en Teología y Consejería Familiar | UniGlobal",
  description: "Conoce el plan de estudios de 3 años de la Licenciatura en Teología y Consejería para la Familia.",
};

const año1 = [
  { materia: "Teología Sistemática I", desc: "Doctrinas fundamentales (Dios, Cristo, Espíritu Santo)" },
  { materia: "Introducción a la Biblia", desc: "Historia, estructura y géneros literarios" },
  { materia: "Hermenéutica Bíblica", desc: "Métodos de interpretación" },
  { materia: "Historia de la Iglesia I", desc: "Desde la iglesia primitiva hasta la Edad Media" },
  { materia: "Psicología General", desc: "Principios básicos del comportamiento humano" },
  { materia: "Fundamentos de Consejería Cristiana", desc: "Rol del consejero y ética" },
  { materia: "Comunicación Efectiva", desc: "Escucha activa y habilidades interpersonales" },
  { materia: "Práctica Ministerial I", desc: "Servicio comunitario supervisado" },
];

const año2 = [
  { materia: "Teología Sistemática II", desc: "Doctrinas del hombre, pecado y salvación" },
  { materia: "Historia de la Iglesia II", desc: "Reforma, modernidad y actualidad" },
  { materia: "Estudios del Antiguo Testamento", desc: "Pentateuco y libros históricos" },
  { materia: "Estudios del Nuevo Testamento", desc: "Evangelios y epístolas paulinas" },
  { materia: "Psicología del Matrimonio y la Familia", desc: "Dinámicas y desarrollo familiar" },
  { materia: "Consejería Familiar I", desc: "Prevención y resolución de conflictos" },
  { materia: "Ética Cristiana y Moral", desc: "Principios bíblicos aplicados a la vida diaria" },
  { materia: "Práctica Ministerial II", desc: "Consejería supervisada en contextos reales" },
];

const año3 = [
  { materia: "Teología Sistemática III", desc: "Escatología y temas contemporáneos" },
  { materia: "Estudios Bíblicos Avanzados", desc: "Profetas y literatura sapiencial" },
  { materia: "Consejería Familiar II", desc: "Casos complejos (adicciones, violencia, duelo)" },
  { materia: "Psicopatología Básica", desc: "Identificación y derivación de trastornos" },
  { materia: "Mediación y Restauración Familiar", desc: "Técnicas de reconciliación" },
  { materia: "Liderazgo y Administración Ministerial", desc: "Gestión de proyectos y equipos" },
  { materia: "Seminario de Investigación", desc: "Proyecto final integrador" },
  { materia: "Práctica Profesional", desc: "Servicio en iglesia, ONG o centro de consejería" },
];

function YearSection({ 
  year, 
  title, 
  objective, 
  subjects, 
  color 
}: { 
  year: number; 
  title: string; 
  objective: string; 
  subjects: { materia: string; desc: string }[]; 
  color: string;
}) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-4">
        <span className={`${color} text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 shadow-lg`}>
          {year}°
        </span>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">Año {year} – {title}</h2>
          <p className="text-muted-foreground text-sm mt-1"><strong>Objetivo:</strong> {objective}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mt-6">
        {subjects.map((s, i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow flex gap-4 items-start"
          >
            <span className={`${color} text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}>
              {i + 1}
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{s.materia}</h3>
              <p className="text-muted-foreground text-xs mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlanEstudiosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block bg-accent/20 text-accent border border-accent/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 backdrop-blur-md">
            DURACIÓN: 3 AÑOS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Plan de Estudios</h1>
          <p className="text-lg text-primary-foreground/80">
            Licenciatura en Teología y Consejería para la Familia
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <YearSection
              year={1}
              title="Fundamentos"
              objective="Proporcionar bases sólidas en teología, Biblia y principios de consejería."
              subjects={año1}
              color="bg-blue-600"
            />

            <YearSection
              year={2}
              title="Profundización"
              objective="Integrar conocimientos teológicos con herramientas de consejería familiar."
              subjects={año2}
              color="bg-indigo-600"
            />

            <YearSection
              year={3}
              title="Especialización y Aplicación"
              objective="Capacitar para ejercer profesionalmente en ministerios, iglesias o centros de consejería."
              subjects={año3}
              color="bg-violet-600"
            />

            {/* Modalidad */}
            <div className="grid md:grid-cols-3 gap-4 mb-16">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">60%</p>
                <p className="text-sm text-muted-foreground mt-1">Clases teóricas</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 text-center">
                <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">30%</p>
                <p className="text-sm text-muted-foreground mt-1">Prácticas y talleres</p>
              </div>
              <div className="bg-violet-50 dark:bg-violet-950/30 p-6 rounded-2xl border border-violet-200 dark:border-violet-900/50 text-center">
                <GraduationCap className="w-8 h-8 text-violet-600 dark:text-violet-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">10%</p>
                <p className="text-sm text-muted-foreground mt-1">Proyectos e investigación</p>
              </div>
            </div>

            {/* Perfil de Egreso */}
            <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent rounded-full opacity-20 blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                  Perfil de Egreso
                </h2>
                <p className="text-primary-foreground/90 text-lg leading-relaxed">
                  El egresado podrá interpretar y enseñar la Biblia con solidez, brindar consejería familiar con fundamentos teológicos y psicológicos, y liderar programas de apoyo y restauración en contextos comunitarios.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6 text-lg">¿Listo para dar el primer paso?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/inscripcion"
                  className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-lg h-14 shadow-lg font-bold transition-transform hover:scale-105"
                >
                  Inicia tu Proceso
                </Link>
                <Link
                  href="/carreras/teologia#informacion"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 text-lg h-14 border border-primary text-primary hover:bg-primary/5 font-bold"
                >
                  Solicitar Información
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
