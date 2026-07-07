# language: en
Feature: PetClinic Visit tests

  UI Element: visitDate
  - id is "date"

  UI Element: visitDescription
  - id is "description"

  Scenario: Add a visit to a pet
  Variant: add
    Given that I am on "http://localhost:8080/owners/1/pets/1/visits/new"
    When I fill "2020-05-10" in {visitDate}
    And I fill "health check" in {visitDescription}
    And I click on button "Add Visit"
    Then I see "Your visit has been booked"
    And I am on "http://localhost:8080/owners/1/"
    And I see "health check"

  Scenario: Visit with empty description shows error
  Variant: empty_desc
    Given that I am on "http://localhost:8080/owners/1/pets/1/visits/new"
    When I click on button "Add Visit"
    Then I see "must not be blank"

  Scenario: Add multiple visits
  Variant: multi
    Given that I am on "http://localhost:8080/owners/1/pets/1/visits/new"
    When I fill "Checkup 1" in {visitDescription}
    And I click on button "Add Visit"
    And I see "Your visit has been booked"
    And that I am on "http://localhost:8080/owners/1/pets/1/visits/new"
    And I fill "Vaccination" in {visitDescription}
    And I click on button "Add Visit"
    And I see "Your visit has been booked"
    And that I am on "http://localhost:8080/owners/1/pets/1/visits/new"
    And I fill "Dental cleaning" in {visitDescription}
    And I click on button "Add Visit"
    And I see "Your visit has been booked"
    And I am on "http://localhost:8080/owners/1"
    Then I see "Checkup 1"
    And I see "Vaccination"
    And I see "Dental cleaning"
