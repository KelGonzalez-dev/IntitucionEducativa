import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import CampusCarousel from './components/CampusCarousel';
import { campusesData } from '../../data/campuses';
import { staffData } from '../../data/staff';
import CircularGallery from '../../components/gallery/CircularGallery';

const CampusPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const slugify = (str: string) =>
		(str || '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9\-]/g, '');
	const normalizedId = (id || '').replace(/^sede-/, ''); // soporta rutas que contienen 'sede-...'
	const campus = useMemo(() => {
		return (
			campusesData.find(c => c.id === normalizedId) ||
			campusesData.find(c => slugify(c.name) === (id || ''))
		);
	}, [id, normalizedId]);

	const campusStaff = useMemo(() => {
		if (!campus) return [];
		return staffData.filter(s => s.campus === campus.name);
	}, [campus]);

	if (!campus) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-20 container mx-auto px-4">
					<div className="text-center py-24">
						<p className="text-text-secondary">Sede no encontrada.</p>
						<Link to="/contact-and-services" className="text-primary underline">Volver</Link>
					</div>
				</main>
			</div>
		);
	}

	return (
		<>
			<Helmet>
				<title>{campus.name} - Santa Catalina</title>
			</Helmet>
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-16">
					<section className="bg-canvas py-8">
						<div className="container mx-auto px-4">
							<div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
								<Link to="/homepage" className="hover:text-primary">Inicio</Link>
								<span>/</span>
								<Link to="/contact-and-services" className="hover:text-primary">Sedes</Link>
								<span>/</span>
								<span className="text-text-primary">{campus.name}</span>
							</div>
							<h1 className="text-2xl md:text-3xl font-heading font-bold text-institutional mb-4">{campus.name}</h1>
							<p className="text-text-secondary mb-6">{campus.address}</p>
							<CampusCarousel campusId={campus.id} fallbackImage={campus.image} />
						</div>
					</section>

					<section className="py-12">
						<div className="container mx-auto px-4">
							<h2 className="text-xl md:text-2xl font-heading font-semibold text-text-primary mb-6">Equipo directivo y docentes</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{campusStaff.map(member => (
									<div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden">
										<div className="relative h-44">
											<img src={member.image} alt={member.alt} className="w-full h-full object-cover" />
											<div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">{campus.name}</div>
										</div>
										<div className="p-4">
											<p className="text-base font-semibold text-text-primary">{member.name}</p>
											<p className="text-primary text-sm">{member.position}</p>
											<p className="text-text-secondary text-sm">{member.department}</p>
										</div>
									</div>
								))}
								{!campusStaff.length && (
									<div className="col-span-full text-text-secondary">Aún no hay personal cargado para esta sede.</div>
								)}
							</div>
						</div>
					</section>

					{/* Galería circular */}
					<section className="py-12 bg-canvas">
						<div className="container mx-auto px-4">
							<h2 className="text-xl md:text-2xl font-heading font-semibold text-text-primary mb-6">Galería de la Sede</h2>
							<div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg relative" style={{ position: 'relative' }}>
								<CircularGallery
									items={(itemsFromLocal(campus.id, campus.image)).map((m, idx) => {
										const src = typeof m === 'string' ? m : (m as any).src;
										return { image: src, text: `Imagen ${idx + 1}` };
									})}
									bend={3}
									textColor="#ffffff"
									borderRadius={0.05}
									scrollEase={0.02}
								/>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default CampusPage;

function itemsFromLocal(campusId: string, fallback: string): Array<string | { type: 'image' | 'video'; src: string }> {
	const raw = localStorage.getItem('ie3_campus_carousels');
	if (!raw) return [fallback];
	try {
		const store = JSON.parse(raw) as Record<string, Array<string | { type: 'image' | 'video'; src: string }>>;
		const list = store[campusId] || [fallback];
		return list.filter((x) => {
			const src = typeof x === 'string' ? x : x.src;
			return !(src.startsWith('data:video') || src.endsWith('.mp4'));
		});
	} catch {
		return [fallback];
	}
}


