import HomePage from "../../objects/HomePage";
import SignInPage from "../../objects/SignInPage";

describe('Sign In', () => {

  it('Auto transition to the authorization page', () => {
    const home = new HomePage();
    home.visit();
    cy.url({ timeout: 10000 }).should('include', '/auth/signin',)
  });

  it('Empty Phone', () => {
    cy.fixture('user.json').then(user => {
      const signIn = new SignInPage();
      signIn.visit()
      signIn
        .fillPhone("+7")
        .fillPassword(user.password)
        .submit()
      signIn.getPhoneError()
    })
  })

  it('Empty Password', () => {
    cy.fixture('user.json').then(user => {
      const signIn = new SignInPage();
      signIn.visit()
      signIn
        .fillPhone(user.phone)
        .fillPassword(" ")
        .submit()
      signIn.getPasswordError()
    })
  })

  it('Wrong Password', () => {
    cy.fixture('user.json').then(user => {
      const signIn = new SignInPage();
      signIn.visit()
      signIn
        .fillPhone(user.phone)
        .fillPassword(user.password + "wrong")
        .submit()
      signIn.getPasswordError()
    })
  })

  it('Good Sign In', () => {
    cy.fixture('user.json').then(user => {
      const signIn = new SignInPage();
      signIn.visit()
      signIn
        .fillPhone(user.phone)
        .fillPassword(user.password)
        .submit();
      cy.url().should('eq', HomePage.getUrl());
    })
  })
})