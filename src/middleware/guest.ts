export default function guest({next,store}){
  if(store.isAuthenticated){
    return next({
      name: 'users'
    })
  }
  return next();
}
