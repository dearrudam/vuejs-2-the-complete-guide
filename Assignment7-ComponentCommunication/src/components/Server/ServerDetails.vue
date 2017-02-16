<template>
    <div class="col-xs-12 col-sm-6">
        <p v-if="!server">Please select a Server</p>
        <p v-else>Server #{{ server.id }} selected, Status:{{server.status}}</p>
        <hr/>
        <button v-if="server" @click="resetStatus">Change to Normal</button>
    </div>

</template>

<script>
    import {serverBus} from '../../main'
    export default{
        data: function () {
            return {
                server: null
            }
        },
        methods: {
            resetStatus(){
                this.server.status = 'Normal';
            }
        },
        created(){
            var vm = this;
            serverBus.$on('serverWasSelected', (server) => {
                vm.server = server;
            });
        }
    }
</script>

<style>

</style>
