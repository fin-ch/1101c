<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data, storeFE, storeLI, idIncrement } from './data.js'
	import Item from './Item.svelte'
	import Update from './update.svelte'

	$storeLI = [];

	$storeFE = [{id:0, ways:1, wayAngle:[90]}];

	let count = 0;

	idIncrement.set(1);

	function addList() {
		var l = 0;
		if($storeLI != undefined) l = $storeLI.length;
		$storeLI[l] = count;
		console.log($storeLI);
	}

	function addItem() {
		var l = $storeFE.length;
		$storeFE[l] = {id:$idIncrement, ways:$storeLI.length, wayAngle:$storeLI};
		console.log($storeFE);
		$idIncrement++;
	}
	
</script>

<input bind:value={ count }>

<button on:click={ addList }>Add a list</button>

<div>{ $storeLI }</div>

<button on:click={ addItem }>Add on item</button>

<ul>
	{#each $storeFE as item}
			<li><svelte:component this={Item} objAttributes={item}/></li>
	{/each}
</ul>

<Update />

<pre>{JSON.stringify($data, undefined, 2)}</pre>

<pre>{$data}</pre>