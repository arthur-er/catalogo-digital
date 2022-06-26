import { Inertia } from '@inertiajs/inertia'
import { z } from 'zod'

import FileInput from './FileInput'
import Form from './Form'
import TextInput from './TextInput'

interface CreateProductFormProps {
  category: any
}

const TWO_MB = 2 * 1024 * 1024

const createProductSchema = z.object({
  name: z.string().min(1, 'Dê um nome ao produto'),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), 'O arquivo não é uma imagem')
    .refine((file) => file.size < TWO_MB, 'A imagem é muito grande'),
  price: z.number().gt(0, 'O preço deve ser maior que 0'),
})

export default function CreateProductForm({ category }: CreateProductFormProps) {
  return (
    <Form
      schema={createProductSchema}
      submitText="Criar produto"
      onSubmit={(data) =>
        Inertia.post(`/dashboard/categories/${category.id}/products`, data, { forceFormData: true })
      }
    >
      <TextInput name="name" label="Nome do produto" />
      <TextInput name="price" type="number" label="Preço" />
      <FileInput accept="image/*" name="image" label="Imagem" />
    </Form>
  )
}
