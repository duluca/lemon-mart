import 'localstorage-polyfill'

global['localStorage'] = localStorage
export { AppServerModule } from './app/app.module.server'
