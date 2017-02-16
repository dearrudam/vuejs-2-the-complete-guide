<template>
    <div>
        <h1>
            <slot name="title"></slot>
        </h1>
        <slot name="content"></slot>
    </div>
</template>

<script>
    export default{
        activated(){
            console.log('Green component was activated!');
        },
        deactivated(){
            console.log('Green component was deactivated!');
        },
        created(){
            console.log('Green component was created!');
        },
        destroyed(){
            console.log('Green component was destroyed!');
        }
    }
</script>

<style scoped>
    div {
        border: 1px solid green;
        background-color: lightgreen;
        padding: 30px;
        margin: 20px auto;
        text-align: center
    }
</style>