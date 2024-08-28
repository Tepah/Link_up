import { writable } from 'svelte/store';

export const sharedData = writable('');
export const selectedDate = writable(new Date());
export const availableDates = writable(null);
export const loginToken = writable(null);
export const signupPage = writable(false);
