<template>
  <div>
    <div v-if="users.length === 0 && !load" class="fs-3 text-center py-4">There are no records!</div>
    <table v-else class="table align-middle table-bordered table-hover position-relative">
    <div v-if="load" class="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center" style="min-height: 100px;background-color: rgba(0, 0, 0, 0.3)">
        <div class="spinner-border text-light" style="height: 5rem; width: 5rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <thead>
      <tr class="text-nowrap text-center text-muted">
<!--        <th>Avatar</th>-->
        <th>
          Email
<!--          <i class="bi bi-caret-down-fill" />-->
        </th>
        <th>
          Name
<!--          <i class="bi bi-caret-down-fill" />-->
        </th>
        <th>
          Roles
        </th>
        <th>
          Status
        </th>
        <th>
          Created at
<!--          <i class="bi bi-caret-down-fill" />-->
        </th>
        <th>--</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
<!--        <td class="d-flex">-->
<!--          <div v-if="false" class="d-flex m-auto">-->
<!--            <img style="width: 3rem;height: 3rem;object-fit: contain;" src="https://damion.club/uploads/posts/2022-02/thumbs/1645233010_4-damion-club-p-krasivaya-priroda-utrom-priroda-4.jpg" alt="" class="m-auto">-->
<!--          </div>-->
<!--          <div v-else class="bg-light d-flex rounded-circle" style="width: 3rem;height: 3rem;">-->
<!--            <i class="bi bi-person-fill m-auto fs-4 text-muted" />-->
<!--          </div>-->
<!--        </td>-->
        <td>{{ user.email }}</td>
        <td class="text-nowrap">{{ user.name }}</td>
        <td>{{ role(user.role) }}</td>
        <td><span class="badge" :class="status(user.status).class">{{ status(user.status).text }}</span></td>
        <td class="text-nowrap">{{ $moment(user.created_at).format("DD.MM.YY") }}</td>
        <td class="text-nowrap d-flex justify-content-center">
          <nuxt-link :to="`/users/${user.id}`" class="link-primary px-2"><i class="bi bi-eye-fill" /></nuxt-link>
          <nuxt-link :to="`/users/${user.id}/edit`" class="link-primary px-2"><i class="bi bi-pencil-fill" /></nuxt-link>
          <button
            type="button"
            class="link-danger bg-transparent border-0 px-2"
            @click="$emit('delete', user.id)"
          >
            <i class="bi bi-trash-fill" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  props: {
    users: {
      required: true,
      type: Array
    },
    load: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    role (roleId) {
      if (roleId === 0) {
        return 'Member'
      } else {
        return 'Librarian'
      }
    },
    status (statusId) {
      if (statusId === 0) {
        return { class: 'text-bg-danger', text: 'Disabled' }
      } else {
        return { class: 'text-bg-success', text: 'Enabled' }
      }
    }
  }
}
</script>

<style scoped>

</style>
