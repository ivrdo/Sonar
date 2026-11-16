// KOMPONENTA: MapPage

/*
    Stranica s kartom mjesta održavanja (dizajn 1.2).
    Zasad samo kostur: sidebar, gornja traka i prazno mjesto za kartu i popis.
*/

import { PageLayout } from "../components/PageLayout";

export function MapPage() {
  return (
    <PageLayout title="Map">
      <div className="desktop:grid-cols-2 … grid grid-cols-1 gap-4 p-4">
        {/* karta i popis */}
      </div>
    </PageLayout>
  );
}

export default MapPage;