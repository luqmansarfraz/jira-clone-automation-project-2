describe("test suite for delete function", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then(() => {
        cy.contains("This is an issue of type: Task.")
          .click()
          .then(() => {
            getIssueDetailsModal().should("be.visible");
          });
      });
  });

  it("Test case for issue deletion", () => {
    getIssueDetailsModal().within(() => {
      cy.get("Delete Icon").should("be.visible").click();
    });

    cy.get('[data-testid="confirm:modal"]')
      .should("be.visibile")
      .within(() => {
        cy.get("confirm_button").should("be.visible").click();
      });

    cy.get('[data-testid="confirm:modal"]').shouldnot("be.visible");
    getIssueDetailsModal().shouldnot("be.visible");

    // Reload?

    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]').should("have.length", "3");
        cy.doesntcontain("This is an issue of type: Task.");
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
});
