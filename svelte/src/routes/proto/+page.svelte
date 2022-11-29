<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data, storeFE, storeLI, storeHP, data } from './data.js'
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
{:else}
	<div>{$data.config.route.startPoint.location.lat}</div>
{/if}