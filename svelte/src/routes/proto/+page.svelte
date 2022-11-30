<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data, storeFE, storeLI, storeHP } from './data.js'
	import Item from './Item.svelte'
	import Display from './display.svelte'

	$storeLI = [];

	let drv_lst = [0, 1, 2, 3, 4, 5];

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

	function changeDrv(idx, type, val) {
		$storeHP[idx][type] = val;
	}
	
</script>

<div class="font-mono text-xs flex flex-col">

<Display/>

<div class="font-mono text-xs grid grid-cols-1 justify-center">

<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
	<div class="font-bold mx-2 my-2">ctrl haptic manually</div>

	{#each drv_lst as i}
		<div class="mx-2 my-0.5">drv {i} ...
		pow:<input class="mx-2 my-2 py-0.5 w-24 border-0 rounded-lg bg-white shadow-md text-center" bind:value={ $storeHP[i].pow }>
		<button on:click={ changeDrv(i, "pow", 1) }>1</button>
		freq:<input class="mx-2 my-2 py-0.5 w-24 border-0 rounded-lg bg-white shadow-md text-center" bind:value={ $storeHP[i].freq }></div>
	{/each}
	<div class="mx-2 my-0.5">
		<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ async () => {const res = await fetch(`http://54.180.122.164:3000/updatedb/testhaptic/`, {method: 'POST', body:JSON.stringify($storeHP), headers:{'Content-Type': 'application/json'}});} }>test</button>
	</div>
</div>

<div class="border-0 mx-2 my-2 rounded-xl grid grid-cols-1 justify-items-center bg-slate-100">
	<div class="font-bold mx-2 my-2">adjust intersection and angle</div>
	<div class="mx-2 my-0.5">
		<input class="mx-2 my-2 py-0.5 w-36 border-0 rounded-lg bg-white shadow-md text-center" bind:value={ count }>
		<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ addList }>Add a list</button>
	</div>
	{#if $storeLI.length == 0}
		<div class="mx-2 my-0.5">nothing in tmp</div>
	{:else}
		<div class="mx-2 my-0.5">{ $storeLI }</div>
	{/if}
	<div class="mx-2 my-0.5">
		<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ removeList }>rmv</button>
		<button class="mx-2 my-2 py-0.5 px-4 w-36 rounded-lg shadow-md text-white bg-blue-500" on:click={ addItem }>Add on item</button>
	</div>
	<div class="mx-2 my-0.5">
		{#each $storeFE as item}
			<div class="mx-2 my-2 py-0.5 w-72 text-left"><svelte:component this={Item} objAttributes={item}/></div>
		{/each}
	</div>
</div>

</div>

</div>