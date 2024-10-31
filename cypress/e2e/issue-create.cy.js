import { faker } from "@faker-js/faker";

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        // System will already open issue creating modal in beforeEach block
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  it("Should create an issue and validate it successfully", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(".ql-editor").type("TEST_DESCRIPTION");
      cy.get(".ql-editor").should("have.text", "TEST_DESCRIPTION");

      cy.get('input[name="title"]').type("TEST_TITLE");
      cy.get('input[name="title"]').should("have.value", "TEST_TITLE");

      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:story"]').should("be.visible");

      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("TEST_TITLE")
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
            cy.get('[data-testid="icon:story"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains("TEST_TITLE")
      .within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
        cy.get('[data-testid="icon:story"]').should("be.visible");
      });
  });

  it("Should validate title is required field if missing", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="form-field:title"]').should(
        "contain",
        "This field is required"
      );
    });
  });

  it("Should create an custom issue with given data and validate it successfully", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Adding description
      cy.get(".ql-editor").type("My bug description");
      cy.get(".ql-editor").should("have.text", "My bug description");

      // Adding title
      cy.get('input[name="title"]').type("Bug");
      cy.get('input[name="title"]').should("have.value", "Bug");

      // Selecting Issue type
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:bug"]').should("be.visible");

      // Selecting Issue priority
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:arrow-up"]').should("be.visible");

      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("Bug")
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
            cy.get('[data-testid="icon:bug"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains("Bug")
      .within(() => {
        cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
        cy.get('[data-testid="icon:bug"]').should("be.visible");
      });
  });

  it("Should create an issue with random data plugin and validate it successfully", () => {
    const title = faker.lorem.word(5);
    const description = faker.lorem.sentences(2);
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Adding description
      cy.get(".ql-editor").type(description);
      cy.get(".ql-editor").should("have.text", description);

      // Adding title
      cy.get('input[name="title"]').type(title);
      cy.get('input[name="title"]').should("have.value", title);

      // Make sure Issue type "Task" is selected
      cy.get('[data-testid="icon:task"]').should("be.visible");

      // Selecting Issue priority
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:arrow-down"]').should("be.visible");

      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains(title)
          .siblings()
          .within(() => {
            cy.get('[data-testid="icon:task"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains(title)
      .within(() => {
        cy.get('[data-testid="icon:task"]').should("be.visible");
      });
  });
});
