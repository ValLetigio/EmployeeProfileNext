import ServerRequests from '../../../src/app/api/ServerRequests'
// const serverRequests = new ServerRequests()


describe('template spec', () => {
  let serverRequests ;
  before(() => { 
    // const user = serverRequests.getUserForTesting()
    serverRequests = new ServerRequests(false)
    serverRequests.deleteAllDataInCollection('User').then((response) => {
      console.log(response)
      expect(response).to.have.property('message', 'Data deleted successfully!');
    });

    serverRequests.getUserForTesting().then((response) => {
      console.log(response)
      expect(response.data).to.have.property('_id', 'testUserId');
    })

    // cy.wait(3000)
  })

  it('Redirects to Signin Page', () => {
    cy.visit('/')
    cy.url().should('include', '/signin')
  })
})