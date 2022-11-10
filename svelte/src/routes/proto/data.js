import { writable } from "svelte/store";

function createDataStore(url) {
    let intervalId;
    const { set, update, subscribe } = writable({}, () => {
        return () => {
            clearInterval(intervalId);
        };
    });

    function initiate() {
        if (!intervalId) {
            intervalId = setInterval(async () => {
                const response = await fetch(
                    `http://54.180.122.164:3000/readdb`
                );
                set(await response.json());
            }, 500);
        }
    }

    initiate();

    return {
        subscribe,
    };
}

export const data = createDataStore();

export let storeFE = writeable({});
export let idIncrement = writeable({});
