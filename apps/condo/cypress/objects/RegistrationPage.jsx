import SignInPage from "./SignInPage";

class RegistrationPage {

    visit() {
      const signIn = new SignInPage();
      signIn.visit()
      signIn.registration();
      cy.url().should('include', '/auth/register',)
    }
  
    fillPhone(value) {
      const field = cy.get(`[data-testid=RegisterPhoneItem] input`)
      field.clear()
      field.type(value)
      return this
    }

    fillSMSCode(value) {
      const field = cy.get(`[data-testid=RegisterSMSCodeItem] input`)
      field.clear()
      field.type(value)
      return this
    }
    
    fillFIO(value) {
      const field = cy.get(`[data-testid=RegistrationFIOItem] input`)
      field.clear()
      field.type(value)
      return this
    }    

    fillEmail(value) {
      const field = cy.get(`[data-testid=RegistrationEmailItem] input`)
      field.clear()
      field.type(value)
      return this
    }
        
    fillPass(value) {
      const field = cy.get(`[data-testid=RegistrationPasswordItem] input`)
      field.clear()
      field.type(value)
      return this
    }
        
    fillPass2(value) {
      const field = cy.get(`[data-testid=RegistrationPassword2Item] input`)
      field.clear()
      field.type(value)
      return this
    }

    submit() {
      const button = cy.get(`[data-testid=RegisterSubmitButton]`)
      button.click()
    }

    submit_second() {
      const button = cy.get(`[data-testid=RegisterSubmitSecondButton]`)
      button.click()
    }
  }
  
  export default RegistrationPage