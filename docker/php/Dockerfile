FROM php:8.3.18RC1-fpm-alpine3.21

ENV RUN_DEPS \
    zlib \
    libzip \
    libpng \
    libjpeg-turbo \
    postgresql-libs \
    python3 \
    py3-pip \
    ffmpeg \
    imagemagick \
    ghostscript

ENV BUILD_DEPS \
    zlib-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    postgresql-dev


ENV PHP_EXTENSIONS \
    opcache \
    zip \
    gd \
    bcmath \
    pgsql \
    pdo_pgsql

RUN apk add --no-cache --virtual .build-deps $BUILD_DEPS \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install -j "$(nproc)" $PHP_EXTENSIONS \
    && apk del .build-deps

RUN apk add --no-cache --virtual .run-deps $RUN_DEPS

RUN pip install --no-cache-dir --break-system-packages moviepy==1.0.3

RUN echo 'memory_limit = -1' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;

# Copy the application code
COPY . /app

COPY docker/php/uploads.ini /usr/local/etc/php/conf.d/uploads.ini

VOLUME ["/app"]