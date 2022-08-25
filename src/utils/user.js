import createAxios from '@/utils/baseAxios'
let userInfo = function (data){
  return  createAxios(data)
}
export { userInfo  }