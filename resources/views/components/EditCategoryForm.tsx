import { Inertia } from '@inertiajs/inertia'
import { z } from 'zod'

import Form from './Form'
import TextInput from './TextInput'

interface EditCategoryFormProps {
  category: any
}

const editCategorySchema = z.object({
  name: z.string().min(1, 'Dê um nome a categoria'),
})

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
  return (
    <Form
      schema={editCategorySchema}
      submitText="Editar categoria"
      onSubmit={(data) => Inertia.put(`/dashboard/categories/${category.id}`, data)}
    >
      <TextInput defaultValue={category.name} name="name" label="Nome da categoria" />
    </Form>
  )
}
