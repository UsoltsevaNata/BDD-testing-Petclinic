# language: en
Feature: PetClinic Vet tests

  UI Element: vetTable
  - id is "#vets"

  Scenario: View vets as HTML with pagination
  Variant: first_page
    Given that I am on "http://localhost:8080/vets.html?page=1"
    Then I see "James Carter"
    And I see "Helen Leary"
    And I see "Linda Douglas"
    And I see "Rafael Ortega"
    And I see "Henry Stevens"
    And I do not see "Sharon Jenkins"
