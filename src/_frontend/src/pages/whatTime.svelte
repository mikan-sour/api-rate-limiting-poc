<script>
    import MainLayout from "../layout/mainLayout.svelte";
    import { auth } from '../store/auth';
</script>

<MainLayout>
    <h1>time + {$auth.token} </h1>
</MainLayout>