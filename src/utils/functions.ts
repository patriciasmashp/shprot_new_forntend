import { baseUrl } from "@/api/routes";
import { YM_ID } from "./consts";
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