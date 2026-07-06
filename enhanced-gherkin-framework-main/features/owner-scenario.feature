Test: Create new owner - valid
Open page "http://localhost:8080/owners/new"
Fill first name "John"
Fill last name "Doe"
Fill address "123 Main St"
Fill city "Springfield"
Fill telephone "5551234567"
Click add owner
Success message should be "New Owner Created"

Test: Find owners by last name – multiple results
Open page "http://localhost:8080/owners/find"
Fill last name "Davis"
Click find owner
Owner list has more than one row
Page contains "Owners"

Test: Find owners by last name - single result
Open page "http://localhost:8080/owners/find"
Fill last name "Franklin"
Click find owner
URL should be "/owners/1"
Page contains "George Franklin"

Test: Find owners – no results
Open page "http://localhost:8080/owners/find"
Fill last name "Unknown"
Click find owner
Error message should be "has not been found"

Test: Edit owner address successfully
Open page "http://localhost:8080/owners/1/edit"
Clear field "address"
Fill address "456 New Street"
Click add owner
Success message should be "Owner Values Updated"
Page contains "456 New Street"

Test: Telephone validation with multiple incorrect formats
For each phoneCase in ["abc;must be a 10-digit number", "123;must be a 10-digit number", "12345678901;must be a 10-digit number", "5551234567;New Owner Created"]
Open page "http://localhost:8080/owners/new"
Fill first name "John"
Fill last name "Doe"
Fill address "123 Main St"
Fill city "Springfield"
Fill telephone {значение}
Click add owner
If {ожидаемый результат} equals "New Owner Created"
Success message should be "New Owner Created"
Else
Error message should be {ожидаемый результат}
EndIf
EndLoop
