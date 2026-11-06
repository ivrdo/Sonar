// ==========================================
// LandingPage
// Glavna stranica koja za sada prikazuje samo Navbar.
// ==========================================

import { Navbar } from "../components/Navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
    </div>
  );
}

export default LandingPage;
