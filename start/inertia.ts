/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  errors: (ctx) => ctx.session.flashMessages.get('errors'),
  user: (ctx) => ctx.auth.user,
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
