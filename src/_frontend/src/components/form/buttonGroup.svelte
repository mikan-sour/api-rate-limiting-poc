<script lang="ts">
    import { FormType } from '../../types';
    import Button from '../atoms/button.svelte';
    export let formType:FormType
</script>

{#if formType === "login"}
    <Button text="Sign Up"/>
    <Button text="Login"/>
{:else}
    <Button text="Login"/>
    <Button text="Sign Up"/>
{/if}



