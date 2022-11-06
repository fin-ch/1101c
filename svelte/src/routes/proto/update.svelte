<script>
    let config_list = [0, 10];
    let des_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<ul>
{#each config_list as i}
    <li>
    <button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/config/` + i, {method: 'POST'});} }>Update Config {i}</button>
    </li>
{/each}
<button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/calib/9`, {method: 'POST'});} }>Config Calib</button>
{#each des_list as i}
    <li>
        <button on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/setdestination/` + i, {method: 'POST'});} }>Set Destination {i}</button>
    </li>
{/each}
</ul>

