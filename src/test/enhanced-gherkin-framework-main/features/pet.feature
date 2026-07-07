Test: Add a new pet to existing owner
Open page "http://localhost:8080/owners/1/pets/new"
Fill pet name "Alice"
Fill birth date "2020-05-10"
Select type "cat"
Click add pet
Page contains "Alice"

Test: Duplicate pet name validation
Open page "http://localhost:8080/owners/1/pets/new"
Fill pet name "Leo"
Fill birth date "2010-09-07"
Select type "cat"
Click add pet
Error message should be "is already in use"

Test: Birth date in future is rejected
Open page "http://localhost:8080/owners/1/pets/new"
Fill pet name "Future"
Fill birth date "2030-01-01"
Select type "dog"
Click add pet
Error message should be "invalid date"

Test: Validate pet creation requires name
Open page "http://localhost:8080/owners/1/pets/new"
Fill birth date "2020-05-10"
Select type "dog"
Click add pet
Error message should be "is required"

Test: Validate pet creation requires birth date
Open page "http://localhost:8080/owners/1/pets/new"
Fill pet name "NoBirth"
Select type "dog"
Click add pet
Error message should be "is required"

Test: Edit pet name successfully
Open page "http://localhost:8080/owners/1/pets/1/edit"
Fill pet name "LeoEdited"
Click button "Update Pet"
Page contains "LeoEdited"
