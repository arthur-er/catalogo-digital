import Category from 'App/Models/Category'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async handle({ inertia, request }: HttpContextContract) {
    const { q: search } = request.qs()
    /**
     * Query all categories, if a search string is passed query all categories
     * that have a product with that name
     */
    const categories = await Category.query()
      .preload('products')
      .if(search, (qb) =>
        qb.whereHas('products', (productQb) => productQb.where('name', 'ILIKE', `${search}%`))
      )

    return inertia.render('dashboard', { categories })
  }
}
