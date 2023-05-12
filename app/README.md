# Book Review Application

This application allows users to search for books using the Open Library API and add/view comments for each book. The application consists of a web frontend built using HTML, CSS, JavaScript, jQuery, and Bootstrap, and a RESTful API backend built using PHP and SQLite.
## Testing
Goto the address: http://192.168.1.70/ which is the ip address of the virtual machine.
## Extending and Improving the Application

### Application

1. **User Authentication**: Implement user authentication to allow users to create accounts, log in, and manage their own comments. This would provide a more personalized experience and allow for additional features such as user profiles and comment editing/deleting.

2. **Pagination**: Add pagination to search results and comments, allowing users to navigate through large result sets more easily.

3. **Filtering and Sorting**: Implement filtering and sorting options for search results, allowing users to find books based on specific criteria such as publication date, author, or genre.

4. **Improved Comment Display**: Display comments in a threaded manner, allowing users to view replies to specific comments and engage in discussions.

5. **Rating System**: Allow users to rate books, and display average ratings for each book in the search results. This can help users make more informed decisions when selecting books to read.

### API

1. **Additional Endpoints**: Implement additional API endpoints to support new features such as user authentication, comment editing/deleting, and book rating.

2. **Caching**: Implement caching strategies to improve API performance and reduce the load on the server.

3. **Error Handling**: Improve error handling in the API by providing more descriptive error messages and appropriate HTTP status codes.


## Deployment 

To deploy the application and API, follow these steps:

1. **Set up a virtual machine**: Create a new virtual machine using virtualization software like VMware workstation pro. Install an operating system for the virtual machine (e.g., I use Ubuntu 20.04 LTS).

2. **Install basic software**: Log in to the virtual machine, update the package list, and install basic software like curl, git, vim, etc.
```bash
sudo apt-get update
sudo apt-get install -y curl git vim
```
3. **Install LAMP stack**:  Install Apache and PHP on the virtual machine to support the application. Also, install necessary PHP extensions such as php-pdo, php-sqlite, etc.
```bash
sudo apt-get install -y apache2 php php-mysql php-pdo php-sqlite3
```
4. **Creating new folder**: In the defult Apache directory /var/www add a folder called "myapp"
```bash
sudo mkdir /var/www/myapp
```
5. **Configure Apache**: Create a new Apache virtual host configuration file that points to the public directory of the application. Enable the virtual host and restart Apache to apply the changes
```bash
sudo vim /etc/apache2/sites-available/myapp.conf
```
In the myapp.conf file, enter the following content:
```Apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/myapp
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    <Directory /var/www/myapp>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```
6. **Clone the GitHub repository**: Use the git command to clone the project repository to an appropriate location on the virtual machine. Put the files inside the "app" folder to /var/www/myapp:
```bash
sudo mv app/* /var/www/myapp
```
7. **Change the Permissions**: Change the permission of folder /var/www/myapp and the database file: /var/www/myapp/comments.db
```bash
sudo chmod -R 755 /var/www/myapp
sudo chmod 664 /var/www/myapp/comments.db
```
Change the ownership of the /var/www/myapp directory to the www-data user using the following command:
```bash
sudo chown -R www-data:www-data /var/www/myapp
```
8. **Test the application**: Input http://localhost to test the application.
