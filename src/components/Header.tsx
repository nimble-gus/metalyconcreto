'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/servicios', label: 'Servicios' },
    { href: '/acerca-de-nosotros', label: 'Acerca de Nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-[168px] h-[168px] sm:w-48 sm:h-48 lg:w-60 lg:h-60">
              <Image
                src="/logoc.png"
                alt="Metal y Concreto Logo"
                fill
                className="object-contain rounded-2xl"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-brand-red transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cotiza"
              className="bg-brand-red text-white px-6 py-2.5 rounded-full hover:bg-brand-redDark transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Cotiza con Nosotros
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-brand-red rounded-xl transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cotiza"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 bg-brand-red text-white rounded-xl hover:bg-brand-redDark transition-colors duration-200 text-center font-semibold"
            >
              Cotiza con Nosotros
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

