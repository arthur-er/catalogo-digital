import { dinero, Dinero, DineroSnapshot } from 'dinero.js'

import { ColumnOptions } from '@ioc:Adonis/Lucid/Orm'

const dineroCast: Partial<ColumnOptions> = {
  serialize: (value: Dinero<number>) => value.toJSON(),
  prepare: (value: Dinero<number>) => value.toJSON(),
  consume: (value: DineroSnapshot<number>) => dinero(value),
}

export default dineroCast
