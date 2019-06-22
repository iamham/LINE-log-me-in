# Log Me In (And I will tell you a secret)
A simple web application which let you log yourself in with LINE id, then it will show your display name and profile picture

### Tech Stack
1. Node.JS
2. Express.JS
3. Handlebars.JS
4. Axios.JS
5. LINE API
6. PM2 (Optional)

### How to install
1. Clone this repo
2. NPM install to install all dependencies
3. Run it via bin/www (node bin/www, PM2 start bin/www)
4. The application should be running on port 80

### How it work
1. When you access / at port 80 (normal http) it will show the landing page with login via LINE button
2. Click on Login via LINE will take you to LINE login page
3. When you authorise the permission it will take you to /callback which included auth code in a query param
4. Application will acquire User Profile from LINE Server via auth code (code from step 3)
5. Display you a Display Name, Profile Picture from the response

** Please note this is experimental project and should not be run on a production server.
