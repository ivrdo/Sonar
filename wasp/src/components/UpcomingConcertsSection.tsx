import { dohvatiNadolazeceKoncerte, useQuery } from "wasp/client/operations";
import type { ConcertSummary } from "../landing/types";
import { ConcertCard } from "./ConcertCard";
import { Section } from "./Section";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "Fri 20 Nov"
function datum(d: Date): string {
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

// "20:00"
function vrijeme(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function UpcomingConcertsView({ concerts }: { concerts: ConcertSummary[] }) {
  return (
    <Section title="Upcoming concerts">
      <div className="desktop:grid-cols-2 grid grid-cols-1 gap-3">
        {concerts.map((c) => (
          <ConcertCard
            key={c.id}
            id={c.id}
            title={c.title}
            date={datum(c.startsAt)}
            time={vrijeme(c.startsAt)}
            venue={c.venue}
            image={c.image}
          />
        ))}
      </div>
    </Section>
  );
}

export function UpcomingConcertsSection() {
  const { data, isLoading, error } = useQuery(dohvatiNadolazeceKoncerte);

  if (isLoading) {
    return (
      <Section title="Upcoming Concerts On Sonar">
        <p className="text-tekst-druga text-sm">Loading…</p>
      </Section>
    );
  }
  if (error || !data) {
    return (
      <Section title="Upcoming Concerts On Sonar">
        <p className="text-tekst-druga text-sm">
          Could not load upcoming concerts...
        </p>
      </Section>
    );
  }
  if (data.length === 0) {
    return (
      <Section title="Upcoming Concerts On Sonar">
        <p className="text-tekst-druga text-sm">No upcoming concerts yet...</p>
      </Section>
    );
  }
  return <UpcomingConcertsView concerts={data} />;
}

export default UpcomingConcertsSection;
