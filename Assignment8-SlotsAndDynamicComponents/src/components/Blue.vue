<template>
    <div>
        <h1><slot name="content"></slot></h1>
        <h3><slot name="title"></slot></h3>
    </div>
</template>

<script>
    export default{
        activated(){
            console.log('Blue component was activated!');
        },
        deactivated(){
            console.log('Blue component was deactivated!');
        },
        created(){
            console.log('Blue component was created!');
        },
        destroyed(){
            console.log('Blue component was destroyed!');
        }
    }
</script>

<style scoped>
    div {
        border: 1px solid blue;
        background-color: lightblue;
        padding: 30px;
        margin: 20px auto;
        text-align: center
    }
</style>