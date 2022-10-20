<template>
  <div>
    Index page
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware({ redirect }) {
    return redirect('/books')
  }
}
</script>
