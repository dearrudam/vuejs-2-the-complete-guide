<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{ invalid: $v.email.$error }">
          <label for="email">Mail</label>
          <input
            type="email"
            id="email"
            @blur="$v.email.$touch()"
            v-model="email"
          />
          <p v-if="!$v.email.required">Email address is required</p>
          <p v-if="!$v.email.email">Please provide a valid email address</p>
        </div>
        <div class="input" :class="{ invalid: $v.age.$error }">
          <label for="age">Your Age</label>
          <input
            type="number"
            id="age"
            @blur="$v.age.$touch()"
            v-model.number="age"
          />
          <p v-if="!$v.age.required">Age is required</p>
          <p v-if="!$v.age.numeric">Age must be a numeric value</p>
          <p v-if="!$v.age.minValue">
            You have to be at least {{ $v.age.$params.minValue.min }} years old.
          </p>
        </div>
        <div class="input" :class="{ invalid: $v.password.$error }">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            @blur="$v.password.$touch()"
            v-model="password"
          />
          <p v-if="!$v.password.required">Password is required</p>
          <p v-if="!$v.password.minLength">
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters.
          </p>
        </div>
        <div class="input" :class="{ invalid: $v.confirmPassword.$error }">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            @blur="$v.confirmPassword.$touch()"
            v-model="confirmPassword"
          />
          <p v-if="!$v.confirmPassword.sameAsPassword">
            Passwords doesn't match.
          </p>
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
              class="input"
              v-for="(hobbyInput, index) in hobbyInputs"
              :class="{ invalid: $v.hobbyInputs.$each[index].value.$error }"
              :key="hobbyInput.id"
            >
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                type="text"
                :id="hobbyInput.id"
                @blur="$v.hobbyInputs.$each[index].value.$touch()"
                v-model="hobbyInput.value"
              />
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">
                X
              </button>
              <p v-if="!$v.hobbyInputs.$each[index].value.minLength">
                Hobbie must have at least {{ $v.hobbyInputs.$each[index].value.$params.minLength.min }} letters
              </p>
              <p v-if="!$v.hobbyInputs.$each[index].value.required">
                Please provide a valid hobbie
              </p>
            </div>
            <p v-if="!$v.hobbyInputs.minLength">
              You have to specify at least
              {{ $v.hobbyInputs.$params.minLength.min }} hobbie(s)
            </p>

            <p v-if="!$v.hobbyInputs.required">Please add hobbies.</p>
          </div>
        </div>
        <div class="input inline" :class="{ invalid: $v.terms.$invalid }">
          <input
            type="checkbox"
            id="terms"
            @change="$v.terms.$touch()"
            v-model="terms"
          />
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required,
  requiredIf,
  email,
  numeric,
  minValue,
  minLength,
  sameAs
} from "vuelidate/lib/validators";

import axios from "./../../axios-auth";

export default {
  data() {
    return {
      email: "",
      age: null,
      password: "",
      confirmPassword: "",
      country: "usa",
      hobbyInputs: [],
      terms: null
    };
  },
  computed: {
    isTermsOptional() {
      return this.country === "germany";
    }
  },
  validations: {
    email: {
      required,
      email,
      unique: val => {
        return val !== 'dearrudam@gmail.com';
      }
    },
    age: {
      required,
      numeric,
      minValue: minValue(18)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      // sameAsPassword: sameAs("password")
      sameAsPassword: sameAs(vm => vm.password) // in case of to use multiple fields
    },
    terms: {
      required: requiredIf(vm => {
        return vm.isTermsOptional ? false : true;
      }),
      sameAs: sameAs(vm => {
        return vm.isTermsOptional ? vm.terms : true;
      })
    },
    hobbyInputs: {
      required,
      minLength: minLength(2),
      $each: {
        value: {
          required,
          minLength: minLength(5)
        }
      }
    }
  },
  methods: {
    onAddHobby() {
      const newHobby = {
        id: Math.random() * Math.random() * 1000,
        value: ""
      };
      this.hobbyInputs.push(newHobby);
    },
    onDeleteHobby(id) {
      this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id);
    },
    onSubmit() {
      const formData = {
        email: this.email,
        age: this.age,
        password: this.password,
        confirmPassword: this.confirmPassword,
        country: this.country,
        hobbies: this.hobbyInputs.map(hobby => hobby.value),
        terms: this.terms
      };
      console.log(formData);
      this.$store.dispatch("signup", formData);
    }
  }
};
</script>

<style scoped>
.signup-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.input.invalid label {
  color: red;
}

.input.invalid input {
  background-color: lightgoldenrodyellow;
  border: 1px solid red;
}

.input p {
  color: red;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
}

.hobby-list p {
  color: red;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>