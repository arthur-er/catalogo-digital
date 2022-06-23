/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  protected async makeHtmlResponse(error: any, ctx: HttpContextContract) {
    if (
      process.env.NODE_ENV === 'development' &&
      (!this.expandedStatusPages[error.status] || this.disableStatusPagesInDevelopment)
    ) {
      return super.makeHtmlResponse(error, ctx)
    }

    if ('inertia' in ctx) {
      const res = await ctx.inertia.render(this.expandedStatusPages[error.status], { error })
      return ctx.response.status(error.status).send(res)
    }

    return super.makeHtmlResponse(error, ctx)
  }

  constructor() {
    super(Logger)
  }
}
