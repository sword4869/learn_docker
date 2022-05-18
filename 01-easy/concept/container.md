[toc]
---


# Create a container and run it

## 基本

```bash
# 使用指定镜像来创建一个容器
# Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
$ docker run <name of image>
```
注意1：这个名字不是创建出来的容器的名字，而是镜像的名字。实际上容器的名字是随机分配的。

注意2：创建出来的容器都是不同的个体，都是一个新的容器，而不是覆盖老的容器。尤其是你哪怕指定同样的名字，也不能覆盖，而是报错，提示你想要重用就得删除原来的容器。


When you run this command, the following happens:

1. The Docker client contacted the Docker daemon. If you do not have the ubuntu image locally, the Docker daemon pulls it from your configured registry, as though you had run `docker pull ubuntu` manually.

2. Docker creates a new container, as though you had run a `docker container create` command manually.

3. Docker allocates a read-write filesystem to the container, as its final layer. This allows a running container to create or modify files and directories in its local filesystem.

4. Docker creates a network interface to connect the container to the default network, since you did not specify any networking options. This includes assigning an IP address to the container. By default, containers can connect to external networks using the host machine’s network connection.



## 交互终端

### When creating

用于可以交互终端的镜像，对不能交互的镜像来说该参数被忽略：

两个一起的参数`-it`：

- `-i`: 交互

- `-t`: 进入终端

> 不指定终端，就自动选择适合的终端

ubuntu选择bash
```bash
$ docker run -it ubuntu
root@007c6081700d:/#
```

python选择python解释器
```bash
$ docker run -it python:3.8-slim-buster
Python 3.8.12 (default, Feb 26 2022, 00:33:25) 
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

> 指定终端

```bash
$ docker run -it python:3.8-slim-buster bash
```
### When running

可以利用`docker exec -it reverent_rosalind /bin/bash`来进入处于后台的容器。

## 启动时执行命令

```bash
$ docker run ubuntu cat /proc/version
Linux version 5.10.16.3-microsoft-standard-WSL2 (oe-user@oe-host) (x86_64-msft-linux-gcc (GCC) 9.3.0, GNU ld (GNU Binutils) 2.34.0.20200220) #1 SMP Fri Apr 2 22:23:49 UTC 2021
```

## 启动后执行命令

```bash
$ docker exec happy_galois cat /proc/version
Linux version 5.10.16.3-microsoft-standard-WSL2 (oe-user@oe-host) (x86_64-msft-linux-gcc (GCC) 9.3.0, GNU ld (GNU Binutils) 2.34.0.20200220) #1 SMP Fri Apr 2 22:23:49 UTC 2021
```

## 容器命名

> 默认是随机命名
```bash
$ docker run docker/getting-started

$ docker ps -l 
... NAMES
... hopeful_faraday
```

> 指定名字 name
```bash
$ docker run --name <name of container> docker/getting-started
```

## 后台

```bash
$ docker run -d docker/getting-started
```
`-d/--detach` - run the container in detached mode (in the background)


## 端口映射

```bash
$ docker run -d -p 8000:80 docker/getting-started
8094c7cb8aa7e2ec55c78fbe6c80ccf7f7a5c440a4bd979584cf27fc074f2551

# 查看端口方式1
$ docker ps -l
CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS          PORTS                  NAMES
8094c7cb8aa7   docker/getting-started   "/docker-entrypoint.…"   25 seconds ago   Up 24 seconds   0.0.0.0:8000->80/tcp   hopeful_faraday
```
`-p/--publish [host]:[container]` - map port 8000 of the host to port 80 in the container。`0.0.0.0:8000->80/tcp`表示container使用tcp将80映射到主机的`localhost:8000`端口。现在在主机浏览器输入`http://localhost:8000`就能进入前端。

```bash
$ docker run -d -P docker/getting-started        
01691b85739ed2f838cf499573c99ae13dd025aaf0c1915827b8581943296be5

# 查看端口方式2
$ docker port happy_galois
80/tcp -> 0.0.0.0:49153
```
`-P`: 随机映射。现在在主机浏览器输入`http://localhost:49153`就能进入前端。


```bash

```

## 挂载Volume

```bash
$ docker volume create myvolume     # 创建数据卷`myvolume`
$ docker volume ls                  # 列出
$ docker volume rm myvolume         # 删除
```


```bash
$ docker run -v myvolume:/var/lib/mysql mysql
```
`-v/--volume`: `<name of volume>:<path/to/mount>`

# Start a container
```bash
$ docker start <name of container>
```

# Restart a container
```bash
$ docker restart <name of container>
```
Notice: When you restart a container, it starts **with the same flags or commands** that it was originally started with. 这很方便。

# Stop a container

```bash
$ docker stop <name of container>
```

# Remove a container

## Automaically remove

`--rm`
```bash
$ docker run --rm -it ubuntu
```

## Manually remove

正在运行的容器要停止后才能删除。
```bash
$ docker rm python-docker agitated_moser goofy_khayyam
```
一次能删除多个

When a container is removed, any changes to its state that are not stored in persistent storage disappear.

Volume：另外保存下来不删档的数据区域。