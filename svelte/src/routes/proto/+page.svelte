<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data, storeFE, storeLI, storeHP } from './data.js'
	import Item from './Item.svelte'

	$storeLI = [];

	let drv_lst = [0, 1, 2, 3, 4, 5];
	let config_lst = ["startPoint", "endPoint"];

	$storeHP = [
					{ pow: 0, freq: 1 },
					{ pow: 0, freq: 1 },
					{ pow: 0, freq: 1 },
					{ pow: 0, freq: 1 },
					{ pow: 0, freq: 1 },
					{ pow: 0, freq: 1 }];

	$storeFE = [{id:0, ways:0, wayAngle:[]},
					{id:1, ways:0, wayAngle:[]},
					{id:2, ways:0, wayAngle:[]},
					{id:3, ways:0, wayAngle:[]},
					{id:4, ways:0, wayAngle:[]},
					{id:5, ways:2, wayAngle:[90, 270]},
					{id:6, ways:3, wayAngle:[90, 240, 300]},
					{id:7, ways:4, wayAngle:[60, 120, 240, 300]},
					{id:8, ways:2, wayAngle:[90, 270]}];

	let count = 0;

	function addList() {
		var l = 0;
		if($storeLI != undefined) l = $storeLI.length;
		$storeLI[l] = count;
		console.log($storeLI);
	}

	function removeList() {
		$storeLI  = [];
	}

	function addItem() {
		var l = 0;
		var lst = $storeLI;
		if($storeFE != undefined) l = $storeFE.length;
		$storeFE[l] = {id:l, ways:$storeLI.length, wayAngle:lst};
		console.log($storeFE);
		
		removeList();
	}
	
</script>
<div class="font-mono text-sm flex flex-col">
<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
	<div class="font-bold mx-4 my-2">ctrl haptic manually</div>

	{#each drv_lst as i}
		<div class="mx-4 my-0.5">drv {i} ...
		pow:<input class="mx-4 my-2 py-0.5 w-24 border-0 rounded-lg bg-white shadow-md text-center" bind:value={ $storeHP[i].pow }>
		freq:<input class="mx-4 my-2 py-0.5 w-24 border-0 rounded-lg bg-white shadow-md text-center" bind:value={ $storeHP[i].freq }></div>
	{/each}
	<div class="mx-4 my-0.5">
		<button class="mx-4 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/testhaptic/`, {method: 'POST', body:JSON.stringify($storeHP), headers:{'Content-Type': 'application/json'}});} }>test</button>
	</div>
</div>

<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
	<div class="font-bold mx-4 my-2">adjust intersection and angle</div>
	<div class="mx-4 my-0.5">
		<input class="mx-4 my-2 py-0.5 w-36 border-0 rounded-lg bg-white shadow-md text-center" bind:value={ count }>
		<button class="mx-4 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ addList }>Add a list</button>
	</div>
	{#if $storeLI.length == 0}
		<div class="mx-4 my-0.5">nothing in tmp</div>
	{:else}
		<div class="mx-4 my-0.5">{ $storeLI }</div>
	{/if}
	<div class="mx-4 my-0.5">
		<button class="mx-4 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ removeList }>rmv</button>
		<button class="mx-4 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ addItem }>Add on item</button>
	</div>
	<div class="mx-4 my-0.5">
		{#each $storeFE as item}
			<div class="mx-4 my-2 py-0.5 w-72 text-left"><svelte:component this={Item} objAttributes={item}/></div>
		{/each}
	</div>
</div>
<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-2 justify-items-center place-content-center bg-slate-100">
	<div class="mx-4 my-0.5 grid grid-cols-1 content-start">
	{#each config_lst as i}
    	<button class="mx-4 my-2 py-0.5 px-4 w-64 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/config/` + i, {method: 'POST'});} }>Update Config {i}</button>
	{/each}
	</div>
	<div class="mx-4 my-0.5 grid grid-cols-1 content-start">
		<button class="mx-4 my-2 py-0.5 px-4 w-64 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/calib/`, {method: 'POST', body:JSON.stringify($storeFE), headers:{'Content-Type': 'application/json'}});} }>Config Calib</button>
		<button class="mx-4 my-2 py-0.5 px-4 w-64 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/resetdestination/`, {method: 'POST'});} }>Reset Destination</button>
		<button class="mx-4 my-2 py-0.5 px-4 w-64 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/setdestination/`, {method: 'POST'});} }>Set Destination</button>
	</div>
</div>

{#if $data == undefined}
	<div class="font-bold mx-4 my-2">loading</div>
{:else}
	<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
	{#if $data.gps == undefined}
		<div class="font-bold mx-4 my-2">loading GPS data</div>
	{:else}
		<div class="font-bold mx-4 my-2">GPS data</div>
		<div class="mx-4 my-0.5">
			date ... {$data.gps[0].date.d}.{$data.gps[0].date.m}.{$data.gps[0].date.y}<br>
			time ... {$data.gps[0].time.h}:{$data.gps[0].time.m}:{$data.gps[0].time.s}.{$data.gps[0].time.ms}<br>
			point ... ({$data.gps[0].location.lat}, {$data.gps[0].location.lon})<br>
			delta ... {$data.gps[0].delta} m<br>
		</div>
	{/if}
	</div>

	<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
	{#if $data.navigate == undefined}
		<div class="font-bold mx-4 my-2">loading navigate data</div>
	{:else}
		<div class="font-bold mx-4 my-2">navigate data</div>
		<div class="mx-4 my-0.5">
			{#if $data.navigate.isSet == false}
				No navigation data
			{:else}
				destination ... {$data.navigate.destination.point} point, {$data.navigate.destination.angle} angle<br>
				count ... {$data.navigate.count}<br>
			{/if}
		</div>
	{/if}
	</div>

	<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
	{#if $data.haptic == undefined}
		<div class="font-bold mx-4 my-2">loading haptic data</div>
	{:else}
		<div class="font-bold mx-4 my-2">haptic data</div>
		<div class="mx-4 my-0.5">
			{#each $data.haptic as { pow, freq }, i}
				drv {i} ... {pow} pow, {freq} freq<br>
			{/each}
		</div>
	{/if}
	</div>

	{#if $data.config == undefined}
		<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
		<div class="font-bold mx-4 my-2">loading config data</div>
		</div>
	{:else}
		<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
		<div class="font-bold mx-4 my-2">route data</div>
		<div class="mx-4 my-0.5">
			startPoint ... ({$data.config.route.startPoint.location.lat}, {$data.config.route.startPoint.location.lon})<br>
			endPoint ... ({$data.config.route.endPoint.location.lat}, {$data.config.route.endPoint.location.lon})<br>
			distance ... {$data.config.route.dist} m<br>
			{#if $data.config.route.intersections == null}
				intersections ... null<br>
			{:else}
				{#each $data.config.route.intersectionPoint as { location, ways, waysAngle }, i}
					itrsc {i} ... ({location.lat}, {location.lon}) point, {ways} ways, {waysAngle} angles<br>
				{/each}
			{/if}
		</div>
		</div>
		<div class="border-0 mx-6 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
		<div class="font-bold mx-4 my-2">device data</div>
		<div class="mx-4 my-0.5">
			distContd: {$data.config.device.distContd}<br>
			dircContd: {$data.config.device.dircContd}<br>
			distRange: {$data.config.device.distRange}<br>
			signCount: {$data.config.device.signCount}<br>
			signPoint: {$data.config.device.signPoint}<br>
			haptics: {$data.config.device.haptics} ({$data.config.device.hapticsIdx})<br>
		</div>
		</div>
	{/if}
{/if}
</div>