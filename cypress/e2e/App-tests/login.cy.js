// import ServerRequests from "@/app/api/ServerRequests"

// const serverRequests = new ServerRequests()

describe('template spec', () => {

  before(() => { 
    // const user = serverRequests.getUserForTesting()

    // expect(user).to.have.property('_id', 'TesTUseRiD')

    cy.request('GET', 'http://127.0.0.1:5000/getUserForTesting').then((response) => {
      // Assert the status code
      expect(response.status).to.eq(200);

      // Assert the response body
      expect(response.body).to.have.property('_id', 'TesTUseRiD'); 
    });

    cy.wait(3000)
  }) 

  it('Redirects to Signin Page', () => { 
    cy.visit('/')
    // cy.url().should('include', '/signin') 
  })
})