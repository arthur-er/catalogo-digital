interface AppConfig {
  appName: string
  phoneNumber: string
  localization: string
  facebookLink: string
  instagramLink: string
}

const config: AppConfig = (window as any).config

export default config
