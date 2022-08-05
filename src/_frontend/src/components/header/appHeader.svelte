<script lang='ts'>
    import Button from "../atoms/button.svelte";
    import { auth } from '../../store/auth';

    function handleLogout(){
        $auth.username = "";
        $auth.token = "";
    }

</script>

<nav>
    <p>{$auth.username} | </p> 
    <Button variant='small' on:click={handleLogout}>
        Logout
    </Button>
</nav>

<style>
    p {
        font-size: 1.25rem;
    }
    nav {
        width:100%;
        position:absolute;
        top:0;
        height: 75px;
        display: flex;
        align-items:center;
        justify-content:flex-end
    }
</style>