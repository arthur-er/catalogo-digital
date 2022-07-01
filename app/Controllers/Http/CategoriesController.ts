import { bind } from '@adonisjs/route-model-binding'

import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('dashboard.categories.create')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(CreateCategoryValidator)

    try {
      await Category.create(payload)
      session.flash('notifications', {
        title: 'Categoria criada com sucesso',
      })
    } catch (error) {
      session.flash('notifications', {
        title: 'Erro ao criar categoria',
      })
    }

    return response.redirect().toRoute('dashboard')
  }

  @bind()
  public async edit({ inertia }: HttpContextContract, category: Category) {
    return inertia.render('dashboard.categories.edit', { category })
  }

  @bind()
  public async update({ request, session, response }: HttpContextContract, category: Category) {
    const payload = await request.validate(UpdateCategoryValidator)

    try {
      await category.merge(payload).save()
      session.flash('notifications', {
        title: 'Categoria alterada com sucesso',
      })
    } catch (error) {
      session.flash('notifications', {
        title: 'Erro ao alterar categoria',
      })
    }

    return response.redirect().toRoute('dashboard')
  }

  @bind()
  public async destroy({ session, response }: HttpContextContract, category: Category) {
    try {
      await category.delete()
      session.flash('notifications', {
        title: 'Categoria excluida com sucesso',
      })
    } catch (error) {
      session.flash('notifications', {
        title: 'Erro ao excluir categoria',
      })
    }

    return response.redirect().toRoute('dashboard')
  }
}
