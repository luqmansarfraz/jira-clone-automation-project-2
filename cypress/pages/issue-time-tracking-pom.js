class IssueTimeTracking {
  constructor() {
    this.modalSelector = '[data-testid="modal:issue-details"]';
    this.estimateTimeSelector = 'input[placeholder="Number"]';
    this.timeLogSelector = '[data-testid="icon:stopwatch"]';
    this.timeLogModalSelector = '[data-testid="modal:tracking"]';
    this.doneButtonSelector = 'button:contains("Done")';
  }

  beforeEachHandler() {
    cy.visit("/");
    cy.url().should("include", "/project/board");
    cy.contains("This is an issue of type: Task.").should("be.visible").click();
  }

  getIssueDetailModal() {
    return cy.get(this.modalSelector);
  }

  getTimeLoggingModal() {
    return cy.get(this.timeLogModalSelector);
  }

  addTime(addTime, editTime) {
    this.getIssueDetailModal().within(() => {
      cy.get(this.estimateTimeSelector)
        .click()
        .clear()
        .type(addTime)
        .should("have.value", addTime);

      cy.get(this.estimateTimeSelector)
        .click()
        .clear()
        .type(editTime)
        .should("have.value", editTime);

      cy.get(this.estimateTimeSelector)
        .click()
        .clear()
        .should("not.have.value");
    });
  }

  logTime(time) {
    // Getting Issue Modal
    this.getIssueDetailModal().within(() => {
      // Open Time Logging Selector
      cy.get(this.timeLogSelector).click();
    });

    // I had to get the logging modal separately, because it doesn't exist inside the issue details modal
    this.getTimeLoggingModal()
      .should("exist")
      .within(() => {
        cy.get(this.estimateTimeSelector)
          .first()
          .click()
          .clear()
          .type(time)
          .should("have.value", time);
        cy.get(this.doneButtonSelector).click();
      });

    this.getIssueDetailModal().within(() => {
      cy.get(this.timeLogSelector).siblings("div").contains(`${time}h logged`);
    });
  }
}

export default new IssueTimeTracking();
