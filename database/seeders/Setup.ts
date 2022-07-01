import User from 'App/Models/User'
import CategoryFactory from 'Database/factories/CategoryFactory'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'jonas@example.com',
      password: 'senha',
    })

    await CategoryFactory.with('products', 4).createMany(20)
  }
}
