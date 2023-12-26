# Use an official PHPMyAdmin image as the base image
FROM phpmyadmin/phpmyadmin:latest

# Set environment variables for PHPMyAdmin
ENV PMA_HOST=localhost
ENV PMA_PORT=3306
ENV PMA_USER=root
ENV PMA_PASSWORD=password

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy your API files into the Apache document root
COPY ./api /var/www/html/api

# Configure Apache to allow .htaccess files
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Install MySQL Server
RUN apt-get update && \
    apt-get install -y mysql-server && \
    rm -rf /var/lib/apt/lists/*

# Set MySQL root password (change this for production)
RUN echo "mysql-server mysql-server/root_password password password" | debconf-set-selections && \
    echo "mysql-server mysql-server/root_password_again password password" | debconf-set-selections

# Expose the ports
EXPOSE 80

# Start Apache and MySQL when the container starts
CMD service apache2 start && service mysql start && tail -f /dev/null
