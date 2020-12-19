# Proyecto2_Ironhack

## Description

An application in which you can get your favourite pokémon, fight against other trainers and become the number 1.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can start using the app. After first sign up, the user receive the first set of pokecards
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **user profile** - As a user I want to have an overview of my personal data and access to my cards, to the combat area and to the rankings.
- **edit user** - As a user I want to be able to edit my profile.
- **cards portfolio** - As a user I want to be able to see the Pokemon cards which aktually belong to me.
- **combat area** - As a user I want to be able to create a combat, see the already available combats of others users, be able to join these combats and finally see the finished combats.
- **combat ring** - As a user I want to be able to see the result of a finished combat.
- **ranking** - As a user I want to be able to see a list of the best Pokemon trainers and where am I in the ranking.


<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  username, email, password  }                          |
| `GET`      | `/private/first-login`             | Checks if the user has no cards (firstlogin) and assign 6 random cards to the user in the DB |                          |
| `GET`      | `/private/user-profile`            | Private route. Renders the user overview info and options    |                                                          |  
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |   
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, username, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/cards `                   | Private route. Render the `cards` view.                  |                                                          |
| `GET`      | `/private/card/:id `                   | Private route. Render the `card` view.                  |                                                          |
| `GET`      | `/private/combats `                 | Private route. Render the `combats` view.                  |                                                          |
| `POST`     | `/private/newCombat/`              | Private route. Adds a new combat                             | { username, cardnumber }                                 |
| `GET`      | `/private/combats/:id `                 | Private route. Render the `combat`view                 |                                                          |
| `POST`      | `/private/combats/:id `                 | Private route. Render the `combat/resultado`view          |    { username, cardnumber }                             |
| `GET`      | `/private/rankings `                   | Private route. Render the `rankings` view.                  |                                                          |
| `DELETE`   | `/private/combats/:id            ` | Private route. Delete a combatresult or a still not accepted combat |                                                          |

