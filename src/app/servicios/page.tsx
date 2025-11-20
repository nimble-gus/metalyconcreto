'use client';

import Image from 'next/image';
import { Building2, DraftingCompass, Calendar, ArrowRight, CheckCircle, Wrench, HardHat, Ruler } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Estructura en Acero',
    description:
      'Diseño y construcción de estructuras metálicas de alta calidad, resistentes y duraderas para proyectos comerciales e industriales.',
    features: [
      'Diseño estructural personalizado',
      'Fabricación de acero de alta calidad',
      'Instalación profesional',
      'Cumplimiento de normativas',
      'Mantenimiento y reparación',
    ],
  },
  {
    icon: DraftingCompass,
    title: 'Diseño Arquitectónico',
    description:
      'Servicios de diseño arquitectónico e ingeniería, creando soluciones innovadoras y funcionales para cada proyecto.',
    features: [
      'Diseño conceptual y desarrollo',
      'Planos arquitectónicos detallados',
      'Renderizado 3D y visualizaciones',
      'Asesoría en diseño sostenible',
      'Optimización de espacios',
    ],
  },
  {
    icon: Calendar,
    title: 'Planificación de Proyectos',
    description:
      'Gestión integral de proyectos desde la concepción hasta la entrega, asegurando tiempos y presupuestos optimizados.',
    features: [
      'Análisis de viabilidad',
      'Programación y cronogramas',
      'Control de presupuestos',
      'Supervisión de obra',
      'Entrega y documentación',
    ],
  },
];

const additionalServices = [
  {
    icon: Wrench,
    title: 'Mantenimiento y Reparación',
    description: 'Servicios de mantenimiento preventivo y correctivo para estructuras existentes.',
  },
  {
    icon: HardHat,
    title: 'Construcción Industrial',
    description: 'Especialistas en construcción de naves industriales y espacios comerciales.',
  },
  {
    icon: Ruler,
    title: 'Ingeniería Estructural',
    description: 'Cálculos estructurales y análisis de resistencia para garantizar la seguridad.',
  },
];

export default function ServiciosPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-1.jpg"
            alt="Nuestros Servicios"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-400/70"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 leading-relaxed">
              Soluciones integrales en construcción moderna con los más altos
              estándares de calidad y profesionalismo
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-10 h-10 text-primary-600" strokeWidth={2} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/cotiza"
                      className="inline-flex items-center mt-8 bg-brand-red text-white px-8 py-3 rounded-full hover:bg-brand-redDark transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    >
                      Solicitar Cotización
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    {index === 0 ? (
                      <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
                        <Image
                          src="/estructura.jpg"
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : index === 1 ? (
                      <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
                        <Image
                          src="/arqui.jpg"
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : index === 2 ? (
                      <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
                        <Image
                          src="/plan.png"
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12 h-full flex items-center justify-center">
                        <Icon className="w-32 h-32 text-primary-600 opacity-20" strokeWidth={1} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Complementamos nuestros servicios principales con soluciones especializadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary-600" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-3.jpg"
            alt="¿Listo para comenzar tu proyecto?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contáctanos hoy y recibe una cotización personalizada para tu proyecto
          </p>
          <a
            href="/cotiza"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-full hover:bg-primary-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Solicitar Cotización Gratuita
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}

