Feature: Error Handling

  Scenario: Trigger exception page
    When I navigate to "/oups"
    Then I should see "Expected: controller used to showcase" on the page

  Scenario:Non-existent owner
    When I navigate to "/owners/7777"
    Then I should see "Owner not found with id:" on the page
