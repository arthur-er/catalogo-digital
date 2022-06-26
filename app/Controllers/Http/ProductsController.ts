import { bind } from '@adonisjs/route-model-binding'

import dineroFromFloat from 'App/Helpers/dineroFromFloat'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
  @bind()
  public async create({ inertia }: HttpContextContract, category: Category) {
    return inertia.render('dashboard.products.create', { category })
  }

  @bind()
  public async store({ request, response, session }: HttpContextContract, category: Category) {
    const { name, image, price } = await request.validate(CreateProductValidator)

    try {
      await category.related('products').create({
        name,
        image: Attachment.fromFile(image),
        active: true,
        price: dineroFromFloat({ amount: price }),
      })
      session.flash('notifications', {
        title: 'Produto criado com sucesso',
      })
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('notifications', {
        title: 'Erro ao criar produto',
      })
      return response.redirect().back()
    }
  }

  @bind()
  public async edit({ inertia }: HttpContextContract, product: Product) {
    return inertia.render('dashboard.products.edit', { product })
  }

  @bind()
  public async update({ session, request, response }: HttpContextContract, product: Product) {
    const { name, image, price, active } = await request.validate(
      new UpdateProductValidator(product)
    )

    try {
      await product
        .merge({
          name,
          image: image ? Attachment.fromFile(image) : product.image,
          price: dineroFromFloat({ amount: price }),
          active,
        })
        .save()
      session.flash('notifications', {
        title: 'Produto alterado com sucesso',
      })
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('notifications', {
        title: 'Erro ao alterar produto',
      })
      return response.redirect().back()
    }
  }

  @bind()
  public async destroy({ session, response }: HttpContextContract, product: Product) {
    try {
      await product.delete()
      session.flash('notifications', {
        title: 'Produto excluido com sucesso',
      })
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('notifications', {
        title: 'Erro ao excluir produto',
      })
      return response.redirect().back()
    }
  }
}
