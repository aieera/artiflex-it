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
import RiskThreatAssessment from "./pages/Services/cybersecurity/pages/RiskThreatAssessment";
import FirewallNwk from "./pages/Services/cybersecurity/pages/FirewallNwk";
import EndpointSecurity from "./pages/Services/cybersecurity/pages/EndpointSecurity";
import EmailSecurity from "./pages/Services/cybersecurity/pages/EmailSecurity";
import NDRPage from "./pages/Services/cybersecurity/pages/NDRPage";
import DataLossdlp from "./pages/Services/cybersecurity/pages/DataLossdlp";
import WorkSpaceProtection from "./pages/Services/cybersecurity/pages/WorkSpaceProtection";
import DisasterRecovery from "./pages/Services/DisasterRecovery";

const HomePage = lazy(() => import("@/pages/Home/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/About/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/Services/pages/ServicesPage"));
const CybersecurityPage = lazy(() => import("@/pages/Services/CybersecurityPage"));
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

          <Route path="/cybersecurity/cybersecurity-threats-solutions-dubai" element={<RiskThreatAssessment />} />
          <Route path="/cybersecurity/firewall-solutions-dubai-guide" element={<FirewallNwk />} />
          <Route path="/cybersecurity/endpoint-email-security-solutions-uae" element={<EndpointSecurity />} />
          <Route path="/cybersecurity/email-security-vendors" element={<EmailSecurity />} />
          <Route path="/cybersecurity/data-loss-prevention-solutions" element={<DataLossdlp />} />
          <Route path="/cybersecurity/network-detection-response-solutions" element={<NDRPage />} />
          <Route path="/cybersecurity/enterprise-cybersecurity-solutions" element={<WorkSpaceProtection />} />

        
          <Route path="/cloud-solutions" element={<CloudSolutionsPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/managed-services" element={<ManagedServicesPage />} />
          <Route path="/application-security-solutions" element={<ApplicationSecurityPage />} />
          <Route path="/amc-services" element={<AMCServicesPage />} />
          <Route path="//disaster-recovery-solutions" element={<DisasterRecovery />} />
          
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />


          {/* <Route path="/cybersecurity/next-gen-firewall" element={<NGFWPage />} />
          <Route path="/cybersecurity/endpoint-detection-response" element={<EDRXDRPage />} />
          <Route path="/cybersecurity/email-security" element={<EmailSecurityPage />} />
          <Route path="/cybersecurity/data-loss-prevention" element={<DLPPage />} />
          <Route path="/cybersecurity/sase-zero-trust" element={<SASEPage />} />
          <Route path="/cybersecurity/managed-detection-response" element={<SIEMSOCMDRPage />} />
          <Route path="/cybersecurity/vulnerability-assessment-penetration-testing" element={<VulnAssessmentPage />} /> */}
        </Route>
      </Routes>
    </Suspense >
  );
}
