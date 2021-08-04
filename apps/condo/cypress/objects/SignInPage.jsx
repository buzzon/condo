class SignInPage {
    visit() {
      cy.visit('/auth/signin?next=%2Fuser')
    }
  
    getPhoneError() {
      return cy.get(`[data-testid=SignInPhoneItem] [role=alert]`)
    }
  
    getPasswordError() {
      return cy.get(`[data-testid=SignInPasswordItem] [role=alert]`);
    }
  
    fillPhone(value) {
      const field = cy.get(`[data-testid=SignInPhoneItem]`).find('input')
      field.clear()
      field.type(value)
      return this
    }
  
    fillPassword(value) {
      const field = cy.get(`[data-testid=SignInPasswordItem]`).find('input')
      field.clear()
      field.type(value)
  
      return this
    }
  
    submit() {
      const button = cy.get(`[data-testid=SignInSubmitButton]`)
      button.click()
    }
  }
  
  export default SignInPage