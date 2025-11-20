'use client';

import { Building2, DraftingCompass, Calendar, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Estructura en Acero',
    description:
      'Diseño y construcción de estructuras metálicas de alta calidad, resistentes y duraderas para proyectos comerciales e industriales.',
  },
  {
    icon: DraftingCompass,
    title: 'Diseño',
    description:
      'Servicios de diseño arquitectónico e ingeniería, creando soluciones innovadoras y funcionales para cada proyecto.',
  },
  {
    icon: Calendar,
    title: 'Planificación de Proyectos',
    description:
      'Gestión integral de proyectos desde la concepción hasta la entrega, asegurando tiempos y presupuestos optimizados.',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones integrales en construcción moderna con los más altos
            estándares de calidad
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <Icon
                    className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="/cotiza"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200 group-hover:gap-2 gap-1"
                >
                  Saber más
                  <ArrowRight
                    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


