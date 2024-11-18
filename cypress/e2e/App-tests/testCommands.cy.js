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
  address = "1234 Elm Street, Springfield",
  phoneNumber = "+1234567890",
  photoOfPerson = 'minor.png',
  resumePhotosList = 'smiley.png',
  biodataPhotosList = 'mhm.png',
  email = "johndoe@example.com",
  dateJoined = "2024-11-01",
  company = "TechCorp Inc.",
  dailyWage = "500"
){
  cy.get('#menu-button').should('be.visible').click()

  cy.get('#create-employee').should('be.visible').click()
  cy.url().should('include', '/Employee/Create')

  cy.get('#name').type(name)
  cy.get('#address').type(address)
  cy.get('#phoneNumber').type(phoneNumber)
  cy.get('input[type=file]#photoOfPerson').attachFile(photoOfPerson)
  cy.get('input[type=file]#resumePhotosList').attachFile(resumePhotosList)
  cy.get('input[type=file]#biodataPhotosList').attachFile(biodataPhotosList)
  cy.get('#email').type(email)
  cy.get('#dateJoined').type(dateJoined)
  cy.get('#company').type(company)
  cy.get('#isRegular').check()
  cy.get('#isProductionEmployee').uncheck()
  cy.get('#dailyWage').type(dailyWage)

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
  cy.get('#menu-button').click()
  cy.get('#update-employee').click()

  cy.get('#Employee').select(employee)
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
  cy.get('#menu-button').click()
  cy.get('#delete-employee').click()
  cy.get('#Employee').select(name)
  cy.get('#delete-employee-btn').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
  cy.wait(4000)
}

export function CreateOffense(
  description = "Employee was late to work",
  offenseType = ["Verbal-Warning", "Written-Warning"],
){
  cy.get('#menu-button').click()
  cy.get('#create-offense').click()
  cy.location('pathname').should('include', '/Offense/Create')
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
  description = "Employee was late to work and was rude to customers",
  offenseType = ["Suspension"]
}={}){
  cy.get('#menu-button').click()
  cy.wait(1000)
  cy.get('#update-offense').click()
  cy.location('pathname').should('include', '/Offense/Update')
  cy.wait(1000)
  cy.get('#select-offense').select(offense)
  cy.get('#description').clear()
  cy.wait(1000)
  cy.get('#description').type(description)

  offenseType.forEach((type) => {
    cy.get('#'+type).click()
  })

  cy.get('#update-offense-button').click()
  cy.wait(1000)
  cy.get('#confirm-button').click()
}

export function DeleteOffense(description){
  cy.get('#menu-button').click()
  cy.get('#delete-offense').click()
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
  reason = 'To ensure employee safety and compliance with regulations.',
  mediaList = 'smiley.png',
  memoPhotosList = 'mhm.png'
){
  cy.get('#menu-button').click()
  cy.get('#create-memorandum').click()
  cy.location('pathname').should('include', '/Memorandum/Create')
  cy.get('#date').type('2024-10-31')
  cy.get('#select-employee').select(employee)
  cy.get('#MemoCode').select(memoCode)
  cy.get('#subject').type(subject)
  cy.get('#description').type(description)
  cy.get('#reason').type(reason)
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