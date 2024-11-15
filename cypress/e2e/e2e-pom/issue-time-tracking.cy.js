import issueTimeTrackingPom from "../../pages/issue-time-tracking-pom.js";

describe("time tracking issue  adding,editing and removing suite", () => {
  beforeEach(() => {
    issueTimeTrackingPom.beforeEachHandler();
  });
  it("Should add estimate time, edit it, and remove it successfully", () => {
    const addTime = "4"; // Time to add initially
    const editTime = "6"; // Time to add after editing

    issueTimeTrackingPom.getIssueDetailModal().within(() => {
      // Retrieve the existing value if present
      cy.get(issueTimeTrackingPom.estimateTimeSelector)
        .invoke("val")
        .then((existingValue) => {
          const initialValue = existingValue ? parseInt(existingValue) : 0;

          // Calculate the expected value after adding new time
          const expectedAddValue = initialValue + parseInt(addTime);

          // Add estimate time
          cy.get(issueTimeTrackingPom.estimateTimeSelector)
            .click()
            .clear()
            .type(expectedAddValue)
            .should("have.value", `${expectedAddValue}`);

          // Calculate the expected value after editing
          const expectedEditValue = parseInt(editTime); // Assume editing replaces value
          cy.get(issueTimeTrackingPom.estimateTimeSelector)
            .click()
            .clear()
            .type(expectedEditValue)
            .should("have.value", `${expectedEditValue}`);

          // Remove estimate time and validate
          cy.get(issueTimeTrackingPom.estimateTimeSelector)
            .clear()
            .should("not.have.value");
        });
    });
  });

  it("Should add logged time and validate it", () => {
    const loggedTime = "6";

    // Log time and validate
    issueTimeTrackingPom.logTime(loggedTime);

    // Validate the logged time is displayed correctly
    issueTimeTrackingPom.getIssueDetailModal().within(() => {
      cy.get(issueTimeTrackingPom.timeLogSelector)
        .siblings("div")
        .contains(`${loggedTime}h logged`)
        .should("be.visible");
    });
  });
});
