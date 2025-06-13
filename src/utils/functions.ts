import { baseUrl } from "@/api/routes";
import { YM_ID } from "./consts";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

declare const window: any;
export const imageParse = (url: string) => baseUrl + url;

export const createDeepLink = (data: string) => `https://t.me/${import.meta.env.VITE_BOT_ID}?start=${data}`;

export const copyToClipboard = async (text: string) => {
    console.log(text);

    await navigator.clipboard.writeText(text);
};

export const sendMetrik = (action: string) => {
    if (typeof window !== 'undefined' && typeof window.ym !== 'undefined') {
        console.log('sendMetrik', action);
        window.ym(YM_ID, 'reachGoal', action);

    }
}

export const initMetrik = () => {
    if (typeof window !== 'undefined' && typeof window.ym !== 'undefined') {
        console.log('initMetrik');
        window.ym(YM_ID, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer",
        });
    }
}

export const dateFormat = (date: string) => {
    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
    }).format(new Date(date));
};

export function generateRandomString(length: number) {
    return Math.random()
        .toString(36)
        .substring(2, length + 2);
}
type createdAt = {
    createdAt: string;
    [key: string]: any; // любые другие поля
}
export function groupByCreatedAt(array: createdAt[]):any {
    return array.reduce((acc: any, item) => {
        const date = dateFormat(item.createdAt);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});
}


export function useSwiper(id_el: string){
    const swiper = new Swiper(`#${id_el}`, {
    speed: 400,
    spaceBetween: 100,
    modules: [Pagination],
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      bulletClass: "swiper-pagination-planc",
      bulletActiveClass: "swiper-pagination-planc-acitve",
      clickable: true,
      enabled: true,
      el: ".swiper-custom-pagination",
    },
  });
  return swiper
}