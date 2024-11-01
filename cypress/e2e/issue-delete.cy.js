describe("test suite for delete function", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then(() => {
        cy.contains("This is an issue of type: Task.")
          .click()
          .then(() => {});
      });
  });

  it("Test case for issue deletion", () => {
    getIssueDetailsModal().should("be.visible");
    cy.get('[data-testid="icon:trash"]').should("be.visible").click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Delete issue").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    getIssueDetailsModal().should("not.exist");
    cy.reload();

    cy.get("Issue has been successfully deleted").should("not.exist");
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]').should("have.length", "3");
        cy.contains("This is an issue of type: Task.").should("not.exist");
      });
  });

  it("Issue deletion cancelation ", () => {
    getIssueDetailsModal().should("be.visible");
    cy.get('[data-testid="icon:trash"]').should("be.visible").click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Cancel").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="modal:issue-details"]')
      .should("be.visible")
      .within(() => {
        cy.get('[data-testid="icon:close"]').first().click();
      });
    cy.get("Issue has not been deleted").should("not.exist");
    cy.get('[data-testid="board-list:backlog"]').should("be.visible");
    cy.contains("This is an issue of type: Task.").should("exist");
  });
});

const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
