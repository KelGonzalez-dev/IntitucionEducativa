import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

interface CampusCarouselProps {
	campusId: string;
	fallbackImage: string;
}

type MediaItem = { type: 'image' | 'video'; src: string };

const CampusCarousel: React.FC<CampusCarouselProps> = ({ campusId, fallbackImage }) => {
	const [items, setItems] = useState<MediaItem[]>([]);
	const [index, setIndex] = useState(0);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	useEffect(() => {
		const raw = localStorage.getItem('ie3_campus_carousels');
		const fallback: MediaItem[] = [{ type: 'image', src: fallbackImage }];
		if (!raw) {
			// Seed con ejemplos por sede si no existe nada
			const seeded: Record<string, Array<string | MediaItem>> = {};
			seeded[campusId] = getDefaultMedia(campusId, fallbackImage).map((u) => ({ type: u.endsWith('.mp4') ? 'video' : 'image', src: u }));
			localStorage.setItem('ie3_campus_carousels', JSON.stringify(seeded));
			setItems(seeded[campusId] as MediaItem[]);
			return;
		}
		try {
			const store = JSON.parse(raw) as Record<string, Array<string | MediaItem>>;
			let list = store[campusId] || [];
			if (!list.length) {
				// Seed por sede si la clave existe pero está vacía
				const defaults = getDefaultMedia(campusId, fallbackImage).map((u) => ({ type: u.endsWith('.mp4') ? 'video' : 'image', src: u }));
				store[campusId] = defaults;
				localStorage.setItem('ie3_campus_carousels', JSON.stringify(store));
				list = defaults;
			}
			const normalized: MediaItem[] = list.map((x) => {
				if (typeof x === 'string') {
					const isVideo = x.endsWith('.mp4') || x.startsWith('data:video');
					return { type: isVideo ? 'video' : 'image', src: x };
				}
				return x;
			});
			setItems(normalized.length ? normalized : fallback);
			setIndex(0);
		} catch {
			setItems(fallback);
		}
	}, [campusId, fallbackImage]);

	if (!items.length) return null;

	const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);
	const next = () => setIndex((p) => (p + 1) % items.length);
	const openPreview = (i: number) => { setIndex(i); setIsPreviewOpen(true); };
	const closePreview = () => setIsPreviewOpen(false);

	return (
		<div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
			{items[index].type === 'video' ? (
				<video src={items[index].src} controls className="w-full h-full object-cover" onClick={() => openPreview(index)} />
			) : (
				<img src={items[index].src} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" onClick={() => openPreview(index)} />
			)}
			<button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 text-white w-10 h-10 rounded-full grid place-items-center">
				<Icon name="ChevronLeft" size={20} />
			</button>
			<button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 text-white w-10 h-10 rounded-full grid place-items-center">
				<Icon name="ChevronRight" size={20} />
			</button>
			<div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
				{items.map((_, i) => (
					<span key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-white/70'}`} />
				))}
			</div>

			{isPreviewOpen && (
				<div className="fixed inset-0 z-[1500] bg-black/90 backdrop-blur-md flex items-center justify-center">
					<button className="absolute top-6 right-6 p-3 rounded-full bg-white/15 hover:bg-white/25 transition" onClick={closePreview} aria-label="Cerrar">
						<Icon name="X" size={20} className="text-white" />
					</button>
					<button onClick={prev} className="absolute left-4 md:left-12 p-3 rounded-full bg-white/15 hover:bg-white/25 transition" aria-label="Anterior">
						<Icon name="ChevronLeft" size={24} className="text-white" />
					</button>
					<div className="max-w-6xl w-[92%] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
						{items[index].type === 'video' ? (
							<video src={items[index].src} className="w-full h-full object-contain" controls autoPlay />
						) : (
							<img src={items[index].src} alt={`Imagen ${index + 1}`} className="w-full h-full object-contain" />
						)}
					</div>
					<button onClick={next} className="absolute right-4 md:right-12 p-3 rounded-full bg-white/15 hover:bg-white/25 transition" aria-label="Siguiente">
						<Icon name="ChevronRight" size={24} className="text-white" />
					</button>
				</div>
			)}
		</div>
	);
};

export default CampusCarousel;

function getDefaultMedia(campusId: string, fallback: string): string[] {
	const common = [
		fallback,
		'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
		'https://images.unsplash.com/photo-1596495578065-8c63f5062c49',
		'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'
	];
	if (campusId === 'san-jose') {
		return [
			'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846',
			'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b',
			'https://images.unsplash.com/photo-1523246199903-8da11565d61a',
			'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_24fps.mp4' // demo video
		];
	}
	if (campusId === 'maria-eugenia') {
		return [
			'https://images.unsplash.com/photo-1509062522246-3755977927d7',
			'https://images.unsplash.com/photo-1532012197267-da84d127e765',
			'https://images.unsplash.com/photo-1596495577876-9c1f1f0d9f71'
		];
	}
	return common;
}


