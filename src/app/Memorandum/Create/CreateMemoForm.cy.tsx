import React from 'react'
import CreateMemoForm from './CreateMemoForm'

describe('<CreateMemoForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateMemoForm />)
  })
})