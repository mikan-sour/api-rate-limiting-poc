import { writable } from 'svelte/store';

export const auth = writable({
    username:"",
    token: "",
})
