export type PopularArtist = {
  id: string;
  name: string;
  genre: string;
  image?: string;
};

export type VenueSummary = {
  id: number;
  name: string;
  city: string;
  upcoming: number;
  image?: string;
};

export type ConcertSummary = {
  id: number;
  title: string;
  startsAt: Date;
  venue: string;
  image?: string;
};
