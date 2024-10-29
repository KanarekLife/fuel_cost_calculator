import { mount } from 'svelte'
import App from './App.svelte'
import 'bulma'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
