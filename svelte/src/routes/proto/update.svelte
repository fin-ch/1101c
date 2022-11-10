<script>
    import { storeFE } from './data.js'
    let config_list = ["startPoint", "endPoint"];
    let des_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<ul>
{#each config_list as i}
    <li>
    <button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/config/` + i, {method: 'POST'});} }>Update Config {i}</button>
    </li>
{/each}
<button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/calib/`, {method: 'POST', body:JSON.stringify($storeFE), headers:{'Content-Type': 'application/json'}});} }>Config Calib</button>
<button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/resetdestination/`, {method: 'POST'});} }>Reset Destination</button>
{#each des_list as i}
    <li>
        <button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/setdestination/` + i, {method: 'POST'});} }>Set Destination {i}</button>
    </li>
{/each}
</ul>

