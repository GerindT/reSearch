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
    -Posts.php -> Get all the posts with all the data needed for each of them (joins)
    -SinglePost.php + id -> Get the single Posts given by the id, get more details for the post to have a balance between frontend and backend

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
        -ntl deploy -prod
-Backend:
    -Dockerfile to run the php and apache server hosted in render.com
    -Remote Mysql server running of oracle free instance

PS:Cors is enabled and can be changed on .htaccess in api folder
