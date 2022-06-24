import LoginValidator from 'App/Validators/LoginValidator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('auth.login')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    await auth.attempt(email, password)

    return response.redirect().toRoute('dashboard')
  }
}
