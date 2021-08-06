
class HomePage {

  static url = 'http://localhost:3000/';

  visit() {
    cy.visit(HomePage.url)
  }
}

export default HomePage;