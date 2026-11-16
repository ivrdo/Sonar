// KOMPONENTA: BottomTabs

/*
    Donja navigacija za mobitel (u dizajnu: Home, Search, Map, Tickets, Profile).
    Na desktopu je skrivena (desktop:hidden) jer tamo postoji Sidebar.

    Klase:
        - fixed inset-x-0 bottom-0 z-20: zalijepljena za dno ekrana, cijela širina
        - pb-[env(safe-area-inset-bottom)]: na iPhoneu ne ide ispod crtice za "home"
        - aktivni tab: tirkizni tekst i tirkizna crta GORE (inset shadow)
*/

import { NavLink } from "react-router";
import { GLAVNE_STRANICE, Ikona } from "./navigacija";

export function BottomTabs() {
  return (
    <nav
      aria-label="Main"
      className="border-rubovi-1 bg-bijela desktop:hidden fixed inset-x-0 bottom-0 z-20 flex border-t pb-[env(safe-area-inset-bottom)]"
    >
      {GLAVNE_STRANICE.map((s) => (
        <NavLink
          key={s.to}
          to={s.to}
          end={s.to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 pt-2 pb-3 text-[11.5px] ${
              isActive
                ? "text-akcent font-bold shadow-[inset_0_3px_0_var(--color-akcent)]"
                : "text-tekst-druga font-medium"
            }`
          }
        >
          <Ikona ime={s.ikona} />
          <span>{s.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomTabs;
