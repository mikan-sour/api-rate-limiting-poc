import Login from '../pages/login.svelte';
import Signup from '../pages/signup.svelte';
import FourOhFour from '../pages/fourOhFour.svelte'
import WhatTime from '../pages/whatTime.svelte';

// console.log(location.pathname);
// if(location.pathname === "/") {
//     // location.replace("/login")
// }

export default {
    '/login': Login,
    '/signup/': Signup,
    '/what-time/':WhatTime,
    // Catch-all
    '*': FourOhFour,
}