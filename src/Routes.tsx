import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AcademicCalendar from './pages/academic-calendar';
import ResourceLibrary from './pages/resource-library';
import NewsAndEventsPage from './pages/news-and-events';
import AboutPage from './pages/about';
import ContactAndServicesPage from './pages/contact-and-services';
import Homepage from './pages/homepage';
import CampusPage from './pages/campus';
 
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/campus/:id" element={<CampusPage />} />
        <Route path="/academic-calendar" element={<AcademicCalendar />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/news-and-events" element={<NewsAndEventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-and-services" element={<ContactAndServicesPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
