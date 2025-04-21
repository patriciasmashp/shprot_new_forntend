import { baseUrl } from "@/api/routes";

export const imageParse = (url: string) => baseUrl + url;

export const createDeepLink = (data: string) => `https://t.me/${import.meta.env.VITE_BOT_ID}?start=${data}`;

export const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
};