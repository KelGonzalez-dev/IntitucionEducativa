export type CampusBasic = {
	id: string;
	name: string;
	image: string;
	alt: string;
	description?: string;
	address?: string;
	phone?: string;
	email?: string;
};

export const campusesData: CampusBasic[] = [
	{
		id: 'leyda-garrido',
		name: 'Campus Leyda Garrido',
		image: 'https://images.unsplash.com/photo-1653388070335-e054b855eac2',
		alt: 'Vista exterior del Campus Leyda Garrido',
		address: 'Calle 45 #23-67, Barrio Centro, Bogotá, Colombia',
		phone: '+57 (1) 234-5678',
		email: 'leyda@santacatalina.edu.co',
	},
	{
		id: 'san-jose',
		name: 'Campus San José',
		image: 'https://images.unsplash.com/photo-1572002872430-1f56e735da65',
		alt: 'Campus San José edificio principal',
		address: 'Carrera 15 #78-45, Zona Norte, Bogotá, Colombia',
		phone: '+57 (1) 345-6789',
		email: 'sanjose@santacatalina.edu.co',
	},
	{
		id: 'maria-eugenia',
		name: 'Campus María Eugenia',
		image: 'https://images.unsplash.com/photo-1593760407953-a76d081225a8',
		alt: 'Campus María Eugenia complejo educativo',
		address: 'Avenida 68 #125-34, Zona Occidental, Bogotá, Colombia',
		phone: '+57 (1) 456-7890',
		email: 'mariaeugenia@santacatalina.edu.co',
	},
];


