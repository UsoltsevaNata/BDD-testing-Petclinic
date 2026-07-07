# language: en
Feature: PetClinic Owner tests
  UI Element: firstName
  - id is "firstName"

  UI Element: lastName
  - id is "lastName"

  UI Element: address
  - id is "address"

  UI Element: city
  - id is "city"

  UI Element: telephone
  - id is "telephone"


  Scenario: Create new owner with valid data
  Variant: valid
    Given that I am on "http://localhost:8080/owners/new"
    When I fill "John" in {firstName}
    And I fill "Doe" in {lastName}
    And I fill "123 Main St" in {address}
    And I fill "Springfield" in {city}
    And I fill "5551234567" in {telephone}
    And I click on button "Add Owner"
    Then I see "New Owner Created"
  Scenario: Find owners by last name  multiple results
  Variant: multiple
    Given that I am on "http://localhost:8080/owners/find"
    When I fill "Davis" in {lastName}
    And I click on button "Find Owner"
    Then I see "Owners"
    And I see "Betty Davis"
    And I see "Harold Davis"

  Scenario: Find owners by last name  single result redirects
  Variant: single
    Given that I am on "http://localhost:8080/owners/find"
    When I fill "Franklin" in {lastName}
    And I click on button "Find Owner"
    Then I see "Owner Information"
    And I see "George Franklin"

  Scenario: Find owners no results
  Variant: none
    Given that I am on "http://localhost:8080/owners/find"
    When I fill "Unknown" in {lastName}
    And I click on button "Find Owner"
    Then I see "not been found"

  Scenario: Edit owner address successfully
  Variant: edit
    Given that I am on "http://localhost:8080/owners/1/edit"
    When I fill "456 New Street" in {address}
    And I click on button "Update Owner"
    Then I see "Owner Values Updated"
    And I see "456 New Street"

  Scenario: Telephone validation alphabetic
  Variant: alphabetic
    Given that I am on "http://localhost:8080/owners/new"
    When I fill "John" in {firstName}
    And I fill "Doe" in {lastName}
    And I fill "123 Main St" in {address}
    And I fill "Springfield" in {city}
    And I fill "abc" in {telephone}
    And I click on button "Add Owner"
    Then I see "must be a 10-digit number"

  Scenario: Telephone validation too short
  Variant: too_short
    Given that I am on "http://localhost:8080/owners/new"
    When I fill "John" in {firstName}
    And I fill "Doe" in {lastName}
    And I fill "123 Main St" in {address}
    And I fill "Springfield" in {city}
    And I fill "123" in {telephone}
    And I click on button "Add Owner"
    Then I see "must be a 10-digit number"

  Scenario: Telephone validation  too long
  Variant: too_long
    Given that I am on "http://localhost:8080/owners/new"
    When I fill "John" in {firstName}
    And I fill "Doe" in {lastName}
    And I fill "123 Main St" in {address}
    And I fill "Springfield" in {city}
    And I fill "12345678901" in {telephone}
    And I click on button "Add Owner"
    Then I see "must be a 10-digit number"

  Scenario: Telephone validation valid telephone
  Variant: valid_telephone
    Given that I am on "http://localhost:8080/owners/new"
    When I fill "John" in {firstName}
    And I fill "Doe" in {lastName}
    And I fill "123 Main St" in {address}
    And I fill "Springfield" in {city}
    And I fill "5551234567" in {telephone}
    And I click on button "Add Owner"
    Then I see "New Owner Created"
