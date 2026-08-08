import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Zap,
  ShoppingBag,
  PackageCheck,
  MessageSquareCode,
  TrendingUp,
  Building2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Clock,
  ChevronDown,
  X,
  Check,
  Globe,
  HardDrive,
  Database,
  Gift,
  FileSpreadsheet,
  Headphones,
  Mail,
  MessageCircle
} from 'lucide-react';

export function App() {
  // Navigation & Interactive Tabs State
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory' | 'whatsapp' | 'finance'>('pos');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [dailySales, setDailySales] = useState<number>(35);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Live BCV Rate State
  const [bcvRate, setBcvRate] = useState<number>(756.71);
  const [bcvDate, setBcvDate] = useState<string>('Hoy');
  const [loadingBcv, setLoadingBcv] = useState<boolean>(true);

  // Fetch real BCV rate live from API
  useEffect(() => {
    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.promedio) {
          setBcvRate(Number(data.promedio));
          if (data.fechaActualizacion) {
            const dateObj = new Date(data.fechaActualizacion);
            setBcvDate(dateObj.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }));
          }
        }
        setLoadingBcv(false);
      })
      .catch((err) => {
        console.error('Error al sincronizar la tasa BCV en vivo:', err);
        setLoadingBcv(false);
      });
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    dbOption: 'scratch', // 'scratch' | 'client' | 'assisted'
    plan: 'Versión Online (4 Meses Gratis)'
  });

  // ROI Math
  const hoursSaved = Math.round(dailySales * 0.85 * 30 / 60);
  const moneySaved = Math.round(hoursSaved * 12.5 + dailySales * 1.8);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp message text with user details
    const dbLabel =
      formData.dbOption === 'scratch' ? 'Base de Datos Limpia (Desde 0)' :
      formData.dbOption === 'client' ? 'Carga por el Cliente (Plantilla Excel Gratis)' :
      'Carga Asistida por SmartBytes (Servicio Técnico)';

    const textMsg = `Hola SmartBytes, deseo registrar mi empresa en SB_ERP (Promoción 4 MESES GRATIS):\n\n` +
      `👤 *Nombre:* ${formData.name}\n` +
      `🏢 *Empresa:* ${formData.company}\n` +
      `📱 *WhatsApp:* ${formData.phone}\n` +
      `✉️ *Correo:* ${formData.email}\n` +
      `🗄️ *Modalidad DB:* ${dbLabel}\n` +
      `📦 *Plan:* ${formData.plan}`;

    const encodedText = encodeURIComponent(textMsg);
    const waUrl = `https://wa.me/584125494755?text=${encodedText}`;

    // Open direct WhatsApp chat
    window.open(waUrl, '_blank');

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowDemoModal(false);
      setFormData({ name: '', company: '', phone: '', email: '', dbOption: 'scratch', plan: 'Versión Online (4 Meses Gratis)' });
    }, 4000);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* Dynamic Background Glow Spheres */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* PROMO TOP BANNER */}
      <div style={{
        background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
        color: '#fff',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        fontSize: '0.85rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        boxShadow: '0 2px 10px rgba(99, 102, 241, 0.3)'
      }}>
        <Gift size={16} />
        <span>¡Gran Lanzamiento Online! Registra tu Empresa hoy y obtén <strong>4 MESES GRATIS</strong> con 1 Caja activa.</span>
        <button
          onClick={() => setShowDemoModal(true)}
          style={{
            background: '#fff',
            color: '#4f46e5',
            border: 'none',
            padding: '0.2rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginLeft: '0.5rem'
          }}
        >
          Registrarme Gratis
        </button>
      </div>

      {/* HEADER / NAVBAR */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.6rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
            }}>
              <Terminal size={20} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                SB<span style={{ color: '#818cf8' }}>_ERP</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                display: 'block',
                color: '#10b981',
                fontWeight: 600,
                letterSpacing: '1px',
                marginTop: '-4px'
              }}>
                EXODUS EDITION
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            <a href="#modalidades" style={navLinkStyle}>Versión Online vs Local</a>
            <a href="#base-de-datos" style={navLinkStyle}>Base de Datos</a>
            <a href="#modulos" style={navLinkStyle}>Módulos</a>
            <a href="#roi" style={navLinkStyle}>Calculadora ROI</a>
            <a href="#precios" style={navLinkStyle}>Planes</a>
            <a href="#contacto" style={navLinkStyle}>Contacto</a>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="https://wa.me/584125494755"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#25D366',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <MessageCircle size={18} />
              <span>Contáctame</span>
            </a>

            <button
              onClick={() => setShowDemoModal(true)}
              className="btn btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
            >
              Registrarse (4 Meses Gratis) <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '4rem 1.5rem 4rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '0.4rem 1rem',
            borderRadius: '2rem',
            color: '#34d399',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Gift size={16} color="#10b981" />
            <span>Oferta de Lanzamiento: Versión Online con 4 MESES GRATIS</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: '1.25rem',
            color: '#f8fafc'
          }}>
            El Control Total de tu Negocio en <br />
            <span className="text-gradient">Una Sola Plataforma Inteligente</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
            maxWidth: '780px',
            margin: '0 auto 2.5rem'
          }}>
            Registra tu empresa en nuestra <strong>versión Online en la nube</strong> y disfruta de <strong>4 meses completamente gratis</strong> con 1 Caja activa y usuario administrador. Gestiona POS, Inventario, Facturación Multi-moneda y Tasa BCV Oficial en tiempo real.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowDemoModal(true)}
              className="btn btn-primary"
              style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
            >
              Registrar Empresa (4 Meses Gratis) <Zap size={18} />
            </button>

            <a
              href="https://wa.me/584125494755"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '1rem 2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MessageCircle size={18} color="#25D366" />
              <span>Contáctame por WhatsApp</span>
            </a>
          </div>

          {/* Value Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '3rem',
            color: '#64748b',
            fontSize: '0.9rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10b981" /> Registro Web Inmediato (1 Caja incluida)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10b981" /> Inicia Desde 0 o Carga tu Inventario
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10b981" /> Tasa BCV Sincronizada en Tiempo Real ({bcvRate.toFixed(2)} Bs)
            </div>
          </div>
        </div>

        {/* INTERACTIVE DEMO PREVIEW CONTAINER */}
        <div style={{ maxWidth: '1100px', margin: '4rem auto 0' }} className="glass-card">
          {/* Mockup Topbar */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.9)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
            </div>

            {/* Interactive Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(30, 41, 59, 0.6)', padding: '0.25rem', borderRadius: '0.5rem' }}>
              {[
                { id: 'pos', label: 'POS Venta Rápida', icon: ShoppingBag },
                { id: 'inventory', label: 'Inventario & Lotes', icon: PackageCheck },
                { id: 'whatsapp', label: 'WhatsApp Bot CRM', icon: MessageSquareCode },
                { id: 'finance', label: 'Finanzas & BCV en Vivo', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: isSelected ? '#6366f1' : 'transparent',
                      color: isSelected ? '#fff' : '#94a3b8',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.35rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Screen View */}
          <div style={{ padding: '2rem', minHeight: '380px', textAlign: 'left' }}>
            {activeTab === 'pos' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#f8fafc' }}>Terminal de Venta POS — Caja #1 (Versión Online)</h3>
                  <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>
                    🟢 Tasa BCV Oficial: {bcvRate.toFixed(2)} BS/USD
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>Ticket de Venta #00482</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span>1x PC SFF Core i5 (6ta Gen) 8/128GB</span>
                      <strong>$169.98</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span>2x Cable de Poder Standard 1.5m</span>
                      <strong>$3.60</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', marginTop: '0.75rem', fontSize: '1.1rem', fontWeight: 700, color: '#818cf8' }}>
                      <span>TOTAL USD:</span>
                      <span>$173.58</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#34d399' }}>
                      <span>TOTAL BS (BCV):</span>
                      <span>{(173.58 * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Método de Pago:</span>
                      <div style={{ fontWeight: 700, marginTop: '0.2rem', color: '#fff' }}>Efectivo USD + Pago Móvil Bs</div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                      Facturar e Imprimir Ticket
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '1rem' }}>Gestión de Inventario Multi-Sucursal</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Sede Central JRZ</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#818cf8' }}>141 Artículos</div>
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>🟢 Stock Óptimo</span>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Sucursal Virtudes</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#818cf8' }}>98 Artículos</div>
                    <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>⚠️ Alerta Stock Mínimo</span>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Sucursal Zamora</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#818cf8' }}>210 Artículos</div>
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>🟢 Stock Óptimo</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '1rem' }}>Bot CRM WhatsApp Automatizado</h3>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                  <div style={{ color: '#25D366', fontWeight: 600, marginBottom: '0.5rem' }}>💬 Mensaje Enviado a +58 412-5494755:</div>
                  <p style={{ background: 'rgba(37, 211, 102, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: '#cbd5e1' }}>
                    "¡Hola Carlos! Tu compra #00482 por <strong>$173.58 USD ({(173.58 * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs)</strong> ha sido procesada exitosamente. Adjuntamos tu comprobante digital PDF. 📄"
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '1rem' }}>Finanzas & Actualización de Tasa BCV</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tasa Oficial BCV (Sincronizada en Vivo)</span>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#34d399' }}>
                      {loadingBcv ? 'Cargando...' : `${bcvRate.toFixed(2)} Bs / USD`}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Fecha Oficial: {bcvDate}</span>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ventas del Día</span>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#818cf8' }}>$1,420.50 USD</div>
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>+18% vs día anterior</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN MODALIDADES: ONLINE VS LOCAL */}
      <section id="modalidades" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Modalidades de Implementación
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>
            Elige la Versión Ideal para Tu Empresa
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto' }}>
            SB_ERP se adapta al tamaño de tu negocio y tu infraestructura de red.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {/* Card Versión Online */}
          <div className="glass-card" style={{ padding: '2.5rem 2rem', position: 'relative', border: '2px solid #6366f1', boxShadow: '0 0 30px rgba(99, 102, 241, 0.25)' }}>
            <div style={{
              position: 'absolute',
              top: '-14px',
              right: '1.5rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.3rem 0.9rem',
              borderRadius: '1rem',
              textTransform: 'uppercase'
            }}>
              4 MESES GRATIS
            </div>
            
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Globe size={28} color="#818cf8" />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              Versión Online (Cloud / Web)
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Regístrate tú mismo directamente desde esta página y comienza a usar el sistema en minutos sin instalar servidores.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#10b981" /> <strong>Primeros 4 Meses GRATIS</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#10b981" /> Registro de tu Empresa y Usuario Admin
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#10b981" /> Incluye 1 Caja activa para facturación
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#10b981" /> Sincronización automática de Tasa BCV Oficial
              </li>
            </ul>

            <button
              onClick={() => setShowDemoModal(true)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Registrarse Gratis en la Nube <ArrowRight size={16} />
            </button>
          </div>

          {/* Card Versión Local */}
          <div className="glass-card" style={{ padding: '2.5rem 2rem', position: 'relative' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <HardDrive size={28} color="#f59e0b" />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              Versión Local (Servidor On-Premise)
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Diseñada para establecimientos que requieren máxima velocidad en red local o funcionan sin internet continuo.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#f59e0b" /> Configurada e instalada por nuestro equipo
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#f59e0b" /> Operación 100% Offline e independiente
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#f59e0b" /> Servidor de base de datos local en tu local
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#f59e0b" /> Conexión directa a impresoras térmicas y gavetas
              </li>
            </ul>

            <a
              href="https://wa.me/584125494755?text=Hola%20SmartBytes,%20deseo%20informaci%C3%B3n%20sobre%20la%20Instalaci%C3%B3n%20Local%20de%20SB_ERP"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}
            >
              <MessageCircle size={16} color="#25D366" /> Solicitar Instalación Local
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN BASE DE DATOS E IMPORTACIÓN */}
      <section id="base-de-datos" style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, rgba(9, 13, 22, 1) 0%, rgba(15, 23, 42, 0.8) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Puesta en Marcha a tu Medida
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>
              ¿Cómo quieres Cargar la Base de Datos de tu Empresa?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto' }}>
              Te ofrecemos total libertad: puedes iniciar desde cero o migrar tus productos existentes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Opción 1 */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Database size={22} color="#818cf8" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Iniciar Limpio desde 0</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                El sistema crea una base de datos vacía lista para usar, configurada con tu Empresa, Sucursal y tu usuario Superadmin. Registras tus productos a medida que vendes.
              </p>
              <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                ✓ Incluido sin costo en el registro
              </span>
            </div>

            {/* Opción 2 */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <FileSpreadsheet size={22} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Carga por Tu Equipo</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                Te proporcionamos plantillas estandarizadas en Excel. Tu equipo puede cargar miles de artículos, precios e inventarios de forma masiva sin depender de nadie.
              </p>
              <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                ✓ Gratis (Sin costo adicional)
              </span>
            </div>

            {/* Opción 3 */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Headphones size={22} color="#a855f7" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Carga Asistida por SmartBytes</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                Nuestro equipo técnico se encarga de extraer, limpiar y migrar tu inventario y datos existentes desde tu sistema anterior o archivos propios.
              </p>
              <span style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 600 }}>
                ℹ️ Servicio opcional (Costo según volumen de datos)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS DEL SISTEMA */}
      <section id="modulos" style={{ padding: '5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Módulos Específicamente Diseñados para Escalar
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Cada herramienta fue construida pensando en la velocidad y el control operativo.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'Facturación Multi-Moneda', desc: 'Vende en USD y Bolívares simultáneamente con cálculo de vuelto automático.', icon: DollarSign },
            { title: 'Inventario por Lotes y Seriales', desc: 'Trazabilidad completa para electrónicos, repuestos y mercancía con garantía.', icon: PackageCheck },
            { title: 'Chatbot CRM WhatsApp', desc: 'Envío automático de recibos digitales y notificaciones de cobranza al cliente.', icon: MessageSquareCode },
            { title: 'Control Multi-Sucursal', desc: 'Sincroniza existencias y reportes consolidados entre múltiples tiendas.', icon: Building2 },
            { title: 'Tasa BCV en Tiempo Real', desc: 'Conexión automática a la tasa oficial del Banco Central de Venezuela.', icon: TrendingUp },
            { title: 'Seguridad y Roles', desc: 'Permisos granulares por cajero, supervisor y administrador de tienda.', icon: ShieldCheck }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Icon size={20} color="#818cf8" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem', color: '#f8fafc' }}>{mod.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>{mod.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CALCULADORA INTERACTIVA DE ROI */}
      <section id="roi" style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(9, 13, 22, 1) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="glass-card">
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Calculadora de Eficiencia Pyme
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
              Calcula cuánto Ahorrará tu Empresa con SB_ERP
            </h2>

            <div style={{ maxWidth: '600px', margin: '2rem auto 2.5rem' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                <span>Ventas / Transacciones aproximadas por día:</span>
                <span style={{ color: '#818cf8', fontSize: '1.2rem' }}>{dailySales} ventas/día</span>
              </label>
              <input
                type="range"
                min="5"
                max="200"
                value={dailySales}
                onChange={(e) => setDailySales(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1', cursor: 'pointer' }}
              />
            </div>

            {/* ROI Metrics Result */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <Clock size={28} color="#818cf8" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>
                  {hoursSaved} Horas/mes
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Ahorradas en cuadres manuales y digitación de precios.</p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <DollarSign size={28} color="#10b981" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#34d399' }}>
                  +${moneySaved} USD/mes
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Estimado en recuperación de fugas y optimización operativa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANES Y PRECIOS */}
      <section id="precios" style={{ padding: '5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Planes de Suscripción Simples y Transparentes
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Recuerda que la <strong>Versión Online incluye 4 Meses Gratis</strong> con 1 Caja para iniciar hoy.
          </p>

          {/* Toggle Switch */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(30, 41, 59, 0.8)', padding: '0.35rem', borderRadius: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                background: billingCycle === 'monthly' ? '#6366f1' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '1.5rem',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Pago Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                background: billingCycle === 'annual' ? '#6366f1' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '1.5rem',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Pago Anual <span style={{ background: '#10b981', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '1rem', fontSize: '0.65rem' }}>-20% OFF</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          {[
            {
              name: 'Online Inicial (Promo)',
              priceMonthly: 0,
              priceAnnual: 0,
              desc: 'Ideal para iniciar de inmediato en la nube con 1 caja y 1 usuario.',
              features: [
                '🎁 4 Meses Gratis de Licencia',
                '1 Punto de Venta (POS) en la Nube',
                '1 Usuario Superadministrador',
                'Carga de Datos desde 0 o Excel',
                'Sincronización Tasa BCV'
              ],
              popular: true
            },
            {
              name: 'Plan Pyme Pro',
              priceMonthly: 59,
              priceAnnual: 47,
              desc: 'Para empresas en crecimiento que necesitan gestión completa de almacenes.',
              features: [
                'Hasta 3 Puntos de Venta (POS)',
                'Inventario por Lotes y Seriales',
                'CRM & Bot de WhatsApp',
                'Facturación Multi-moneda & IGTF',
                'Gestión de Compras y Nómina',
                'Soporte Prioritario WhatsApp'
              ],
              popular: false
            },
            {
              name: 'Enterprise Multi-Sucursal',
              priceMonthly: 119,
              priceAnnual: 95,
              desc: 'Para cadenas corporativas y redes de tiendas multi-sucursal.',
              features: [
                'Puntos de Venta Ilimitados',
                'Multi-Sucursal & Almacenes Ilimitados',
                'Chatbot WhatsApp con IA Avanzada',
                'Acceso API y Sincronización SQL',
                'Asesor de Implementación Dedicado',
                'Garantía SLA 99.9% Uptime'
              ],
              popular: false
            }
          ].map((plan, idx) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: plan.popular ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: plan.popular ? '0 0 30px rgba(16, 185, 129, 0.25)' : 'none'
                }}
              >
                {plan.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.25rem 1rem',
                    borderRadius: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    4 MESES GRATIS
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>{plan.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem', minHeight: '2.5rem' }}>{plan.desc}</p>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                      {price === 0 ? 'GRATIS' : `$${price}`}
                    </span>
                    {price > 0 && <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}> / mes</span>}
                    {price === 0 && <span style={{ color: '#34d399', fontSize: '0.85rem', display: 'block' }}>Durante los primeros 4 meses</span>}
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                        <Check size={16} color="#10b981" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setFormData({ ...formData, plan: plan.name });
                    setShowDemoModal(true);
                  }}
                  className={plan.popular ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ width: '100%' }}
                >
                  Registrarse en {plan.name}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Preguntas Frecuentes</h2>
          <p style={{ color: '#94a3b8' }}>Todo lo que necesitas saber sobre el registro online y la base de datos.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              q: '¿Cómo funciona la promoción de 4 Meses Gratis de la versión Online?',
              a: 'Al registrar tu empresa en esta página web, creas tu cuenta administrador y se activa automáticamente tu licencia por 4 meses sin costo, incluyendo 1 Caja para facturar desde la nube.'
            },
            {
              q: '¿Puedo empezar con una base de datos desde 0 o migrar mis productos?',
              a: 'Tienes ambas opciones: puedes iniciar con una base de datos limpia desde 0 y agregar tus productos, o cargar masivamente tu catálogo desde Excel sin costo. Si prefieres que nuestro equipo realice la migración por ti, ofrecemos el servicio de Carga Asistida (con un costo ajustado según el volumen de datos).'
            },
            {
              q: '¿Cuál es la diferencia entre la Versión Online y la Versión Local?',
              a: 'La versión Online funciona en la nube y puedes acceder de inmediato desde cualquier navegador. La versión Local (On-Premise) es configurada por nuestro equipo en los servidores o computadoras físicas de tu negocio, ideal para operar 100% offline sin dependencia de internet.'
            },
            {
              q: '¿Cómo funciona la sincronización automática de la Tasa BCV?',
              a: 'El sistema consulta automáticamente en tiempo real la tasa oficial publicada por el Banco Central de Venezuela. Actualiza los precios equivalentes en bolívares al instante para evitar pérdidas cambiarias.'
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f8fafc' }}>{faq.q}</h4>
                <ChevronDown size={18} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
              </div>
              {openFaq === idx && (
                <p style={{ marginTop: '0.85rem', color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER & CONTACTO */}
      <footer id="contacto" style={{
        background: '#060911',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4rem 1.5rem 2rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Terminal size={22} color="#818cf8" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>SB_ERP</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
              Solución integral de planificación de recursos empresariales desarrollada por SmartBytes.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Producto</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <li><a href="#modalidades" style={footerLinkStyle}>Versión Online vs Local</a></li>
              <li><a href="#base-de-datos" style={footerLinkStyle}>Opciones de Base de Datos</a></li>
              <li><a href="#modulos" style={footerLinkStyle}>Punto de Venta POS</a></li>
              <li><a href="#modulos" style={footerLinkStyle}>Sincronización BCV</a></li>
            </ul>
          </div>

          {/* CONTACT & SUPPORT DIRECT LINKS */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contacto & Soporte</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#94a3b8' }}>
              <li>
                <a
                  href="https://wa.me/584125494755?text=Hola%20SmartBytes,%20deseo%20contactarme%20para%20m%C3%A1s%20informaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#25D366', textDecoration: 'none', fontWeight: 600 }}
                >
                  <MessageCircle size={18} />
                  <span>Contáctame (WhatsApp): 0412-5494755</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:smartbytesbusinesspf@gmail.com"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}
                >
                  <Mail size={18} />
                  <span>Contáctame (Correo): smartbytesbusinesspf@gmail.com</span>
                </a>
              </li>

              <li style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                📍 Punto Fijo, Falcón - Venezuela
              </li>
            </ul>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
          © 2026 SmartBytes. Todos los derechos reservados. SB_ERP (Exodus Edition).
        </div>
      </footer>

      {/* DEMO / REGISTRATION MODAL */}
      {showDemoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '560px', width: '100%', padding: '2.25rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={() => setShowDemoModal(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={56} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>¡Enviado a WhatsApp!</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Hemos abierto WhatsApp con los datos de tu empresa <strong>{formData.company || 'Empresa'}</strong> para enviarlo directamente a nuestro equipo.<br />
                  Te contactaremos de inmediato para activar tus <strong>4 MESES GRATIS</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Gift size={14} /> 4 MESES GRATIS • VERSIÓN ONLINE
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>Registrar Mi Empresa y Usuario</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Crea tu cuenta de administración con 1 Caja activa para empezar a facturar de inmediato. Al enviar, se conectará directamente con nuestro WhatsApp.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.2rem' }}>Nombre del Administrador</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={modalInputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.2rem' }}>Nombre de la Empresa / Comercio</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Inversiones Mendoza C.A."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={modalInputStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.2rem' }}>WhatsApp de Contacto</label>
                      <input
                        type="tel"
                        required
                        placeholder="0412-1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={modalInputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.2rem' }}>Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        placeholder="admin@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={modalInputStyle}
                      />
                    </div>
                  </div>

                  {/* Selector Carga de Base de Datos */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Modalidad de Base de Datos Inicial:
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(15,23,42,0.6)', padding: '0.5rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', border: formData.dbOption === 'scratch' ? '1px solid #6366f1' : '1px solid transparent' }}>
                        <input
                          type="radio"
                          name="dbOption"
                          value="scratch"
                          checked={formData.dbOption === 'scratch'}
                          onChange={() => setFormData({ ...formData, dbOption: 'scratch' })}
                        />
                        <span><strong>Crear Base de Datos desde 0</strong> (Limpia sin productos)</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(15,23,42,0.6)', padding: '0.5rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', border: formData.dbOption === 'client' ? '1px solid #10b981' : '1px solid transparent' }}>
                        <input
                          type="radio"
                          name="dbOption"
                          value="client"
                          checked={formData.dbOption === 'client'}
                          onChange={() => setFormData({ ...formData, dbOption: 'client' })}
                        />
                        <span><strong>Carga por mi equipo</strong> (Gratis - Plantilla Excel)</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(15,23,42,0.6)', padding: '0.5rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', border: formData.dbOption === 'assisted' ? '1px solid #a855f7' : '1px solid transparent' }}>
                        <input
                          type="radio"
                          name="dbOption"
                          value="assisted"
                          checked={formData.dbOption === 'assisted'}
                          onChange={() => setFormData({ ...formData, dbOption: 'assisted' })}
                        />
                        <span><strong>Carga Asistida por SmartBytes</strong> (Servicio según volumen)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <MessageCircle size={18} color="#25D366" />
                  <span>Enviar Registro a WhatsApp (4 Meses Gratis)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: '#cbd5e1',
  textDecoration: 'none',
  fontSize: '0.85rem',
  fontWeight: 500,
  transition: 'color 0.2s ease',
};

const footerLinkStyle: React.CSSProperties = {
  color: '#94a3b8',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
};

const modalInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  background: 'rgba(15, 23, 42, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '0.5rem',
  color: '#fff',
  fontSize: '0.85rem',
  outline: 'none',
};

export default App;
