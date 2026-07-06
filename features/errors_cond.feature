# language: en
Feature: PetClinic Error handling

  Scenario: Trigger exception page
  Variant: oups
    Given that I am on "http://localhost:8080/oups"
    Then I see "Expected: controller used to showcase"

  Scenario: Non-existent owner
  Variant: non_existent
    Given that I am on "http://localhost:8080/owners/7777"
    Then I see "Owner not found with id"
