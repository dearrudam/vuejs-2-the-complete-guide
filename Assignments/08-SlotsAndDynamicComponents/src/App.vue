<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <br>
                <p>Title : <input type="text" v-model="title"/></p>
                <p>Text : <input type="text" v-model="text"/></p>
                <hr>
                <button class="btn btn-primary" @click="selectedComponent='appBlue'">Load Blue Template</button>
                <button class="btn btn-success" @click="selectedComponent='appGreen'">Load Green Template</button>
                <button class="btn btn-danger" @click="selectedComponent='appRed'">Load Red Template</button>
                <hr>
                <keep-alive>
                    <component :is="selectedComponent">
                        <span slot="title">{{ title }}</span>
                        <span slot="content">{{ text }}</span>
                    </component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import Blue from './components/Blue.vue';
    import Green from './components/Green.vue';
    import Red from './components/Red.vue';

    export default {
        data: function () {
            return {
                selectedComponent: 'appBlue',
                title: 'Assignment 8',
                text: 'Slots and Dynamic Components'
            }
        },
        components: {
            appBlue: Blue,
            appGreen: Green,
            appRed: Red
        }
    }
</script>

<style>

</style>
