// Estructura de ejemplo de personal por sede.
// EDITA LIBREMENTE: Puedes cambiar nombres, cargos, áreas y fotos (URLs).
export type StaffMember = {
	id: string;
	name: string;
	position: string;    // Cargo (ej: Coordinador Académico, Docente de Ciencias, etc.)
	department: string; // Área en la que dicta (ej: Ciencias Naturales, Matemáticas)
	campus: string;     // Debe coincidir EXACTO con el nombre que mostramos en la sede (ej: "Campus Leyda Garrido")
	image: string;      // URL de la foto
	alt: string;        // Texto alternativo de la imagen
};

export const staffData: StaffMember[] = [
	// ======== Campus Leyda Garrido ========
	{
		id: 'lg-coordinadora-general',
		name: 'Dra. María Elena Rodríguez',
		position: 'Coordinadora General',
		department: 'Dirección',
		campus: 'Campus Leyda Garrido',
		image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
		alt: 'Coordinadora General de la sede Leyda Garrido',
	},
	{
		id: 'lg-docente-matematicas',
		name: 'Prof. Andrés Camacho',
		position: 'Docente',
		department: 'Matemáticas',
		campus: 'Campus Leyda Garrido',
		image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c',
		alt: 'Docente de Matemáticas en la sede Leyda Garrido',
	},
	{
		id: 'lg-docente-lengua',
		name: 'Lic. Paula Morales',
		position: 'Docente',
		department: 'Lengua Castellana',
		campus: 'Campus Leyda Garrido',
		image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
		alt: 'Docente de Lengua Castellana en la sede Leyda Garrido',
	},
	{
		id: 'lg-docente-ciencias',
		name: 'Ing. Felipe Ríos',
		position: 'Docente',
		department: 'Ciencias Naturales',
		campus: 'Campus Leyda Garrido',
		image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
		alt: 'Docente de Ciencias Naturales en la sede Leyda Garrido',
	},

	// ======== Campus San José ========
	{
		id: 'sj-coordinador-academico',
		name: 'Lic. Carlos Alberto Mendoza',
		position: 'Coordinador Académico',
		department: 'Coordinación Académica',
		campus: 'Campus San José',
		image: 'https://images.unsplash.com/photo-1602471615287-d733c59b79d1',
		alt: 'Coordinador Académico de la sede San José',
	},
	{
		id: 'sj-docente-artistica',
		name: 'Mgtr. Daniela Pérez',
		position: 'Docente',
		department: 'Educación Artística',
		campus: 'Campus San José',
		image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
		alt: 'Docente de Educación Artística en la sede San José',
	},
	{
		id: 'sj-docente-ingles',
		name: 'Prof. Juan Esteban León',
		position: 'Docente',
		department: 'Inglés',
		campus: 'Campus San José',
		image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
		alt: 'Docente de Inglés en la sede San José',
	},
	{
		id: 'sj-docente-sociales',
		name: 'Lic. Adriana Gómez',
		position: 'Docente',
		department: 'Ciencias Sociales',
		campus: 'Campus San José',
		image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
		alt: 'Docente de Ciencias Sociales en la sede San José',
	},

	// ======== Campus María Eugenia ========
	{
		id: 'me-coordinadora-bienestar',
		name: 'Mgtr. Ana Lucía Vargas',
		position: 'Coordinadora de Bienestar',
		department: 'Bienestar Estudiantil',
		campus: 'Campus María Eugenia',
		image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4',
		alt: 'Coordinadora de Bienestar de la sede María Eugenia',
	},
	{
		id: 'me-docente-tecnologia',
		name: 'Ing. Roberto García',
		position: 'Docente',
		department: 'Tecnología e Informática',
		campus: 'Campus María Eugenia',
		image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
		alt: 'Docente de Tecnología e Informática en la sede María Eugenia',
	},
	{
		id: 'me-docente-biologia',
		name: 'Lic. Juliana Pardo',
		position: 'Docente',
		department: 'Biología',
		campus: 'Campus María Eugenia',
		image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
		alt: 'Docente de Biología en la sede María Eugenia',
	},
	{
		id: 'me-docente-educ-fisica',
		name: 'Prof. Luis Fernando Torres',
		position: 'Docente / Coordinador',
		department: 'Educación Física',
		campus: 'Campus María Eugenia',
		image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c',
		alt: 'Docente de Educación Física en la sede María Eugenia',
	},
];


