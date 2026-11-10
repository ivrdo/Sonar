// components/PageLayout.jsx
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BottomTabs } from "./BottomTabs";

export function PageLayout({ title, children }) {
  return (
    <div className="bg-pozadinska flex min-h-screen">
      <Sidebar />
      <div className="desktop:pb-0 flex min-w-0 flex-1 flex-col pb-20">
        <Navbar title={title} />
        {children}  {/* ovdje se pojavi sve što stranica stavi unutar <PageLayout> */}
      </div>
      <BottomTabs />
    </div>
  );
}