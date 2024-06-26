import { writable } from 'svelte/store';

export const sharedData = writable('');
export const selectedDate = writable(new Date());
