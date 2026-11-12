/*
    "@fontsource-variable/inter" - Importiramo font koji smo dodali kao npm paket.
    { Outlet } from "react-router" - Ovo je dio Reacta
    "./App.css" - naš css
 */
import "@fontsource-variable/inter";
import {Outlet} from "react-router";
import "./App.css";

export function App() {
    /* Ove style klase se primjenjuju na sve stranice čija je parent ruta App... */
    /* Outlet komponenta se naime pretvara u druge komponente */
    return (
        <main className="flex min-h-screen w-full flex-col bg-pozadinska text-tekst-prva">
            <Outlet/>
        </main>
    );
}
