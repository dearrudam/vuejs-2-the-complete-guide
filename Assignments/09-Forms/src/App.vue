<template>
    <div class="container">

        <form v-if="!isSubmitted">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

                    <!-- Exercise 1 -->
                    <!-- Create a Signup Form where you retrieve the following Information -->
                    <!-- Full Name (First Name + Last Name) -->
                    <!-- Mail -->
                    <!-- Password -->
                    <!-- Store Data? Yes/No -->

                    <!-- Exercise 3 -->
                    <!-- Edit the Example from above and create a custom "Full Name" Control -->
                    <!-- which still holds the First Name and Last Name Input Field -->
                    <app-fullname v-model="fullName"></app-fullname>
                    <div class="form-group">
                        <label for="mail">Mail:</label>
                        <input
                                type="text"
                                id="mail"
                                class="form-control"
                                v-model="mail">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input
                                type="password"
                                id="password"
                                class="form-control"
                                v-model="password">
                    </div>
                    <div class="form-group">
                        <label>
                            <input
                                    type="radio"
                                    id="shouldStoreData"
                                    value="Yes"
                                    v-model="storeData"> Yes, store this data
                            <input
                                    type="radio"
                                    id="dontStoreData"
                                    value="No"
                                    v-model="storeData"> No, don't store this data
                        </label>
                    </div>


                </div>
            </div>
            <!-- Exercise 2 -->
            <!-- Only display the Form if it has NOT been submitted -->
            <!-- Display the Data Summary ONCE the Form HAS been submitted -->
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button
                        class="btn btn-primary"
                        @click.prevent="submitted">Submit!
                </button>
            </div>
        </form>
        <hr>
        <div class="row" v-if="isSubmitted">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{ fullName }}</p>
                        <p>Mail: {{ mail }}</p>
                        <p>Password: {{ password }}</p>
                        <p>Store in Database?: {{ storeData }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FullName from './FullName.vue';

    export default {
        data(){
            return {
                fullName: 'Maximillian Arruda',
                mail: '',
                password: '',
                storeData: 'Yes',
                isSubmitted: false
            };
        },
        methods: {
            submitted(){
                this.isSubmitted = true;
            }
        },
        components: {
            appFullname: FullName
        }
    }
</script>

<style>
</style>
