import LoginValidator from 'App/Validators/LoginValidator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('auth.login')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { email, password, remember_me: rememberMe } = await request.validate(LoginValidator)

    await auth.use('web').attempt(email, password, rememberMe)

    return response.redirect().toRoute('dashboard')
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('auth.login')
  }
}
