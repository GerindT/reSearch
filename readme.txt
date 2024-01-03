Welcome to ResearchGay a website for AI research papers inspired by ResearchGate and ArXiv

Technologies used:
    -Frontend:
        React js bootsraped by Vite
        Tailwind Css with Flowbite
        Eslint and Prettier
    -Backend:
        PHP    ----|
        Mysql  ----| -> All Bootstraped by XAMPP
        Apache ----|
        Docker for deployment
    
Features:
All typical CRUD features like:
-User creation (authentication),deletion,modification and information
-Comment creation,deletion,modification and information
-Paper creation,deletion,information but cannot modify for integrity purposies
-Users have 3 roles, normal users,superusers(moderators),admin
-Admin can asign superusers and have access to the dashboard and all the features superusers have
-Superusers can verify papers in the categories they are assign at, they cannot create other superusers
-Users can create new papers and comment, they can favorite papers and modify their accounts
-Search by title and category that is choosen, pages for erros,success and loading to have consistency of data

Api Endpoints:
-Enpoints are based on REST api structure and some actions mixed in to use it better with the PHP structure
    -/index.php:
        -GET -> Gets the user info if there is a session in place or not, and all the categories as well
        -POST -> Seperated by actions:
                -Register: Create new user with password hashing
                -Login: Create a session if the user info are correctly send
                -Update: Change user settings, mainly the avatar using the $_FILES global var
        -DELETE-> Destroy the session when user sign's out
    -/posts.php:
        -GET -> Gets all the post with all the needed data, key thing here are string concatination and using joins
        -POST -> Add a new post to the posts table, keeping in mind the file uploading of a PDF paper (for deployment it can range until 5mb)
    -/singlePost.php:
        -GET -> Gets a single post with all the data like in posts.php
        -PUT -> Seperated by actions:
                -updateVerification: Used in the moment a admin or superuser updates the status of a paper into a verified one (this goes only one way)
                -toggleFavorite: Used when a user wants to favorite a paper (works as a toggle you can favorite and unfavorite)
        -DELETE -> Deletes a single post given the id, the user is verified before the request is done
    -/comments.php:
        -POST -> Creates a single comment for a given paper
        -PUT -> Update a single comment for a given paper
        -DELETE -> Delete a single comment for a given paper

Running localy:
-Frontend:
    Run command: 
        -npm i
        -npm run dev
        -Fronted endpoint "localhost:5173/"
-Backend:
    Start XAMPP:
        -Import sql file in the phpmyadmin dashboard
        -Put the api folder in the htdocs folder
        -Api endpoint "localhost:80/api/"

Deployment:
-Frontend:
    Netlify using netlify cli
        -npm run build
        -ntl deploy --prod
-Backend:
    -Dockerfile to run the php and apache server hosted in render.com
    -Remote Mysql server running of oracle free instance

PS:Cors is enabled and can be changed on .htaccess in api folder
