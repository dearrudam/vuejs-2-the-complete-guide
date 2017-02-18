<template>
    <div>
        <div class="form-group">
            <label for="firstName">First Name:</label>
            <input
                    type="text"
                    id="firstName"
                    class="form-control"
                    :value="firstName"
                    @input="nameChanged(true,$event)"
            />
        </div>
        <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
                    type="text"
                    id="lastName"
                    class="form-control"
                    :value="lastName"
                    @input="nameChanged(false,$event)"
            />
        </div>
    </div>
</template>

<script>
    export default {
        props: ['value'],
        computed: {
            firstName(){
                return this.value.split(' ')[0];
            },
            lastName(){
                var names = this.value.split(' ');
                var lastName = '';
                for (var i = 1; i < names.length; i++) {
                    if (lastName != '') {
                        lastName += ' ' + names[i];
                    } else {
                        lastName += names[i];
                    }
                }
                return lastName;
            }
        },
        methods: {
            nameChanged(isFirst, event){
                var name = '';
                if (isFirst) {
                    name = event.target.value + ' ' + this.lastName;
                } else {
                    name = this.firstName + ' ' + event.target.value;
                }
                this.value = name;
                this.$emit('input', name);
            }
        }
    }
</script>