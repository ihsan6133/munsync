<script>
    import GoogleSignIn from "$lib/components/GoogleSignIn.svelte";

</script>
<div class="flex items-center justify-center h-screen">
    <form action="" class="w-73 flex flex-col gap-4  items-center">
        <h1 class="text-xl text-sky-400 font-semibold"><a href="/">Munsync</a></h1>
        
        <GoogleSignIn/>

        <div class="w-full h-px bg-zinc-300 my-1">
            <span class="text-sm absolute left-1/2 -translate-1/2 bg-zinc-950 text-zinc-300 px-2">OR</span>
        </div>

        <input type="email" placeholder="Email" class="text-sm w-full p-2.5 rounded-md border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-sky-400 "/>
        <input type="password" placeholder="Password" class="text-sm w-full p-2.5 rounded-md border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:border-sky-400 "/>

        <button class="font-medium bg-sky-600 w-full p-2.5 hover:bg-sky-700 text-sm rounded-md cursor-pointer">Log In</button>

        <div class="text-sm text-zinc-400 font-medium">Don't have an account? <a href="/signup" class="text-zinc-200 hover:underline cursor-pointer">Sign up</a></div>
    </form>
</div>

