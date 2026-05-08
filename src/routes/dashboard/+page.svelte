<script lang="ts">
    import { goto } from "$app/navigation";
    import { authState } from "$lib/authStore.svelte";
    import { auth } from "$lib/firebase";
    import { signOut } from "firebase/auth";
    import { fly, fade } from "svelte/transition";
    import defaultAvatar from '$lib/assets/default-avatar.png';

    $effect(() => {
        // Only redirect if Firebase has finished checking and found NO user
        if (authState.isInitialized && !authState.user) {
            goto("/login"); 
        }
    });

    $effect(() => {
        if (!userMenuOpen) return;

        const handleClickOutside = (event: any) => {
            // If the menu is open and the click is NOT inside the menuContainer
            if (menuContainer && !menuContainer.contains(event.target)) {
                userMenuOpen = false;
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    });

    async function handleLogout() {
        try {
            await signOut(auth);
            // The authState store will update automatically via onAuthStateChanged
        } catch (error) {
            console.error("Logout failed:", error);
        }
        
    }

    let userMenuOpen = $state(false);
    let menuContainer: HTMLDivElement|null = $state(null); // Reference for the menu
</script>
<div class="h-screen">
    <header class="p-3 flex items-center justify-between">
        
        <div class="flex items-center gap-1">
            <svg width="30" height="30" fill="#ffffff" viewBox="0 -8 72 72" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>gavel</title><path d="M59,27.27l-10,10a3.66,3.66,0,0,1-5.18-.07,3.7,3.7,0,0,1-.56-4.56l-4.4-4.4-3.57,3.58A3.84,3.84,0,0,1,34.17,35L18.61,50.54a3.87,3.87,0,0,1-5.48-5.48L28.68,29.52a3.91,3.91,0,0,1,4.23-.85l3.18-3.18-4.4-4.4a3.72,3.72,0,0,1-4.63-5.74l10-10A3.72,3.72,0,0,1,42.79,10L54.33,21.54A3.72,3.72,0,0,1,59,27.27Z"></path></g></svg>
            <span>Dashboard</span>
        </div>
        

       {#if authState.user} 
        <div class="flex items-center gap-4">            
            <div class="relative" bind:this={menuContainer}>
                <button class="block cursor-pointer" onclick={() => userMenuOpen = !userMenuOpen}>
                    <img referrerpolicy="no-referrer" src={authState.user.photoURL} alt="User Avatar" class="w-8 h-8 rounded-full">
                </button>
                
                {#if userMenuOpen}
                <div in:fly={{ y: -10, duration: 200 }} class="absolute min-w-50 w-max   bg-zinc-950 border border-zinc-700 rounded-xl top-full right-0">
                    <div class="flex gap-3 p-3">
                        <img referrerpolicy="no-referrer" src={authState.user.photoURL} alt="User Avatar" class="w-9 h-9 rounded-full">
    
                        <div class="">
                            <div class="font-semibold text-sm text-zinc-300">{authState.user.displayName}</div>
                            <div class="text-xs text-zinc-300">{authState.user.email}</div>
                        </div>
                    </div>
    
                    <div class="w-full h-px bg-zinc-700"></div>
    
                    <button class="flex gap-2 p-3 items-center cursor-pointer hover:bg-zinc-900 duration-200 w-full rounded-b-xl" onclick={handleLogout}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z" fill="#d9d9d9"></path> <path d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z" fill="#d9d9d9"></path> <path d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z" fill="#d9d9d9"></path> </g></svg>
                        <span class="text-sm text-zinc-300">Sign out</span>
                    </button>
                </div>
                {/if}
            </div>
        </div>
        {/if}
    </header>
   <div class="w-full h-px bg-zinc-700"></div> 
    
</div>