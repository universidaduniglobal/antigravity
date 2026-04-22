import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, GraduationCap, HeartHandshake, BookOpen, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Estudiantes en el campus de UniGlobal"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/20" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground leading-[1.1]">
              Descubre tu futuro, <br/>
              <span className="text-accent drop-shadow-sm">construye tu presente.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/90 font-medium max-w-2xl">
              Universidad de desarrollo integral con valores cristianos. Formamos profesionales para transformar el mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-lg h-14 shadow-lg">
                Inicia tu proceso
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-primary text-primary hover:bg-primary/5 bg-background/50 backdrop-blur-sm">
                Conoce nuestras carreras
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué UniGlobal */}
      <section id="nosotros" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">¿Por qué elegir UniGlobal?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Nos enfocamos en un desarrollo completo del individuo, combinando excelencia académica con una sólida base moral y espiritual.
            </p>
            <Link href="/nosotros">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Conoce más <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <HeartHandshake className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Valores Cristianos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integridad, amor al prójimo y servicio. Formamos profesionales que no solo destacan por su conocimiento, sino por su carácter.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <GraduationCap className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excelencia Académica</h3>
              <p className="text-muted-foreground leading-relaxed">
                Programas rigurosos diseñados para responder a los desafíos del mundo actual, impartidos por expertos en su área.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <Globe className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visión Global</h3>
              <p className="text-muted-foreground leading-relaxed">
                Preparamos líderes con perspectiva internacional, listos para impactar positivamente en cualquier entorno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Académica */}
      <section id="carreras" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Nuestra Oferta Académica</h2>
              <p className="text-muted-foreground text-lg">
                Programas diseñados para potenciar tus dones y prepararte para tu propósito.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Carrera 1 */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground flex flex-col justify-end min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent z-10"></div>
              
              <div className="absolute inset-0 z-0 flex justify-center items-center opacity-30 group-hover:scale-105 transition-transform duration-700 bg-slate-900">
                 <BookOpen className="w-48 h-48 opacity-20" />
              </div>
              
              <div className="relative z-20 p-10 mt-auto">
                <div className="bg-accent/20 text-accent border border-accent/30 w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-5 backdrop-blur-md">
                  LICENCIATURA
                </div>
                <h3 className="text-3xl font-bold mb-3">Teología</h3>
                <p className="text-primary-foreground/80 mb-8 leading-relaxed max-w-md">
                  Profundiza en el conocimiento de la palabra y prepárate para el ministerio pastoral, la enseñanza o el liderazgo en tu comunidad.
                </p>
                <Button variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90 font-medium px-6">
                  Ver Plan de Estudios
                </Button>
              </div>
            </div>

            {/* Carrera 2 */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-secondary text-secondary-foreground border border-border flex flex-col justify-end min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              
              <div className="absolute inset-0 z-0 flex justify-center items-center group-hover:scale-105 transition-transform duration-700 bg-slate-100 dark:bg-slate-800">
                 <HeartHandshake className="w-48 h-48 opacity-10 text-primary" />
              </div>
              
              <div className="relative z-20 p-10 mt-auto">
                <div className="bg-primary/90 text-white border border-primary w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-5 backdrop-blur-md group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-colors duration-300">
                  LICENCIATURA
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white drop-shadow-md">Consejería para la Familia</h3>
                <p className="text-white/90 mb-8 leading-relaxed max-w-md drop-shadow-sm">
                  Adquiere las herramientas para restaurar relaciones y guiar a las familias hacia la sanidad integral con base bíblica.
                </p>
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 border border-white/10 font-medium px-6">
                  Ver Plan de Estudios
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent rounded-full opacity-20 blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-accent rounded-full opacity-10 blur-3xl mix-blend-screen"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Tu momento es ahora</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Únete a la nueva generación de profesionales con propósito. El proceso de admisión para el próximo ciclo escolar está abierto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 rounded-full px-8 text-lg h-14 shadow-lg shadow-accent/20">
              Solicitar Información
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-primary-foreground/30 text-white hover:bg-white/10 backdrop-blur-sm">
              Requisitos de Admisión
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
