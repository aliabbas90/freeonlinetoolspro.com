export interface ZodiacSign {
  name: string;
  symbol: string;
  emoji: string;
  dates: string;
  element: string;
  planet: string;
}

export const signs: ZodiacSign[] = [
  { name: "Aries", symbol: "♈", emoji: "🐏", dates: "Mar 21 - Apr 19", element: "Fire", planet: "Mars" },
  { name: "Taurus", symbol: "♉", emoji: "🐂", dates: "Apr 20 - May 20", element: "Earth", planet: "Venus" },
  { name: "Gemini", symbol: "♊", emoji: "👯", dates: "May 21 - Jun 20", element: "Air", planet: "Mercury" },
  { name: "Cancer", symbol: "♋", emoji: "🦀", dates: "Jun 21 - Jul 22", element: "Water", planet: "Moon" },
  { name: "Leo", symbol: "♌", emoji: "🦁", dates: "Jul 23 - Aug 22", element: "Fire", planet: "Sun" },
  { name: "Virgo", symbol: "♍", emoji: "👼", dates: "Aug 23 - Sep 22", element: "Earth", planet: "Mercury" },
  { name: "Libra", symbol: "♎", emoji: "⚖️", dates: "Sep 23 - Oct 22", element: "Air", planet: "Venus" },
  { name: "Scorpio", symbol: "♏", emoji: "🦂", dates: "Oct 23 - Nov 21", element: "Water", planet: "Pluto" },
  { name: "Sagittarius", symbol: "♐", emoji: "🏹", dates: "Nov 22 - Dec 21", element: "Fire", planet: "Jupiter" },
  { name: "Capricorn", symbol: "♑", emoji: "🐐", dates: "Dec 22 - Jan 19", element: "Earth", planet: "Saturn" },
  { name: "Aquarius", symbol: "♒", emoji: "🏺", dates: "Jan 20 - Feb 18", element: "Air", planet: "Uranus" },
  { name: "Pisces", symbol: "♓", emoji: "🐟", dates: "Feb 19 - Mar 20", element: "Water", planet: "Neptune" },
];

export function getSignFromDate(month: number, day: number): ZodiacSign {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return signs[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return signs[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return signs[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return signs[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signs[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signs[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return signs[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return signs[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return signs[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return signs[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return signs[10];
  return signs[11];
}
