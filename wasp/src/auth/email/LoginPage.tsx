// STRANICA: LoginPage (/login)

/*
    Stranica prijave prema dizajnu (src/login.png). Nalazi se unutar ljuske
    (App.tsx): Sidebar lijevo, gornja traka s naslovom "Sign in" bez pretrage.

    U sredini je bijela kartica: naslov, podnaslov, gumb "Continue with Google"
    i napomena o tome što uzimamo od Googlea.

    Gumb je obična poveznica (<a href>) na googleSignInUrl: to je adresa na
    SERVERU (:3001) koja preusmjeri na Google, pa NE smije biti <Link> (Link je
    samo za stranice unutar aplikacije).

    Već prijavljenog korisnika odmah vraćamo na početnu stranicu.

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - p-4 desktop:p-6: razmak oko kartice, isti kao na ostalim stranicama
        - mx-auto w-full max-w-[27rem]: kartica je centrirana i najviše 432px široka
        - rounded-xl border border-rubovi-1 bg-bijela p-4: bijela kartica sa zaobljenim rubom
        - text-[26px] font-bold tracking-tight: naslov
        - text-[15px] text-tekst-druga: sivi podnaslov
        - h-10 w-full rounded-lg border border-akcent text-akcent: obrubljeni tirkizni gumb
        - hover:bg-akcent-blijedi: gumb blago posvijetli kad se pređe mišem
        - text-xs text-tekst-druga: sitna napomena ispod gumba
*/

import { googleSignInUrl, useAuth } from "wasp/client/auth";
import { Navigate } from "react-router";
import { GoogleIkona } from "../../components/GoogleIkona";

export function LoginPage() {
  const { data: user, isLoading } = useAuth();

  // Dok se provjerava je li korisnik prijavljen, ne prikazujemo ništa
  if (isLoading) return null;

  // Već prijavljen korisnik nema što raditi na /login, vraćamo ga na početnu
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="desktop:p-6 p-4">
      <section className="border-rubovi-1 bg-bijela mx-auto w-full max-w-[27rem] rounded-xl border p-4">
        <h1 className="text-tekst-prva text-[26px] leading-tight font-bold tracking-tight">
          Sign in to Sonar
        </h1>
        <p className="text-tekst-druga mt-2 text-[15px]">
          Recommendations, ratings, reviews and free concert registrations.
        </p>

        <a
          href={googleSignInUrl}
          className="border-akcent text-akcent hover:bg-akcent-blijedi focus-visible:ring-akcent mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg border-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <GoogleIkona className="h-3.5 w-3.5" />
          Continue with Google
        </a>

        <p className="text-tekst-druga mt-3 text-xs leading-relaxed">
          We only take your email address from Google. Your account is created on
          the first sign-in.
        </p>
      </section>

      {/*
        "Messages you may see": poruke koje korisnik može dobiti pri prijavi.
        PRIVREMENO se prikazuju sve tri, točno kao u dizajnu (login.png). Kasnije
        bi se trebala prikazati samo ona koja se stvarno dogodila (npr. iz
        provjeraRacuna.ts za suspendiran ili deaktiviran račun).

        Koriste se Tailwind klase:
          - mx-auto mt-5 max-w-[27rem]: ista širina i poravnanje kao kartica iznad
          - space-y-2: razmak između poruka
          - rounded-lg px-3 py-2.5 text-[13px]: kućica poruke
          - bg-status-*-pozadina text-status-*: boje statusa iz App.css
            (smeđkasta = upozorenje, crvena = greška, siva = obavijest)
      */}
      <section className="mx-auto mt-5 w-full max-w-[27rem]">
        <h2 className="text-tekst-druga mb-2 text-xs font-semibold">
          Messages you may see
        </h2>
        <ul className="space-y-2">
          <li className="bg-status-smedjkasti-pozadina text-status-smedjkasti rounded-lg px-3 py-2.5 text-[13px]">
            Your account is suspended until <strong>28 Oct 2026</strong>.
          </li>
          <li className="bg-status-crveni-pozadina text-status-crveni rounded-lg px-3 py-2.5 text-[13px]">
            This account has been deactivated.
          </li>
          <li className="bg-status-sivi-pozadina text-status-sivi rounded-lg px-3 py-2.5 text-[13px]">
            Google sign-in isn&apos;t responding. Try again in a few minutes.
          </li>
        </ul>
      </section>
    </div>
  );
}
