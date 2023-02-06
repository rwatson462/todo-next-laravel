FROM php:8.2

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y libzip-dev zip
RUN pecl install redis

RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-enable redis

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN mkdir -p /app
WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT "/entrypoint.sh"
