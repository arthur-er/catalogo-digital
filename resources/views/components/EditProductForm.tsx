import { Inertia } from '@inertiajs/inertia'
import { dinero, toUnit } from 'dinero.js'
import { z } from 'zod'

import CheckboxInput from './CheckboxInput'
import FileInput from './FileInput'
import Form from './Form'
import TextInput from './TextInput'

interface EditProductFormProps {
  product: any
}

const TWO_MB = 2 * 1024 * 1024

const editProductSchema = z.object({
  name: z.string().min(1, 'Dê um nome ao produto'),
  image: z.union([
    z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), 'O arquivo não é uma imagem')
      .refine((file) => file.size < TWO_MB, 'A imagem é muito grande'),
    z.undefined(),
  ]),
  price: z.number().gt(0, 'O preço deve ser maior que 0'),
  active: z.boolean(),
})

export default function EditProductForm({ product }: EditProductFormProps) {
  const price = toUnit(dinero(product.price))

  return (
    <Form
      schema={editProductSchema}
      submitText="Alterar produto"
      onSubmit={(data) =>
        Inertia.put(`/dashboard/products/${product.id}`, data, { forceFormData: true })
      }
    >
      <TextInput defaultValue={product.name} name="name" label="Nome do produto" />
      <TextInput prefix="R$" type="number" defaultValue={price} name="price" label="Preço" />
      <FileInput accept="image/*" name="image" label="Imagem" />
      <CheckboxInput name="active" label="Visivel" defaultChecked={product.active} />
    </Form>
  )
}
