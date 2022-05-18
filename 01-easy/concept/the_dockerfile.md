[toc]
---
# Dockerfile Format
```
# syntax=docker/dockerfile:1

FROM node:12-alpine
RUN apk add --no-cache python2 g++ make

WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```
- `# syntax=docker/dockerfile:1`：

'1'，表示使用最新的Dockerfile语法。

- `FROM <image_name>`: 

使用的image。

- `WORKDIR /app`: 

指定此命令后所有Docker命令的工作路径。这里在是在container内部的`/app`根目录下的app目录中。

docker build 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 WORKDIR 创建的目录才会一直存在。

- `COPY . .`: 

将本地文件拷贝到Docker中，这里上下文所在的本地文件复制到Docker的`WORKDIR`中。

- `RUN`: 

创建镜像时使用的shell命令。

`RUN ["可执行文件", "参数1", "参数2"]` or `RUN 可执行文件 参数1 参数2`。
注意是`"`，`'`不行。

- `CMD`: 

运行容器时使用的shell命令。

注意：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。这就是为什么不能用CMD代替RUN。

## 合并RUN

每一个RUN命令都是加一层镜像。所以建议命令合并写:
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

# 用Dockerfile创建镜像 

## build

```bash
# docker build -t <image name> <context>
$ docker build -t python-dev .
```
- `-t/--tag`: 

不能省略。set the name of our image. 

## Context

> 指定上下文（Context），还是指定 Dockerfile 所在路径？

如果在 Dockerfile 中这么写：
```Dockerfile
COPY ./package.json /app
```
这并不是要复制执行 docker build 命令所在的目录下的 package.json，也不是复制 Dockerfile 所在目录下的 package.json，而是复制 上下文（context） 目录下的 package.json。

`.` 表示当前目录，而 Dockerfile 就在当前目录，因此不少初学者以为这个路径是在指定 Dockerfile 所在路径，这么理解其实是不准确的。

那么为什么会有人误以为 . 是指定 Dockerfile 所在目录呢？这是因为在默认情况下，如果不额外指定 Dockerfile 的话，会将上下文目录下的名为 Dockerfile 的文件作为 Dockerfile。而一般大家习惯性的会使用默认的文件名 Dockerfile，以及会将其置于镜像构建上下文目录中.

这只是默认行为，实际上 Dockerfile 的文件名并不要求必须为 Dockerfile，而且并不要求必须位于上下文目录中，比如可以用 `-f ../Dockerfile.php` 参数指定某个文件作为 Dockerfile。


> 使用上下文的误区

为什么 `COPY ../package.json /app` 或者 `COPY /opt/xxxx /app` 无法工作？

注意：docker build 命令会将**该目录下的内容**打包交给 Docker 引擎以帮助构建镜像，所以仅仅知道其下(`./`)，而不知道其上(`../`)其周围(`/opt`)。

所以这些路径已经超出了上下文的范围，Docker 引擎无法获得这些位置的文件。如果真的需要那些文件，应该将它们复制到上下文目录中去。

## 用Git
```bash
$ docker build -t easy-flask https://github.com/sword4869/learn_docker.git#main:01-easy/example_python
```
`<https://xxx/xxx.git>#<branch>:<context>`

## 用压缩包
```bash
$ docker build - < context.tar.gz
```
自动解压缩，以其作为上下文，开始构建。