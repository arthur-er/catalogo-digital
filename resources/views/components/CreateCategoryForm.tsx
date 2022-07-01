import { Inertia } from '@inertiajs/inertia'
import { z } from 'zod'

import Form from './Form'
import TextInput from './TextInput'

interface CreateCategoryFormProps {}

const createCategorySchema = z.object({
  name: z.string().min(1, 'Dê um nome a categoria'),
})

export default function CreateCategoryForm({}: CreateCategoryFormProps) {
  return (
    <Form
      schema={createCategorySchema}
      submitText="Criar categoria"
      onSubmit={(data) => Inertia.post('/dashboard/categories', data)}
    >
      <TextInput name="name" label="Nome da categoria" />
    </Form>
  )
}
