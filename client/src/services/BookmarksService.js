import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },

  post (bookmark) {
    return Api().post('bookmarks',
      bookmark
    )
  },

  delete (bookmarkId) {
    return Api().get(`bookmarks/${bookmarkId}`)
  },
}

/* AuthenticationService.register({
  email: 'testing@gmail.com',
  password: '123456789'
}) */
