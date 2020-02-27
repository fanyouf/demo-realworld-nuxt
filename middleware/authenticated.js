export default function ({ store, redirect }) {
  console.log('中间件 authenticated.js')
  if (!store.state.user) {
    return redirect('/login')
  }
}
