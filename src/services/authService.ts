import { loginApi, registerApi } from '@/lib/apiAuth'
import { saveAuth, clearAuth } from '@/lib/auth'

export async function loginService(email: string, password: string) {
  const data = await loginApi(email, password)
  saveAuth(data.token, data.user)
  return data
}

export async function registerService(name: string, email: string, password: string) {
  return registerApi(name, email, password)
}

export function logoutService() {
  clearAuth()
}
