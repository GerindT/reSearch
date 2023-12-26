# Use an official PHPMyAdmin image as the base image
FROM phpmyadmin/phpmyadmin:latest

# Set environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy your API files into the Apache document root
COPY ./api /var/www/html/api

# Configure Apache to allow .htaccess files
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Expose the ports
EXPOSE 80

# Start Apache when the container starts
CMD ["apache2-foreground"]
