<template>
  <form class="card border mb-4" @submit.prevent>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col position-relative">
          <label for="isbn" class="form-label">ISBN</label>
          <input
            id="isbn"
            v-model.trim="filter.isbn"
            :class="{ 'is-invalid': $v.filter.isbn.$error }"
            type="number"
            class="form-control"
            @blur="$v.filter.isbn.$touch"
          >
          <span class="position-absolute end-0" style="padding-right: 12px;">{{ filter.isbn.length }}/13</span>
          <div v-if="$v.filter.isbn.$error" class="invalid-feedback">{{ msgIsbn }}</div>
        </div>
        <div class="col">
          <label for="title" class="form-label">Title</label>
          <input id="title" v-model.trim="filter.title" type="text" class="form-control">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label for="author" class="form-label">Author</label>
          <input id="author" v-model.trim="filter.author" type="text" class="form-control">
        </div>
        <div class="col">
          <label for="status" class="form-label">Status</label>
          <select id="status" v-model="filter.status" class="form-select">
            <option value="">Select the status</option>
            <option value="0">Unavailable</option>
            <option value="1">Available</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <button v-if="$store.state.books.load" class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span>Loading...</span>
        </button>
        <button v-else class="btn btn-primary" @click="filtered">
          <i class="bi bi-search" />
          Search
        </button>
        <button :disabled="$store.state.books.load" class="btn btn-outline-secondary" @click="reset">
          <i class="bi bi-arrow-counterclockwise" />
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: "BooksFilter", //eslint-disable-line
  data () {
    return {
      filter: {
        isbn: '',
        title: '',
        author: '',
        status: ''
      }
    }
  },
  validations: {
    filter: {
      isbn: { minLength: minLength(13), maxLength: maxLength(13) }
    }
  },
  computed: {
    msgIsbn () {
      let message = '';
      if (!this.$v.filter.isbn.minLength) {
        message = 'The field must have min 13 symbols'
      }
      if (!this.$v.filter.isbn.maxLength) {
        message = 'The field must be max 13 symbols'
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
      this.filter.isbn = ''
      this.filter.title = ''
      this.filter.author = ''
      this.filter.status = ''
      this.$v.$reset();
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>

</style>
