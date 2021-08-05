import HomePage from "./HomePage";

class SignInPage {

    visit() {
      cy.visit(HomePage.url);
      cy.url().should('include', '/auth/signin',)
    }

    getPhoneError() {
      return cy.get(`[data-testid=SignInPhoneItem] [role=alert]`)
    }
  
    getPasswordError() {
      return cy.get(`[data-testid=SignInPasswordItem] [role=alert]`);
    }
  
    fillPhone(value) {
      const field = cy.get(`[data-testid=SignInPhoneItem] input`)
      field.clear()
      field.type(value)
      return this
    }
  
    fillPassword(value) {
      const field = cy.get(`[data-testid=SignInPasswordItem] input`)
      field.clear()
      field.type(value)
  
      return this
    }
  
    submit() {
      const button = cy.get(`[data-testid=SignInSubmitButton]`)
      button.click()
    }

    registration() {
      const button = cy.get(`[data-testid=SignInRegistrationButton]`)
      button.click()
    }
  }
  
  export default SignInPage