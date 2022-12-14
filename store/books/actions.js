export default {
  fetchBooks ({ commit, state }) {
    commit('setLoad', true)
    const params = {}
    params.page = state.paginator?.current_page
    if (state.filter?.isbn) {
      params.isbn = state.filter?.isbn
    }
    if (state.filter?.title) {
      params.title = state.filter?.title
    }
    if (state.filter?.author) {
      params.author = state.filter?.author
    }
    if (state.filter?.status) {
      params.status = state.filter?.status
    }
    this.$axios.$get(state.path, {
      params
    }).then(({ data, meta }) => {
      const paginatorData = {
        current_page: meta.current_page,
        from: meta.from,
        last_page: meta.last_page,
        per_page: meta.per_page,
        to: meta.to,
        total: meta.total
      }
      commit('setBooks', data)
      commit('setPaginatorData', paginatorData)
      commit('setLoad', false)
    })
  },
  addBook({}, book) { //eslint-disable-line
    const formData = new FormData();
    if (book.image) {
      formData.append('image', book.image)
    }
    formData.append('isbn', book.isbn)
    formData.append('title', book.title)
    formData.append('author', book.author)
    const headers = { 'Content-Type': 'multipart/form-data' }
    this.$axios.post('/api/books', formData, { headers })
      .then((res) => {
        this.$router.push('/books')
      })
  },
  updateBook({}, book) { //eslint-disable-line
    this.$axios.patch(`/api/books/${book.id}`, book)
      .then((res) => {
        this.$router.push('/books')
      })
  },
  deleteBook({ commit }, bookId) { //eslint-disable-line
    commit('setLoad', true)
    return this.$axios.delete(`/api/books/${bookId}`)
  }
}
