// KOMPONENTA: MapPage

/*
    Stranica s kartom mjesta održavanja (dizajn 1.2).
    Zasad samo kostur: sidebar, gornja traka i prazno mjesto za kartu i popis.
*/

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export function MapPage() {
  return (
    <div className="bg-pozadinska flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar title="Map" />

        {/*
          Sadržaj stranice.
            - desktop:grid-cols-2: karta lijevo, popis mjesta desno (kao u dizajnu)
            - na mobitelu jedno ispod drugog
        */}
        <div className="desktop:grid-cols-2 grid gap-6 p-4 desktop:px-8 desktop:py-6">
          <div className="border-rubovi-1 bg-bijela flex aspect-[4/3] items-center justify-center rounded-xl border">
            Ovdje dolazi karta
          </div>
          <div className="border-rubovi-1 bg-bijela rounded-xl border p-4">
            Ovdje dolazi popis mjesta
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;