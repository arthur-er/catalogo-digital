interface AppConfig {
  appName: string
}

const config: AppConfig = (window as any).config

export default config
