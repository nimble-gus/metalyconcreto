'use client';

import { useState } from 'react';
import { Calculator, CheckCircle, FileText, Clock, DollarSign, ArrowRight } from 'lucide-react';

export default function CotizaPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectSize: '',
    location: '',
    budget: '',
    timeline: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Resetear formulario después de 5 segundos
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        projectSize: '',
        location: '',
        budget: '',
        timeline: '',
        description: '',
      });
      setIsSubmitted(false);
    }, 5000);
  };

  const benefits = [
    {
      icon: Calculator,
      title: 'Cotización Gratuita',
      description: 'Sin compromiso, recibe una estimación detallada de tu proyecto.',
    },
    {
      icon: Clock,
      title: 'Respuesta Rápida',
      description: 'Te contactaremos en menos de 24 horas con tu cotización.',
    },
    {
      icon: DollarSign,
      title: 'Precios Competitivos',
      description: 'Ofertas transparentes y competitivas en el mercado.',
    },
    {
      icon: FileText,
      title: 'Propuesta Detallada',
      description: 'Recibirás un documento completo con todos los detalles.',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/estimated.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gray-400/70"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Solicita tu Cotización
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 leading-relaxed">
              Completa el formulario y recibe una cotización personalizada para tu proyecto
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {isSubmitted ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ¡Solicitud Enviada!
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Gracias por confiar en nosotros. Hemos recibido tu solicitud de cotización.
                </p>
                <p className="text-gray-600">
                  Nuestro equipo se pondrá en contacto contigo en menos de 24 horas para 
                  proporcionarte una cotización detallada y personalizada.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Información del Proyecto
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Información Personal
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                          placeholder="1234-5678"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa (Opcional)
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Detalles del Proyecto
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Proyecto *
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Selecciona un tipo</option>
                          <option value="estructura-acero">Estructura en Acero</option>
                          <option value="diseno">Diseño Arquitectónico</option>
                          <option value="planificacion">Planificación de Proyectos</option>
                          <option value="mantenimiento">Mantenimiento y Reparación</option>
                          <option value="industrial">Construcción Industrial</option>
                          <option value="ingenieria">Ingeniería Estructural</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700 mb-2">
                          Tamaño del Proyecto *
                        </label>
                        <select
                          id="projectSize"
                          name="projectSize"
                          required
                          value={formData.projectSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Selecciona un tamaño</option>
                          <option value="pequeno">Pequeño (Menos de 100 m²)</option>
                          <option value="mediano">Mediano (100 - 500 m²)</option>
                          <option value="grande">Grande (500 - 2000 m²)</option>
                          <option value="muy-grande">Muy Grande (Más de 2000 m²)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                          Ubicación del Proyecto *
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                          placeholder="Ciudad, Dirección"
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                          Presupuesto Estimado
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Selecciona un rango</option>
                          <option value="menos-50k">Menos de $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k-250k">$100,000 - $250,000</option>
                          <option value="250k-500k">$250,000 - $500,000</option>
                          <option value="mas-500k">Más de $500,000</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-6">
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                        Tiempo Estimado para Iniciar
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Selecciona un tiempo</option>
                        <option value="inmediato">Inmediato</option>
                        <option value="1-mes">En 1 mes</option>
                        <option value="2-3-meses">En 2-3 meses</option>
                        <option value="4-6-meses">En 4-6 meses</option>
                        <option value="mas-6-meses">Más de 6 meses</option>
                      </select>
                    </div>
                    <div className="mt-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción del Proyecto *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Cuéntanos más detalles sobre tu proyecto, requisitos especiales, o cualquier información adicional que consideres relevante..."
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-brand-red text-white px-10 py-4 rounded-full hover:bg-brand-redDark transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Enviando solicitud...</span>
                        </>
                      ) : (
                        <>
                          <span>Solicitar Cotización</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      * Campos obligatorios. Tu información será tratada con confidencialidad.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

