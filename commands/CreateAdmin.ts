import { args, BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateAdmin extends BaseCommand {
  public static commandName = 'create:admin'

  public static description = 'Create a admin user'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  @args.string({ required: false })
  public email: string

  @args.string({ required: false })
  public password: string

  public passwordConfirmation: string

  public async run() {
    const { default: User } = await import('App/Models/User')
    const { validator, schema, rules } = this.application.container.use('Adonis/Core/Validator')
    if (!this.email) {
      this.email = await this.prompt.ask('E-mail')
    }
    if (!this.password) {
      this.password = await this.prompt.secure('Senha')
      this.passwordConfirmation = await this.prompt.secure('Confirme sua senha')
    }
    try {
      const { email, password } = await validator.validate({
        schema: schema.create({
          email: schema.string({}, [
            rules.email(),
            rules.unique({
              table: 'users',
              column: 'email',
            }),
          ]),
          password: schema.string({}, [rules.confirmed()]),
        }),
        data: {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        },
        messages: {
          'email.unique': 'Este e-mail já está sendo utilizado',
          'password_confirmation.confirmed': 'As senhas não são iguais',
        },
      })
      await User.create({ email, password })
    } catch (error) {
      for (const message of Object.values<string[]>(error.messages)) {
        for (const line of message) {
          this.logger.error(line)
        }
      }
    }
  }
}
