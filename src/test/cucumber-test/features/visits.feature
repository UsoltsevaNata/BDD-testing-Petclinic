Feature: Visit Management

  Scenario: Add a visit to a pet
    When I navigate to the new visit page for owner 1 and pet 1
    And I fill visit date with "2020-05-10"
    And I fill description with "health check"
    And I click "Add Visit"
    Then I should see the message "Your visit has been booked"
    When I navigate to "/owners/1"
    Then I should see "health check" on the page

  Scenario: Visit with empty description shows error
    When I navigate to the new visit page for owner 1 and pet 1
    And I click "Add Visit"
    Then I should see an error message "must not be blank"

  Scenario: Add multiple visits
    When I navigate to the new visit page for owner 1 and pet 1
    And I fill description with "Checkup 1"
    And I click "Add Visit"
    Then I should see the message "Your visit has been booked"
    When I navigate to the new visit page for owner 1 and pet 1
    And I fill description with "Vaccination"
    And I click "Add Visit"
    Then I should see the message "Your visit has been booked"
    When I navigate to the new visit page for owner 1 and pet 1
    And I fill description with "Dental cleaning"
    And I click "Add Visit"
    Then I should see the message "Your visit has been booked"
    When I navigate to "/owners/1"
    Then I should see "Checkup 1" on the page
    And I should see "Vaccination" on the page
    And I should see "Dental cleaning" on the page
