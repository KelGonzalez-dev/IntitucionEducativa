import React, { useMemo, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';

type NewsItem = {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	category: string;
	image: string; // Puede ser imagen o video (dataURL o URL). Detección automática por prefijo 'data:video' o extensión '.mp4'
	alt: string;
	href: string;
};

interface AdminPanelProps {
	isOpen: boolean;
	onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
	const { isAdmin, logout } = useAdmin();
	const [activeTab, setActiveTab] = useState<'news' | 'campus'>('news');

	const [news, setNews] = useState<NewsItem[]>(() => {
		const raw = localStorage.getItem('ie3_news_items');
		if (raw) {
			try { return JSON.parse(raw); } catch { return []; }
		}
		return [];
	});

	const [newNews, setNewNews] = useState<Partial<NewsItem>>({});

	const [campusId, setCampusId] = useState<string>('');
	const campusMedia = useMemo<Array<string | { type: 'image' | 'video'; src: string }>>(() => {
		if (!campusId) return [];
		const raw = localStorage.getItem('ie3_campus_carousels');
		if (!raw) return [];
		try {
			const parsed = JSON.parse(raw) as Record<string, Array<string | { type: 'image' | 'video'; src: string }>>;
			return parsed[campusId] || [];
		} catch {
			return [];
		}
	}, [campusId]);

	const [newCampusImageUrl, setNewCampusImageUrl] = useState('');

	if (!isOpen || !isAdmin) return null;

	const saveNews = (items: NewsItem[]) => {
		localStorage.setItem('ie3_news_items', JSON.stringify(items));
		setNews(items);
	};

	const addNews = () => {
		if (!newNews.title || !newNews.image) return;
		const item: NewsItem = {
			id: crypto.randomUUID(),
			title: newNews.title,
			excerpt: newNews.excerpt || '',
			date: new Date().toLocaleDateString(),
			category: newNews.category || 'General',
			image: newNews.image,
			alt: newNews.alt || newNews.title,
			href: newNews.href || '/news-and-events'
		};
		const next = [item, ...news];
		saveNews(next);
		setNewNews({});
	};

	const removeNews = (id: string) => {
		saveNews(news.filter(n => n.id !== id));
	};

	const addCampusImage = () => {
		if (!campusId || !newCampusImageUrl) return;
		const raw = localStorage.getItem('ie3_campus_carousels');
		let store: Record<string, Array<string | { type: 'image' | 'video'; src: string }>> = {};
		if (raw) {
			try { store = JSON.parse(raw); } catch { store = {}; }
		}
		const list = store[campusId] || [];
		store[campusId] = [newCampusImageUrl, ...list];
		localStorage.setItem('ie3_campus_carousels', JSON.stringify(store));
		setNewCampusImageUrl('');
	};

	const removeCampusImage = (url: string) => {
		if (!campusId) return;
		const raw = localStorage.getItem('ie3_campus_carousels');
		if (!raw) return;
		try {
			const store = JSON.parse(raw) as Record<string, Array<string | { type: 'image' | 'video'; src: string }>>;
			store[campusId] = (store[campusId] || []).filter((u) => {
				if (typeof u === 'string') return u !== url;
				return u.src !== url;
			});
			localStorage.setItem('ie3_campus_carousels', JSON.stringify(store));
		} catch {
			// ignore
		}
	};

	const fileToDataUrl = async (file: File): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result));
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});

	return (
		<div className="fixed inset-0 z-[1001] bg-black/40 backdrop-blur-sm flex items-start justify-center p-4">
			<div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
				<div className="flex items-center justify-between px-6 py-4 border-b border-border">
					<div className="flex items-center gap-2">
						<Icon name="Settings" size={18} />
						<h3 className="text-base font-semibold">Panel de Administración</h3>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" iconName="LogOut" onClick={logout}>Salir</Button>
						<Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
							<Icon name="X" size={18} />
						</Button>
					</div>
				</div>
				<div className="flex px-6 pt-4 gap-2">
					<button className={`px-3 py-2 rounded ${activeTab === 'news' ? 'bg-primary text-white' : 'bg-hover'}`} onClick={() => setActiveTab('news')}>Carrusel principal</button>
					<button className={`px-3 py-2 rounded ${activeTab === 'campus' ? 'bg-primary text-white' : 'bg-hover'}`} onClick={() => setActiveTab('campus')}>Carruseles por sede</button>
				</div>
				<div className="p-6">
					{activeTab === 'news' && (
						<div className="space-y-4">
							<p className="text-sm text-text-secondary">Agrega, elimina o reordena imágenes/noticias del carrusel principal.</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<Input placeholder="Título" value={newNews.title || ''} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} />
								<Input placeholder="Categoría" value={newNews.category || ''} onChange={(e) => setNewNews({ ...newNews, category: e.target.value })} />
								<Input placeholder="Imagen o Video (URL)" value={newNews.image || ''} onChange={(e) => setNewNews({ ...newNews, image: e.target.value })} />
								<Input placeholder="Alt" value={newNews.alt || ''} onChange={(e) => setNewNews({ ...newNews, alt: e.target.value })} />
								<Input placeholder="Enlace" value={newNews.href || ''} onChange={(e) => setNewNews({ ...newNews, href: e.target.value })} />
								<Input placeholder="Resumen" value={newNews.excerpt || ''} onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })} />
							</div>
							<div>
								<label className="text-sm text-text-secondary">O cargar archivo (imagen/video):</label>
								<input
									type="file"
									accept="image/*,video/*"
									onChange={async (e) => {
										const file = e.target.files?.[0];
										if (!file) return;
										const dataUrl = await fileToDataUrl(file);
										setNewNews((prev) => ({ ...prev, image: dataUrl, alt: prev.alt || file.name }));
									}}
									className="block mt-1"
								/>
							</div>
							<Button variant="default" iconName="Plus" className="bg-primary hover:bg-secondary" onClick={addNews}>Agregar al carrusel</Button>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{news.map(item => (
									<div key={item.id} className="border rounded-lg overflow-hidden">
										<div className="aspect-video bg-muted">
											{item.image.startsWith('data:video') || item.image.endsWith('.mp4') ? (
												<video src={item.image} className="w-full h-full object-cover" controls />
											) : (
												<div style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
											)}
										</div>
										<div className="p-3">
											<p className="text-sm font-semibold">{item.title}</p>
											<Button variant="outline" size="sm" iconName="Trash" onClick={() => removeNews(item.id)} className="mt-2">Eliminar</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === 'campus' && (
						<div className="space-y-4">
							<p className="text-sm text-text-secondary">Selecciona la sede y gestiona las imágenes del carrusel de esa sede.</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								<Input placeholder="ID de sede (ej. leyda-garrido, san-jose)" value={campusId} onChange={(e) => setCampusId(e.target.value)} />
								<Input placeholder="Nueva imagen (URL)" value={newCampusImageUrl} onChange={(e) => setNewCampusImageUrl(e.target.value)} />
								<Button variant="default" iconName="Plus" className="bg-primary hover:bg-secondary" onClick={addCampusImage}>Agregar imagen</Button>
							</div>
							<div>
								<label className="text-sm text-text-secondary">O cargar archivos (imágenes/videos, permite múltiples):</label>
								<input
									type="file"
									accept="image/*,video/*"
									multiple
									onChange={async (e) => {
										if (!campusId) return;
										const files = Array.from(e.target.files || []);
										if (!files.length) return;
										const raw = localStorage.getItem('ie3_campus_carousels');
										let store: Record<string, Array<string | { type: 'image' | 'video'; src: string }>> = {};
										if (raw) { try { store = JSON.parse(raw); } catch { store = {}; } }
										const list = store[campusId] || [];
										for (const f of files) {
											const dataUrl = await fileToDataUrl(f);
											const isVideo = dataUrl.startsWith('data:video');
											list.unshift({ type: isVideo ? 'video' : 'image', src: dataUrl });
										}
										store[campusId] = list;
										localStorage.setItem('ie3_campus_carousels', JSON.stringify(store));
									}}
									className="block mt-1"
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								{campusMedia.map((m, idx) => {
									const key = typeof m === 'string' ? m : m.src;
									const src = typeof m === 'string' ? m : m.src;
									const isVideo = (typeof m !== 'string' && m.type === 'video') || src.startsWith('data:video') || src.endsWith('.mp4');
									return (
									<div key={key + idx} className="border rounded-lg overflow-hidden">
										<div className="aspect-video bg-muted">
											{isVideo ? (
												<video src={src} className="w-full h-full object-cover" controls />
											) : (
												<div style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
											)}
										</div>
										<div className="p-2">
											<Button variant="outline" size="sm" iconName="Trash" onClick={() => removeCampusImage(src)}>Eliminar</Button>
										</div>
									</div>
								)})}
								{!campusMedia.length && <p className="text-sm text-text-secondary">Sin imágenes/videos para esta sede aún.</p>}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminPanel;


