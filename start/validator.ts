import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('greaterThan', (value, [greaterThan], options) => {
  if (typeof value !== 'number') {
    return
  }

  if (value < greaterThan) {
    options.errorReporter.report(
      options.pointer,
      'greaterThan',
      'greaterThan validation failed',
      options.arrayExpressionPointer
    )
  }
})
