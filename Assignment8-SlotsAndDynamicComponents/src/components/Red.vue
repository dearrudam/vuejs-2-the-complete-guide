<template>
    <div>
        <h1><slot name="title"></slot></h1>
        <h4><slot name="content"></slot></h4>
    </div>
</template>

<script>
    export default{
        activated(){
            console.log('Red component was activated!');
        },
        deactivated(){
            console.log('Red component was deactivated!');
        },
        created(){
            console.log('Red component was created!');
        },
        destroyed(){
            console.log('Red component was destroyed!');
        }
    }
</script>

<style scoped>
    div {
        border: 1px solid red;
        background-color: lightcoral;
        padding: 30px;
        margin: 20px auto;
        text-align: center
    }
</style>