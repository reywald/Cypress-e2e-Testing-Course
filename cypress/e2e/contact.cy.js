/// <reference types="Cypress" />

describe("Contact Form", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should submit the form", () => {
    cy.get('[data-cy="contact-input-message"]').type("Hello world!");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");

    cy.get('[data-cy="contact-btn-submit"]').then(el => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.get('[data-cy="contact-input-email"]').type("test@example.com");
    cy.submitForm();

    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").click()
      .contains("Sending...")
      .should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.submitForm();
    cy.get('[data-cy="contact-btn-submit"]').then(el => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");

    cy.get('[data-cy="contact-input-message"]').focus().blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .as("para");
    cy.get("@para").should("have.attr", "class");
    cy.get("@para").then(el => {
      expect(el.attr("class")).to.contain("invalid");
    });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .as("para");
    cy.get("@para").should("have.attr", "class");
    cy.get("@para").then(el => {
      expect(el.attr("class")).to.contain("invalid");
    });

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]').parent()
      .as("para");
    cy.get("@para").should("have.attr", "class");
    cy.get("@para").then(el => {
      expect(el.attr("class")).to.contain("invalid");
    });
  });
});