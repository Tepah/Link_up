import { writable } from 'svelte/store';

export const sharedData = writable('');
// TODO: Find usage for this, I thought I removed it.
export const selectedDate = writable(new Date());
export const availableDates = writable(null);
export const loginToken = writable(null);
