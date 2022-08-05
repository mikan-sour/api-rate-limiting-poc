<script lang="ts">
    import { FormType } from "../../types";
    import Button from "../atoms/button.svelte";
    import { user } from '../../store/form';

    export let formType:FormType = "login";
    export let handleSubmit:(e:Event)=>void
    export let errorMsg:string = "";

</script>

<section class="login-card">
    <form on:submit={handleSubmit} >
        <h1 class="form-title">What-Time-Is-It-Dot-Com</h1>
        {#if formType === "login"}
            <h1>Login</h1>
        {:else}
            <h1>Sign Up</h1>
        {/if}
        <div class="login-labelgroup">
            <label for='login-username'>Username</label><br/>
            <input type="text" id='login-username' bind:value={$user.username}><br/>
        </div>
        <div class="login-labelgroup">
            <label for='login-password'>Password</label><br/>
            <input type="password" id='login-password' bind:value={$user.password}>
        </div>
        <section class="buttons-group">
            {#if formType === "login"}
                <Button variant="big">Login</Button>
                <a href="#/signup">Click here to sign up</a>
            {:else}
                <Button variant="big">Sign up</Button>
                <a href="#/login">Click here to login</a>
            {/if}
        </section>
    </form>
    {#if errorMsg}
         <p class="errMsg">Error occurred: {errorMsg}</p>
    {/if}
</section>

<style>
    .login-card {
        height: 450px;
        width:300px;
        background-color: azure;
        border-radius: 4px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        padding:1rem;
        display: flex;
        align-items: center;
    }

    form {
        width: 100%;
        height: 100%;
    }

    .form-title {
        align-self: center;
        font-size: 1.35rem;
        margin-bottom: 1rem;
    }

    .login-labelgroup {
        width: fit-content;
        margin: 1rem 0;
    }

    label {
        margin-bottom:.5rem;
    }

    input {
        width: 280px;
        height: 1rem;
        border-radius: 4px;
        padding: .25rem;
        border: solid 1px #777;
        box-shadow: var(--primary-box-shadow);
    }

    input:active {
        border: rgb(195, 94, 220);
    }

    .buttons-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    } 

    .buttons-group > a {
        color: rgb(195, 94, 220);
    }

    .errMsg {
        color:red;
    }

</style>