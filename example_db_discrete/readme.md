# Overview of containers

one is for the service of database, the other is for the application of flask.

The former is made directly through the docker command, and the latter is made through the Dockerfile.

# Build the container 1 : mysqldb

Let’s create our volumes now. We’ll create one for the data and one for configuration of MySQL.

```bash
$ docker volume create mysql
$ docker volume create mysql_config
```

Now we’ll create a network that our application and database will use to talk to each other. The network is called a user-defined bridge network and gives us a nice DNS lookup service which we can use when creating our connection string.

```bash
$ docker network create mysqlnet
```

Now we can run MySQL in a container and attach to the volumes and network we created above.
```
$ docker run --rm -d -v mysql:/var/lib/mysql -v mysql_config:/etc/mysql -p 3306:3306 --network mysqlnet --name mysqldb -e MYSQL_ROOT_PASSWORD=password123 mysql
```
3306 是mysql 缺省用的端口。


Connect to the running MySQL database inside the container
```bash
$ docker exec -it mysqldb mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.28 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```
# Build the container2 : rest-server

Connect the application to the database

```bash
$ docker build --tag python-docker-dev .
```

```bash
$ docker run --rm -d --network mysqlnet --name rest-server -p 5000:5000 python-docker-dev
```

# Now all work is done.

Let’s test that our application is connected to the database and is able to add a note.
```bash
$ curl http://localhost:5000
Hello, Docker!
$ curl http://localhost:5000/initdb
init database
$ curl http://localhost:5000/widgets
[]
```