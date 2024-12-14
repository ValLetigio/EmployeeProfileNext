export function clearCollections(serverRequests){
  cy.wrap(serverRequests.deleteAllDataInCollection('Employee')).then((deleteResponse) => {
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');
  });

  cy.wrap(serverRequests.deleteAllDataInCollection('Offense')).then((deleteResponse) => {
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');
  });

  cy.wrap(serverRequests.deleteAllDataInCollection('Memo')).then((deleteResponse) => {
    expect(deleteResponse).to.have.property('message', 'Data deleted successfully!');
  });
}

export function CreateEmployee(
  name = "John Doe",
  // address = "1234 Elm Street, Springfield",
  // phoneNumber = "+1234567890",
  // photoOfPerson = 'minor.png',
  // resumePhotosList = 'smiley.png',
  // biodataPhotosList = 'mhm.png',
  // email = "johndoe@example.com",
  // dateJoined = "2024-11-01",
  // company = "TechCorp Inc.",
  // dailyWage = "500"
){
  cy.get('#profile-button').should('be.visible').click()

  cy.contains('Create Employee').should('be.visible').click()
  cy.url().should('include', '/Employee/Create')

  cy.get('#profile-button').should('be.visible').click()

  cy.get('#name').type(name)
  // cy.get('#address').type(address)
  // cy.get('#phoneNumber').type(phoneNumber)
  // cy.get('input[type=file]#photoOfPerson').attachFile(photoOfPerson)
  // cy.get('input[type=file]#resumePhotosList').attachFile(resumePhotosList)
  // cy.get('input[type=file]#biodataPhotosList').attachFile(biodataPhotosList)
  // cy.get('#email').type(email)
  // cy.get('#dateJoined').type(dateJoined)
  // cy.get('#company').type(company)
  // cy.get('#isRegular').check()
  // cy.get('#isProductionEmployee').uncheck()
  // cy.get('#dailyWage').type(dailyWage)
  // cy.wait(1000)
  cy.get('#submit').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function UpdateEmployee({
  employee = "John Doe",
  name = "John Doe Jr",
  address = "1234 Elm Street, Springfield",
  phoneNumber = "+1234567890",
  photoOfPerson = 'minor.png',
  resumePhotosList = 'smiley.png',
  biodataPhotosList = 'mhm.png',
  email = "johndoe@example.com",
  dateJoined = "2024-11-01",
  company = "TechCorp Inc.",
  dailyWage = "500"
}={}){
  cy.get('#profile-button').should('be.visible').click()

  cy.contains('Update Employee').click()

  cy.get('#profile-button').should('be.visible').click()

  cy.get('#Employee').click()
  cy.get('.css-1nmdiq5-menu')
  .contains(employee)
  .click();

  cy.get('#name').clear().type(name)
  cy.get('#address').clear().type(address)
  cy.get('#phoneNumber').clear().type(phoneNumber)
  cy.get('input[type=file]#photoOfPerson').attachFile(photoOfPerson)
  cy.get('input[type=file]#resumePhotosList').attachFile(resumePhotosList)
  cy.get('input[type=file]#biodataPhotosList').attachFile(biodataPhotosList)
  cy.get('#email').clear().type(email)
  cy.get('#dateJoined').clear().type(dateJoined)
  cy.get('#company').clear().type(company)
  cy.get('#isRegular').uncheck()
  cy.get('#isProductionEmployee').check()
  cy.get('#dailyWage').clear().type(dailyWage)

  cy.get('#save').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function DeleteEmployee(name){
  cy.get('#profile-button').should('be.visible').click()
  cy.contains('Delete Employee').click()
  cy.get('#Employee').select(name)
  cy.get('#delete-employee-btn').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function CreateOffense(
  description = "Employee was late to work",
  offenseType = ["Verbal Warning", "Written-Warning"],
){
  cy.get('#profile-button').should('be.visible').click()
  cy.contains('Create Offense').click()
  cy.get('#profile-button').should('be.visible').click()
  cy.location('pathname').should('include', '/Offense/Create')
  cy.get('#number').type('1')
  cy.get('#title').type('Employee was late to work')
  cy.get('#description').type(description)

  offenseType.forEach((type) => {
    cy.get('#'+type).click()
  })

  cy.get('#create-offense-button').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function UpdateOffense({
  offense = "Employee was late to work",
  number = "1",
  title = "Employee was late to work",
  description = "Employee was late to work and was rude to customers",
  offenseType = ["Suspension"]
}={}){
  cy.get('#profile-button').should('be.visible').click()
  cy.wait(1000)
  cy.contains('Update Offense').click()
  cy.get('#profile-button').should('be.visible').click()
  cy.location('pathname').should('include', '/Offense/Update')
  cy.wait(1000)
  cy.get('#select-offense').click()
  cy.get('.css-1nmdiq5-menu')
  .contains(offense)
  .click();
  cy.get('#number').type(number)
  cy.get('#title').type(title)
  cy.get('#description').type(description)
  cy.wait(1000)
  // cy.get('#description')

  offenseType.forEach((type) => {
    console.log(type)
    // cy.get('#'+type).click()
  })

  cy.get('#update-offense-button').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
}

export function DeleteOffense(description){
  cy.get('#profile-button').should('be.visible').click()
  cy.contains('Delete Offense').click()
  cy.get('#select-offense').select(description)
  cy.get('#delete-offense-btn').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function CreateMemo(
  employee = 'John Doe Jr',
  memoCode = 'Employee was late to work and was rude to customers',
  subject = 'Workplace Safety Protocols',
  description = 'Reminder to adhere to updated safety protocols in the workplace. Ensure all employees are aware and compliant.',
  // reason = null,
  mediaList = 'smiley.png',
  memoPhotosList = 'mhm.png'
){
  cy.get('#profile-button').should('be.visible').click()
  cy.contains('Create Memorandum').click()
  cy.location('pathname').should('include', '/Memorandum/Create')
  cy.get('#date').type('2024-10-31')
  cy.get('#select-employee').select(employee)
  cy.get('#MemoCode').select(memoCode)
  cy.get('#subject').type(subject)
  cy.get('#description').type(description)
  // cy.get('#reason').type(reason)
  cy.get('input[type=file]#mediaList').attachFile(mediaList)
  cy.wait(1000)
  cy.get('input[type=file]#memoPhotosList').attachFile(memoPhotosList)
  cy.wait(1000)
  cy.get('#create-memo-btn').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function SubmitMemo(
  memo,
  reason,
  mediaList,
  memoPhotosList
){
  cy.get('#menu-button').click()
  cy.get('#submit-memorandum').click()
  cy.get('#select-memo').select(memo)
  cy.get('#reason').type(reason)
  cy.get('#mediaList').attachFile(mediaList)
  cy.get('#memoPhotosList').attachFile(memoPhotosList)
  cy.wait(1000)
  cy.get('#submit-memo-btn').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function DeleteMemo(memo){
  cy.get('#menu-button').click()
  cy.get('#delete-memorandum').click()
  cy.get('#select-memo').select(memo)
  cy.get('#delete-memo-btn').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
}

export function Dashboard(){
  cy.get('#dashboard-button').click()
  cy.location('pathname').should('include', '/Dashboard')
}