# Dockerfile
```
# syntax=docker/dockerfile:1

FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```
`# syntax=docker/dockerfile:1`：1，表示使用最新的Dockerfile语法。
`FROM <image_name>`: 使用的image。
`WORKDIR /app`: 指定此命令后所有Docker命令的工作路径。这里在是在container内部的`/app`根目录下的app目录中。
`COPY . .`: 将本地文件拷贝到Docker中，这里Dockerfile所在的本地文件复制到Docker的WORKDIR中。
`RUN <shell>`: 创建镜像时使用的shell命令。
`CMD ["",""]`: 运行容器时使用的shell命令。注意是`"`，`'`不行。
注意：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。

## RUN

每一个RUN命令都是加一层镜像。所以命令合并写:
```bash
RUN yum -y install wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN tar -xvf redis.tar.gz
```
```bash
RUN yum -y install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```
创建3层镜像变成，只会创建1层镜像。

## WORKDIR

docker build 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 WORKDIR 创建的目录才会一直存在。


## ENV

```bash
ENV <key> <value>
ENV <key1>=<value1> <key2>=<value2>...
```
```bash
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"
```

# 创建镜像-build

```bash
docker build -t <name of image> .
```
`-t/--tag`: 不能省略。set the name of our image. 
`.`: 不能省略。at the end of the docker build command , which tells that Docker should look for the `Dockerfile` in the current directory.

然后再启动容器docker run。

```bash
$ python -m pip freeze > requirements.txt
```
