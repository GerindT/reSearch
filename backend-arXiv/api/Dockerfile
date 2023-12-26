# Use an official PHPMyAdmin image as the base image
FROM phpmyadmin/phpmyadmin:latest

# Set environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

# Copy your API files into the Apache document root
COPY ./api /var/www/html/api

# Install MySQL client to run initialization script
RUN apt-get update && \
    apt-get install -y mysql-client && \
    rm -rf /var/lib/apt/lists/*

# Copy the MySQL initialization script to a temporary location
# COPY ./api/your-database-init-script.sql /docker-entrypoint-initdb.d/

# Expose the ports
EXPOSE 80

# Start Apache when the container starts
CMD ["apache2-foreground"]
