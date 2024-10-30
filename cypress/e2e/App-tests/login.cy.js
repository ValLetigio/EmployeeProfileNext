import ServerRequests from '../../../src/app/api/ServerRequests'
// const serverRequests = new ServerRequests()

// Cypress.Commands.add('loginByGoogleApi', () => {
//   cy.log('Logging in to Google')
//   cy.request({
//     method: 'POST',
//     url: 'https://www.googleapis.com/oauth2/v4/token',
//     body: {
//       // grant_type: 'refresh_token',
//       client_id: Cypress.env('googleClientId'),
//       client_secret: Cypress.env('googleClientSecret'),
//       // refresh_token: Cypress.env('googleRefreshToken'),
//     },
//   }).then(({ body }) => {
//     const { access_token, id_token } = body

//     cy.request({
//       method: 'GET',
//       url: 'https://www.googleapis.com/oauth2/v3/userinfo',
//       headers: { Authorization: `Bearer ${access_token}` },
//     }).then(({ body }) => {
//       cy.log(body)
//       const userItem = {
//         token: id_token,
//         user: {
//           googleId: body.sub,
//           email: body.email,
//           givenName: body.given_name,
//           familyName: body.family_name,
//           imageUrl: body.picture,
//         },
//       }

//       window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
//       cy.visit('/')
//     })
//   })
// })

describe('template spec', () => {
  let serverRequests ;
  before(async() => {
    let userObject;
    serverRequests = new ServerRequests(false);

    const deleteResponse = await serverRequests.deleteAllDataInCollection('User');
    console.log(deleteResponse);
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');

    const userResponse = await serverRequests.getUserForTesting();
    console.log(userResponse.data);
    userObject = userResponse.data;
    console.log(userObject)
    expect(userResponse.data).to.have.property('_id', 'testUserId');

    window.localStorage.setItem('authToken', userResponse.data._id);

    const loginResponse = await serverRequests.firebaseLogin({ profile: userObject });
    console.log(loginResponse);
    expect(loginResponse).to.have.property('message', 'User logged in successfully');
    // cy.visit('/Employee/Create')
  })

  it('Redirects to Signin Page', () => {
    cy.visit('/')
    // cy.url().should('include', 'signin')
  })

  // it("Login with Google", () => {
  //   cy.visit("/")
  //   cy.contains('Sign in with Google', { timeout: 60000 }).click();
  //   // cy.get("a[href='/api/auth/signin']").click()
  //   const username = Cypress.env("GOOGLE_USER")
  //   const password = Cypress.env("GOOGLE_PW")
  //   const loginUrl = Cypress.env("SITE_NAME")
  //   const cookieName = Cypress.env("COOKIE_NAME")
  //   const socialLoginOptions = {
  //     username,
  //     password,
  //     loginUrl,
  //     headless: true,
  //     logs: false,
  //     isPopup: true,
  //     loginSelector: `a[href="${Cypress.env(
  //       "SITE_NAME"
  //     )}/api/auth/signin"]`,
  //     postLoginSelector: ".unread-count",
  //   }

  //   return cy
  //     .task("GoogleSocialLogin", socialLoginOptions)
  //     .then(({ cookies }) => {
  //       cy.clearCookies()

  //       const cookie = cookies
  //         .filter((cookie) => cookie.name === cookieName)
  //         .pop()
  //       if (cookie) {
  //         cy.setCookie(cookie.name, cookie.value, {
  //           domain: cookie.domain,
  //           expiry: cookie.expires,
  //           httpOnly: cookie.httpOnly,
  //           path: cookie.path,
  //           secure: cookie.secure,
  //         })

  //         Cypress.Cookies.defaults({
  //           preserve: cookieName,
  //         })

  //         // remove the two lines below if you need to stay logged in
  //         // for your remaining tests
  //         // cy.visit("/api/auth/signout")
  //         // cy.get("form").submit()
  //       }
  //     })
  // })
})