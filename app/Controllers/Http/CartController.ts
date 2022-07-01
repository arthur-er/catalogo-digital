import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CartController {
  public async handle({ inertia }: HttpContextContract) {
    return inertia.render('cart')
  }
}
