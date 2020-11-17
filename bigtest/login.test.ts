import { Button, Page, test } from 'bigtest'

export default test('bigtest login')
  .step(Page.visit('/'))
  .assertion(Button('Login').exists())
