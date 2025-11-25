'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Award, BookOpen, Scale, 
  ChevronRight, Mail, ShieldCheck, 
  Gavel, GraduationCap, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

// Función auxiliar para manejar URLs de imágenes
const getImageURL = (name: string) => {
    const base = 'https://manuelsolis.com/wp-content/uploads/2025/07/';
    const slug = name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '-');
    const suffixes = ['-922x1024.png', '.png', '-1.png', '-921x1024.png'];
    for (const suffix of suffixes) {
        if (name.includes('Manuel E. Solís III')) return `${base}Manuel-E.Solis-III-922x1024.png`;
        if (name.includes('Eduardo García')) return `${base}Eduardo-Garcia-1-922x1024.png`;
        if (name.includes('Magdalena')) return `${base}Maggie-922x1024.png`;
        if (name.includes('Himani')) return `${base}Himani-Augustina-Vithanage-922x1024.png`;
        return `${base}${slug}${suffix}`;
    }
    return '/placeholder-lawyer.jpg';
};

const attorneys = [
  // --- FUNDADORES Y SOCIOS PRINCIPALES ---
  {
    id: 'manuel-solis',
    name: 'Manuel Solís',
    role: 'Abogado Principal y Fundador',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Manuel-Solis-922x1024.png', 
    video: null, 
    bio: [
      "Durante las casi tres décadas que han pasado desde que empecé a trabajar como abogado, he llegado a conocer bien a los inmigrantes. Sobretodo he podido ser testigo del impresionante coraje y valentía que muestran muchos de ellos.",
      "Muchos inmigrantes arriesgan sus propias vidas con el objeto de luchar por el bienestar de sus familias. Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños y metas en este gran país de oportunidades."
    ],
    quote: "Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños.",
    education: ["Juris Doctor", "30+ Años de Experiencia"],
    admissions: ["Texas", "Cortes Federales"]
  },
  {
    id: 'manuel-solis-iii',
    name: 'Manuel E. Solís III',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Manuel-E.Solis-III-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/interview-manuel-iii_1.mp4',
    bio: [
      "Manuel E. Solís III se ocupa principalmente de la ley de inmigración en las Oficinas Legales de Manuel Solís. Se graduó de la Universidad de Houston Downtown y completó su licenciatura en derecho en South Texas College of Law Houston.",
      "El Sr. Solís es un apasionado de ayudar a la comunidad y a las personas necesitadas."
    ],
    education: ["Universidad de Houston Downtown", "South Texas College of Law Houston"],
    admissions: ["Texas"],
    quote: "Me apasiona ayudar a la comunidad y a las personas necesitadas."
  },
  {
    id: 'juan-solis',
    name: 'Juan Solís',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Juan-Solis-922x1024.png', 
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/pexels-john-hill-7049943-1080p.mp4', 
    bio: [
      "Juan representa clientes en casos que van desde Inmigración hasta Litigios Civiles, y está muy involucrado en el departamento de Litigios de Seguros.",
      "Se graduó de Point Loma Nazarene University y de South Texas College of Law. Además, completó su MBA en Bauer College of Business."
    ],
    education: ["Point Loma Nazarene University", "South Texas College of Law", "MBA - Univ. of Houston"],
    admissions: ["Texas", "Colorado", "Cortes de Distrito de EE. UU."],
    quote: "Saber no es suficiente; debemos aplicar. Estar dispuesto no es suficiente; debemos hacer."
  },

  // --- SOCIOS Y ABOGADOS PRINCIPALES DE LITIGIO ---
  {
    id: 'andrew-fink',
    name: 'Andrew Fink',
    role: 'Socio de Litigio (Chicago)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Andrew-Fink-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/andrew-fink_1.mp4',
    bio: [
      "Socio de litigio a nivel nacional. Centra su práctica en lesiones personales, accidentes y negligencia médica. Ha sido el abogado principal en aproximadamente 50 juicios con jurado.",
      "Cree en la integridad, trabajo duro, pasión, competencia y humildad."
    ],
    education: ["Juris Doctor - Marquette University (1994)", "MBA Lake Superior State Univ"],
    admissions: ["Illinois", "Wisconsin", "American Association of Justice"],
    quote: "Integridad, trabajo duro, pasión, competencia y humildad."
  },
  {
    id: 'gregory-finney',
    name: 'Gregory Finney',
    role: 'Director de Litigio Civil',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Gregory-Finney-922x1024.png',
    video: 'https://SolisPullZone.b-cdn.net/gregory-finney.mp4',
    bio: [
      "Gregory Finney es el Director de Litigio Civil. Su experiencia incluye litigios comerciales complejos, fraude, energía y accidentes catastróficos.",
      "Antes de ser abogado, fue profesor de ciencias y sirvió en la Marina de los EE. UU."
    ],
    education: ["University of Houston Law Center", "Texas State University"],
    admissions: ["Corte Suprema de los Estados Unidos", "Tribunales Federales de Distrito"],
    quote: "Mantente curioso."
  },
  {
    id: 'ni-yan',
    name: 'Ni Yan',
    role: 'Abogada',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Ni-Yan-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/ni-yan_1.mp4',
    bio: [
      "Nacida en la República de China, Yan se especializa en ayudar a la comunidad asiática en casos de inmigración. Ha representado a más de 5,000 casos.",
      "Es columnista en dos periódicos y conduce un programa de radio semanal."
    ],
    education: ["Central University for Nationalities (Beijing)", "University of Houston Law Center"],
    admissions: ["Texas"],
    quote: "Orgullosa de ayudar a las personas a alcanzar el sueño americano."
  },
  {
    id: 'mark-mcbroom',
    name: 'Mark McBroom',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Mark-McBroom-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/INTERVIEW-MARC_1.mp4',
    bio: [
      "El Sr. McBroom obtuvo su Doctorado en Jurisprudencia de la Universidad Metodista del Sur. Se dio cuenta de su pasión por las leyes de inmigración mientras era estudiante.",
      "Su enfoque se centra en la inmigración basada en la familia y la defensa contra la deportación."
    ],
    education: ["Southern Methodist University Dedman School of Law", "University of North Texas"],
    admissions: ["Texas"],
    quote: "Representación eficiente y precisa con compasión y comprensión."
  },
  {
    id: 'ana-patricia-rueda',
    name: 'Ana Patricia Rueda',
    role: 'Abogada',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Ana-Patricia-Rueda-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/INTERVIEW-ANA_1.mp4',
    bio: [
      "La abogada Rueda nació en Zacatecas, México, e inmigró a los 7 años. Descubrió su pasión por la justicia durante sus estudios universitarios.",
      "Se graduó de Chicago-Kent College of Law en 2016. Trabaja principalmente en defensa de remoción (deportación) y exenciones de inadmisibilidad (waivers)."
    ],
    education: ["Chicago - Kent College of Law", "University of Illinois - Chicago"],
    admissions: ["Illinois"],
    quote: "El mejor premio que la vida tiene para ofrecer es trabajar duro en un trabajo que valga la pena."
  },
  {
    id: 'edwin-zavala',
    name: 'Edwin Zavala',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Edwin-Zavala-922x1024.png',
    video: 'https://SolisPullZone.b-cdn.net/gregory-finney.mp4',
    bio: [
      "Edwin Zavala nació y creció en Metairie, Louisiana. Obtuvo su título de Juris Doctor de la Facultad de Derecho de la Universidad de Loyola en Nueva Orleans, graduándose cum laude.",
      "Practica principalmente en inmigración y deportación en la oficina de Denver. Se toma el tiempo para dar una evaluación honesta de cada situación."
    ],
    education: ["Loyola University New Orleans College of Law", "Louisiana State University"],
    admissions: ["Colorado Bar Association", "United States District Court (Colorado)"],
    quote: "Soy hijo de un inmigrante... realmente creo que estamos cambiando el mundo."
  },
  {
    id: 'alejandro-manzano',
    name: 'Alejandro Manzano',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Alejandro-Manzano-922x1024.png',
    video: null,
    bio: [
      "Comprometido con la comunidad inmigrante, Alejandro ejerce en la oficina de Houston. Creció en el Valle del Río Grande, fortaleciendo su conexión con las comunidades que defiende.",
      "Obtuvo su título en South Texas College of Law en 2017. Su práctica se enfoca principalmente en Derecho de Inmigración y defensa ante la EOIR."
    ],
    education: ["South Texas College of Law (2017)", "Licenciatura en Artes (Inglés y Arte)"],
    admissions: ["Corte Suprema de Texas", "Tribunales Federales (Distritos Este, Sur y Oeste)"],
    quote: "Un acompañamiento legal claro y humano."
  },
  
  // --- ABOGADOS ASOCIADOS ---
  {
    id: 'victor-rojas',
    name: 'Victor Rojas',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Victor-Rojas-922x1024.png',
    video: 'https://SolisPullZone.b-cdn.net/interview-victor.mp4',
    bio: [
      "Rojas se graduó de la Facultad de Derecho La Interamericana de Puerto Rico en 2003. Fue Defensor Público por varios años, luchando día tras día para que las ruedas de la Justicia no se descarrilen.",
      "Se incorporó a la firma en 2019, aportando una vasta experiencia en litigio penal y defensa de derechos."
    ],
    education: ["La Interamericana Law School of Puerto Rico (2003)"],
    admissions: ["Puerto Rico (Litigante)", "Práctica Federal de Inmigración"],
    quote: "Luchando para que los derechos de los imputados no se descarrilen."
  },
  {
    id: 'austen-gunnels',
    name: 'Austen Gunnels',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/08/Austen-Gunnels-921x1024.png',
    video: null,
    bio: [
      "Su práctica se enfoca en representar heridos en accidentes marítimos y de vehículos de motor. Tiene experiencia previa en defensa de seguros, lo que le da una ventaja estratégica al negociar.",
      "Conocimiento profundo del derecho marítimo y litigio civil."
    ],
    education: ["Doctor en Jurisprudencia - South Texas College of Law Houston", "Licenciatura en Ciencias Políticas - Univ. Lenoir Rhyne"],
    admissions: ["Texas", "Tribunal de Distrito (Sur de Texas)", "Tribunal de Apelaciones (Quinto Circuito)"],
    quote: "Abogando incansablemente para garantizar la mejor resolución posible."
  },
  {
    id: 'gabriel-perez',
    name: 'Gabriel Perez',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Gabriel-Perez-922x1024.png',
    video: null,
    bio: [
      "Nacido en Houston, Texas. Comenzó como asistente legal en la firma y su pasión lo llevó a convertirse en abogado.",
      "Se graduó de South Texas College of Law en 2019. Se especializa en lesiones personales, seguros e inmigración."
    ],
    education: ["South Texas College of Law Houston (2019)", "Universidad de Houston"],
    admissions: ["Texas"],
    quote: "No hay excusa para que nadie trabaje más duro que tú."
  },
  {
    id: 'peyton-barrow',
    name: 'Peyton Barrow',
    role: 'Abogado (Memphis)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Peyton-Barrow-922x1024.png',
    video: null,
    bio: [
      "Abogado en la oficina de Memphis. Su enfoque es empático y orientado a resultados, ayudando a clientes a navegar el sistema de inmigración con claridad.",
      "Autorizado para ejercer en Tennessee y enfocado en representación eficaz y transparente."
    ],
    education: ["University of Memphis (JD)"],
    admissions: ["Tennessee Bar Association"],
    quote: "Ayudar a navegar el complejo sistema de inmigración con confianza."
  },
  {
    id: 'sara-james',
    name: 'Sara James',
    role: 'Abogada (Memphis)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Sara-James-922x1024.png',
    video: null,
    bio: [
      "Ejerce en Memphis con pasión por la comunidad hispana. Fue Presidenta de la Hispanic Law Student Association y ganadora del premio Champion of Justice 2021.",
      "Su vocación nace del deseo de brindar representación a quienes no pueden defenderse por sí mismos."
    ],
    education: ["University of Memphis Cecil C. Humphreys School of Law (JD)", "University of Memphis (BA)"],
    admissions: ["Tennessee", "Missouri", "Hispanic National Bar Association"],
    quote: "Apoyarlos a alcanzar su sueño americano es un honor y un privilegio."
  },
  {
    id: 'eduardo-garcia',
    name: 'Eduardo García',
    role: 'Abogado',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Eduardo-Garcia-1-922x1024.png',
    video: null,
    bio: [
      "Antes de ser abogado, fue profesor de Historia. Tiene una Maestría en Historia con enfoque en Borderlands.",
      "Fue becario de Equal Justice Works, comprometido con servir a comunidades históricamente marginadas."
    ],
    education: ["University of New Mexico School of Law (JD)", "University of Texas at El Paso (UTEP)"],
    admissions: ["Illinois", "Nuevo México"],
    quote: "Utilizar el derecho como herramienta para la equidad y la justicia."
  },
  {
    id: 'alexis-alvarez',
    name: 'Alexis Alvarez',
    role: 'Abogada',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Alexis-Alvarez-922x1024.png',
    video: null,
    bio: [
      "Originaria del Valle del Río Grande, Texas. Hija de trabajadores agrícolas migrantes. Esta historia familiar le dio una profunda admiración por la comunidad inmigrante.",
      "Obtuvo su JD de la Facultad de Derecho Sturm de la Universidad de Denver."
    ],
    education: ["Universidad de Denver (Sturm College of Law)", "Universidad Texas A&M"],
    admissions: ["Colorado"],
    quote: "Cree firmemente en el principio de retribuir a la comunidad."
  },
  {
    id: 'elizabeth-ponce-mcclain',
    name: 'Elizabeth Ponce McClain',
    role: 'Abogada',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Elizabeth-Ponce-McClain-922x1024.png',
    video: null,
    bio: [
      "Obtuvo su Licenciatura en Economía en Fordham University y su Juris Doctor en Suffolk University School of Law.",
      "Es Mediadora Certificada y se enfoca en el bienestar integral de sus clientes, con una vocación especial por ayudar a los niños."
    ],
    education: ["Suffolk University School of Law (JD)", "Fordham University (Economía)"],
    admissions: ["Texas", "Massachusetts", "Distrito de Columbia"],
    quote: "Resolución de conflictos de manera efectiva, ética y compasiva."
  },
  {
    id: 'magdalena-aguilar',
    name: 'Magdalena "Maggie" Aguilar',
    role: 'Abogada (Chicago)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Maggie-922x1024.png',
    video: null,
    bio: [
      "Nació en Aguascalientes, México, y emigró a Chicago de niña. Antes de ser abogada, tuvo una exitosa carrera en marketing.",
      "Trabajó en la Oficina de Derechos Civiles del Departamento de Educación de EE.UU. y en la Oficina del Fiscal General de Illinois."
    ],
    education: ["Northern Illinois University College of Law (JD)", "University of Illinois - Chicago"],
    admissions: ["Illinois"],
    quote: "Pone su experiencia al servicio de las familias inmigrantes con empatía, firmeza y compromiso."
  },
  {
    id: 'ashley-cruz',
    name: 'Ashley Cruz',
    role: 'Abogada (Houston)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Ashley-Cruz-922x1024.png',
    video: null,
    bio: [
      "Se enfoca en casos de asilo e inmigración familiar. Antes de esto, trabajó en derecho civil y familiar.",
      "Obtuvo su título en la Pontificia Universidad Católica de Puerto Rico. Su trato cercano y humano es apreciado por sus clientes."
    ],
    education: ["Pontificia Universidad Católica de Puerto Rico"],
    admissions: ["Puerto Rico", "Práctica Federal de Inmigración"],
    quote: "Pasión por ayudar a las personas a permanecer legalmente y con tranquilidad."
  },
  {
    id: 'edward-s-reisman',
    name: 'Edward S. Reisman',
    role: 'Abogado (Los Ángeles)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Edward-Steven-Reisman-922x1024.png',
    video: null,
    bio: [
      "Ejerce en Los Ángeles. Tiene un JD de Georgetown University Law Center. Su experiencia previa en el Servicio de Inmigración y Naturalización (INS) le da una visión única del sistema.",
      "Es licenciado en Historia y Estudios Rusos."
    ],
    education: ["Georgetown University Law Center (JD)", "University of Rochester"],
    admissions: ["California", "Maryland"],
    quote: "Guiando a sus clientes con conocimiento, responsabilidad y humanidad."
  },
  {
    id: 'yineyri-castillo-arias',
    name: 'Yineyri Castillo Arias',
    role: 'Abogada (Houston)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Yineyri-Castillo-922x1024.png',
    video: null,
    bio: [
      "Emigró a EE.UU. y comprende los retos de sus clientes. Es Presidenta de la Comisión de Derechos de los Inmigrantes del Colegio de Abogados de Puerto Rico.",
      "Trabajó con la Oficina de Reasentamiento de Refugiados de la ONU y fue defensora legal de víctimas de crimen."
    ],
    education: ["Pontificia Universidad Católica de Puerto Rico (JD)", "Universidad Interamericana de Puerto Rico"],
    admissions: ["Puerto Rico"],
    quote: "Su trabajo se basa en la empatía y el compromiso genuino con el bienestar de cada persona."
  },
  {
    id: 'danatayri-morales-vidal',
    name: 'Danatayri Morales Vidal, Esq.',
    role: 'Abogada (Houston)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Danatayri-Morales-Vidal-922x1024.png',
    video: null,
    bio: [
      "Ejerce con convicción en la oficina de Houston. Su principio es defender el derecho de elegir dónde vivir, brindando representación estratégica y humana.",
      "Su trayectoria refleja un compromiso constante con los derechos fundamentales de las comunidades migrantes."
    ],
    education: ["Abogada Titulada"],
    admissions: ["Práctica Federal de Inmigración"],
    quote: "El derecho de elegir dónde vivir."
  },
  {
    id: 'stephanie-l-garcia-vidal',
    name: 'Stephanie L. García Vidal',
    role: 'Abogada (Dallas)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Stephanie-Garcia-Vidal-922x1024.png',
    video: null,
    bio: [
      "Ejerce en la oficina de Dallas del Bufete de Abogados Manuel Solís, donde brinda representación legal comprometida y empática a personas y familias inmigrantes. Su pasión por la abogacía nace del deseo de apoyar a quienes emprendieron un viaje transformador para construir un futuro más seguro y digno.",
      "Obtuvo su Licenciatura en Ciencias Políticas con una concentración menor en Estudios Legales en la University of Rochester, y su título de Juris Doctor en la Escuela de Derecho de la Universidad Interamericana de Puerto Rico en 2006. Durante sus estudios, se destacó como directora de Relaciones Públicas del capítulo estudiantil de la Federal Bar Association.",
      "Con más de 17 años de experiencia en litigios civiles, administrativos y de derecho de familia, la abogada García Vidal también cuenta con más de dos años de especialización en derecho migratorio. Su enfoque es estratégico y humano, brindando apoyo eficaz a quienes enfrentan procesos legales complejos.",
      "Está admitida en el Colegio de Abogados de Puerto Rico y tiene autorización para ejercer ante el Tribunal Federal de Distrito para el Distrito de Puerto Rico.",
      "Stephanie representa a sus clientes con dedicación, sabiendo que cada caso representa una historia, una familia y un futuro lleno de posibilidades. Su vocación es luchar por quienes necesitan una voz firme a su lado."
    ],
    education: [
      "University of Rochester (Licenciatura en Ciencias Políticas con concentración en Estudios Legales)", 
      "Universidad Interamericana de Puerto Rico - Escuela de Derecho (JD, 2006)"
    ],
    admissions: ["Puerto Rico Bar", "U.S. District Court (Puerto Rico)"],
    quote: "Un compromiso con la esperanza."
  },
  {
    id: 'lupita-valenzuela-martinez',
    name: 'Lupita Valenzuela Martinez',
    role: 'Abogada (Memphis)',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Lupita-Valenzuela-Martinez-922x1024.png',
    video: null,
    bio: [
      "Ejerce la abogacía con pasión y entrega desde nuestra oficina de Memphis. Su mayor inspiración proviene de ayudar a quienes no pueden defenderse por sí mismos, y su misión es asegurar que todos reciban la representación comprometida y valiente que merecen. Su trabajo está profundamente guiado por el deseo de servir a la comunidad hispana, motor que alimenta su vocación día a día.",
      "Se graduó de la University of Memphis Cecil C. Humphreys School of Law, donde obtuvo su título de Juris Doctor y un Certificado en Abogacía. Durante su paso por la facultad, fue presidenta de la Hispanic Law Student Association, miembro del Moot Court, Student Justice del Honor Council y recibió el prestigioso premio Champion of Justice otorgado por la Memphis Bar Association en 2021.",
      "También fue reconocida como Líder Nacional Estudiantil de la Región X por la Hispanic National Bar Association y apareció en la edición de verano 2022 de la revista Memphis Law Magazine.",
      "Está autorizada para ejercer la abogacía en Tennessee y Missouri. Es miembro activo de la Tennessee Bar Association, Missouri Bar Association, Hispanic National Bar Association y American Bar Association.",
      "Combina su formación jurídica con una sensibilidad especial hacia las necesidades de sus clientes. Su enfoque cálido y estratégico convierte cada representación en una verdadera alianza en busca de justicia."
    ],
    education: ["University of Memphis Cecil C. Humphreys School of Law (JD y Certificado en Abogacía)"],
    admissions: ["Tennessee Bar Association", "Missouri Bar Association", "Hispanic National Bar Association", "American Bar Association"],
    quote: "Una defensora impulsada por un propósito."
  },
  {
    id: 'himani-augustina-vithanage',
    name: 'Himani Augustina Vithanage',
    role: 'Abogada',
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Himani-Augustina-Vithanage-922x1024.png',
    video: null,
    bio: [
      "Una voz firme para quienes más lo necesitan. Busca empoderar a sus clientes con empatía, conocimiento y pasión.",
      "Cree firmemente que el Derecho debe ser una herramienta para proteger, orientar y transformar vidas, actuando con la máxima dedicación."
    ],
    education: ["Abogada Titulada"],
    admissions: ["Texas"],
    quote: "Una voz firme para quienes más lo necesitan."
  },
];

export default function AttorneysPage() {
  const [selectedAttorney, setSelectedAttorney] = useState<any>(null);

  const handleImageError = (e: any) => {
     e.target.src = 'https://manuelsolis.com/wp-content/uploads/2024/11/logo-manuelsolis.png';
     e.target.style.objectFit = 'contain';
     e.target.style.padding = '20px';
     e.target.style.backgroundColor = '#002342';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#001529] text-white relative selection:bg-[#B2904D] selection:text-white font-sans">
      
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[#002342] opacity-95"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#B2904D] opacity-20 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-md mb-6">
                <Scale size={14} className="text-[#B2904D]" />
                <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">Defensa de Clase Mundial</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Conozca a Sus <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#e6c67e]">Defensores</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Más que abogados, somos aliados estratégicos dedicados a proteger su futuro con integridad, experiencia y pasión.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- GRID DE ABOGADOS --- */}
      <section className="px-4 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            
            {attorneys.map((attorney, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => setSelectedAttorney(attorney)}
                className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-[#002b52]/30 backdrop-blur-sm hover:border-[#B2904D]/50 hover:shadow-[0_0_30px_rgba(178,144,77,0.15)] transition-all duration-500"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                   <Image 
                      src={attorney.image} 
                      alt={attorney.name}
                      fill
                      className="object-cover object-top"
                      onError={handleImageError}
                      unoptimized 
                   />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-[#001529]/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                   <div className="w-12 h-1 bg-[#B2904D] mb-3 rounded-full group-hover:w-24 transition-all duration-500"></div>
                   
                   <h3 className="text-2xl font-serif font-bold text-white leading-none mb-2 drop-shadow-md">
                     {attorney.name}
                   </h3>
                   
                   <p className="text-[#B2904D] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                     <ShieldCheck size={14} /> {attorney.role}
                   </p>
                   
                   <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-75">
                      Ver Perfil Completo <ChevronRight size={16} className="text-[#B2904D]" />
                   </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* --- MODAL DE DETALLE --- */}
      <AnimatePresence>
        {selectedAttorney && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-xl overflow-hidden"
            onClick={() => setSelectedAttorney(null)} 
          >
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 50 }}
               transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
               onClick={(e) => e.stopPropagation()} 
               className="bg-[#002342] w-full md:max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl border-0 md:border border-white/10 shadow-2xl flex flex-col lg:flex-row relative overflow-hidden"
             >
                <button 
                  onClick={() => setSelectedAttorney(null)}
                  className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-[#B2904D] text-white p-2 rounded-full transition-all border border-white/10 group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
                </button>

                {/* Media: Video o Foto */}
                <div className="w-full lg:w-5/12 bg-black relative h-[35vh] lg:h-auto group">
                    {selectedAttorney.video ? (
                         <video 
                           src={selectedAttorney.video} 
                           controls 
                           autoPlay 
                           playsInline
                           className="w-full h-full object-cover"
                           poster={selectedAttorney.image} 
                         />
                    ) : (
                         <div className="relative w-full h-full">
                            <Image 
                              src={selectedAttorney.image} 
                              alt={selectedAttorney.name}
                              fill
                              className="object-cover object-top"
                              onError={handleImageError}
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#002342] via-transparent to-transparent opacity-80"></div>
                         </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#002342] to-transparent lg:hidden">
                        <h2 className="text-3xl font-serif font-bold text-white">{selectedAttorney.name}</h2>
                        <p className="text-[#B2904D] text-sm">{selectedAttorney.role}</p>
                    </div>
                </div>

                {/* Info Content */}
                <div className="w-full lg:w-7/12 p-6 lg:p-10 overflow-y-auto bg-gradient-to-br from-[#002342] to-[#001a33] relative">
                    
                    <div className="hidden lg:block mb-8">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="px-3 py-1 rounded bg-[#B2904D]/20 text-[#B2904D] text-xs font-bold uppercase tracking-wider border border-[#B2904D]/30">
                                 Perfil Profesional
                             </div>
                        </div>
                        <h2 className="text-5xl font-serif font-bold text-white mb-1">
                          {selectedAttorney.name}
                        </h2>
                        <p className="text-gray-400 text-xl font-light flex items-center gap-2">
                           <Gavel size={18} /> {selectedAttorney.role}
                        </p>
                    </div>

                    {selectedAttorney.quote && (
                        <div className="mb-8 relative">
                            <div className="absolute -left-2 -top-2 text-[#B2904D]/20">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                            </div>
                            <p className="text-[#B2904D] text-lg italic font-medium pl-8 relative z-10 border-l-2 border-[#B2904D]/50">
                                "{selectedAttorney.quote}"
                            </p>
                        </div>
                    )}

                    <div className="space-y-4 text-gray-300 leading-relaxed font-light mb-8 text-sm md:text-base text-justify">
                        {selectedAttorney.bio ? (
                            Array.isArray(selectedAttorney.bio) ? (
                                selectedAttorney.bio.map((paragraph: string, idx: number) => (
                                    <p key={idx}>{paragraph}</p>
                                ))
                            ) : (
                                <p>{selectedAttorney.bio}</p>
                            )
                        ) : (
                            <p>El abogado {selectedAttorney.name} es un miembro fundamental de nuestro equipo legal. Con una trayectoria dedicada a la defensa de los derechos de nuestros clientes, aporta experiencia, integridad y un compromiso inquebrantable para lograr los mejores resultados posibles.</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-black/20 rounded-2xl border border-white/5">
                        <div>
                            <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                                <GraduationCap size={18} className="text-[#B2904D]" /> Educación
                            </h4>
                            {selectedAttorney.education ? (
                                <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                                    {selectedAttorney.education.map((edu: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                                            {edu}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-gray-500 italic">Información disponible en consulta.</p>
                            )}
                        </div>
                        
                        <div>
                             <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                                {selectedAttorney.admissions ? <><Scale size={18} className="text-[#B2904D]" /> Admisiones</> : <><Award size={18} className="text-[#B2904D]" /> Logros</>} 
                            </h4>
                            {selectedAttorney.admissions ? (
                                <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                                    {selectedAttorney.admissions.map((adm: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                                            {adm}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-gray-500 italic">Abogado certificado y reconocido.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <a href="/#contacto" onClick={() => setSelectedAttorney(null)} className="w-full bg-gradient-to-r from-[#B2904D] to-[#9f7d3d] hover:from-white hover:to-white hover:text-[#002342] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-black/40 group">
                            <Mail size={20} />
                            Solicitar Consulta Privada
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}