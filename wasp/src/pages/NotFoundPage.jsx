// STRANICA: NotFoundPage

/*
    Prikazuje se za svaku adresu koja ne postoji (npr. /abc).
    U main.wasp.ts je vezana na putanju "*", koja hvata sve što nije
    pogodila nijedna druga ruta.

    Korisniku jasno kaže što se dogodilo i nudi put natrag,
    umjesto Waspovog zadanog ekrana s greškom.
*/

import { Link } from "wasp/client/router";
import { PageLayout } from "../components/PageLayout";

export function NotFoundPage() {
  return (
    <PageLayout title="Page not found">
      {/*
        - flex flex-1 items-center justify-center: kartica u sredini slobodnog prostora
        - p-4 / desktop:p-8: razmak od rubova
      */}
      <div className="desktop:p-8 flex flex-1 items-center justify-center p-4">
        {/*
          Kartica kao u dizajnu: bijela, rub, zaobljena.
            - max-w-md: ne preširoka na desktopu
            - text-center: tekst centriran
        */}
        <div className="border-rubovi-1 bg-bijela flex w-full max-w-md flex-col items-center gap-3 rounded-xl border p-6 text-center">
          <p className="text-akcent text-4xl font-extrabold">404</p>
          <h1 className="text-tekst-prva text-xl font-bold">
            This page doesn't exist
          </h1>
          <p className="text-tekst-druga text-sm">
            The link may be broken, or the page was moved or removed.
          </p>

          {/* Gumbi: glavni (tirkizni) i sporedni (bijeli s tirkiznim rubom) */}
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <Link
              to="/"
              className="bg-akcent hover:bg-akcent-jaki inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-semibold text-white"
            >
              Back to Home
            </Link>
            <Link
              to="/map"
              className="border-akcent text-akcent hover:bg-akcent-blijedi inline-flex min-h-10 items-center rounded-lg border-2 px-4 text-sm font-semibold"
            >
              Open map
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default NotFoundPage;