<script>
    import { storeFE, storeHP } from './data.js'
    let config_list = ["startPoint", "endPoint"];
</script>

{#each config_list as i}
    <button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/config/` + i, {method: 'POST'});} }>Update Config {i}</button>
{/each}
<br>
<button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/calib/`, {method: 'POST', body:JSON.stringify($storeFE), headers:{'Content-Type': 'application/json'}});} }>Config Calib</button>
<button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/resetdestination/`, {method: 'POST'});} }>Reset Destination</button>
<button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/setdestination/`, {method: 'POST'});} }>Set Destination</button>



