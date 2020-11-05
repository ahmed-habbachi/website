---
layout: '[post]'
path: '/new-dotnet-docker-env-with-node-and-mariadb'
title: New dotnet docker environment with node and mariadb
date: 2018-09-21 17:43:38
category: IT
tags: [Docker, Mariadb, Node, .Net Core, ASP.Net Core]
featuredImage: ./docker-banner.png
published: true
---

In this post I'll try to describe the steps that i did to make my asp.net core app work on docker composer orchestration. My project consist of an implementation of **identityServer4**.
I am going to create three docker images two for runtime (means two to run the application) and one for build:

1. The runtime images;
   1. mariadb
   2. aspnetcore runtime 2.1.4
2. The build image;
   * node
   * dotnetsdk 2.1.104

<!-- more -->
## The build image

the build environment that i need for my project is an image that contains;

* dotnet sdk 2.1.x
* nodejs

1. lets start by pulling a node image 'the tag that i've useded is a mater of taste';

    ```cmd
        docker pull node:8.12.0-alpine
    ```

    this time we cannot use bash inside of our container as it is a alpine based image we have to use sh;

    ```cmd
        docker run --name nodedotnetsdk -it df48b68da02a /bin/sh
    ```

    *PS: df48b68da02a is the id of the node image that i've downloaded already please to use your id or node image name, to get the ID of an image just run 'docker image ls' and look for your image.
    the '-it image_name /bin/sh' will run the sh shell and switch STDIN/OUT on that container*

2. then we will install dotnet sdk dependencies on the container;

    ```shell
        apk add --no-cache ca-certificates krb5-libs libgcc libintl libssl1.0 libstdc++ tzdata userspace-rcu zlib
        apk -X https://dl-cdn.alpinelinux.org/alpine/edge/main add --no-cache lttng-ust
        # Configure Kestrel web server to bind to port 80 when present
        ASPNETCORE_URLS=http://+:80 \
        # Enable detection of running in a container
        DOTNET_RUNNING_IN_CONTAINER=true \
        # Set the invariant mode since icu_libs isn't included (see https://github.com/dotnet/announcements/issues/20)
        apk add --no-cache icu-libs
        DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
        LC_ALL=en_US.UTF-8
        LANG=en_US.UTF-8
    ```

    and now with this commnad we will download and install dotnet sdk again on the container;

    ```shell
        DOTNET_SDK_VERSION=2.1.402

        apk add --no-cache --virtual .build-deps openssl
        && wget -O dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-musl-x64.tar.gz \
        && dotnet_sha512='88309e5ddc1527f8ad19418bc1a628ed36fa5b21318a51252590ffa861e97bd4f628731bdde6cd481a1519d508c94960310e403b6cdc0e94c1781b405952ea3a' \
        && echo "$dotnet_sha512  dotnet.tar.gz" | sha512sum -c - \
        && mkdir -p /usr/share/dotnet \
        && tar -C /usr/share/dotnet -xzf dotnet.tar.gz \
        && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
        && rm dotnet.tar.gz \
        && apk del .build-deps

        DOTNET_USE_POLLING_FILE_WATCHER=true
        NUGET_XMLDOC_MODE=skip
        dotnet help
    ```

now type exit to exit the shell, and then

```shell
    docker commit -a "**auther name**" -m "add dotnet sdk 2.1.402 to a nodejs image" nodedotnetsdk somerepo/acontainer_name
```

so now we are done with the build image, this image will be used only yes only to build the project and pass the files to the runtime to run the app, so lets get the necessairy runtime image.

## Runtime docker images

The runtime environment consist of two running docker containers:

* aspnetcore runtime 2.1.x
* mariadb

Therefor i need to get the necessary images;

1. First lets get the mariadb image form [docker hub](hub.docker.com)

    ```shell
        docker pull mariadb
    ```

2. Second lets get the dotnet runtime image

    ```shell
         docker pull microsoft/dotnet:2.1-aspnetcore-runtime
    ```

we don't need to do any change to the images we will apply some settings to the containers as folowing.

## Dockerfile and docker-compose

the Dockerfile is a file needed to inform docker the steps that we need to do to build our container:
so first thing first create a new file called "Dockerfile" without any extention and paste on it the step commands like following (this is just an example project):  

```docker
    FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
    WORKDIR /app
    EXPOSE 5000

    FROM habbachi/nodedotnetsdk AS build
    WORKDIR /src
    COPY Auerswald.IdentityServer.Web/Auerswald.IdentityServer.Web.csproj Auerswald.IdentityServer.Web/
    COPY Auerswald.IdentityServer.Data/Auerswald.IdentityServer.Data.csproj Auerswald.IdentityServer.Data/
    COPY Auerswald.IdentityServer.Public/Auerswald.IdentityServer.Public.csproj Auerswald.IdentityServer.Public/
    RUN dotnet restore Auerswald.IdentityServer.Web/Auerswald.IdentityServer.Web.csproj
    COPY . .
    WORKDIR /src/Auerswald.IdentityServer.Web
    RUN npm run default
    RUN dotnet build Auerswald.IdentityServer.Web.csproj -c Release -o /app

    FROM build AS publish
    RUN dotnet publish Auerswald.IdentityServer.Web.csproj -c Release -o /app

    FROM base AS final
    WORKDIR /app
    COPY --from=publish /app .
    ENTRYPOINT ["dotnet", "Auerswald.IdentityServer.Web.dll"]
```

*PS: change the name of your image as your need, for me the build image name is habbachi/nodedotnetsdk.*

this docker file is going to build and copy the files to the runtime container and lunch our application, what is missing here is the mariadb container.
here we are talking about running multiple containers or running a working environment, therefor we need docker-compose;
lets create a new file called docker-compose.yml;

```yml
version: '3.4'

services:
    db:
          container_name: "identityserver_db"
          image: "mariadb"
          ports:
              - "3306:3306"
          environment:
              MYSQL_ROOT_PASSWORD: "root"
              MYSQL_DATABASE: "identityserverdb"
          networks:
              marianet:
                  aliases:
                      - db
    auerswald.identityserver.web:
          container_name: "identityserver"
          build:
              context: .
              dockerfile: Dockerfile
          ports:
              - "5000:5000"
          depends_on:
              - db
          networks:
                - webnet
                - marianet
networks:
    webnet:
    marianet:
```
