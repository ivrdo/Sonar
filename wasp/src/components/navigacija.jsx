// Popis glavnih stranica. Koriste ga i Sidebar (desktop) i BottomTabs (mobitel).
// Kad dodamo stranicu, dopišemo je samo ovdje.

export const GLAVNE_STRANICE = [
  { to: "/", label: "Home", ikona: "home" },
  { to: "/search", label: "Search", ikona: "search" },
  { to: "/map", label: "Map", ikona: "map" },
  { to: "/tickets", label: "Tickets", ikona: "ticket" },
  { to: "/profile", label: "Profile", ikona: "user" },
];

// Ikone (iste kao u dizajnu), crtaju se u boji teksta
const PUTANJE = {
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  map: (
    <>
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  ticket: (
    <>
      <path d="M3 7h18v3a2 2 0 000 4v3H3v-3a2 2 0 000-4z" />
      <path d="M15 7v10" strokeDasharray="2 2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 17v-6a6 6 0 0112 0v6l2 2H4z" />
      <path d="M10 21h4" />
    </>
  ),
};

export function Ikona({ ime, velicina = 20 }) {
  return (
    <svg
      width={velicina}
      height={velicina}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PUTANJE[ime]}
    </svg>
  );
}
