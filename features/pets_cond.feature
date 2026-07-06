# language: en
Feature: PetClinic Pet tests

  UI Element: petName
  - id is "name"

  UI Element: birthDate
  - id is "birthDate"

  UI Element: petType
  - id is "type"

  Scenario: Add a new pet to existing owner
  Variant: add
    Given that I am on "http://localhost:8080/owners/1/pets/new"
    When I fill "Alice" in {petName}
    And I fill "10-05-2020" in {birthDate}
    And I select "cat" from {petType}
    And I click on button "Add Pet"
    Then I see "Alice"

  Scenario: Duplicate pet name validation
  Variant: duplicate
    Given that I am on "http://localhost:8080/owners/1/pets/new"
    When I fill "Leo" in {petName}
    And I fill "07-09-2010" in {birthDate}
    And I select "cat" from {petType}
    And I click on button "Add Pet"
    Then I see "is already in use"

  Scenario: Birth date in future is rejected
  Variant: future
    Given that I am on "http://localhost:8080/owners/1/pets/new"
    When I fill "Future" in {petName}
    And I fill "01-01-2030" in {birthDate}
    And I select "dog" from {petType}
    And I click on button "Add Pet"
    Then I see "invalid date"

  Scenario: Pet creation requires name
  Variant: missing_name
    Given that I am on "http://localhost:8080/owners/1/pets/new"
    When I fill "10-05-2020" in {birthDate}
    And I select "dog" from {petType}
    And I click on button "Add Pet"
    Then I see "is required"

  Scenario: Pet creation requires birth date
  Variant: missing_birth
    Given that I am on "http://localhost:8080/owners/1/pets/new"
    When I fill "NoBirth" in {petName}
    And I select "dog" from {petType}
    And I click on button "Add Pet"
    Then I see "is required"

  Scenario: Edit pet name successfully
  Variant: edit
    Given that I am on "http://localhost:8080/owners/1/pets/1/edit"
    When I fill "LeoEdited" in {petName}
    And I click on button "Update Pet"
    Then I see "LeoEdited"
