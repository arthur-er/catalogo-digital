import Product from 'App/Models/Product'

import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Product, async ({ faker }) => {
  const image = new Attachment({
    extname: 'png',
    mimeType: 'image/png',
    size: 10 * 1000,
    name: `${faker.random.alphaNumeric(10)}.png`,
  })
  image.isPersisted = true
  const { contents: imageBinary } = await file.generatePng('512kb')
  await Drive.put(image.name, imageBinary)

  return {
    name: faker.word.noun(),
    image,
    active: true,
  }
})
  .state('inactive', (product) => (product.active = false))
  .build()
