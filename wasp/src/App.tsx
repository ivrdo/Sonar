/*
    "@fontsource-variable/inter" - Importiramo font koji smo dodali kao npm paket.
    { Outlet } from "react-router" - Ovo je dio Reacta
    "./App.css" - naš css

    LJUSKA APLIKACIJE

    App je rootComponent (main.wasp.ts), pa se crta na SVAKOJ stranici. Zato je
    ovdje ljuska: dijelovi ekrana koji su isti na svim stranicama.

        - Sidebar: bočna traka, samo desktop
        - gornja traka: Navbar (glavne stranice) ili SubpageHeader (podstranice)
        - Outlet: ovdje Wasp ubacuje trenutnu stranicu (LandingPage, MapPage...)
        - DataSourcesFooter: navod izvora podataka
        - BottomTabs: donji tabovi, samo mobitel

    Stranice zato crtaju SAMO svoj sadržaj, bez Sidebara, trake i tabova.

    Stranice bez ljuske mogu se navesti u BEZ_LJUSKE.
 */
import "@fontsource-variable/inter";
import { Outlet, useLocation, useSearchParams } from "react-router";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { SubpageHeader } from "./components/SubpageHeader";
import { BottomTabs } from "./components/BottomTabs";
import { DataSourcesFooter } from "./components/DataSourcesFooter";

// Stranice bez ljuske (zasad nijedna; /login je po dizajnu unutar ljuske)
const BEZ_LJUSKE: string[] = [];

export function App() {
    const { pathname } = useLocation();

    if (BEZ_LJUSKE.includes(pathname)) {
        return (
            <main className="flex min-h-screen w-full flex-col bg-pozadinska text-tekst-prva">
                <Outlet />
            </main>
        );
    }

    /*
        Koriste se Tailwind klase:
            - flex min-h-screen: Sidebar lijevo, ostatak desno, najmanje visine ekrana
            - min-w-0 flex-1 flex-col: desni stupac zauzima ostatak širine, dijelovi jedan ispod drugog
            - pb-20 desktop:pb-0: na mobitelu mjesto za fiksne donje tabove, da ne prekriju sadržaj
            - main flex flex-1 flex-col: sadržaj stranice raste i gura footer na dno
     */
    return (
        <div className="flex min-h-screen bg-pozadinska text-tekst-prva">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col pb-20 desktop:pb-0">
                <GornjaTraka pathname={pathname} />
                <main className="flex flex-1 flex-col">
                    <Outlet />
                </main>
                <DataSourcesFooter />
            </div>
            <BottomTabs />
        </div>
    );
}

/*
    Gornja traka ovisi o adresi:
        - podstranice (/concerts/..., /artists/...) imaju SubpageHeader sa strelicom natrag
        - sve ostale imaju Navbar s naslovom i poljem za pretragu
 */
function GornjaTraka({ pathname }: { pathname: string }) {
    const [searchParams] = useSearchParams();

    if (pathname.startsWith("/concerts/")) {
        return (
            <SubpageHeader title="Concert">
                <IkonaGumb ikona="share" label="Share" />
            </SubpageHeader>
        );
    }
    if (pathname.startsWith("/artists/")) {
        return (
            <SubpageHeader title="Artist">
                <div className="flex items-center gap-1">
                    <IkonaGumb ikona="share" label="Share" />
                    <IkonaGumb ikona="more" label="More options" />
                </div>
            </SubpageHeader>
        );
    }

    // Stranica prijave: samo naslov, bez pretrage (dizajn login.png)
    if (pathname === "/login") {
        return <Navbar title="Sign in" pretraga={false} />;
    }

    return <Navbar title={naslovGlavneStranice(pathname, searchParams.get("q"))} />;
}

// Naslov u Navbaru za glavne stranice. Nepoznata adresa je stranica 404
function naslovGlavneStranice(pathname: string, pojam: string | null): string {
    switch (pathname) {
        case "/":
            return "Discover";
        case "/map":
            return "Map";
        case "/search":
            return pojam ? `Results for “${pojam}”` : "Search";
        default:
            return "Page not found";
    }
}

/*
    Mali gumb s ikonom u SubpageHeaderu (dijeljenje, tri točkice).
    Samo mobitel (desktop:hidden). Funkcije se dodaju kasnije.
 */
function IkonaGumb({ ikona, label }: { ikona: string; label: string }) {
    return (
        <button
            type="button"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-pozadinska focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none desktop:hidden"
        >
            <img src={`/dizajn/ikone/${ikona}.svg`} alt="" className="h-5 w-5" />
        </button>
    );
}
