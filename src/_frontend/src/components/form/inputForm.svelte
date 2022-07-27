<script lang="ts">
    import { FormType } from "../../types";
    import Button from "../atoms/button.svelte";
    import { signupService } from "../../services";
    import { user } from '../../store/form';
    import { auth } from '../../store/auth';

    export let formType:FormType = "login";
    
    $: if($auth.token) {
        $auth.username = $user.username;
        window.location.href = "#/what-time/"
    }
    
    async function handleSubmit(e:Event) {
        e.preventDefault();
        try {
            if(formType === "login") {
                console.log("will do login function");
            } else {
                $auth.token = await signupService(
                    $user.username,
                    $user.password
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

</script>

<section class="login-card">
    <form on:submit={handleSubmit} >
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
                <Button>Login</Button>
                <a href="#/signup">Click here to sign up</a>
            {:else}
                <Button>Sign up</Button>
                <a href="#/login">Click here to login</a>
            {/if}
        </section>
    </form>
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

</style>