<script lang="ts">
    import { onMount } from 'svelte';

    import AppHeader from "../components/header/appHeader.svelte";
    import MainLayout from "../layout/mainLayout.svelte";
    import Timer from '../components/timer/timer.svelte';
    import { auth } from '../store/auth';
    import { timer } from '../store/timer';
    import { getTimeRightNow } from '../services/timer';
    import Button from "../components/atoms/button.svelte";
    import { getErrorMessage } from "../../../utils";

    $: if(!$auth.token) {
        $auth.username = "";
        window.location.href = "#/login/"
    }

    let errMsg:string = "";

    const handleDataFetch =  async () => {
        try {
            const result = await getTimeRightNow($auth.token);
            if(result.isSuccess) {
                const { timeRightNow, remainingRequest } = result._value
                if(!timeRightNow) throw new Error ("timeRightNow came back undefined but request was success...")
                $timer.timeRightNow = new Date(timeRightNow).toLocaleTimeString();
                $timer.remainingRequest = remainingRequest;
            } else if(result.isFailure) {
                $timer.canRequest = false;
                const { timeUntilNext } = result._value
                if(!timeUntilNext) throw new Error ("timeUntilNext came back undefined but request was failure...")
                $timer.timeUntilNext = timeUntilNext;
            }
        } catch (error) {
            console.error("Error in handleDataFetch: ", error);
            errMsg = getErrorMessage(error);
        }
    }

    onMount(async () => await handleDataFetch());

</script>

<MainLayout>
    <AppHeader/>
    {#if $timer.canRequest}
        {#if errMsg}
            <p class="errMsg">...{errMsg}</p>
        {:else if $timer.remainingRequest > 0}
            <section class="cache-data-container">
                <div class="cache-data">
                    <p>Time right now: {$timer.timeRightNow}</p>
                    <p>You have {$timer.remainingRequest} remaining requests</p>
                </div>
                <div class="get-button">
                    <Button variant='big' 
                        on:click={handleDataFetch}>
                        Get the time right now
                    </Button>
                </div>
            </section>
        {:else}
            <section class="cache-data-container">
                <div class="get-button">
                    <Button variant='big' 
                        on:click={handleDataFetch}>
                        Get the time right now
                    </Button>
                </div>
            </section>
        {/if}
    {:else}
         <Timer/>
    {/if}
</MainLayout>

<style>
    .cache-data-container {
        position: relative;
        height: 10rem;

    }

    .cache-data {
        top: 0;left:0;right:0;
        margin: auto;
        text-align: center;
    }

    .get-button {
        position: absolute;
        bottom: 0;left:0;right:0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
