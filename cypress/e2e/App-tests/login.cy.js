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
let serverRequests ;
serverRequests = new ServerRequests(false);

describe('Employee spec', () => {
  // let userObject;
  before(async() => {
    const deleteResponse = await serverRequests.deleteAllDataInCollection('User');
    console.log(deleteResponse);
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');

    // const userResponse = await serverRequests.getUserForTesting();
    // console.log(userResponse.data);
    // userObject = userResponse.data;
    // console.log(userObject)
    // expect(userResponse.data).to.have.property('_id', 'testUserId');

    // window.localStorage.setItem('authToken', userResponse.data._id);

    // const loginResponse = await serverRequests.firebaseLogin({ profile: userObject });
    // console.log(loginResponse);
    // expect(loginResponse).to.have.property('message', 'User logged in successfully');
    // cy.visit('/Employee/Create')

    // const memoWithoutSubmitted = await serverRequests.getAllMemoThatsNotSubmitted(userObject);
    // console.log(memoWithoutSubmitted);
  })

  it('Redirects to Employee and create and update employee', async () => {
    const deleteResponse = await serverRequests.deleteAllDataInCollection('Employee');
    console.log(deleteResponse);
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');

    cy.visit('/')
    cy.url().should('include', '/')
    cy.wait(4000)
    cy.get('#menu-button').click()

    cy.get('#create-employee').click()
    cy.url().should('include', '/Employee/Create')

    cy.get('#name').type('John Doe')
    cy.get('#address').type('123 Main St, Sample City, Sample State, 12345')
    cy.get('#phoneNumber').type('123-456-7890')
    cy.get('input[type=file]#photoOfPerson').attachFile('smiley.png')
    cy.get('input[type=file]#resumePhotosList').attachFile('mhm.png')
    cy.get('input[type=file]#biodataPhotosList').attachFile('minor.png')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#dateJoined').type('2022-01-15')
    cy.get('#company').type('Sample Corp')
    cy.get('#isRegular').check()
    cy.get('#isProductionEmployee').uncheck()
    cy.get('#dailyWage').type('567.89')

    cy.get('#submit').click()

    cy.get('#menu-button').click()
    cy.get('#update-employee').click()

    cy.get('#Employee').select('John Doe')
    cy.get('#name').clear().type('John Doe Jr')
    cy.get('#address').clear().type('123 Main St, Sample City, Sample State, 12345')
    cy.get('#phoneNumber').clear().type('123-456-7891')
    cy.get('input[type=file]#photoOfPerson').attachFile('mhm.png')
    cy.get('input[type=file]#resumePhotosList').attachFile('minor.png')
    cy.get('input[type=file]#biodataPhotosList').attachFile('smiley.png')
    cy.get('#email').clear().type('johndoejr@gmail.com')
    cy.get('#dateJoined').clear().type('2022-01-15')
    cy.get('#company').clear().type('Sample Corp 2')
    cy.get('#isRegular').uncheck()
    cy.get('#isProductionEmployee').check()
    cy.get('#dailyWage').clear().type('567.90')

    cy.get('#save').click()
    cy.wait(4000)
  })
  // it('creates and updates employee server request', async () => {
  //   const deleteResponse = await serverRequests.deleteAllDataInCollection('Employee');
  //   console.log(deleteResponse);

  //   const employee = {
  //     name: "John Doe",
  //     address: "123 Main St, Sample City, Sample State, 12345",
  //     phoneNumber: "123-456-7890",
  //     photoOfPerson: "https://example.com/photos/johndoe.jpg",
  //     resumePhotosList: [
  //         "https://example.com/resume/page1.jpg",
  //         "https://example.com/resume/page2.jpg",
  //         "https://example.com/resume/page3.jpg"
  //     ],
  //     biodataPhotosList: [
  //         "https://example.com/biodata/photo1.jpg",
  //         "https://example.com/biodata/photo2.jpg"
  //     ],
  //     email: "johndoe@example.com",
  //     dateJoined: "2022-01-15",
  //     company: "Sample Corp",
  //     isRegular: true,
  //     isProductionEmployee: false,
  //     dailyWage: 567.89,
  // }
  // const createEmployeeResponse = await serverRequests.createEmployee(employee, userObject);
  // console.log(createEmployeeResponse);
  // expect(createEmployeeResponse).to.have.property('message', 'Employee created successfully!');

  // const updatedEmployee = {
  //   name: "John Doe Jr",
  //   phoneNumber: "123-456-7891",
  // }

  // const updateEmployeeResponse = await serverRequests.updateEmployee(createEmployeeResponse.data, updatedEmployee, userObject);
  // console.log(updateEmployeeResponse);
  // expect(updateEmployeeResponse).to.have.property('message', 'Employee updated successfully!');

  // // create another update request
  // const updatedEmployee2 = {
  //   name: "Val Johnathan Sr",
  //   phoneNumber: "123-456-7892",
  // }
  // const updateEmployeeResponse2 = await serverRequests.updateEmployee(createEmployeeResponse.data, updatedEmployee2, userObject);
  // console.log(updateEmployeeResponse2);
  // expect(updateEmployeeResponse2).to.have.property('message', 'Employee updated successfully!');
  // })

  // it('create and update and delete offense server request', async () => {
  //   const offense = {
  //     number: 1,
  //     description: "Employee was late to work",
  //     remedialActions: ['Warning', 'Suspension'],
  //   }
  //   const createOffenseResponse = await serverRequests.createOffense(offense, userObject);
  //   console.log(createOffenseResponse);
  //   expect(createOffenseResponse).to.have.property('message', 'Offense created successfully!');


  //   const updatedOffense = {
  //     description: "Employee was late to work and was rude to customers",
  //     remedialActions: ['Warning', 'Suspension', 'Termination'],
  //   }

  //   const updateOffenseResponse = await serverRequests.updateOffense(createOffenseResponse.data, updatedOffense, userObject);
  //   console.log(updateOffenseResponse);
  //   expect(updateOffenseResponse).to.have.property('message', 'Offense updated successfully!');

  //   const deleteOffenseResponse = await serverRequests.deleteOffense(createOffenseResponse.data, userObject);
  //   console.log(deleteOffenseResponse);
  //   expect(deleteOffenseResponse).to.have.property('message', 'Offense deleted successfully!');
  // })

  // it('create and update and delete memo server request', async () => {
  //   const employee = {
  //     name: "John Doe",
  //     address: "123 Main St, Sample City, Sample State, 12345",
  //     phoneNumber: "123-456-7890",
  //     photoOfPerson: "https://example.com/photos/johndoe.jpg",
  //     resumePhotosList: [
  //         "https://example.com/resume/page1.jpg",
  //         "https://example.com/resume/page2.jpg",
  //         "https://example.com/resume/page3.jpg"
  //     ],
  //     biodataPhotosList: [
  //         "https://example.com/biodata/photo1.jpg",
  //         "https://example.com/biodata/photo2.jpg"
  //     ],
  //     email: "johndoe@example.com",
  //     dateJoined: "2022-01-15",
  //     company: "Sample Corp",
  //     isRegular: true,
  //     isProductionEmployee: false,
  //     dailyWage: 567.89,
  //   }
  //   const offense = {
  //     number: 1,
  //     description: "Employee was late to work",
  //     remedialActions: ['Warning', 'Suspension'],
  //   }

  //   const createEmployeeResponse = await serverRequests.createEmployee(employee, userObject);
  //   console.log(createEmployeeResponse);
  //   expect(createEmployeeResponse).to.have.property('message', 'Employee created successfully!');

  //   const createOffenseResponse = await serverRequests.createOffense(offense, userObject);
  //   console.log(createOffenseResponse);
  //   expect(createOffenseResponse).to.have.property('message', 'Offense created successfully!');


  //   const memo = {
  //     // date: "2024-10-31",
  //     mediaList: [
  //         "https://example.com/media/photo1.jpg",
  //         "https://example.com/media/photo2.jpg"
  //     ],
  //     Employee: createEmployeeResponse.data,
  //     memoPhotosList: [
  //         "https://example.com/memos/memo1.jpg",
  //         "https://example.com/memos/memo2.jpg"
  //     ],
  //     subject: "Workplace Safety Protocols",
  //     description: "Reminder to adhere to updated safety protocols in the workplace. Ensure all employees are aware and compliant.",
  //     MemoCode: createOffenseResponse.data,
  //     // submitted: true,
  //     reason: "To ensure employee safety and compliance with regulations.",
  // };

  // const createMemoResponse = await serverRequests.createMemo(memo, userObject);
  // console.log(createMemoResponse);
  // expect(createMemoResponse).to.have.property('message', 'Memo created successfully!');

  // const reason = "To ensure employee safety and compliance with regulations. Updated safety protocols in the workplace. Ensure all employees are aware and compliant.";

  // const submitMemoResponse = await serverRequests.submitMemo(createMemoResponse.data, reason, userObject);
  // console.log(submitMemoResponse);
  // expect(submitMemoResponse).to.have.property('message', 'Memo submitted successfully!');

  // const deleteMemoResponse = await serverRequests.deleteMemo(createMemoResponse.data, userObject);
  // console.log(deleteMemoResponse);
  // expect(deleteMemoResponse).to.have.property('message', 'Memo deleted successfully!');
  // })
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

describe('Offense spec', () => {
  before(async() => {
    const deleteResponse = await serverRequests.deleteAllDataInCollection('Offense');
    console.log(deleteResponse);
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');
  }
  )

  it('Redirects to Offense and create and update offense', async () => {
    const deleteResponse = await serverRequests.deleteAllDataInCollection('Offense');
    console.log(deleteResponse);
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');

    cy.visit('/')
    cy.url().should('include', '/')
    cy.get('#menu-button').click()
    cy.get('#create-offense').click()
    cy.get('#description').type('Employee was late to work')
    cy.get('#Verbal-Warning').click()
    cy.get('#Written-Warning').click()

    cy.get('#create-offense-button').click()

    // cy.get('#menu-button').click()
    // cy.get('#update-offense').click()
  })
}
)