import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

const Facebook = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Youtube = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col items-start font-bold leading-none tracking-tighter mb-6">
            <div className="text-4xl flex items-baseline text-white">
              <span>U</span>
              <span className="text-accent">G</span>
            </div>
            <span className="text-[0.6rem] tracking-widest text-white mt-1">UNIGLOBAL</span>
          </div>
          <p className="text-primary-foreground/80 max-w-sm mb-6">
            Descubre tu futuro, construye tu presente. Universidad de desarrollo integral con valores cristianos.
          </p>
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/profile.php?id=61583471280190" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-all">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-all">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-all">
              <Youtube size={20} />
            </Link>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Oferta Académica</h3>
          <ul className="space-y-3 text-primary-foreground/80 text-sm">
            <li><Link href="/carreras/teologia" className="hover:text-accent transition-colors">Licenciatura en Teología y Consejería para la Familia</Link></li>
            <li><Link href="/requisitos" className="hover:text-accent transition-colors">Admisiones</Link></li>
            <li><Link href="/becas" className="hover:text-accent transition-colors">Becas</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Contacto</h3>
          <ul className="space-y-3 text-primary-foreground/80 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
              <span>Hermosillo, Sonora<br/>México</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-accent shrink-0" />
              <span>+52 662 405 3624</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-accent shrink-0" />
              <span>uniglobalmx@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
        <p>© {new Date().getFullYear()} Universidad UniGlobal. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Aviso de Privacidad</Link>
          <Link href="#" className="hover:text-white transition-colors">Términos de Uso</Link>
        </div>
      </div>
    </footer>
  );
}
