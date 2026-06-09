import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FirewallsNetworkSecurity from "./pages/Services/cybersecurity/pages/FirewallsNetworkSecurity";
import FirewallVendorDetail from "./pages/Services/cybersecurity/pages/FirewallVendorDetail";
import EdrXdrSecurity from "./pages/Services/cybersecurity/pages/EdrXdrSecurity";
import EndpointVendorDetail from "./pages/Services/cybersecurity/pages/EndpointVendorDetail";
import EmailSecurityBusiness from "./pages/Services/cybersecurity/pages/EmailSecurityBusiness";
import EmailVendorDetail from "./pages/Services/cybersecurity/pages/EmailVendorDetail";
import WorkspaceProtectionSASE from "./pages/Services/cybersecurity/pages/WorkspaceProtectionSASE";
import WorkspaceVendorDetail from "./pages/Services/cybersecurity/pages/WorkspaceVendorDetail";
import DataLossPrevention from "./pages/Services/cybersecurity/pages/DataLossPrevention";
import DlpVendorDetail from "./pages/Services/cybersecurity/pages/DlpVendorDetail";
import IdentityAccessSecurity from "./pages/Services/cybersecurity/pages/IdentityAccessSecurity";
import IdentityAccessManagement from "./pages/Services/cybersecurity/pages/IdentityAccessManagement";
import MfaProduct from "./pages/Services/cybersecurity/pages/iam/MfaProduct";
import IgaProduct from "./pages/Services/cybersecurity/pages/iam/IgaProduct";
import PamProduct from "./pages/Services/cybersecurity/pages/iam/PamProduct";
import PamVendorDetail from "./pages/Services/cybersecurity/pages/PamVendorDetail";
import IgaVendorDetail from "./pages/Services/cybersecurity/pages/IgaVendorDetail";
import IamVendorDetail from "./pages/Services/cybersecurity/pages/IamVendorDetail";
import MfaVendorDetail from "./pages/Services/cybersecurity/pages/MfaVendorDetail";
import SecurityOperations from "./pages/Services/cybersecurity/pages/SecurityOperations";
import SecurityOperationsSiem from "./pages/Services/cybersecurity/pages/SecurityOperationsSiem";
import SecurityOperationsNdr from "./pages/Services/cybersecurity/pages/SecurityOperationsNdr";
import SecurityOperationsMdr from "./pages/Services/cybersecurity/pages/SecurityOperationsMdr";
import SecOpsVendorDetail from "./pages/Services/cybersecurity/pages/SecOpsVendorDetail";
import VulnerabilityManagement from "./pages/Services/cybersecurity/pages/VulnerabilityManagement";
import VmVendorDetail from "./pages/Services/cybersecurity/pages/VmVendorDetail";
import UnifiedFirewallManagement from "./pages/Services/cybersecurity/pages/UnifiedFirewallManagement";
import MobileSecurity from "./pages/Services/cybersecurity/pages/MobileSecurity";
import MobileSecurityHexnode from "./pages/Services/cybersecurity/pages/MobileSecurityHexnode";
import MobileSecuritySophos from "./pages/Services/cybersecurity/pages/MobileSecuritySophos";
import MobileSecurityZimperium from "./pages/Services/cybersecurity/pages/MobileSecurityZimperium";
import MobileSecurityIntune from "./pages/Services/cybersecurity/pages/MobileSecurityIntune";
import MobileSecurityJamf from "./pages/Services/cybersecurity/pages/MobileSecurityJamf";
import MobileSecurityOmnissa from "./pages/Services/cybersecurity/pages/MobileSecurityOmnissa";
import MobileSecurityLookout from "./pages/Services/cybersecurity/pages/MobileSecurityLookout";
import OTICSSecurity from "./pages/Services/cybersecurity/pages/OTICSSecurity";
import OTICSSecurityNozomi from "./pages/Services/cybersecurity/pages/OTICSSecurityNozomi";
import OTICSSecurityClaroty from "./pages/Services/cybersecurity/pages/OTICSSecurityClaroty";
import OTICSSecurityDragos from "./pages/Services/cybersecurity/pages/OTICSSecurityDragos";
import OTICSSecurityTenable from "./pages/Services/cybersecurity/pages/OTICSSecurityTenable";
import OTICSSecurityMSDefenderIoT from "./pages/Services/cybersecurity/pages/OTICSSecurityMSDefenderIoT";
import PublicCloud from "./pages/Services/cloud-solutions/pages/PublicCloud";
import PrivateCloud from "./pages/Services/cloud-solutions/pages/PrivateCloud";
import HybridCloud from "./pages/Services/cloud-solutions/pages/HybridCloud";
import MultiCloud from "./pages/Services/cloud-solutions/pages/MultiCloud";
import CloudMigration from "./pages/Services/cloud-solutions/pages/CloudMigration";
import BackupAsAService from "./pages/Services/cloud-solutions/pages/BackupAsAService";
import DisasterRecoveryAsAService from "./pages/Services/cloud-solutions/pages/DisasterRecoveryAsAService";
import DataCenterInfrastructure from "./pages/Services/infrastructure/pages/DataCenterInfrastructure";
import ServersComputeVirtualization from "./pages/Services/infrastructure/pages/ServersComputeVirtualization";
import StorageSolutions from "./pages/Services/infrastructure/pages/StorageSolutions";
import BackupDataManagement from "./pages/Services/infrastructure/pages/BackupDataManagement";
import DocumentManagementSystems from "./pages/Services/infrastructure/pages/DocumentManagementSystems";
import NetworkInfrastructure from "./pages/Services/infrastructure/pages/NetworkInfrastructure";
import WirelessSolutions from "./pages/Services/infrastructure/pages/WirelessSolutions";
import StructuredCabling from "./pages/Services/infrastructure/pages/StructuredCabling";
import UnifiedCommunicationTelephony from "./pages/Services/infrastructure/pages/UnifiedCommunicationTelephony";
import VideoConferencingCollaboration from "./pages/Services/infrastructure/pages/VideoConferencingCollaboration";
import CctvSurveillance from "./pages/Services/infrastructure/pages/CctvSurveillance";
import AccessControlBiometrics from "./pages/Services/infrastructure/pages/AccessControlBiometrics";
import PowerUps from "./pages/Services/infrastructure/pages/PowerUps";
import PrintingDocumentSolutions from "./pages/Services/infrastructure/pages/PrintingDocumentSolutions";

const HomePage = lazy(() => import("@/pages/Home/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/About/AboutPage"));
const CybersecurityPage = lazy(() => import("@/pages/Services/CybersecurityPage"));
const CloudSolutionsPage = lazy(() => import("@/pages/Services/CloudSolutionsPage"));
const InfrastructurePage = lazy(() => import("@/pages/Services/InfrastructurePage"));
const ManagedServicesPage = lazy(() => import("@/pages/Services/ManagedServicesPage"));
const BlogPage = lazy(() => import("@/pages/Blogs/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/Blogs/pages/BlogPostPage"));
const BlogCategoryPage = lazy(() => import("@/pages/Blogs/pages/BlogCategoryPage"));
const ContactPage = lazy(() => import("@/pages/Contact/ContactPage"));
const FAQPage = lazy(() => import("@/pages/FAQ/FAQPage"));
const TermsPage = lazy(() => import("@/pages/Legal/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/Legal/PrivacyPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage"));
const VendorsPage = lazy(() => import("@/pages/Vendors/VendorsPage"));
const VendorDetailPage = lazy(() => import("@/pages/Vendors/VendorDetailPage"));
const ApplicationSecurityPage = lazy(() => import("@/pages/Services/ApplicationSecurityPage"));
const BusinessSolutionsOverview = lazy(() => import("@/pages/Services/business-solutions/pages/BusinessSolutionsOverview"));
const ErpSoftware = lazy(() => import("@/pages/Services/business-solutions/pages/ErpSoftware"));
const CrmSoftware = lazy(() => import("@/pages/Services/business-solutions/pages/CrmSoftware"));
const FinanceAccountingSoftware = lazy(() => import("@/pages/Services/business-solutions/pages/FinanceAccountingSoftware"));
const HrManagementSoftware = lazy(() => import("@/pages/Services/business-solutions/pages/HrManagementSoftware"));

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
          <Route path="/cybersecurity" element={<CybersecurityPage />} />
          <Route path="/cybersecurity/firewalls-network-security" element={<FirewallsNetworkSecurity />} />
          <Route path="/cybersecurity/firewalls/:slug" element={<FirewallVendorDetail />} />
          <Route path="/cybersecurity/unified-firewall-management" element={<UnifiedFirewallManagement />} />
          <Route path="/cybersecurity/endpoint-security-edr-xdr" element={<EdrXdrSecurity />} />
          <Route path="/cybersecurity/endpoint/sophos-intercept-x" element={<Navigate to="/cybersecurity/endpoint/sophos-endpoint" replace />} />
          <Route path="/cybersecurity/endpoint/:slug" element={<EndpointVendorDetail />} />
          <Route path="/cybersecurity/mobile-security" element={<MobileSecurity />} />
          <Route path="/cybersecurity/mobile-security/hexnode" element={<MobileSecurityHexnode />} />
          <Route path="/cybersecurity/mobile-security/sophos-mobile" element={<MobileSecuritySophos />} />
          <Route path="/cybersecurity/mobile-security/zimperium" element={<MobileSecurityZimperium />} />
          <Route path="/cybersecurity/mobile-security/microsoft-intune" element={<MobileSecurityIntune />} />
          <Route path="/cybersecurity/mobile-security/jamf" element={<MobileSecurityJamf />} />
          <Route path="/cybersecurity/mobile-security/omnissa-workspace-one" element={<MobileSecurityOmnissa />} />
          <Route path="/cybersecurity/mobile-security/lookout" element={<MobileSecurityLookout />} />
          <Route path="/cybersecurity/ot-ics-security" element={<OTICSSecurity />} />
          <Route path="/cybersecurity/ot-ics-security/nozomi" element={<OTICSSecurityNozomi />} />
          <Route path="/cybersecurity/ot-ics-security/claroty" element={<OTICSSecurityClaroty />} />
          <Route path="/cybersecurity/ot-ics-security/dragos" element={<OTICSSecurityDragos />} />
          <Route path="/cybersecurity/ot-ics-security/tenable" element={<OTICSSecurityTenable />} />
          <Route path="/cybersecurity/ot-ics-security/microsoft-defender-iot" element={<OTICSSecurityMSDefenderIoT />} />
          <Route path="/cybersecurity/email-security" element={<EmailSecurityBusiness />} />
          <Route path="/cybersecurity/email/:slug" element={<EmailVendorDetail />} />
          <Route path="/cybersecurity/data-loss-prevention" element={<DataLossPrevention />} />
          <Route path="/cybersecurity/dlp/:slug" element={<DlpVendorDetail />} />
          <Route path="/cybersecurity/identity-access-security" element={<IdentityAccessSecurity />} />
          <Route path="/cybersecurity/identity-access-security/iam" element={<IdentityAccessManagement />} />
          <Route path="/cybersecurity/identity-access-security/mfa" element={<MfaProduct />} />
          <Route path="/cybersecurity/identity-access-security/iga" element={<IgaProduct />} />
          <Route path="/cybersecurity/identity-access-security/pam" element={<PamProduct />} />
          <Route path="/cybersecurity/pam/:slug" element={<PamVendorDetail />} />
          <Route path="/cybersecurity/iga/:slug" element={<IgaVendorDetail />} />
          <Route path="/cybersecurity/iam/:slug" element={<IamVendorDetail />} />
          <Route path="/cybersecurity/mfa/:slug" element={<MfaVendorDetail />} />
          <Route path="/cybersecurity/workspace-protection-sse-sase" element={<WorkspaceProtectionSASE />} />
          <Route path="/cybersecurity/workspace/:slug" element={<WorkspaceVendorDetail />} />
          {/* Security Operations hub + SIEM / NDR / MDR sub-pages */}
          <Route path="/cybersecurity/security-operations" element={<SecurityOperations />} />
          <Route path="/cybersecurity/security-operations/siem" element={<SecurityOperationsSiem />} />
          <Route path="/cybersecurity/security-operations/ndr" element={<SecurityOperationsNdr />} />
          <Route path="/cybersecurity/security-operations/mdr" element={<SecurityOperationsMdr />} />
          {/* Per-discipline vendor detail pages (MDR / NDR / SIEM) */}
          <Route path="/cybersecurity/security-operations/:discipline/:slug" element={<SecOpsVendorDetail />} />
          <Route path="/cybersecurity/vulnerability-management" element={<VulnerabilityManagement />} />
          <Route path="/cybersecurity/vulnerability-management/:slug" element={<VmVendorDetail />} />
          <Route path="/cybersecurity/vendor-scorecard" element={<Navigate to="/cybersecurity#scorecard" replace />} />
          <Route path="/cybersecurity/implementation-roadmap" element={<Navigate to="/cybersecurity#roadmap" replace />} />


          <Route path="/cloud-solutions" element={<CloudSolutionsPage />} />
          <Route path="/cloud-solutions/public-cloud" element={<PublicCloud />} />
          <Route path="/cloud-solutions/private-cloud" element={<PrivateCloud />} />
          <Route path="/cloud-solutions/hybrid-cloud" element={<HybridCloud />} />
          <Route path="/cloud-solutions/multi-cloud-strategy" element={<MultiCloud />} />
          <Route path="/cloud-solutions/cloud-migration" element={<CloudMigration />} />
          <Route path="/cloud-solutions/backup-as-a-service" element={<BackupAsAService />} />
          <Route path="/cloud-solutions/disaster-recovery-solutions-dubai" element={<DisasterRecoveryAsAService />} />
          {/* Old URL preserved as redirect to merged page */}
          <Route path="/cloud-solutions/disaster-recovery" element={<Navigate to="/cloud-solutions/disaster-recovery-solutions-dubai" replace />} />
          <Route path="/disaster-recovery-solutions-dubai" element={<Navigate to="/cloud-solutions/disaster-recovery-solutions-dubai" replace />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/infrastructure/data-center" element={<DataCenterInfrastructure />} />
          <Route path="/infrastructure/servers-compute-virtualization" element={<ServersComputeVirtualization />} />
          <Route path="/infrastructure/storage-solutions" element={<StorageSolutions />} />
          <Route path="/infrastructure/backup-data-management" element={<BackupDataManagement />} />
          <Route path="/infrastructure/document-management-systems" element={<DocumentManagementSystems />} />
          <Route path="/infrastructure/network-infrastructure" element={<NetworkInfrastructure />} />
          <Route path="/infrastructure/wireless-solutions" element={<WirelessSolutions />} />
          <Route path="/infrastructure/structured-cabling" element={<StructuredCabling />} />
          <Route path="/infrastructure/unified-communication-telephony" element={<UnifiedCommunicationTelephony />} />
          <Route path="/infrastructure/video-conferencing-collaboration" element={<VideoConferencingCollaboration />} />
          <Route path="/infrastructure/cctv-surveillance" element={<CctvSurveillance />} />
          <Route path="/infrastructure/access-control-biometrics" element={<AccessControlBiometrics />} />
          <Route path="/infrastructure/power-ups" element={<PowerUps />} />
          <Route path="/infrastructure/printing-document-solutions" element={<PrintingDocumentSolutions />} />
          <Route path="/managed-services" element={<ManagedServicesPage />} />
          <Route path="/application-security-solutions" element={<ApplicationSecurityPage />} />
          <Route path="/amc-services" element={<Navigate to="/managed-services" replace />} />

          {/* Business Solutions */}
          <Route path="/business-solutions" element={<BusinessSolutionsOverview />} />
          <Route path="/business-solutions/erp-software" element={<ErpSoftware />} />
          <Route path="/business-solutions/crm-software" element={<CrmSoftware />} />
          <Route path="/business-solutions/finance-accounting-software" element={<FinanceAccountingSoftware />} />
          <Route path="/business-solutions/hr-management-software" element={<HrManagementSoftware />} />
          {/* Legacy redirects: Sales merged into CRM; DMS moved to infrastructure; UFM removed */}
          <Route path="/business-solutions/sales-management-software" element={<Navigate to="/business-solutions/crm-software" replace />} />
          <Route path="/business-solutions/document-management-system" element={<Navigate to="/infrastructure/document-management-systems" replace />} />
          <Route path="/business-solutions/unified-firewall-management" element={<Navigate to="/cybersecurity/unified-firewall-management" replace />} />

          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/vendors/:slug" element={<VendorDetailPage />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/category/:tag" element={<BlogCategoryPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Catch-all 404, must remain the last route */}
          <Route path="*" element={<NotFoundPage />} />


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
