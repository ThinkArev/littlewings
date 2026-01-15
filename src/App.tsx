import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import StaffPage from "./pages/StaffPage";
import ProgramsPage from "./pages/ProgramsPage";
import GalleryPage from "./pages/GalleryPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import ContactsPage from "./pages/ContactPage";
import JoinUsPage from "./pages/JoinUsPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Helmet>
      <title>Little Wings Play School | Best Preschool in Sector 10A Gurgaon</title>
      <meta
        name="description"
        content="Little Wings Play School is the best preschool and play school in Sector 10A Gurgaon. Offering Montessori-style learning, kindergarten, and nursery programs for kids."
      />
      <meta
        name="keywords"
        content="best play school in Gurgaon, best preschool in Gurgaon, best play school in sector 10A Gurgaon, kindergarten school in sector 10A, preschool in sector 10A Gurgaon"
      />
      <link rel="canonical" href="https://www.littlewingsplayschool.info/" />
    </Helmet>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <BackToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/staff" element={<StaffPage />} /> */}
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/join" element={<JoinUsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/contact" element={<ContactsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="**" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <Analytics />
  </QueryClientProvider>
);

export default App;
