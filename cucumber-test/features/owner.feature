Feature: Owner Management

  Scenario: Create new owner - valid
    When I navigate to the new owner page
    And I fill first name with "John"
    And I fill last name with "Doe"
    And I fill address with "123 Main St"
    And I fill city with "Springfield"
    And I fill telephone with "5551234567"
    And I click "Add Owner"
    Then I should see the message "New Owner Created"

  Scenario: Find owners by last name – multiple results
    When I navigate to the find owners page
    And I fill last name with "Davis"
    And I click "Find Owner"
    Then I should see a list of owners
    And the list should contain at least 2 owners
    And I should see "Owners" on the page

  Scenario: Find owners by last name - single result
    When I navigate to the find owners page
    And I fill last name with "Franklin"
    And I click "Find Owner"
    Then I should be redirected to the owner details page
    And I should see "George Franklin" on the page

  Scenario: Find owners – no results
    When I navigate to the find owners page
    And I fill last name with "Unknown"
    And I click "Find Owner"
    Then I should see an error message "has not been found"

  Scenario: Edit owner address successfully
    When I navigate to the edit page for owner with id 1
    And I clear the address field
    And I fill address with "456 New Street"
    And I click "Update Owner"
    Then I should see the message "Owner Values Updated"
    And I should see "456 New Street" on the page

  Scenario Outline: Telephone validation with incorrect formats
    When I navigate to the new owner page
    And I fill first name with "John"
    And I fill last name with "Doe"
    And I fill address with "123 Main St"
    And I fill city with "Springfield"
    And I fill telephone with "<telephone>"
    And I click "Add Owner"
    Then I should see an error message "must be a 10-digit number"
    Examples:
      | telephone |
      | abc       |
      | 123       |
      | 12345678901 |

  Scenario: Telephone validation with valid format
    When I navigate to the new owner page
    And I fill first name with "John"
    And I fill last name with "Doe"
    And I fill address with "123 Main St"
    And I fill city with "Springfield"
    And I fill telephone with "5551234567"
    And I click "Add Owner"
    Then I should see the message "New Owner Created"
