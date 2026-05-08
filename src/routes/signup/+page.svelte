<script lang="ts">
    import { goto } from "$app/navigation";
    import GoogleSignIn from "$lib/components/GoogleSignIn.svelte";
    import { auth } from "$lib/firebase";
    import { createUserWithEmailAndPassword } from "firebase/auth";

    async function handleSignUp(e: Event) {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match.";
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            goto("/dashboard");
        } catch (err: any) {
            errorMessage = err.message;
        }

    }

    let email = $state("");
    let password = $state("");
    let confirmPassword = $state("");
    let errorMessage = $state("");
</script>

<div class="flex items-center justify-center h-screen">
    <form action="" class="w-73 flex flex-col gap-4  items-center" onsubmit={handleSignUp}>
        <h1 class="text-xl text-sky-400 font-semibold"><a href="/">Munsync</a></h1>

        <GoogleSignIn/>

        <div class="w-full h-px bg-zinc-300 my-1">
            <span class="text-sm absolute left-1/2 -translate-1/2 bg-zinc-950 text-zinc-300 px-2">OR</span>
        </div>

        <input bind:value={email} name="email" type="email" placeholder="Email" class="text-sm w-full p-2.5 rounded-md border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-sky-400 "/>
        <input bind:value={password} name="password" type="password" placeholder="Password" class="text-sm w-full p-2.5 rounded-md border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-sky-400 "/>
        <input bind:value={confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" class="text-sm w-full p-2.5 rounded-md border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-sky-400"/>

        <button class="font-medium bg-sky-600 w-full p-2.5 hover:bg-sky-700 text-sm rounded-md cursor-pointer">Sign Up</button>

        <div class="text-center">
            <div class="text-sm text-zinc-400 font-medium">Already have an account? <a href="/login" class="text-zinc-200 hover:underline cursor-pointer">Log in</a></div>
            <div class="text-md text-red-500 font-semibold min-h-5">{errorMessage}</div>

        </div>
    </form>
</div>

