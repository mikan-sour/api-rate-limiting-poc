import { writable } from 'svelte/store';

export const timer = writable({
    canRequest:true,
    timeRightNow: "",
    timeUntilNext:"",
    remainingRequest:0,
})