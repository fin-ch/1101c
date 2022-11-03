import { writable } from "svelte/store";

function createDataStore(url) {
    let intervalId;
    const { set, update, subscribe } = writable({}, () => {
        return () => {
            clearInterval(intervalId);
        };
    });

    function initiate() {
        let iterations = 1;
        if (!intervalId) {
            intervalId = setInterval(async () => {
                const response = await fetch(`http://localhost:3000/readdb`);
                set(await response.json());
                iterations = iterations + 1;
            }, 1000);
        }
    }

    initiate();

    return {
        subscribe,
    };
}

export const data = createDataStore();
