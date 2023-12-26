# Use an official MySQL image as the base image
FROM mysql:latest

# Set environment variables for MySQL database initialization
ENV MYSQL_ROOT_PASSWORD=test
ENV MYSQL_DATABASE=test
ENV MYSQL_USER=testuser
ENV MYSQL_PASSWORD=test

# Copy the SQL script to initialize the database
COPY /backend-arXiv/api/web_db.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306