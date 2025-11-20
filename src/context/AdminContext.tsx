import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface AdminContextValue {
	isAdmin: boolean;
	login: (username: string, password: string) => boolean;
	logout: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		const stored = localStorage.getItem('ie3_admin_logged_in');
		setIsAdmin(stored === 'true');
	}, []);

	const login = useCallback((username: string, password: string) => {
		const ok = username === 'admin' && password === 'admin1';
		if (ok) {
			localStorage.setItem('ie3_admin_logged_in', 'true');
			setIsAdmin(true);
		}
		return ok;
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('ie3_admin_logged_in');
		setIsAdmin(false);
	}, []);

	const value = useMemo(() => ({ isAdmin, login, logout }), [isAdmin, login, logout]);
	return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = (): AdminContextValue => {
	const ctx = useContext(AdminContext);
	if (!ctx) {
		throw new Error('useAdmin must be used within AdminProvider');
	}
	return ctx;
};


