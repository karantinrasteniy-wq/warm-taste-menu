export interface Branch {
  id: string;
  name: { ru: string; kz: string };
  address: { ru: string; kz: string };
  hours: string;
  twoGisUrl?: string;
}

export const branches: Branch[] = [
  {
    id: "central",
    name: { ru: "Центральный", kz: "Орталық" },
    address: { ru: "пр. Абая, 45, Алматы", kz: "Абай даң., 45, Алматы" },
    hours: "10:00 — 23:00",
    twoGisUrl: "https://2gis.kz/almaty/search/Абая%2045",
  },
  {
    id: "north",
    name: { ru: "Северный", kz: "Солтүстік" },
    address: { ru: "ул. Жандосова, 102, Алматы", kz: "Жандосов к., 102, Алматы" },
    hours: "10:00 — 22:00",
    twoGisUrl: "https://2gis.kz/almaty/search/Жандосова%20102",
  },
  {
    id: "south",
    name: { ru: "Южный", kz: "Оңтүстік" },
    address: { ru: "мкр. Самал-2, 78, Алматы", kz: "Самал-2 ы.а., 78, Алматы" },
    hours: "11:00 — 23:00",
    twoGisUrl: "https://2gis.kz/almaty/search/Самал-2%2078",
  },
];

export const WHATSAPP_PHONE = "87055165700";

