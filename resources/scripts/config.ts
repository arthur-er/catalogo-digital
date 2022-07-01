interface AppConfig {
  appName: string
  phoneNumber: string
}

const config: AppConfig = (window as any).config

export default config
