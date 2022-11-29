<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data, storeFE, storeLI, storeHP } from './data.js'
	import Item from './Item.svelte'
	import Update from './update.svelte'

	$storeLI = [];

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

<div>
	drv 0 ... <input bind:value={ $storeHP[0].pow }><input bind:value={ $storeHP[0].freq }><br>
	drv 1 ... <input bind:value={ $storeHP[1].pow }><input bind:value={ $storeHP[1].freq }><br>
	drv 2 ... <input bind:value={ $storeHP[2].pow }><input bind:value={ $storeHP[2].freq }><br>
	drv 3 ... <input bind:value={ $storeHP[3].pow }><input bind:value={ $storeHP[3].freq }><br>
	drv 4 ... <input bind:value={ $storeHP[4].pow }><input bind:value={ $storeHP[4].freq }><br>
	drv 5 ... <input bind:value={ $storeHP[5].pow }><input bind:value={ $storeHP[5].freq }><br>
</div>

<input bind:value={ count }>

<button on:click={ addList }>Add a list</button>

<div>{ $storeLI }</div>

<button on:click={ removeList }>rmv</button>

<button on:click={ addItem }>Add on item</button>

<ul>
	{#each $storeFE as item}
			<li><svelte:component this={Item} objAttributes={item}/></li>
	{/each}
</ul>

<Update />

<pre>{JSON.stringify($storeFE, undefined, 2)}</pre>

<pre>{JSON.stringify($data, undefined, 2)}</pre>

{#if $data == undefined}
	<p>loading</p>
{:else}
	{#if $data.gps == undefined}
		<p>loading GPS data</p>
	{:else}
		<h1>GPS data</h1>
		<p>date ... {$data.gps[0].date.d}.{$data.gps[0].date.m}.{$data.gps[0].date.y}<br>
			time ... {$data.gps[0].time.h}:{$data.gps[0].time.m}:{$data.gps[0].time.s}.{$data.gps[0].time.ms}<br>
			point ... ({$data.gps[0].location.lat}, {$data.gps[0].location.lon})<br>
		</p>
	{/if}
	{#if $data.navigate == undefined}
		<p>loading navigate data</p>
	{:else}
		<h1>navigate data</h1>
		<p>
			{#if $data.navigate.isSet == false}
				No navigation data
			{:else}
				destination ... {$data.Navigate.destination.point} point, {$data.Navigate.destination.angle} angle<br>
				count ... {$data.Navigate.destination.count}<br>
			{/if}
		</p>
	{/if}
	{#if $data.haptic == undefined}
		<p>loading haptic data</p>
	{:else}
		<h1>haptic data</h1>
		<p>
			{#each $data.haptic as { pow, freq }, i}
				drv {i} ... {pow} pow, {freq} freq<br>
			{/each}
		</p>
	{/if}
	{#if $data.config == undefined}
		<p>loading config data</p>
	{:else}
		<h1>route data</h1>
		<p>startPoint ... ({$data.config.route.startPoint.location.lat}, {$data.config.route.startPoint.location.lon})<br>
			endPoint ... ({$data.config.route.endPoint.location.lat}, {$data.config.route.endPoint.location.lon})<br>
			{#if $data.config.route.intersections == null}
				intersections ... null<br>
			{:else}
				{#each $data.config.route.intersectionPoint as { location, ways, waysAngle }, i}
					itrsc {i} ... ({location.lat}, {location.lon}) point, {ways} ways, {waysAngle} angles<br>
				{/each}
			{/if}
		</p>
		<h1>device data</h1>
		<p>
			distContd: {$data.config.device.distContd}<br>
			dircContd: {$data.config.device.dircContd}<br>
			distRange: {$data.config.device.distRange}<br>
			signCount: {$data.config.device.signCount}<br>
			signPoint: {$data.config.device.signPoint}<br>
			haptics: {$data.config.device.haptics} ({$data.config.device.hapticsIdx})<br>
		</p>
	{/if}
{/if}