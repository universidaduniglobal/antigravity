'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/nosotros", label: "Nosotros" },
    { href: "/#carreras", label: "Carreras" },
    { href: "/requisitos", label: "Admisiones" },
    { href: "/becas", label: "Becas" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-primary border-b border-primary-foreground/10 shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4" onClick={() => setIsOpen(false)}>
          {/* Logo CSS Placeholder */}
          <div className="flex flex-col items-center justify-center font-bold leading-none tracking-tighter shrink-0">
            <div className="text-4xl flex items-baseline">
              <span className="text-white">U</span>
              <span className="text-white relative">
                G
                <span className="absolute top-0 right-0 w-full h-1/2 overflow-hidden pointer-events-none">
                  <span className="block w-full h-[200%] border-t-[4px] border-r-[4px] border-accent rounded-tr-full absolute top-0 right-0"></span>
                </span>
              </span>
            </div>
            <span className="text-[0.6rem] tracking-widest text-white mt-1">UNIGLOBAL</span>
          </div>
          
          {/* Slogan Text from Image - Hidden on mobile */}
          <div className="hidden lg:flex flex-col text-white pl-4 border-l border-white/30 justify-center h-12">
            <span className="text-sm tracking-[0.15em] uppercase font-medium leading-tight">Universidad de Desarrollo Integral</span>
            <span className="text-[0.95rem] italic leading-tight mt-1">
              Descubre tu futuro, <strong className="font-bold">construye tu presente</strong>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center text-primary-foreground">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/portal/login">
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-6 font-semibold">
              Ingreso al Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-xl font-semibold text-white hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10" />
            <Link href="/portal/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-full py-6 text-lg font-bold">
                Ingreso al Portal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
