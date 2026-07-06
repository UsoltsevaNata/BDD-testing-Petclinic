Feature: Veterinarian Management

  Scenario: View vets as HTML with loop
    When I navigate to "/vets.html?page=1"
    Then I should see "James Carter" on the page
    And I should see "Helen Leary" on the page
    And I should see "Linda Douglas" on the page
    And I should see "Rafael Ortega" on the page
    And I should see "Henry Stevens" on the page
    And I should not see "Sharon Jenkins" on the page
