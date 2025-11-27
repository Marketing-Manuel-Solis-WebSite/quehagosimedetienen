'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

// --- COLORES ORIGINALES ---
const PRIMARY_COLOR_ORIGINAL = '#B2904D'; // Dorado (fondo principal)
const ACCENT_COLOR_DARK = '#002342'; // Azul Oscuro (texto principal y hover)

export default function Header() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    { 
      name: language === 'es' ? 'OFICINAS' : 'OFFICES',
      href: `/${language}/oficinas`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'ÁREAS LEGALES' : 'LEGAL AREAS',
      href: '', 
      type: 'dropdown',
      key: 'areas',
      submenu: language === 'es'
        ? [
          { name: 'Accidentes', href: `/${language}/servicios/accidentes` },
          { name: 'Migración', href: `/${language}/servicios/inmigracion` },
          { name: 'Seguros', href: `/${language}/servicios/seguros` },
          { name: 'Ley Criminal', href: `/${language}/servicios/ley-criminal` },
          { name: 'Familia', href: `/${language}/servicios/familia` },
          { name: 'Planificación Familiar', href: `/${language}/servicios/planificacion` },
        ]
        : [
          { name: 'Accidents', href: `/${language}/servicios/accidentes` },
          { name: 'Immigration', href: `/${language}/servicios/inmigracion` },
          { name: 'Insurance', href: `/${language}/servicios/seguros` },
          { name: 'Criminal Law', href: `/${language}/servicios/ley-criminal` },
          { name: 'Family', href: `/${language}/servicios/familia` },
          { name: 'Estate Planning', href: `/${language}/servicios/planificacion` },
        ]
    },
    {
      name: language === 'es' ? 'CLIENTES DETENIDOS' : 'DETAINED CLIENTS',
      href: `/${language}/clientes-detenidos`,
      type: 'link'
    },
    {
      name: language === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS',
      href: `/${language}/Testimonios`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'ABOGADOS' : 'ATTORNEYS',
      href: `/${language}/abogados`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'INFORMACIÓN' : 'INFORMATION',
      href: '', 
      type: 'dropdown',
      key: 'info',
      submenu: language === 'es'
        ? [
          { name: 'Recursos', href: `/${language}/informacion/recursos` },
          { name: 'Noticias', href: `/${language}/informacion/noticias` },
          { name: 'Preguntas Frecuentes', href: `/${language}/informacion/faq` }
        ]
        : [
          { name: 'Resources', href: `/${language}/informacion/recursos` },
          { name: 'News', href: `/${language}/informacion/noticias` },
          { name: 'FAQ', href: `/${language}/informacion/faq` }
        ]
    },
  ]

  const handleDropdownClick = (key: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
        setOpenSubmenu(openSubmenu === key ? null : key);
    } else {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
    }
  };

  return (
    <header className={`fixed top-0 w-full bg-[${PRIMARY_COLOR_ORIGINAL}] z-50 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href={`/${language}`} className="flex-shrink-0">
            <Image
              src="/logo-manuel-solis.png" 
              alt="Logo Manuel Solis"
              width={276}
              height={80}
              className="h-14 w-auto" 
              priority
            />
          </Link>

          {/* --- MENÚ DE ESCRITORIO --- */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group h-full flex items-center" 
              >
                {item.type === 'dropdown' ? (
                    <div
                        className={`text-white hover:text-[${ACCENT_COLOR_DARK}] font-bold transition-colors text-sm uppercase cursor-pointer flex items-center tracking-wider`}
                    >
                        {item.name}
                        <ChevronDown size={14} className={`ml-1 transition-transform duration-200 group-hover:rotate-180`} />
                    </div>
                ) : (
                    <Link
                        href={item.href}
                        className={`text-white hover:text-[${ACCENT_COLOR_DARK}] font-bold transition-colors text-sm uppercase tracking-wider`}
                    >
                        {item.name}
                    </Link>
                )}

                {/* Submenú de escritorio */}
                {item.submenu && (
                  <div className="absolute left-0 top-full mt-0 pt-2 w-64 
                                  bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl 
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                  transition-all duration-300 z-50 border border-gray-100">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 text-[${ACCENT_COLOR_DARK}] hover:bg-[${ACCENT_COLOR_DARK}]/5 hover:text-[${PRIMARY_COLOR_ORIGINAL}] transition-colors text-sm font-medium`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Language Switcher Component */}
            <LanguageSwitcher />
          </nav>

          {/* --- BOTÓN MENÚ MÓVIL --- */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden text-white p-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- MENÚ MÓVIL DESPLEGADO --- */}
        {isMenuOpen && (
          <nav className={`lg:hidden pb-4 transition-all duration-300 bg-[${PRIMARY_COLOR_ORIGINAL}]`}>
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-white/10 last:border-b-0">
                <div
                    className="flex items-center justify-between"
                    onClick={() => handleDropdownClick(item.key || item.name, !!item.submenu)}
                >
                    <Link
                        href={item.submenu ? '' : item.href} 
                        className={`block py-3 text-white font-bold hover:text-[${ACCENT_COLOR_DARK}] transition-colors ${item.submenu ? 'w-full' : ''}`}
                        onClick={item.submenu ? (e) => e.preventDefault() : () => handleDropdownClick(item.name, false)}
                    >
                        {item.name}
                    </Link>
                    {item.submenu && (
                        <ChevronDown 
                            size={18} 
                            className={`text-white transition-transform duration-300 ${openSubmenu === item.key ? 'rotate-180' : ''}`}
                        />
                    )}
                </div>

                {/* Submenú móvil */}
                {item.submenu && openSubmenu === item.key && (
                  <div className="pl-4 border-l border-white/20 ml-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block py-2 text-white/80 hover:text-[${ACCENT_COLOR_DARK}] text-sm transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Language Switcher Component móvil */}
            <div className="py-3">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}