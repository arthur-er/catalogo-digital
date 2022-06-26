declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    greaterThan(value: number): Rule
  }
}
