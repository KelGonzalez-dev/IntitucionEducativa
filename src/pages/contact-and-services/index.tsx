import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header.tsx';
import ContactHero from './components/ContactHero.tsx';
import CampusContactCards from './components/CampusContactCards.tsx';
import ContactForm from './components/ContactForm.tsx';
import ServicesGrid from './components/ServicesGrid.tsx';
import StaffDirectory from './components/StaffDirectory.tsx';
import FAQSection from './components/FAQSection.tsx';
import type { Campus, Service, StaffMember, FAQ } from './types/index';
import Icon from '../../components/AppIcon.tsx';


const ContactAndServicesPage = () => {
  // Mock data for campuses
  const campuses: Campus[] = [
  {
    id: 'leyda-garrido',
    name: 'Campus Leyda Garrido',
    address: 'Calle 45 #23-67, Barrio Centro, Bogotá, Colombia',
    phone: '+57 (1) 234-5678',
    email: 'leyda@santacatalina.edu.co',
    director: 'Dra. María Elena Rodríguez',
    coordinates: { lat: 4.6097, lng: -74.0817 },
    image: "https://images.unsplash.com/photo-1653388070335-e054b855eac2",
    alt: 'Vista exterior del Campus Leyda Garrido con estudiantes caminando por el patio principal rodeado de árboles y edificios académicos modernos',
    services: ['Preescolar', 'Primaria', 'Bachillerato', 'Laboratorios', 'Biblioteca', 'Deportes'],
    hours: 'Lunes a Viernes: 7:00 AM - 5:00 PM'
  },
  {
    id: 'san-jose',
    name: 'Campus San José',
    address: 'Carrera 15 #78-45, Zona Norte, Bogotá, Colombia',
    phone: '+57 (1) 345-6789',
    email: 'sanjose@santacatalina.edu.co',
    director: 'Lic. Carlos Alberto Mendoza',
    coordinates: { lat: 4.6482, lng: -74.0776 },
    image: "https://images.unsplash.com/photo-1572002872430-1f56e735da65",
    alt: 'Campus San José mostrando el edificio principal con arquitectura colonial y jardines bien cuidados con estudiantes en el área recreativa',
    services: ['Primaria', 'Bachillerato', 'Artes', 'Música', 'Teatro', 'Cafetería'],
    hours: 'Lunes a Viernes: 6:30 AM - 4:30 PM'
  },
  {
    id: 'maria-eugenia',
    name: 'Campus María Eugenia',
    address: 'Avenida 68 #125-34, Zona Occidental, Bogotá, Colombia',
    phone: '+57 (1) 456-7890',
    email: 'mariaeugenia@santacatalina.edu.co',
    director: 'Mgtr. Ana Lucía Vargas',
    coordinates: { lat: 4.6351, lng: -74.1198 },
    image: "https://images.unsplash.com/photo-1593760407953-a76d081225a8",
    alt: 'Campus María Eugenia con vista panorámica del complejo educativo moderno, canchas deportivas y áreas verdes donde los estudiantes realizan actividades al aire libre',
    services: ['Bachillerato', 'Técnico', 'Deportes', 'Ciencias', 'Tecnología', 'Idiomas'],
    hours: 'Lunes a Viernes: 7:00 AM - 6:00 PM'
  }];


  // Mock data for services
  const services: Service[] = [
  {
    id: 'admissions',
    title: 'Admisiones y Matrículas',
    description: 'Proceso completo de inscripción y matrícula para nuevos estudiantes en todos los niveles educativos.',
    icon: 'UserPlus',
    category: 'administrative',
    features: [
    'Orientación personalizada para familias',
    'Proceso de admisión simplificado',
    'Evaluación académica integral',
    'Documentación y requisitos claros',
    'Apoyo financiero y becas disponibles'],

    contactPerson: 'Coordinadora de Admisiones',
    phone: '+57 (1) 234-5678 ext. 101',
    email: 'admisiones@santacatalina.edu.co'
  },
  {
    id: 'academic-support',
    title: 'Apoyo Académico',
    description: 'Servicios de refuerzo y acompañamiento académico personalizado para el éxito estudiantil.',
    icon: 'BookOpen',
    category: 'academic',
    features: [
    'Tutorías individualizadas',
    'Programas de nivelación',
    'Apoyo en dificultades de aprendizaje',
    'Estrategias de estudio efectivas',
    'Seguimiento académico continuo'],

    contactPerson: 'Coordinador Académico',
    phone: '+57 (1) 234-5678 ext. 201',
    email: 'academico@santacatalina.edu.co'
  },
  {
    id: 'psychological-support',
    title: 'Apoyo Psicológico',
    description: 'Servicios de bienestar emocional y psicológico para estudiantes y familias.',
    icon: 'Heart',
    category: 'support',
    features: [
    'Consulta psicológica individual',
    'Talleres de desarrollo emocional',
    'Orientación familiar',
    'Programas de prevención',
    'Crisis intervention support'],

    contactPerson: 'Psicóloga Educativa',
    phone: '+57 (1) 234-5678 ext. 301',
    email: 'psicologia@santacatalina.edu.co'
  },
  {
    id: 'sports-recreation',
    title: 'Deportes y Recreación',
    description: 'Programas deportivos y recreativos para el desarrollo físico y social de los estudiantes.',
    icon: 'Trophy',
    category: 'extracurricular',
    features: [
    'Equipos deportivos competitivos',
    'Clases de educación física',
    'Torneos internos y externos',
    'Actividades recreativas',
    'Instalaciones deportivas modernas'],

    contactPerson: 'Coordinador de Deportes',
    phone: '+57 (1) 234-5678 ext. 401',
    email: 'deportes@santacatalina.edu.co'
  },
  {
    id: 'library-resources',
    title: 'Biblioteca y Recursos',
    description: 'Centro de recursos educativos con biblioteca física y digital para apoyo académico.',
    icon: 'Library',
    category: 'academic',
    features: [
    'Colección bibliográfica actualizada',
    'Recursos digitales y bases de datos',
    'Espacios de estudio individual y grupal',
    'Programas de lectura',
    'Apoyo en investigación académica'],

    contactPerson: 'Bibliotecaria Principal',
    phone: '+57 (1) 234-5678 ext. 501',
    email: 'biblioteca@santacatalina.edu.co'
  },
  {
    id: 'technology-lab',
    title: 'Laboratorio de Tecnología',
    description: 'Espacios equipados con tecnología avanzada para el aprendizaje digital y la innovación.',
    icon: 'Monitor',
    category: 'academic',
    features: [
    'Computadores de última generación',
    'Software educativo especializado',
    'Programación y robótica',
    'Diseño gráfico y multimedia',
    'Proyectos de innovación tecnológica'],

    contactPerson: 'Coordinador de Tecnología',
    phone: '+57 (1) 234-5678 ext. 601',
    email: 'tecnologia@santacatalina.edu.co'
  }];


  // Mock data for staff
  const staff: StaffMember[] = [
  {
    id: 'maria-rodriguez',
    name: 'Dra. María Elena Rodríguez',
    position: 'Directora General',
    department: 'Dirección',
    campus: 'Campus Leyda Garrido',
    phone: '+57 (1) 234-5678 ext. 100',
    email: 'direccion@santacatalina.edu.co',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15bd202ef-1762274144726.png",
    alt: 'Dra. María Elena Rodríguez, directora general, mujer profesional de mediana edad con cabello castaño, sonriendo en su oficina con libros y diplomas al fondo',
    availability: 'Lunes a Viernes 8:00 AM - 4:00 PM'
  },
  {
    id: 'carlos-mendoza',
    name: 'Lic. Carlos Alberto Mendoza',
    position: 'Coordinador Académico',
    department: 'Coordinación Académica',
    campus: 'Campus San José',
    phone: '+57 (1) 345-6789 ext. 200',
    email: 'academico@santacatalina.edu.co',
    image: "https://images.unsplash.com/photo-1696854616637-141066cde598",
    alt: 'Lic. Carlos Alberto Mendoza, coordinador académico, hombre profesional con barba y camisa azul, en aula con pizarra y materiales educativos',
    availability: 'Lunes a Viernes 7:00 AM - 3:00 PM'
  },
  {
    id: 'ana-vargas',
    name: 'Mgtr. Ana Lucía Vargas',
    position: 'Psicóloga Educativa',
    department: 'Bienestar Estudiantil',
    campus: 'Campus María Eugenia',
    phone: '+57 (1) 456-7890 ext. 300',
    email: 'psicologia@santacatalina.edu.co',
    image: "https://images.unsplash.com/photo-1643490747208-a821aadddff7",
    alt: 'Mgtr. Ana Lucía Vargas, psicóloga educativa, mujer joven con cabello rubio y blusa blanca, en su consultorio con plantas y ambiente acogedor',
    availability: 'Lunes a Viernes 8:00 AM - 5:00 PM'
  },
  {
    id: 'luis-torres',
    name: 'Prof. Luis Fernando Torres',
    position: 'Coordinador de Deportes',
    department: 'Educación Física',
    campus: 'Campus Leyda Garrido',
    phone: '+57 (1) 234-5678 ext. 400',
    email: 'deportes@santacatalina.edu.co',
    image: "https://images.unsplash.com/photo-1580629891972-9ff1e352d757",
    alt: 'Prof. Luis Fernando Torres, coordinador de deportes, hombre atlético con camiseta deportiva roja, en cancha deportiva con balones y equipamiento',
    availability: 'Lunes a Viernes 6:00 AM - 2:00 PM'
  },
  {
    id: 'patricia-silva',
    name: 'Lic. Patricia Silva',
    position: 'Bibliotecaria Principal',
    department: 'Biblioteca',
    campus: 'Campus San José',
    phone: '+57 (1) 345-6789 ext. 500',
    email: 'biblioteca@santacatalina.edu.co',
    image: "https://images.unsplash.com/photo-1516439133352-534be23ffba5",
    alt: 'Lic. Patricia Silva, bibliotecaria principal, mujer con gafas y suéter verde, rodeada de libros en la biblioteca con estanterías llenas',
    availability: 'Lunes a Viernes 7:00 AM - 4:00 PM'
  },
  {
    id: 'roberto-garcia',
    name: 'Ing. Roberto García',
    position: 'Coordinador de Tecnología',
    department: 'Tecnología Educativa',
    campus: 'Campus María Eugenia',
    phone: '+57 (1) 456-7890 ext. 600',
    email: 'tecnologia@santacatalina.edu.co',
    image: "https://images.unsplash.com/photo-1621036579842-9080c7119f67",
    alt: 'Ing. Roberto García, coordinador de tecnología, hombre joven con camisa casual azul, en laboratorio de computación con equipos modernos',
    availability: 'Lunes a Viernes 8:00 AM - 5:00 PM'
  }];


  // Mock data for FAQs
  const faqs: FAQ[] = [
  {
    id: 'admission-process',
    question: '¿Cuál es el proceso de admisión para nuevos estudiantes?',
    answer: 'El proceso de admisión incluye: 1) Solicitud de información y cita, 2) Entrevista con la familia, 3) Evaluación académica del estudiante, 4) Revisión de documentos, 5) Notificación de admisión, 6) Proceso de matrícula. Todo el proceso toma aproximadamente 2-3 semanas.',
    category: 'admisiones'
  },
  {
    id: 'tuition-fees',
    question: '¿Cuáles son los costos de matrícula y pensión?',
    answer: 'Los costos varían según el nivel educativo y campus. Ofrecemos diferentes planes de pago y opciones de becas. Para información detallada sobre costos, por favor contacta directamente a nuestro departamento de admisiones quien te proporcionará información actualizada y personalizada.',
    category: 'admisiones'
  },
  {
    id: 'academic-calendar',
    question: '¿Cuándo inicia el año académico?',
    answer: 'El año académico inicia en febrero y termina en noviembre, siguiendo el calendario académico oficial de Colombia. Tenemos dos períodos de vacaciones: una semana en junio y vacaciones de diciembre-enero.',
    category: 'académico'
  },
  {
    id: 'extracurricular-activities',
    question: '¿Qué actividades extracurriculares ofrecen?',
    answer: 'Ofrecemos una amplia variedad de actividades: deportes (fútbol, baloncesto, voleibol, natación), artes (música, teatro, danza), clubes académicos (ciencias, matemáticas, idiomas), y programas de liderazgo estudiantil.',
    category: 'actividades'
  },
  {
    id: 'transportation',
    question: '¿Tienen servicio de transporte escolar?',
    answer: 'Sí, ofrecemos servicio de transporte escolar con rutas que cubren diferentes sectores de la ciudad. El servicio incluye acompañante en cada ruta y seguimiento GPS. Los costos y rutas disponibles se informan durante el proceso de matrícula.',
    category: 'servicios'
  },
  {
    id: 'lunch-service',
    question: '¿Ofrecen servicio de alimentación?',
    answer: 'Contamos con cafetería en todos nuestros campus con menús balanceados y nutritivos. También tenemos opciones para estudiantes con restricciones alimentarias. Los menús son supervisados por nutricionistas.',
    category: 'servicios'
  },
  {
    id: 'parent-communication',
    question: '¿Cómo se mantiene la comunicación con los padres?',
    answer: 'Mantenemos comunicación constante a través de: plataforma digital institucional, reuniones periódicas, informes académicos bimestrales, WhatsApp institucional, y citas individuales cuando sea necesario.',
    category: 'comunicación'
  },
  {
    id: 'technology-integration',
    question: '¿Cómo integran la tecnología en el proceso educativo?',
    answer: 'Contamos con laboratorios de tecnología, tablets para estudiantes, plataformas digitales de aprendizaje, programas de programación y robótica, y capacitación continua para docentes en herramientas tecnológicas.',
    category: 'académico'
  }];


  return (
    <>
      <Helmet>
        <title>Contacto y Servicios - Santa Catalina Digital Campus</title>
        <meta
          name="description"
          content="Contacta con Santa Catalina de Siena. Información de nuestros 3 campus, servicios educativos, directorio de personal y respuestas a preguntas frecuentes." />

        <meta name="keywords" content="contacto, servicios educativos, campus, directorio, FAQ, Santa Catalina" />
        <meta property="og:title" content="Contacto y Servicios - Santa Catalina Digital Campus" />
        <meta property="og:description" content="Encuentra toda la información de contacto, servicios y personal de Santa Catalina de Siena" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <ContactHero />
          <CampusContactCards campuses={campuses} />
          <ContactForm campuses={campuses} />
          <ServicesGrid services={services} />
          <StaffDirectory staff={staff} />
          <FAQSection faqs={faqs} />
        </main>

        {/* Footer */}
        <footer className="bg-trust text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Santa Catalina de Siena</h3>
                <p className="text-white/80 mb-4">
                  Educación de excelencia basada en valores de respeto, responsabilidad y justicia.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <Icon name="Facebook" size={20} />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <Icon name="Instagram" size={20} />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <Icon name="Youtube" size={20} />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-white/80 hover:text-white transition-colors">Nosotros</a></li>
                  <li><a href="/academic-calendar" className="text-white/80 hover:text-white transition-colors">Calendario</a></li>
                  <li><a href="/resource-library" className="text-white/80 hover:text-white transition-colors">Recursos</a></li>
                  <li><a href="/news-and-events" className="text-white/80 hover:text-white transition-colors">Noticias</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contacto General</h4>
                <div className="space-y-2 text-white/80">
                  <p className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} />
                    <span>+57 (1) 234-5678</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} />
                    <span>info@santacatalina.edu.co</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>Bogotá, Colombia</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
              <p>&copy; {new Date().getFullYear()} Institución Educativa Santa Catalina de Siena. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>);

};

export default ContactAndServicesPage;