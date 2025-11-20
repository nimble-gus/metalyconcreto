'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: '#',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: '#',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: '#',
  },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-white text-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <div className="relative w-80 h-32">
                <Image
                  src="/logoc.png"
                  alt="Metal y Concreto Logo"
                  fill
                  className="object-contain rounded-2xl"
                />
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md leading-normal">
              Constructora moderna especializada en estructuras de acero,
              diseño arquitectónico y planificación de proyectos. Construimos
              el futuro con excelencia y compromiso.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:46891986"
                className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                <span>4689-1986</span>
              </a>
              <a
                href="mailto:contacto@metalyconcreto.com"
                className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>contacto@metalyconcreto.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/servicios"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/acerca-de-nosotros"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/cotiza"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Cotiza con Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-primary-600 text-gray-700 hover:text-white p-3 rounded-xl transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} Metal y Concreto. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}


