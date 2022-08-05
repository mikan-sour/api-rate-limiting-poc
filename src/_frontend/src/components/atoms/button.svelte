<script lang="ts">
    export let variant:'big'|'small'
</script>

{#if variant === "big"}
    <button class="big" on:click><slot>

    </slot></button>
{:else}
    <button class="small" on:click><slot>

    </slot></button>
{/if}



<style>
    button {
        background-color: rgb(100, 94, 166);
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border:transparent;
        color: #FFF;
        height: 2rem;
        font-size: 1rem;
        margin: 1rem;
    }
    button:hover, button:active {
        background-color: rgb(161, 157, 205);;
        border: solid 1px rgb(100, 94, 166);
    }

    .big {
        width: 17rem;
    }

    .small {
        width: 7rem;
    }
</style>