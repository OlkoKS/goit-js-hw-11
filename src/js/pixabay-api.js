import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let amountPerPage = 40;

export async function getImages(query, page) {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "38584845-279ccf3eb4249c0861a8fef20";

    let searchParams = new URLSearchParams({
        key: API_KEY,
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${page}`,
        per_page: `${amountPerPage}`
    }).toString();

    return await axios.get(`${BASE_URL}?${searchParams}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            Notify.failure(error.message);
            return error;
    })
}