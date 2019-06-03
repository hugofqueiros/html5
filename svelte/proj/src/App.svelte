<script>
    let name = 'Hugo';
    export let age = 20;

    $: uppercaseName = name.toUpperCase();
    $: console.log(name);
    $: if (name === 'Whatever') {
        age = 40;
    }

    function incrementAge() {
        age += 1;
    }

    function changeName() {
        name = 'Whatever'
    }

    function nameInput(e) {
        const value = e.target.value;
        name = value;
    }
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {uppercaseName}, my age is {age}!</h1>
<button on:click={incrementAge}>Change Age</button>
<button on:click={changeName}>Change Name</button>
<input type="text" value={name} on:input={nameInput}>
<input type="text" bind:value={name}>
