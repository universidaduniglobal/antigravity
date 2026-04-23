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

          <div className="max-w-4xl mx-auto">
            <div className="group relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground flex flex-col justify-end min-h-[450px] shadow-xl">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/degree-bg.png"
                  alt="Estudiante tecleando en laptop y estudiando"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Different blue filter but keeping text legible */}
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A56] via-[#0A2A56]/80 to-transparent"></div>
              </div>
              
              <div className="relative z-20 p-10 md:p-14 mt-auto">
                <div className="bg-accent/20 text-accent border border-accent/30 w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-5 backdrop-blur-md">
                  LICENCIATURA INTEGRAL
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Teología y Consejería para la Familia</h3>
                <p className="text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl text-lg">
                  Profundiza en el conocimiento de la palabra y adquiere las herramientas psicológicas y espirituales para restaurar relaciones, guiando a las familias hacia la sanidad integral con una sólida base bíblica.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/carreras/teologia">
                    <Button variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-8 h-12">
                      Conoce Más
                    </Button>
                  </Link>
                  <a href="/docs/folleto-teologia.pdf" download>
                    <Button variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-8 h-12 w-full sm:w-auto">
                      Descargar Folleto
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cta-bg.png"
            alt="Graduados de UniGlobal celebrando"
            fill
            className="object-cover object-center"
          />
          {/* Overlay to make text pop */}
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px] mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-md">Tu momento es ahora</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm font-medium">
            Únete a la nueva generación de profesionales con propósito. El proceso de admisión para el próximo ciclo escolar está abierto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 rounded-full px-8 text-lg h-14 shadow-lg shadow-accent/20 transition-transform hover:scale-105">
              Solicitar Información
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm transition-colors">
              Requisitos de Admisión
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
