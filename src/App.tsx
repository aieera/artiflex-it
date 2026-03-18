import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const CybersecurityPage = lazy(() => import("@/pages/CybersecurityPage"));
const CloudSolutionsPage = lazy(() => import("@/pages/CloudSolutionsPage"));
const InfrastructurePage = lazy(() => import("@/pages/InfrastructurePage"));
const ManagedServicesPage = lazy(() => import("@/pages/ManagedServicesPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const ApplicationSecurityPage = lazy(() => import("@/pages/ApplicationSecurityPage"));
const AMCServicesPage = lazy(() => import("@/pages/AMCServicesPage"));

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/cybersecurity" element={<CybersecurityPage />} />
          <Route path="/cloud-solutions" element={<CloudSolutionsPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/managed-services" element={<ManagedServicesPage />} />
          <Route path="/application-security-solutions" element={<ApplicationSecurityPage />} />
          <Route path="/amc-services" element={<AMCServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
