/// <reference types="Cypress" />

describe("Contact Form", () => {
  it("should submit the form", () => {
    cy.visit('http://127.0.0.1:5173/about');
    cy.get('[data-cy="contact-input-message"]').type("Hello world!");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");

    cy.get('[data-cy="contact-btn-submit"]').then(el => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.get('[data-cy="contact-input-email"]').type("test@example.com{enter}");

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains("Send Message")
    //   .should("not.have.attr", "disabled");

    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").click()
      .contains("Sending...")
      .should("have.attr", "disabled");
  });
});