'use client';

import { Award, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Calidad Garantizada',
    description:
      'Más de 30 años de experiencia en construcción de estructuras de acero de alta calidad.',
  },
  {
    icon: Users,
    title: 'Equipo Profesional',
    description:
      'Contamos con ingenieros, arquitectos y constructores altamente capacitados.',
  },
  {
    icon: TrendingUp,
    title: 'Innovación Constante',
    description:
      'Utilizamos las últimas tecnologías y metodologías en construcción moderna.',
  },
];

export default function About() {
  return (
    <section id="acerca" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Acerca de Nosotros
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              En <span className="font-semibold text-primary-600">Metal y Concreto</span>, 
              somos especialistas en construcción moderna con un enfoque en la excelencia 
              y la innovación. Nos dedicamos a crear estructuras que combinan la resistencia 
              del acero con diseños arquitectónicos vanguardistas.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nuestro compromiso es entregar proyectos que superen las expectativas de 
              nuestros clientes, cumpliendo con los más altos estándares de calidad, 
              seguridad y eficiencia.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">30+</div>
                <div className="text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-600">Proyectos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-600">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-xl flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



