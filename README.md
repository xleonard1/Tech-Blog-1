# Tech-Blog-1

My task was to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. I had to build this site completely from scratch and deploy it to Heroku. The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

```
GIVEN a CMS-style blog site
WHEN a user visits the site for the first time
THEN they am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN the user click on the homepage option
THEN the user am taken to the homepage
WHEN the user click on any other links in the navigation
THEN the user am prompted to either sign up or sign in
WHEN the user choose to sign up
THEN the user am prompted to create a username and password
WHEN the user click on the sign-up button
THEN the user's user credentials are saved and I am logged into the site
WHEN the user revisit the site at a later time and choose to sign in
THEN the user is prompted to enter my username and password
WHEN the user is signed in to the site
THEN the user see navigation links for the homepage, the dashboard, and the option to log out
WHEN the user clicks on the homepage option in the navigation
THEN Ithe user is taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN the user click on an existing blog post
THEN the user is presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN the user enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN the user click on the dashboard option in the navigation
THEN the user is taken to the dashboard and presented with any blog posts they have already created and the option to add a new blog post
WHEN the user click on the button to add a new blog post
THEN the user is prompted to enter both a title and contents for my blog post
WHEN the user clicks on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN the user clicks on one of my existing posts in the dashboard
THEN the user is able to delete or update my post and taken back to an updated dashboard
WHEN the user clicks on the logout option in the navigation
THEN the user is signed out of the site
WHEN the user is idle on the site for more than a set time
THEN the user is able to view comments but I am prompted to log in again before I can add, update, or delete comments


```

