<script>
    import { onMount } from 'svelte';
    import { identity } from 'svelte/internal';
    // import users from '../lib/data/db.json';

    // let addr = "https://localhost";
    let addr = "https://54.180.122.164";
    
    $: data = fetch(addr + `:3000/readdb`).then(res => res.json());


</script>

<style>

</style>

<h1>Welcome to SvelteKit</h1>
<h2>This will be run on the express server.</h2>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


{#await data}
    <p>Loading</p>
{:then data}
    {#each data.user as {id, name}}
        <p>{id} {name}</p>
    {/each}
{:catch error}
    <p> error </p>
{/await}