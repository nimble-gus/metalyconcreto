'use client';

import Image from 'next/image';
import { Award, Users, TrendingUp, Target, Shield, Heart, CheckCircle, Clock, Briefcase } from 'lucide-react';

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

const values = [
  {
    icon: Target,
    title: 'Compromiso',
    description: 'Nos comprometemos a cumplir con los más altos estándares de calidad en cada proyecto.',
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'La seguridad es nuestra prioridad en cada etapa del proceso constructivo.',
  },
  {
    icon: Heart,
    title: 'Integridad',
    description: 'Trabajamos con transparencia, honestidad y respeto en todas nuestras relaciones.',
  },
];

const stats = [
  { number: '30+', label: 'Años de Experiencia', icon: Clock },
  { number: '500+', label: 'Proyectos Completados', icon: Briefcase },
  { number: '100%', label: 'Satisfacción del Cliente', icon: Award },
];

export default function AcercaDeNosotrosPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/arqui.jpg"
            alt="Acerca de Nosotros"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-400/70"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Acerca de Nosotros
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 leading-relaxed">
              Construyendo el futuro con excelencia, innovación y compromiso desde hace más de 30 años
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                En <span className="font-semibold text-primary-600">Metal y Concreto</span>, 
                somos especialistas en construcción moderna con un enfoque en la excelencia 
                y la innovación. Nos dedicamos a crear estructuras que combinan la resistencia 
                del acero con diseños arquitectónicos vanguardistas.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Fundada hace más de tres décadas, nuestra empresa ha crecido hasta convertirse 
                en un referente en la industria de la construcción, completando cientos de 
                proyectos exitosos que van desde pequeñas estructuras comerciales hasta 
                grandes complejos industriales.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro compromiso es entregar proyectos que superen las expectativas de 
                nuestros clientes, cumpliendo con los más altos estándares de calidad, 
                seguridad y eficiencia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center bg-gray-50 p-6 rounded-2xl">
                    <div className="flex justify-center mb-3">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
              ¿Por qué elegirnos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-50 p-8 rounded-2xl hover:bg-primary-50 transition-colors duration-300"
                  >
                    <div className="bg-primary-100 p-4 rounded-xl w-fit mb-6">
                      <Icon className="w-8 h-8 text-primary-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-primary-300 transition-all duration-300"
                  >
                    <div className="bg-primary-100 p-4 rounded-xl w-fit mb-6">
                      <Icon className="w-8 h-8 text-primary-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Mission */}
            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-600" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Proporcionar soluciones constructivas de excelencia que superen las expectativas 
                de nuestros clientes, utilizando tecnología de vanguardia y un equipo altamente 
                capacitado, siempre comprometidos con la calidad, seguridad y sostenibilidad.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-primary-600" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestra Visión
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ser la empresa líder en construcción moderna en la región, reconocida por nuestra 
                innovación, calidad excepcional y compromiso con la satisfacción del cliente, 
                contribuyendo al desarrollo sostenible de nuestras comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-1.jpg"
            alt="Trabajemos juntos en tu próximo proyecto"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-400/70"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Trabajemos juntos en tu próximo proyecto
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contáctanos y descubre cómo podemos ayudarte a hacer realidad tus ideas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-full hover:bg-primary-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Contáctanos
            </a>
            <a
              href="/cotiza"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200 font-semibold"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

