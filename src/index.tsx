import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import React from "react";
import { AdminProvider } from "./context/AdminContext";

const container = document.getElementById("root");

if (!container) {
    throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<AdminProvider>
			<App />
		</AdminProvider>
	</React.StrictMode>
); 