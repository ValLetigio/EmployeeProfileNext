import React from 'react'
import MenuButton from './MenuButton'

describe('<MenuButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MenuButton />)
  })
})