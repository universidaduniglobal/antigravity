import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nosotros | Universidad UniGlobal",
  description: "Conoce la misión, visión y valores de la Universidad UniGlobal.",
};

export default function NosotrosPage() {
  const valores = [
    "Fe",
    "Integridad",
    "Respeto",
    "Compromiso",
    "Responsabilidad",
    "Excelencia",
    "Innovación"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="relative py-24 md:py-36 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/nosotros-hero.png"
            alt="Estudiantes leyendo en el campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">Sobre UniGlobal</h1>
            <p className="text-xl text-white/90 drop-shadow-sm">
              Formación integral de excelencia fundamentada en valores cristianos.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-16">
              <p className="text-xl mb-6 text-foreground font-medium">
                La Universidad UNIGLOBAL es una institución educativa dedicada a la formación integral de sus estudiantes, combinando la excelencia académica con valores cristianos. Su objetivo principal es proporcionar una educación que no solo se enfoque en el desarrollo intelectual, sino también en el crecimiento espiritual y moral de los alumnos.
              </p>
              <p>
                Ofrecemos una variedad de programas y cursos en distintas áreas del conocimiento, asegurando que los estudiantes reciban una preparación completa para enfrentar los retos del mundo moderno con una perspectiva ética y global. Además, la universidad fomenta un ambiente de comunidad y apoyo, donde el respeto, la inclusión y la empatía son pilares fundamentales en la dinámica de estudios.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Misión */}
              <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm">01</span>
                  NUESTRA MISIÓN
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Formar profesionistas íntegros, competentes y comprometidos con la excelencia académica, fundamentados en principios cristianos, que contribuyan al desarrollo de la sociedad global mediante el servicio, la ética y el liderazgo inspirado en la fe.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">02</span>
                  NUESTRA VISIÓN
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ser una institución cristiana de educación superior reconocida en México y a nivel internacional por su calidad académica, innovación educativa y compromiso con la formación de líderes transformadores, que impacten positivamente en la iglesia, la comunidad y la nación, promoviendo valores de fe, justicia y amor al prójimo.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="bg-background border border-border p-8 md:p-12 rounded-3xl shadow-sm text-center">
              <h2 className="text-3xl font-bold text-primary mb-8">NUESTROS VALORES</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {valores.map((valor, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted px-6 py-3 rounded-full text-foreground font-medium hover:bg-accent/10 hover:text-primary transition-colors border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    {valor}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
