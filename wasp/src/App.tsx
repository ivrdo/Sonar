/*
    "@fontsource-variable/inter" - Importiramo font koji smo dodali kao npm paket.
    { Outlet } from "react-router" - Ovo je dio Reacta
    "./App.css" - naš css
 */
import "@fontsource-variable/inter";
import { Outlet } from "react-router";
import "./App.css";

export function App() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-neutral-50 text-neutral-800">
      <Outlet />
    </main>
  );
}
