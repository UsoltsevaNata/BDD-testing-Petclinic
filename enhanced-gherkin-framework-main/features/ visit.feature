Test: Add a visit to a pet
Open page "http://localhost:8080/owners/1"
Click add visit for pet "Leo"
Fill visit date "2020-05-10"
Fill description "health check"
Click add visit
Если страница содержит "Your visit has been booked"
Success message should be "Your visit has been booked"
Иначе
Должен увидеть ошибку ""
КонецЕсли
Open page "http://localhost:8080/owners/1"
See at least one visit for pet "Leo"

Test: Visit with empty description shows error
Open page "http://localhost:8080/owners/1/pets/1/visits/new"
Click add visit
Error message should be "must not be blank"

Test: Add multiple visits
For each visitDesc in ["Checkup 1", "Vaccination", "Dental cleaning"]
Open page "http://localhost:8080/owners/1"
Click add visit for pet "Leo"
Fill description {visitDesc}
Click add visit
EndLoop
Open page "http://localhost:8080/owners/1"
For each visitDesc in ["Checkup 1", "Vaccination", "Dental cleaning"]
Page contains {visitDesc}

