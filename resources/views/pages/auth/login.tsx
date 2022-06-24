import { z } from 'zod'

import CheckboxInput from '@/views/components/CheckboxInput'
import Form from '@/views/components/Form'
import TextInput from '@/views/components/TextInput'

interface LoginPageProps {}

const loginSchema = z.object({
  email: z.string().min(1, 'Insira seu email').email('Insira um e-mail válido'),
  password: z.string().min(1, 'Insira sua senha'),
})

export default function LoginPage({}: LoginPageProps) {
  return (
    <div className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na sua conta
          </h2>
        </div>
        <Form
          schema={loginSchema}
          submitText="Entrar"
          onSubmit={() => {}}
          className="mt-8 space-y-6"
        >
          <TextInput label="E-mail" name="email" />
          <TextInput label="Senha" type="password" name="password" />

          <div className="flex items-center justify-between">
            <CheckboxInput label="Manter conectado?" name="remember-me" />

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
