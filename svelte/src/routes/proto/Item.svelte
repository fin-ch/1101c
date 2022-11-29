<script>
	import { fade } from 'svelte/transition';
	import { storeFE } from './data.js';
	export let objAttributes = {};
	
	function removeComponent() {
		$storeFE = $storeFE.filter(function(value, index, arr){ 
			if (value.id != objAttributes.id) return value;
		});
		console.log($storeFE);
	}
</script>
<div>
	<span class="text-bold">{objAttributes.id}</span> {objAttributes.ways} {objAttributes.wayAngle}
	<button class="py-0.5 px-2 rounded-lg shadow-md text-white bg-red-500" on:click={removeComponent}>x</button>
</div>