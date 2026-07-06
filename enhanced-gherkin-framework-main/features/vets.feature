Test: View vets as HTML with loop
Open page "http://localhost:8080/vets.html?page=1"
Для каждого vetName в ["James Carter", "Helen Leary", "Linda Douglas", "Rafael Ortega", "Henry Stevens","Sharon Jenkins"]
Если vetName equals "Sharon Jenkins"
Page does not contain vetName
Иначе
Page contains {vetName}
КонецЕсли
EndLoop

