<script lang="ts">
    import { getErrorMessage } from "../../../../utils";
    import { loginService, signupService } from "../../services/auth";
    import { auth } from '../../store/auth';
    import { user } from '../../store/form';
    import { FormType } from "../../types";
    import InputFormView from "./inputFormView.svelte";

    export let formType:FormType

    let errorMsg:string;
    
    $: if($auth.token) {
        $auth.username = $user.username;
        window.location.href = "#/what-time/"
    }

    async function handleSubmit(e:Event) {
        e.preventDefault();
        try {
            if(formType === "login") {
                $auth.token = await loginService(
                    $user.username,
                    $user.password
                );
            } else {
                $auth.token = await signupService(
                    $user.username,
                    $user.password
                );
            }
        } catch (error) {
            errorMsg = getErrorMessage(error);
            console.error("Your error sir:", errorMsg);

        }
    }
</script>


<InputFormView {handleSubmit} {formType} {errorMsg}/>

