import Category from 'App/Models/Category'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomePageController {
  public async handle({ inertia, request }: HttpContextContract) {
    const { q: search } = request.qs()
    const categories = await Category.query()
      .whereHas('products', (productQb) => {
        productQb.if(search, (qb) => qb.where('name', 'ILIKE', `${search}%`))
      })
      .preload('products')

    return inertia.render('home', { categories })
  }
}
