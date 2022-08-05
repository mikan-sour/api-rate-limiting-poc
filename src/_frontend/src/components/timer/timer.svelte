<script lang='ts'>
    import { onDestroy } from 'svelte';
    import { timer } from '../../store/timer';

    let dateFirstOut = new Date(parseInt($timer.timeUntilNext))
    let secondsRemaining:number;
    const now = new Date()
        
    $: secondsRemaining = Math.floor((dateFirstOut.getTime() - now.getTime()) / 1000)
    
    $: if(secondsRemaining == 0) {
        $timer.canRequest = true;
    }

    const interval = setInterval(() => secondsRemaining -= 1, 1000);
	onDestroy(() => clearInterval(interval));

</script>

<section class="timer-wrapper">
    <p>{secondsRemaining} seconds remaining</p>
</section>