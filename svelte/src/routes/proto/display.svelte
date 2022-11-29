<script>
    import { data, storeFE, storeHP } from './data.js'
    let config_lst = ["startPoint", "endPoint"];
</script>

<div class="font-mono text-xs grid grid-cols-2 justify-center">
{#if $data == undefined}
	<div class="font-bold mx-2 my-2">loading</div>
{:else}
	<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center content-start bg-slate-100 min-w-1/2">
	{#if $data.gps == undefined}
		<div class="font-bold mx-2 my-2">loading GPS data</div>
	{:else}
		<div class="font-bold mx-2 my-2">GPS data</div>
		<div class="mx-2 my-2">
			date ... {$data.gps[0].date.d}.{$data.gps[0].date.m}.{$data.gps[0].date.y}<br>
			time ... {$data.gps[0].time.h}:{$data.gps[0].time.m}:{$data.gps[0].time.s}.{$data.gps[0].time.ms}<br>
			point ... ({$data.gps[0].location.lat}, {$data.gps[0].location.lon})<br>
			delta ... {$data.gps[0].delta} m<br>
		</div>
	{/if}
	</div>

	<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center content-start bg-slate-100 min-w-1/2">
	{#if $data.navigate == undefined}
		<div class="font-bold mx-2 my-2">loading navigate data</div>
	{:else}
		<div class="font-bold mx-2 my-2">navigate data</div>
		<div class="mx-2 my-2">
			{#if $data.navigate.isSet == false}
				No navigation data
			{:else}
				destination ... {$data.navigate.destination.point} point, {$data.navigate.destination.angle} angle<br>
				delta ... {$data.navigate.delta}<br>
                count ... {$data.navigate.count}<br>
			{/if}
		</div>
	{/if}
	</div>

	<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center content-start bg-slate-100 min-w-1/2">
	{#if $data.haptic == undefined}
		<div class="font-bold mx-2 my-2">loading haptic data</div>
	{:else}
		<div class="font-bold mx-2 my-2">haptic data</div>
		<div class="mx-2 my-2">
			{#each $data.haptic as { pow, freq }, i}
				drv {i} ... {pow} pow, {freq} freq<br>
			{/each}
		</div>
	{/if}
	</div>

	{#if $data.config == undefined}
		<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center content-start bg-slate-100 min-w-1/2">
		<div class="font-bold mx-2 my-2">loading config data</div>
		</div>
	{:else}
        <div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center content-start bg-slate-100 min-w-1/2">
		<div class="font-bold mx-2 my-2">device data</div>
		<div class="mx-2 my-2">
			distContd: {$data.config.device.distContd}<br>
			dircContd: {$data.config.device.dircContd}<br>
			distRange: {$data.config.device.distRange}<br>
			signCount: {$data.config.device.signCount}<br>
			signPoint: {$data.config.device.signPoint}<br>
			haptics: {$data.config.device.haptics} ({$data.config.device.hapticsIdx})<br>
		</div>
		</div>
		<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center content-start bg-slate-100 min-w-1/2">
        <div class="font-bold mx-2 my-2">route data</div>
		<div class="mx-2 my-2">
			startPoint ... ({$data.config.route.startPoint.location.lat}, {$data.config.route.startPoint.location.lon})<br>
			endPoint ... ({$data.config.route.endPoint.location.lat}, {$data.config.route.endPoint.location.lon})<br>
			distance ... {$data.config.route.dist} m<br>
			{#if $data.config.route.intersections == null}
				intersections ... null<br>
			{:else}
                <br>
				{#each $data.config.route.intersectionPoint as { location, ways, waysAngle }, i}
					itrsc {i} ... ({location.lat}, {location.lon})<br>{ways} ways, {waysAngle} angles<br>
				{/each}
			{/if}
		</div>
		</div>
	{/if}
{/if}

<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center content-start bg-slate-100 min-w-1/2">
	<div class="mx-2 my-0.5 grid grid-cols-1 content-start">
	{#each config_lst as i}
    	<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/config/` + i, {method: 'POST'});} }>Update Config {i}</button>
	{/each}
	</div>
	<div class="mx-2 my-0.5 grid grid-cols-1 content-start">
		<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/calib/`, {method: 'POST', body:JSON.stringify($storeFE), headers:{'Content-Type': 'application/json'}});} }>Config Calib</button>
		<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/resetdestination/`, {method: 'POST'});} }>Reset Destination</button>
		<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/setdestination/`, {method: 'POST'});} }>Set Destination</button>
	</div>
</div>
</div>