/*
    Stranica s pojedinostima koncerta. Do nje se dolazi klikom na ConcertCard
    (ruta /concerts/:id, definirana u main.wasp.ts). Id koncerta čita se iz URL-a
    pomoću useParams.

    NAPOMENA: ovo je PRIVREMENA stranica. Napravljena je samo da ruta
    /concerts/:id postoji i da klik na ConcertCard ima kamo voditi.


*/

import { useParams } from "react-router";

export function ConcertDetailPage() {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-pozadinska p-4">
            <h1 className="text-xl font-bold text-tekst-prva">Koncert {id}</h1>
        </div>
    );
}

export default ConcertDetailPage;