import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/site.config';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { toastService } from '../../services/toast.service';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Cotización de Materiales');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toastService.success('¡Mensaje enviado con éxito! Un asesor técnico se comunicará contigo.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 700);
  };

  const handleSendViaWhatsApp = () => {
    const formattedMsg = `*Mensaje de Contacto - Ferretería July*%0A` +
      `*Nombre:* ${encodeURIComponent(name || 'Cliente')}%0A` +
      `*Asunto:* ${encodeURIComponent(subject)}%0A` +
      `*Teléfono:* ${encodeURIComponent(phone || 'No especificado')}%0A` +
      `*Mensaje:* ${encodeURIComponent(message || 'Deseo cotizar productos')}`;

    window.open(SITE_CONFIG.buildWhatsAppUrl(formattedMsg), '_blank');
  };

  const faqs = [
    {
      q: '¿Emiten Factura y Boleta Electrónica con RUC 20 y RUC 10?',
      a: 'Sí, somos una empresa formal y todos nuestros precios ya incluyen IGV. Emitimos factura o boleta electrónica según lo requiera tu empresa o proyecto.',
    },
    {
      q: '¿Hacen envíos a obras en Lima y despachos a provincias?',
      a: 'Realizamos entregas directas a pie de obra en Lima Metropolitana y gestionamos envíos a todo el Perú mediante agencias de transporte reconocidas (Shalom, Marvisur, Flores, etc.).',
    },
    {
      q: '¿Qué medios de pago aceptan?',
      a: 'Aceptamos transferencias bancarias directas (BCP, BBVA, Interbank, Scotiabank), pagos con Yape / Plin, tarjetas de débito/crédito (Visa, Mastercard, Amex) y efectivo en tienda.',
    },
    {
      q: '¿Los productos cuentan con garantía de marca?',
      a: 'Absolutamente. Todas las herramientas eléctricas (DeWalt, Bosch, Stanley, Makita) y productos químicos cuentan con garantía respaldada por los centros de servicio oficiales autorizados.',
    },
  ];

  return (
    <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-[#f97316]/10 px-3 py-1 rounded-full">
          Canales de Atención
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
          Ponte en Contacto con Ferretería July
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          ¿Tienes una consulta sobre especificaciones técnicas, cotizaciones al por mayor o disponibilidad de stock? Escríbenos o visítanos en nuestro local.
        </p>
      </div>

      {/* Grid Principal: Formulario + Datos de Contacto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Formulario (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
            Envíanos un Mensaje
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Te responderemos a la brevedad posible con información detallada y presupuestos personalizados.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Roberto Sánchez"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="roberto@empresa.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Teléfono / Celular
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="999 888 777"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tipo de Consulta
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                >
                  <option value="Cotización de Materiales">Cotización de Materiales</option>
                  <option value="Venta por Mayor / Empresa">Venta por Mayor / Empresa</option>
                  <option value="Consulta Técnica de Producto">Consulta Técnica de Producto</option>
                  <option value="Seguimiento de Despacho">Seguimiento de Despacho</option>
                  <option value="Garantía o Soporte">Garantía o Soporte</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Detalle de tu mensaje *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Indícanos qué productos necesitas, cantidades aproximadas o si requieres despacho a una zona específica..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#0f172a] text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4 text-[#f97316]" />
                {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
              </button>

              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        </div>

        {/* Tarjetas de Información Directa (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card WhatsApp & Telegram */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#f97316]">
              Atención Inmediata en Línea
            </h4>
            <p className="text-xs text-slate-300">
              Escríbenos directamente a nuestras plataformas de mensajería instantánea para respuestas en tiempo real:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={SITE_CONFIG.buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white/10 hover:bg-[#25D366] hover:text-white transition-all flex items-center gap-3 border border-white/10 group"
              >
                <MessageSquare className="w-5 h-5 fill-current text-[#25D366] group-hover:text-white shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-white/80">WhatsApp</p>
                  <p className="text-xs font-extrabold">{SITE_CONFIG.contact.whatsappDisplay}</p>
                </div>
              </a>

              <a
                href={SITE_CONFIG.buildTelegramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white/10 hover:bg-[#0088cc] hover:text-white transition-all flex items-center gap-3 border border-white/10 group"
              >
                <Send className="w-5 h-5 text-[#0088cc] group-hover:text-white shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-white/80">Telegram</p>
                  <p className="text-xs font-extrabold">{SITE_CONFIG.contact.telegramDisplay}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Card Ubicación y Horarios */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Sede Principal y Horarios
            </h4>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Dirección Comercial:</p>
                  <p>{SITE_CONFIG.contact.address}, {SITE_CONFIG.contact.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Central Telefónica:</p>
                  <p>{SITE_CONFIG.contact.phoneDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Correo Oficial:</p>
                  <p>{SITE_CONFIG.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs text-slate-600 dark:text-slate-300">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">Horarios de Atención:</p>
                  <p>{SITE_CONFIG.contact.schedules.weekdays}</p>
                  <p>{SITE_CONFIG.contact.schedules.saturday}</p>
                  <p className="text-slate-500 dark:text-slate-400">{SITE_CONFIG.contact.schedules.sunday}</p>
                </div>
              </div>
            </div>

            <a
              href={SITE_CONFIG.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:text-[#f97316] transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#f97316]" /> Ver Mapa Satelital
            </a>
          </div>

        </div>

      </div>

      {/* Preguntas Frecuentes (FAQ) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800">
        <div className="text-center mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316]">
            Respuestas Rápidas
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Preguntas Frecuentes de Clientes
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-[#f97316] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#f97316] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#f97316]' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in-0">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
