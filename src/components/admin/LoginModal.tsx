import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
	const { login } = useAdmin();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const ok = login(username.trim(), password);
		if (!ok) {
			setError('Credenciales inválidas. Intenta de nuevo.');
		} else {
			setError(null);
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold text-text-primary">Acceso Administrador</h3>
					<button onClick={onClose} aria-label="Cerrar" className="p-1 rounded hover:bg-hover">
						<Icon name="X" size={18} />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="space-y-3">
					<Input
						type="text"
						placeholder="Usuario"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <p className="text-red-600 text-sm">{error}</p>}
					<Button variant="default" fullWidth iconName="LogIn" iconPosition="left" className="bg-primary hover:bg-secondary">
						Ingresar
					</Button>
				</form>
				<p className="text-xs text-text-secondary mt-4">
					Usa usuario <strong>admin</strong> y contraseña <strong>admin1</strong>.
				</p>
			</div>
		</div>
	);
};

export default LoginModal;


