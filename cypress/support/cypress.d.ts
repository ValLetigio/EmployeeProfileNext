// cypress.d.ts
declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to attach a file in Cypress tests.
       * @param fixturePath - Path to the file in the `cypress/fixtures` folder.
       * @param options - Optional options object.
       */
      attachFile(fixturePath: string, options?: any): Chainable<Subject>;
    }
  }
  