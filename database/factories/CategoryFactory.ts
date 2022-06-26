import Category from 'App/Models/Category'

import Factory from '@ioc:Adonis/Lucid/Factory'

import ProductFactory from './ProductFactory'

export default Factory.define(Category, ({ faker }) => ({
  name: faker.word.noun(),
}))
  .relation('products', () => ProductFactory)
  .build()
