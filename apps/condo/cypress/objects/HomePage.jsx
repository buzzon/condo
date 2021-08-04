import SignInPage from "./SignInPage";

class HomePage {
  
  visit() {
    cy.visit('/');
  }
  
  // getUserAvatar() {
  //   return cy.get(`[data-testid=UserAvatar]`);
  // }
  
  // goToSignIn() {
  //   const link = getSignInLink();
  //   link.click();

  //   const signIn = new SignInPage();
  //   return signIn;
  // }

  // getSignInLink() {
  //   return cy.get(`[data-testid=SignInLink]`);
  // }
}

export default HomePage;