<template>
  <AppPage title="New user" :sub-title="{name: 'Users', path: '/users'}">
    <div class="row">
      <div class="col-6">
        <form class="card border mb-4" @submit.prevent>
          <div class="card-body">
            <div class="row mb-3">
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model.trim="user.email"
                  :class="{ 'is-invalid': $v.user.email.$error, 'is-valid': !$v.user.email.$invalid }"
                  type="text"
                  class="form-control"
                  @blur="$v.user.email.$touch"
                >
                <div v-if="$v.user.email.$error" class="invalid-feedback">{{ msgEmail }}</div>
              </div>
              <div class="mb-4">
                <label for="name" class="form-label">Name</label>
                <input
                  id="name"
                  v-model.trim="user.name"
                  :class="{ 'is-invalid': $v.user.name.$error, 'is-valid': !$v.user.name.$invalid }"
                  type="text"
                  class="form-control"
                  @blur="$v.user.name.$touch"
                >
                <div v-if="$v.user.name.$error" class="invalid-feedback">{{ msgName }}</div>
              </div>
              <div class="mb-4">
                <label for="role" class="form-label">Role</label>
                <select
                  id="role"
                  v-model="user.role"
                  name="role"
                  class="form-control"
                  :class="{ 'is-invalid': $v.user.role.$error, 'is-valid': !$v.user.role.$invalid }"
                  @change="$v.user.role.$touch"
                >
                  <option value="0">Member</option>
                  <option value="1">Librarian</option>
                </select>
                <div v-if="$v.user.role.$error" class="invalid-feedback">{{ msgRole }}</div>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button v-if="false" class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                <span>Loading...</span>
              </button>
              <button v-else class="btn btn-primary" @click="addUser">
                <i class="bi bi-plus-lg" />
                Add book
              </button>
              <button class="btn btn-outline-secondary" @click="reset">
                <i class="bi bi-arrow-counterclockwise" />
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
</AppPage>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: "create", //eslint-disable-line
  data () {
    return {
      user: {
        email: '',
        name: '',
        role: 0
      }
    }
  },
  validations: {
    user: {
      email: { required, email },
      name: { required, minLength: minLength(5), maxLength: maxLength(250) },
      role: { required }
    }
  },
  computed: {
    msgEmail () {
      let message = '';
      if (!this.$v.user.email.required) {
        message = 'The field Email is required'
      }
      if (!this.$v.user.email.email) {
        message = 'The input must be valid email'
      }
      return message;
    },
    msgName () {
      let message = '';
      if (!this.$v.user.name.required) {
        message = 'The field name is required'
      }
      if (!this.$v.user.name.minLength) {
        message = 'The field must have min 5 symbols'
      }
      if (!this.$v.user.name.maxLength) {
        message = 'The field must be max 250 symbols'
      }
      return message;
    },
    msgRole () {
      let message = '';
      if (!this.$v.user.role.required) {
        message = 'The field Role is required'
      }
      return message;
    }
  },
  methods: {
    addUser () {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$store.dispatch('users/addUser', this.user)
      }
    },
    reset () {
      this.user.email = ''
      this.user.name = ''
      this.user.role = 0
      this.$v.$reset();
    }
  }
}
</script>

<style>
</style>
