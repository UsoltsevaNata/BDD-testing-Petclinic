Feature: Pet Management

  Scenario: Add a new pet to existing owner
    When I navigate to the new pet page for owner with id 1
    And I fill pet name with "Alice"
    And I fill birth date with "2020-05-10"
    And I select pet type "cat"
    And I click "Add Pet"
    Then I should see "Alice" on the page

  Scenario: Duplicate pet name validation
    When I navigate to the new pet page for owner with id 1
    And I fill pet name with "Leo"
    And I fill birth date with "2010-09-07"
    And I select pet type "cat"
    And I click "Add Pet"
    Then I should see an error message "is already in use"

  Scenario: Birth date in future is rejected
    When I navigate to the new pet page for owner with id 1
    And I fill pet name with "Future"
    And I fill birth date with "2030-01-01"
    And I select pet type "dog"
    And I click "Add Pet"
    Then I should see an error message "invalid date"

  Scenario: Validate pet creation requires name
    When I navigate to the new pet page for owner with id 1
    And I fill birth date with "2020-05-10"
    And I select pet type "dog"
    And I click "Add Pet"
    Then I should see an error message "is required"

  Scenario: Validate pet creation requires birth date
    When I navigate to the new pet page for owner with id 1
    And I fill pet name with "NoBirth"
    And I select pet type "dog"
    And I click "Add Pet"
    Then I should see an error message "is required"

  Scenario: Edit pet name successfully
    When I navigate to the edit pet page for owner 1 and pet 1
    And I fill pet name with "LeoEdited"
    And I click "Update Pet"
    Then I should see "LeoEdited" on the page
