import React, { useMemo, useState } from 'react';
import Image from './AppImage';
import Icon from './AppIcon';

interface BrandLogoProps {
	size?: number; // pixel size of square container
	showCircle?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ size = 40, showCircle = true }) => {
	const [useFallbackIcon, setUseFallbackIcon] = useState(false);
	const [srcTriedPng, setSrcTriedPng] = useState(true);
	const src = useMemo(() => (srcTriedPng ? '/images/logo.png' : '/images/logo.jpg'), [srcTriedPng]);

	const containerClass = showCircle
		? 'relative rounded-full bg-primary flex items-center justify-center overflow-hidden'
		: 'relative overflow-hidden';

	// Prefer an image at /public/images/logo.png; if it fails, show the current icon
	return (
		<div
			className={containerClass}
			style={{ width: size, height: size }}
		>
			{!useFallbackIcon && (
				<Image
					src={src}
					alt="Logo Santa Catalina"
					className="w-full h-full object-contain"
					onError={() => {
						// Try jpg after png, then fall back to icon
						if (srcTriedPng) setSrcTriedPng(false);
						else setUseFallbackIcon(true);
					}}
				/>
			)}
			{useFallbackIcon && (
				<Icon
					name="GraduationCap"
					size={Math.max(24, Math.round(size * 0.55))}
					color="white"
					className="pointer-events-none"
				/>
			)}
		</div>
	);
};

export default BrandLogo;


