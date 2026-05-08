<script>
    import { goto } from "$app/navigation";
    import { authState } from "$lib/authStore.svelte";
    import { onMount } from "svelte";

    $effect(()=>{
        // Redirect to dashboard if user is already logged in
        if (authState.user) {
            goto("/dashboard");
        }
    })
</script>

{#if authState.isInitialized && !authState.user}

<div class="h-screen p-6 flex items-center w-5xl mx-auto justify-between">
    
    <div class="w-1/2 flex flex-col gap-4 items-start">
        <h1 class="text-5xl">
            Munsync
        </h1>
        
        <h2>
            Manage MUN conferences and committees with ease.
        </h2>
        <a href="/signup" class="bg-sky-400 hover:bg-sky-600 duration-200 rounded-sm px-4 py-2 cursor-pointer text-black">Get Started</a>

    </div>
    
    
    <div class="">
        <form class="bg-zinc-900 rounded-lg flex flex-col w-100 p-5 pb-6 gap-2">
            <h3 class="text-xl mb-2">Create a Committee</h3>
            <label for="committee-name" class="text-sm">Committee Name:</label>
            <input class="border-b-2 text-xl  border-zinc-600  focus:outline-0 focus:border-sky-400" type="text" id="committee-name" name="committee-name" required>
            <label for="conference-name" class="mt-2 text-sm">Conference Name:</label>
            <input class="border-b-2 text-xl border-zinc-600  focus:outline-0 focus:border-sky-400" type="text" id="conference-name" name="conference-name" required>
            <button class="bg-sky-400 hover:bg-sky-600 duration-200 rounded-sm p-2 cursor-pointer mt-3 text-black" type="submit">Create Committee</button>
        </form>
    </div>
</div>

{/if}