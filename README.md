This app is a Running and Obstacle course event tracking application. User creation and authentication is available along with the ability to view upcoming running events along with Obstacle course races. You can also add your own obstacle course race to the Map database! Additionally, you have the ability to view upcoming weather for these events straight from the national weather service.

-Stack: PERN
  -PostgreSQL:
    -Built data base for user authentication and obstacle course race tracking. Could not access an API for obstacle course races, so I built a table to hold courses that can be      submitted manually through a POST Request.
  -Controllers:
    -CRUD Operations completed via user authentication and account creation. Additionally queries have been optimized with the API to Create, Update, Edit and Delete Obstacle         Course races within the database. However only Create is utilized in the application for logical reasons. If the app was scaled further, I would implement further                administrative accounts, allowing for edit and deletion queries to be utilized.

  -Utilized Leaflet and React Libraries to generate map view and popup icons for front end display

-External API's
  -RunReg: Used to extract upcoming race events to be displayed on the map
  -NWS: Utilized to gather weather data based on the lat and lon of an upcoming race event identified on the map
