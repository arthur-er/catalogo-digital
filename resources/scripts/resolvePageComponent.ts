export default function resolvePageComponent(name: string) {
  return import(`../views/pages/${name.replaceAll('.', '/')}`)
}
