<script>
	// Made by Kevmodrome (twitter.com/kevmodrome)
	// Party on 🥳
	
	import { data } from './data.js'
	import Update from './update.svelte'
	
</script>

<Update />

<pre>{JSON.stringify($data, undefined, 2)}</pre>

<pre>{$data}</pre>