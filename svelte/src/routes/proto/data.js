import { writable } from "svelte/store";

// let addr = "https://localhost";
let addr = "https://54.180.122.164";

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
                const response = await fetch(addr + `:3000/readdb`);
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
