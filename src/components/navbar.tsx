import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-primary border-b border-primary-foreground/10 shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          {/* Logo CSS Placeholder */}
          <div className="flex flex-col items-center justify-center font-bold leading-none tracking-tighter shrink-0">
            <div className="text-4xl flex items-baseline">
              <span className="text-white">U</span>
              <span className="text-white relative">
                G
                {/* Cyan Accent simulation */}
                <span className="absolute top-0 right-0 w-full h-1/2 overflow-hidden pointer-events-none">
                  <span className="block w-full h-[200%] border-t-[4px] border-r-[4px] border-accent rounded-tr-full absolute top-0 right-0"></span>
                </span>
              </span>
            </div>
            <span className="text-[0.6rem] tracking-widest text-white mt-1">UNIGLOBAL</span>
          </div>
          
          {/* Slogan Text from Image */}
          <div className="hidden lg:flex flex-col text-white pl-4 border-l border-white/30 justify-center h-12">
            <span className="text-sm tracking-[0.15em] uppercase font-medium leading-tight">Universidad de Desarrollo Integral</span>
            <span className="text-[0.95rem] italic leading-tight mt-1">
              Descubre tu futuro, <strong className="font-bold">construye tu presente</strong>
            </span>
          </div>
        </Link>
        <div className="hidden md:flex gap-8 items-center text-primary-foreground">
          <Link href="/nosotros" className="text-sm font-medium hover:text-accent transition-colors">Nosotros</Link>
          <Link href="/#carreras" className="text-sm font-medium hover:text-accent transition-colors">Carreras</Link>
          <Link href="/#admisiones" className="text-sm font-medium hover:text-accent transition-colors">Admisiones</Link>
          <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-6 font-semibold">
            Portal Estudiantil
          </Button>
        </div>
      </div>
    </nav>
  );
}
