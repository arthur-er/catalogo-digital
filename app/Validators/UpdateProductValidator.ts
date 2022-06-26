import Product from 'App/Models/Product'

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateProductValidator {
  constructor(protected product: Product) {}

  public refs = schema.refs({
    productId: this.product.id,
    categoryId: this.product.categoryId,
  })

  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({
        column: 'name',
        table: 'products',
        where: {
          category_id: this.refs.categoryId,
        },
        whereNot: {
          id: this.refs.productId,
        },
      }),
    ]),
    image: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
    price: schema.number([rules.greaterThan(0)]),
    active: schema.boolean(),
  })
}
