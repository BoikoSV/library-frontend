<template>
  <form class="card border mb-4" @submit.prevent>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col">
          <label for="created-from" class="form-label">Created at - from</label>
          <input id="created-from" v-model.trim="filter.createdfrom" type="date" class="form-control">
        </div>
        <div class="col">
          <label for="created-to" class="form-label">Created at - to</label>
          <input id="created-to" v-model.trim="filter.createdto" type="date" class="form-control">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model.trim="filter.email"
            :class="{ 'is-invalid': $v.filter.email.$error }"
            type="text"
            class="form-control"
            @blur="$v.filter.email.$touch"
          >
          <div v-if="$v.filter.email.$error" class="invalid-feedback">{{ msgEmail }}</div>
        </div>
        <div class="col">
          <label for="name" class="form-label">Name</label>
          <input id="name" v-model.trim="filter.name" type="text" class="form-control">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label for="status" class="form-label">Status</label>
          <select id="status" v-model="filter.status" class="form-select">
            <option value="">Select the status</option>
            <option value="1">Enabled</option>
            <option value="0">Disabled</option>
          </select>
        </div>
        <div class="col">
          <label for="role" class="form-label">Role</label>
          <select id="role" v-model="filter.role" class="form-select">
            <option value="">Select the role</option>
            <option value="1">Librarian</option>
            <option value="0">Member</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <button v-if="$store.state.users.load" class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span>Loading...</span>
        </button>
        <button v-else class="btn btn-primary" @click="filtered">
          <i class="bi bi-search" />
          Search
        </button>
        <button :disabled="$store.state.users.load" class="btn btn-outline-secondary" @click="reset">
          <i class="bi bi-arrow-counterclockwise" />
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { email } from 'vuelidate/lib/validators'
export default {
  name: "UsersFilter", //eslint-disable-line
  data () {
    return {
      filter: {
        email: '',
        name: '',
        status: '',
        role: '',
        createdfrom: '',
        createdto: ''
      }
    }
  },
  validations: {
    filter: {
      email: { email }
    }
  },
  computed: {
    msgEmail () {
      let message = '';
      if (!this.$v.filter.email.email) {
        message = 'The input must be valid email'
      }
      return message;
    }
  },
  methods: {
    filtered () {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$emit('filter', { ...this.filter })
      }
    },
    reset () {
      this.filter.email = ''
      this.filter.name = ''
      this.filter.status = ''
      this.filter.role = ''
      this.filter.createdfrom = ''
      this.filter.createdto = ''
      this.$v.$reset();
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>

</style>
