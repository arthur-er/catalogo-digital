import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({
        table: 'categories',
        column: 'name',
        whereNot: {
          id: this.refs.id,
        },
      }),
    ]),
  })

  public messages: CustomMessages = {}
}
