import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NGFWPage from "./pages/Services/cybersecurity/components/Ngfwpage";
import EDRXDRPage from "./pages/Services/cybersecurity/components/Edrxdrpage";
import EmailSecurityPage from "./pages/Services/cybersecurity/components/Emailsecuritypage";
import DLPPage from "./pages/Services/cybersecurity/components/Dlppage";
import SASEPage from "./pages/Services/cybersecurity/components/Sasepage";
import SIEMSOCMDRPage from "./pages/Services/cybersecurity/components/Siemsocmdrpage";
import VulnAssessmentPage from "./pages/Services/cybersecurity/components/Vulnassessmentpage";

const HomePage = lazy(() => import("@/pages/Home/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/About/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/Services/pages/ServicesPage"));
const CybersecurityPage = lazy(() => import("@/pages/Services/cybersecurity/pages/CybersecurityPage"));
const CloudSolutionsPage = lazy(() => import("@/pages/Services/CloudSolutionsPage"));
const InfrastructurePage = lazy(() => import("@/pages/Services/InfrastructurePage"));
const ManagedServicesPage = lazy(() => import("@/pages/Services/ManagedServicesPage"));
const BlogPage = lazy(() => import("@/pages/Blogs/pages/BlogPage"));
const ContactPage = lazy(() => import("@/pages/Contact/ContactPage"));
const FAQPage = lazy(() => import("@/pages/FAQ/FAQPage"));
const ApplicationSecurityPage = lazy(() => import("@/pages/Services/ApplicationSecurityPage"));
const AMCServicesPage = lazy(() => import("@/pages/Services/AMCServicesPage"));

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
          <Route path="/cybersecurity/next-gen-firewall" element={<NGFWPage />} />
          <Route path="/cybersecurity/endpoint-detection-response" element={<EDRXDRPage />} />
          <Route path="/cybersecurity/email-security" element={<EmailSecurityPage />} />
          <Route path="/cybersecurity/data-loss-prevention" element={<DLPPage />} />
          <Route path="/cybersecurity/sase-zero-trust" element={<SASEPage />} />
          <Route path="/cybersecurity/managed-detection-response" element={<SIEMSOCMDRPage />} />
<Route path="/cybersecurity/vulnerability-assessment" element={<VulnAssessmentPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
