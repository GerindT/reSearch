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

# Create the 'img' directory and set permissions
RUN chown www-data:www-data /var/www/html/api/img

# Create the 'papers' directory and set permissions
RUN chown www-data:www-data /var/www/html/api/papers


# Configure Apache to allow .htaccess files
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Install PDO MySQL driver
RUN docker-php-ext-install pdo pdo_mysql

# Expose the ports
EXPOSE 80

# Start Apache when the container starts
CMD ["apache2-foreground"]
