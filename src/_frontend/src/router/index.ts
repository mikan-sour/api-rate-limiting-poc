import Login from '../pages/login.svelte';
import Signup from '../pages/signup.svelte';
import FourOhFour from '../pages/fourOhFour.svelte'

// console.log(location.pathname);
// if(location.pathname === "/") {
//     // location.replace("/login")
// }

export default {
    '/login': Login,
    '/signup/': Signup,

    // Catch-all
    '*': FourOhFour,
}