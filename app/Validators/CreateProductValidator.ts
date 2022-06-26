import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    categoryId: this.ctx.params.category_id,
  })

  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({
        column: 'name',
        table: 'products',
        where: {
          category_id: this.refs.categoryId,
        },
      }),
    ]),
    image: schema.file({ size: '2mb', extnames: ['jpg', 'png'] }),
  })
}
