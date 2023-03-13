# E-Commerce Back End

## User Story
**AS A** manager at an internet retail company<br>
**I WANT** a back end for my e-commerce website that uses the latest technologies<br>
**SO THAT** my company can compete with other e-commerce companies

## Acceptance Criteria
**GIVEN** a functional Express.js API
- **WHEN** I add my database name, MySQL username, and MySQL password to an environment variable file<br>
**THEN** I am able to connect to a database using Sequelize
- **WHEN** I enter schema and seed commands<br>
**THEN** a development database is created and is seeded with test data
- **WHEN** I enter the command to invoke the application<br>
**THEN** my server is started and Sequelize models are synced to the MySQL database
- **WHEN** I open API GET routes in Insomnia Core for categories, products, or tags<br>
**THEN** the data for each of the routes is dispalyed in a formatted JSON
- **WHEN** I test API POST, PUT, and DELETE routes in Insomnia Core<br>
**THEN** I am able to successfully create, update, and delete data in my database.