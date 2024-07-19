import { availableDates } from "$lib/stores.js";
import type { Writable} from 'svelte/store';
import { get } from 'svelte/store';

// GET requests
export const getUserByID = async (url: String = '', uid: String) => {
    try {
        const response = await fetch(url + '/users/' + uid);
        const result = await response.json();
        console.log("getUserByID result: ", result);
        return result;
    } catch (error) {
        console.error("Error getting user: ", error);
        return [];
    }
}

export const getAllPlansByID = async (url: String = '', userID: String = '') => {
    try {
        let response = await fetch(url + `/plans/user/${userID}`);
        const userPlans: [Plan] = await response.json();
        console.log("getPlansByID result: ", userPlans);
        return userPlans;
    } catch (error) {
        console.error("Error getting plans by ID: ", error);
        return [];
    }
}

export const getAllIncompleteByID = async (url: String = '', userID: String = '') => {
    try {
        let response = await fetch(url + `/incomplete/user/${userID}`);
        const userIncomplete: [Incomplete] = await response.json();
        console.log("getIncompleteByID result: ", userIncomplete);
        return userIncomplete;
    } catch (error) {
        console.error("Error getting incomplete by ID: ", error);
        return [];
    }

}

export const getIncompletePlan = async (url: String = '', planID: String = '') => {
    try {
        const response = await fetch(url + '/incomplete/' + planID);
        const result = await response.json();
        console.log("getIncompletePlan result: ", result);
        return result;
    } catch (error) {
        console.error("Error getting incomplete plan: ", error);
        return {};
    }
}

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

// POST requests
export const postPlan = async (url: String = '', plan: Plan) => {
    try {
        const response = await fetch(url + '/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plan)
        });
        const result: Plan = await response.json();
        console.log("Plan posted. postPlan result: ", result);
        return result;
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
        const result: Incomplete = await response.json();
        console.log(result);
        return result._id;
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

// DELETE requests
export const deletePlan = async (url: String = '', planID: String = '') => {
    try {
        const response = await fetch(url + '/plans/' + planID, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Plan deleted. deletePlan result: ", result);
    } catch (error) {
        console.error("Error deleting plan: ", error);
    }
}

export const deleteSchedule = async (url: String = '', scheduleID: String = '') => {
    try {
        const response = await fetch(url + '/schedules/' + scheduleID, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Schedule deleted. deleteSchedule result: ", result);
    } catch (error) {
        console.error("Error deleting schedule: ", error);
    }
}

export const deleteIncompletePlan = async (url: String = '', planID: String = '') => {
    const incompletePlan = await getIncompletePlan(url, planID);
    for (const scheduleID of incompletePlan.schedules) {
        await deleteSchedule(url, scheduleID);
    }
    try {
        const response = await fetch(url + '/incomplete/' + planID, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Incomplete plan deleted. deleteIncompletePlan result: ", result);
    } catch (error) {
        console.error("Error deleting incomplete plan: ", error);
    }
}
