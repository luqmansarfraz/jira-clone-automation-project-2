describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  it.only("Should create,edit and delete a comment successfully", () => {
    const comment = "TEST-luqman";
    const edittedcomment = "test-luqman";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains("button", "Save").click().should("not.exist");
    });

    cy.contains("Add a comment...").should("exist");
    cy.get('[data-testid="issue-comment"]').should("contain", comment);
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");
      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", comment)
        .clear()
        .type(edittedcomment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", edittedcomment);
    });
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();
    cy.get('[data-testid="modal:confirm"]')
      .contains("Delete comment")
      .click()
      .should("not.exist");
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("exist")
      .should("not.contain", "text-luqman");
  });
});
