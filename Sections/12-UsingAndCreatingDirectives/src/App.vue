<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Built-in Directives</h1>
                <p v-text="'Some Text'"></p>
                <!-- attention: use it with careful, because it's will open a possibility to suffer a cross scripting attack -->
                <p v-html="'<strong>Some strong text</strong>'"></p>
            </div>
            <hr/>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <h1>Custom Directives</h1>
                    <p v-highlight="'red'">Color this</p>
                    <p v-highlight:background="'red'">Color this</p>
                    <p v-highlight:background.delayed="'red'">Color this</p>
                    <p v-local-highlight:background.delayed="'red'">Color this</p>
                    <p v-local-highlight:background.delayed.blink="'red'">Color this</p>
                    <p v-local-highlight:background.delayed.blink="{mainColor:'red',secondColor:'green',delay: 200}">
                        Color this</p>
                </div>
            </div>
        </div>
</template>

<script>
    export default {

        directives: {
            'local-highlight': {

                bind(el, binding, vnode){
                    var param = {
                        mainColor: binding.value,
                        secondColor: 'blue',
                        delay: 1000
                    };

                    if (typeof binding.value == 'object') {
                        param = binding.value;
                    }

                    if (binding.modifiers['blink']) {

                        setTimeout(() => {

                            var mainColor = param.mainColor;
                            var secondColor = param.secondColor;
                            var currentColor = mainColor;

                            setInterval(() => {
                                currentColor == secondColor ? currentColor = mainColor : currentColor = secondColor;
                                if (binding.arg == 'background') {
                                    el.style.backgroundColor = currentColor;
                                } else {
                                    el.style.color = currentColor;
                                }
                            }, param.delay);

                        }, 3000);
                    } else {
                        setTimeout(() => {
                            if (binding.arg == 'background') {
                                el.style.backgroundColor = param.mainColor;
                            } else {
                                el.style.color = param.mainColor;
                            }
                        }, 3000);
                    }
                }
            }
        }
    }
</script>

<style>
</style>
