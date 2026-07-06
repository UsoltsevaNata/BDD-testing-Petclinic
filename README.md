# BDD Testing for Spring PetClinic

This repository contains automated BDD (Behavior-Driven Development) test suites for the **Spring PetClinic** sample application – a classic web-based veterinary clinic management system.

## Tested Application

The **Spring PetClinic** application is an open‑source reference project maintained by the Spring community. It demonstrates the use of Spring Boot, Spring MVC, Thymeleaf, and Hibernate. The application provides functionality for managing owners, pets, visits, and veterinarians.

All tests in this repository are written against the official Spring PetClinic codebase, which can be found at:  
[https://github.com/spring-projects/spring-petclinic](https://github.com/spring-projects/spring-petclinic)

## Test Frameworks Used

We implemented identical test scenarios using **three different BDD frameworks** to compare their performance, expressiveness, and maintainability:

1. **Cucumber (JavaScript)** – the classic Gherkin-based framework.
2. **Enhanced Gherkin Framework** – an extended version that adds loops, conditions, and variables to plain Gherkin.
3. **ConcordiaLang** – a meta‑language for requirement specification and automatic test generation.

The test coverage includes:
- Owner management (create, search, edit, validation)
- Pet management (add, edit, duplicate name checks, date validation)
- Visit management (add visits, multiple visits, empty description validation)
- Veterinarian listing
- Error handling (exception pages, non‑existent owners)

## License

**The Spring PetClinic application** is licensed under the **Apache License 2.0**, and its copyright remains with the original authors (Spring project contributors).

**The test code** in this repository (BDD scenarios, step definitions, configuration files) is provided for educational and research purposes. You may use, modify, and distribute it freely, provided that proper attribution is given to the original authors of the tests.

**Important:** This repository does **not** redistribute the Spring PetClinic source code; it only contains test scripts that interact with the running application. The intellectual property of the tested application belongs solely to its respective owners.

---

## How to Run the Tests


---

**Author:** Natalia Usoltseva  
**Course:** Applied Informatics, SPbPU  
**Date:** July 2026
