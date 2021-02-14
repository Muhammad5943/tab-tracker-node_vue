import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('bookmarks', {
      params: params
    })
  },
}

/* AuthenticationService.register({
  email: 'testing@gmail.com',
  password: '123456789'
}) */
