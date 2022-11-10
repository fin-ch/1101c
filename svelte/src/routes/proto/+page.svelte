<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data, storeFE, storeLI } from './data.js'
	import Item from './Item.svelte'
	import Update from './update.svelte'

	$storeLI = [];

	$storeFE = [{id:0, ways:1, wayAngle:[90]}];

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

<pre>{$data}</pre>