import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ContactModalProvider } from "./ContactModal";
import { useScrollToTop } from "@/hooks/useScrollToTop";

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default function Layout() {
  return (
    <ContactModalProvider>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ContactModalProvider>
  );
}
