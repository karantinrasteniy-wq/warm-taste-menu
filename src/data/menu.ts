import plov from "@/assets/plov.jpg";
import beshbarmak from "@/assets/beshbarmak.jpg";
import manti from "@/assets/manti.jpg";
import lagman from "@/assets/lagman.jpg";
import samsa from "@/assets/samsa.jpg";
import lepeshka from "@/assets/lepeshka.jpg";
import salad from "@/assets/salad.jpg";
import tea from "@/assets/tea.jpg";
import ayran from "@/assets/ayran.jpg";
import kompot from "@/assets/kompot.jpg";

export type Category = "main" | "extras" | "drinks";

export interface Dish {
  id: string;
  category: Category;
  images: string[];
  name: { ru: string; kz: string };
  description: { ru: string; kz: string };
  price: number;
  oldPrice?: number;
}

export const dishes: Dish[] = [
  {
    id: "plov",
    category: "main",
    images: [plov],
    name: { ru: "Плов по-домашнему", kz: "Үй палауы" },
    description: { ru: "Рассыпчатый рис, нежная баранина и сладкая морковь.", kz: "Үгілмелі күріш, жұмсақ қой еті және тәтті сәбіз." },
    price: 1900,
    oldPrice: 2300,
  },
  {
    id: "beshbarmak",
    category: "main",
    images: [beshbarmak],
    name: { ru: "Бешбармак", kz: "Бешбармақ" },
    description: { ru: "Традиционное блюдо: тонкое тесто и сочное мясо.", kz: "Дәстүрлі тағам: жұқа қамыр және шырынды ет." },
    price: 2500,
    oldPrice: 2900,
  },
  {
    id: "manti",
    category: "main",
    images: [manti],
    name: { ru: "Манты (4 шт)", kz: "Манты (4 дана)" },
    description: { ru: "Сочные манты на пару со сметаной.", kz: "Қаймағымен буға пісірілген манты." },
    price: 1600,
  },
  {
    id: "lagman",
    category: "main",
    images: [lagman],
    name: { ru: "Лагман", kz: "Лағман" },
    description: { ru: "Густой бульон, домашняя лапша и говядина.", kz: "Қою сорпа, үй кеспесі және сиыр еті." },
    price: 1700,
    oldPrice: 2000,
  },
  {
    id: "samsa",
    category: "extras",
    images: [samsa],
    name: { ru: "Самса с мясом", kz: "Етті самса" },
    description: { ru: "Хрустящее тесто, сочная начинка из тандыра.", kz: "Қытырлақ қамыр, тандырдан шыққан етті ішкізік." },
    price: 600,
  },
  {
    id: "lepeshka",
    category: "extras",
    images: [lepeshka],
    name: { ru: "Лепёшка тандыр", kz: "Тандыр нан" },
    description: { ru: "Свежая лепёшка из тандыра.", kz: "Тандырдан жаңа піскен нан." },
    price: 400,
  },
  {
    id: "salad",
    category: "extras",
    images: [salad],
    name: { ru: "Ачичук", kz: "Ашшы шошық" },
    description: { ru: "Помидоры, огурцы, лук и зелень.", kz: "Қызанақ, қияр, пияз және көк." },
    price: 700,
  },
  {
    id: "tea",
    category: "drinks",
    images: [tea],
    name: { ru: "Чай чёрный (чайник)", kz: "Қара шай (шайнек)" },
    description: { ru: "Заварной чёрный чай в традиционном чайнике.", kz: "Дәстүрлі шайнектегі қайнатылған қара шай." },
    price: 500,
  },
  {
    id: "ayran",
    category: "drinks",
    images: [ayran],
    name: { ru: "Айран", kz: "Айран" },
    description: { ru: "Освежающий кисломолочный напиток.", kz: "Сергітетін айран." },
    price: 450,
  },
  {
    id: "kompot",
    category: "drinks",
    images: [kompot],
    name: { ru: "Компот из ягод", kz: "Жидек компоты" },
    description: { ru: "Домашний компот из свежих ягод.", kz: "Жаңа жидектерден жасалған үй компоты." },
    price: 500,
  },
];
