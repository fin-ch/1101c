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
<li transition:fade>
	{objAttributes.id} {objAttributes.ways} {objAttributes.wayAngle}
	<button on:click={removeComponent}>x</button>
</li>