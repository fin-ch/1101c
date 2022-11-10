<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data, storeFE, idIncrement } from './data.js'
	import Item from './Item.svelte'
	import Update from './update.svelte'

	$storeFE = [{id:0, ways:1, wayAngle:[90]}];

	idIncrement.set(1);

	function addItem() {
		var l = $storeFE.length;
		$storeFE[l] = {id:$idIncrement, ways:1, wayAngle:[90]};
		console.log($storeFE);
		$idIncrement++;
	}
	
</script>

<button on:click={ addItem }>Add on item</button>

<ul>
	{#each $storeFE as item}
			<li><svelte:component this={Item} objAttributes={item}/></li>
	{/each}
</ul>

<Update />

<pre>{JSON.stringify($data, undefined, 2)}</pre>

<pre>{$data}</pre>