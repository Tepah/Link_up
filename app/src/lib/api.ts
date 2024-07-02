import { availableDates } from "$lib/stores.js";
import type { Writable} from 'svelte/store';
import { get } from 'svelte/store';

export const getAllSchedules = async (url: String = '', schedules: String[]) => {
    const allSchedules = [];

    for (const id of schedules) {
        const schedule: Schedule = await getSchedule(url, id);
        allSchedules.push(schedule);
    }
    console.log(allSchedules);
    return allSchedules
}

export const getAllIDsOnSchedules = async (url: String = '', schedules: String[]) => {
    const allNames = [];

    for (const id of schedules) {
        const name = await getIDOnSchedule(url, id);
        allNames.push(name);
    }
    console.log(allNames);
    return allNames;
}

export const getIDOnSchedule = async (url: String = '', scheduleID: String) => {
    try {
        const response = await fetch(url + '/schedules/' + scheduleID);
        const result: Schedule = await response.json();
        console.log("getNamesOnSchedule result: ", result);
        return result.userID;
    } catch (error) {
        console.error("Error getting names on schedule: ", error);
        return [];
    }
}

export const getSchedule = async (url: String = '', scheduleID: String = '') => {
    try {
        const response = await fetch(url + '/schedules/' + scheduleID);
        const result = await response.json();
        console.log("getSchedule result: ", result);
        return result;
    } catch (error) {
        console.error("Error getting schedule: ", error);
        return {};
    }

}

export const postPlan = async (url: String = '', plan: Plan) => {
    try {
        const response = await fetch(url + '/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plan)
        });
        const result = response.json();
        console.log("Plan posted. postPlan result: ", result);
    } catch (error) {
        console.error("Error posting plan: ", error);
    }
}

export const postIncompletePlan = async (url: String = '',
                                         userId: String = '',
                                         planName: String = '',
                                         planDescription: String | null,
                                         schedules: String[]) => {
    try {
        const response = await fetch(url + '/incomplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: planName,
                description: planDescription,
                schedules: schedules,
                host: userId
            })
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error posting incomplete plan: ", error);
    }
}

export const postSchedule = async (url: String = '',
                                   userID: String = '',
                                   name: String = '',
                                   availableDates: Writable<unknown>) => {
    try {
        const response = await fetch(url + '/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID,
                name: name,
                dates: get(availableDates)
            })
        });
        const result: Schedule = await response.json();
        console.log("Schedule posted. postSchedule result: ", result);
        return result._id;
    } catch (error) {
        console.error("Error posting schedule: ", error);
        return "";
    }
}
