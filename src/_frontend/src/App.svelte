<script>
    import Router from 'svelte-spa-router';
    import routes from './router';
</script>

<main>
    <Router {routes}/>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');
	main {
        background-color: rgb(195, 94, 220);
        font-family: 'Roboto Mono', monospace;
        position: absolute; top:0;left:0;bottom: 0;right: 0;
        padding: 1rem 2rem;
    }
</style>