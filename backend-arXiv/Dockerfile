# Use an official PHP image as the base image
FROM php:apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set environment variables for PHPMyAdmin
ENV PMA_HOST=mysql
ENV PMA_PORT=3306
ENV PMA_USER=root
ENV PMA_PASSWORD=password

# Copy your API files into the Apache document root
COPY ./api /var/www/html/api

# Configure Apache to allow .htaccess files
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Use an official MySQL image as the database backend
FROM mysql:latest

# Set MySQL root password (change this for production)
ENV MYSQL_ROOT_PASSWORD=password

# Create a database and user (change these for production)
ENV MYSQL_DATABASE=your_database_name
ENV MYSQL_USER=your_database_user
ENV MYSQL_PASSWORD=your_database_password

# Expose the MySQL port
EXPOSE 3306

# Install Supervisor
RUN apt-get update && apt-get install -y supervisor && rm -rf /var/lib/apt/lists/*

# Copy Supervisor configuration file
# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Start both Apache and MySQL when the container starts
CMD ["apache2-foreground", "&", "mysqld"]
