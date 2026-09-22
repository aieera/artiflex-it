import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

/**
 * All route components are lazy-loaded.
 *
 * Why: previously these were eager-imported at the top of this file, which
 * meant the home page download included the JS for every cybersecurity, cloud,
 * infrastructure, business-solutions and vendor-detail page. That ballooned
 * the main bundle to ~4 MB and pushed mobile TBT past 5 seconds. Lazy()
 * splits each route into its own chunk so the initial visit only fetches
 * the Layout + the route the user actually loaded.
 */

// Core pages
const HomePage = lazy(() => import("@/pages/Home/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/About/AboutPage"));
const ContactPage = lazy(() => import("@/pages/Contact/ContactPage"));
const FAQPage = lazy(() => import("@/pages/FAQ/FAQPage"));
const TermsPage = lazy(() => import("@/pages/Legal/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/Legal/PrivacyPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage"));

// Blog
const BlogPage = lazy(() => import("@/pages/Blogs/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/Blogs/pages/BlogPostPage"));
const BlogCategoryPage = lazy(() => import("@/pages/Blogs/pages/BlogCategoryPage"));

// Vendors
const VendorsPage = lazy(() => import("@/pages/Vendors/VendorsPage"));
const VendorDetailPage = lazy(() => import("@/pages/Vendors/VendorDetailPage"));

// Hub pages
const CybersecurityPage = lazy(() => import("@/pages/Services/CybersecurityPage"));
const CloudSolutionsPage = lazy(() => import("@/pages/Services/CloudSolutionsPage"));
const InfrastructurePage = lazy(() => import("@/pages/Services/InfrastructurePage"));
const ManagedServicesPage = lazy(() => import("@/pages/Services/ManagedServicesPage"));
const ApplicationSecurityPage = lazy(() => import("@/pages/Services/ApplicationSecurityPage"));

// Cybersecurity sub-pages
const FirewallsNetworkSecurity = lazy(() => import("./pages/Services/cybersecurity/pages/FirewallsNetworkSecurity"));
const FirewallVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/FirewallVendorDetail"));
const UnifiedFirewallManagement = lazy(() => import("./pages/Services/cybersecurity/pages/UnifiedFirewallManagement"));
const EdrXdrSecurity = lazy(() => import("./pages/Services/cybersecurity/pages/EdrXdrSecurity"));
const EndpointVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/EndpointVendorDetail"));
const EmailSecurityBusiness = lazy(() => import("./pages/Services/cybersecurity/pages/EmailSecurityBusiness"));
const EmailVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/EmailVendorDetail"));
const WorkspaceProtectionSASE = lazy(() => import("./pages/Services/cybersecurity/pages/WorkspaceProtectionSASE"));
const WorkspaceVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/WorkspaceVendorDetail"));
const DataLossPrevention = lazy(() => import("./pages/Services/cybersecurity/pages/DataLossPrevention"));
const DlpVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/DlpVendorDetail"));
const IdentityAccessSecurity = lazy(() => import("./pages/Services/cybersecurity/pages/IdentityAccessSecurity"));
const IdentityAccessManagement = lazy(() => import("./pages/Services/cybersecurity/pages/IdentityAccessManagement"));
const MfaProduct = lazy(() => import("./pages/Services/cybersecurity/pages/iam/MfaProduct"));
const IgaProduct = lazy(() => import("./pages/Services/cybersecurity/pages/iam/IgaProduct"));
const PamProduct = lazy(() => import("./pages/Services/cybersecurity/pages/iam/PamProduct"));
const PamVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/PamVendorDetail"));
const IgaVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/IgaVendorDetail"));
const IamVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/IamVendorDetail"));
const MfaVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/MfaVendorDetail"));
const SecurityOperations = lazy(() => import("./pages/Services/cybersecurity/pages/SecurityOperations"));
const SecurityOperationsSiem = lazy(() => import("./pages/Services/cybersecurity/pages/SecurityOperationsSiem"));
const SecurityOperationsNdr = lazy(() => import("./pages/Services/cybersecurity/pages/SecurityOperationsNdr"));
const SecurityOperationsMdr = lazy(() => import("./pages/Services/cybersecurity/pages/SecurityOperationsMdr"));
const SecOpsVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/SecOpsVendorDetail"));
const VulnerabilityManagement = lazy(() => import("./pages/Services/cybersecurity/pages/VulnerabilityManagement"));
const VmVendorDetail = lazy(() => import("./pages/Services/cybersecurity/pages/VmVendorDetail"));
const MobileSecurity = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecurity"));
const MobileSecurityHexnode = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecurityHexnode"));
const MobileSecuritySophos = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecuritySophos"));
const MobileSecurityZimperium = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecurityZimperium"));
const MobileSecurityIntune = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecurityIntune"));
const MobileSecurityJamf = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecurityJamf"));
const MobileSecurityOmnissa = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecurityOmnissa"));
const MobileSecurityLookout = lazy(() => import("./pages/Services/cybersecurity/pages/MobileSecurityLookout"));
const OTICSSecurity = lazy(() => import("./pages/Services/cybersecurity/pages/OTICSSecurity"));
const OTICSSecurityNozomi = lazy(() => import("./pages/Services/cybersecurity/pages/OTICSSecurityNozomi"));
const OTICSSecurityClaroty = lazy(() => import("./pages/Services/cybersecurity/pages/OTICSSecurityClaroty"));
const OTICSSecurityDragos = lazy(() => import("./pages/Services/cybersecurity/pages/OTICSSecurityDragos"));
const OTICSSecurityTenable = lazy(() => import("./pages/Services/cybersecurity/pages/OTICSSecurityTenable"));
const OTICSSecurityMSDefenderIoT = lazy(() => import("./pages/Services/cybersecurity/pages/OTICSSecurityMSDefenderIoT"));

// Cloud sub-pages
const PublicCloud = lazy(() => import("./pages/Services/cloud-solutions/pages/PublicCloud"));
const PrivateCloud = lazy(() => import("./pages/Services/cloud-solutions/pages/PrivateCloud"));
const HybridCloud = lazy(() => import("./pages/Services/cloud-solutions/pages/HybridCloud"));
const MultiCloud = lazy(() => import("./pages/Services/cloud-solutions/pages/MultiCloud"));
const CloudMigration = lazy(() => import("./pages/Services/cloud-solutions/pages/CloudMigration"));
const BackupAsAService = lazy(() => import("./pages/Services/cloud-solutions/pages/BackupAsAService"));
const DisasterRecoveryAsAService = lazy(() => import("./pages/Services/cloud-solutions/pages/DisasterRecoveryAsAService"));

// Infrastructure sub-pages
const DataCenterInfrastructure = lazy(() => import("./pages/Services/infrastructure/pages/DataCenterInfrastructure"));
const ServersComputeVirtualization = lazy(() => import("./pages/Services/infrastructure/pages/ServersComputeVirtualization"));
const StorageSolutions = lazy(() => import("./pages/Services/infrastructure/pages/StorageSolutions"));
const BackupDataManagement = lazy(() => import("./pages/Services/infrastructure/pages/BackupDataManagement"));
const DocumentManagementSystems = lazy(() => import("./pages/Services/infrastructure/pages/DocumentManagementSystems"));
const NetworkInfrastructure = lazy(() => import("./pages/Services/infrastructure/pages/NetworkInfrastructure"));
const WirelessSolutions = lazy(() => import("./pages/Services/infrastructure/pages/WirelessSolutions"));
const StructuredCabling = lazy(() => import("./pages/Services/infrastructure/pages/StructuredCabling"));
const UnifiedCommunicationTelephony = lazy(() => import("./pages/Services/infrastructure/pages/UnifiedCommunicationTelephony"));
const VideoConferencingCollaboration = lazy(() => import("./pages/Services/infrastructure/pages/VideoConferencingCollaboration"));
const CctvSurveillance = lazy(() => import("./pages/Services/infrastructure/pages/CctvSurveillance"));
const AccessControlBiometrics = lazy(() => import("./pages/Services/infrastructure/pages/AccessControlBiometrics"));
const PowerUps = lazy(() => import("./pages/Services/infrastructure/pages/PowerUps"));
const PrintingDocumentSolutions = lazy(() => import("./pages/Services/infrastructure/pages/PrintingDocumentSolutions"));

// Business Solutions sub-pages
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
          <Route path="/cybersecurity/vendor-scorecard" element={<Navigate to="/cybersecurity" replace />} />
          <Route path="/cybersecurity/implementation-roadmap" element={<Navigate to="/cybersecurity#roadmap" replace />} />
          {/*
            Stale URL: Google has crawled /cybersecurity/identity-access-management/*
            (note: -management/, not -security/). Redirect to the real hub so any
            existing backlinks + Google Tag pageviews land on a tagged page.
          */}
          <Route path="/cybersecurity/identity-access-management" element={<Navigate to="/cybersecurity/identity-access-security" replace />} />
          <Route path="/cybersecurity/identity-access-management/:sub" element={<Navigate to="/cybersecurity/identity-access-security" replace />} />


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
        </Route>
      </Routes>
    </Suspense >
  );
}
