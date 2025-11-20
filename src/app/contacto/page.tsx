'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
    
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      content: '4689-1986',
      link: 'tel:46891986',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contacto@metalyconcreto.com',
      link: 'mailto:contacto@metalyconcreto.com',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Ciudad de Guatemala, Guatemala',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun - Vie: 8:00 AM - 6:00 PM',
      link: '#',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gray-400 text-white py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 leading-relaxed">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Información de Contacto
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Puedes contactarnos a través de cualquiera de estos medios. 
                Estamos disponibles para responder tus consultas y ayudarte con tu proyecto.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="bg-primary-100 p-3 rounded-xl group-hover:bg-primary-600 transition-colors duration-200 flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-200" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-600">{info.content}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-8 sm:p-10 rounded-3xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Envíanos un Mensaje
                </h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-gray-600">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                          placeholder="1234-5678"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Asunto *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Selecciona un asunto</option>
                          <option value="cotizacion">Solicitud de Cotización</option>
                          <option value="consulta">Consulta General</option>
                          <option value="servicio">Información de Servicios</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Cuéntanos sobre tu proyecto o consulta..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-brand-red text-white px-8 py-4 rounded-full hover:bg-brand-redDark transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span>Enviar Mensaje</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

