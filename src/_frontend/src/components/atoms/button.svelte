<script lang="ts">
    
</script>

<button><slot>

</slot></button>

<style>
    button {
        background-color: rgb(100, 94, 166);
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border:transparent;
        color: black;
        width: 17rem;
        height: 2rem;
        font-size: 1rem;
        margin: 1rem;
    }
    button:hover, button:active {
        background-color: rgb(161, 157, 205);;
        border: solid 1px rgb(100, 94, 166);
    }
</style>