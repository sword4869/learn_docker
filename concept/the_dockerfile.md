- [1. Dockerfile Format](#1-dockerfile-format)
  - [1.1. syntax](#11-syntax)
  - [1.2. FROM](#12-from)
  - [1.3. WORKDIR](#13-workdir)
  - [1.4. COPY and ADD](#14-copy-and-add)
  - [1.5. RUN && CMD](#15-run--cmd)
    - [1.5.1. RUN](#151-run)
    - [1.5.2. CMD](#152-cmd)
  - [1.6. ENV](#16-env)
  - [1.7. EXPOSE](#17-expose)
- [2. 用Dockerfile创建镜像](#2-用dockerfile创建镜像)
  - [2.1. build](#21-build)
  - [2.2. Context](#22-context)
  - [2.3. 用Git](#23-用git)
  - [2.4. 用压缩包](#24-用压缩包)
---
# 1. Dockerfile Format
```
# syntax=docker/dockerfile:1

FROM node:12-alpine
RUN apk add --no-cache python2 g++ make

WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```
## 1.1. syntax
`# syntax=docker/dockerfile:1`：

'1'，表示使用最新的Dockerfile语法。

## 1.2. FROM
`FROM <image_name>`: 

使用的image。

## 1.3. WORKDIR

`WORKDIR /app`: 

指定此命令后所有Docker命令的工作路径。这里在是在container内部的`/app`根目录下的app目录中。

docker build 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 WORKDIR 创建的目录才会一直存在。

## 1.4. COPY and ADD

`COPY . .`: 

将本地文件拷贝到Docker中，这里上下文所在的本地文件复制到Docker的`WORKDIR`中。



需要注意的是，ADD 指令会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。

因此在 COPY 和 ADD 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用 COPY 指令，仅在需要自动解压缩的场合使用 ADD。

## 1.5. RUN && CMD

RUN和CMD都是shell命令。
RUN在docker build时运行，CMD在docker run时运行。

格式：
- exec格式：
  `RUN/CMD ["可执行文件", "参数1", "参数2"]`。注意是`"`，`'`不行。

- shell 格式：
  `RUN/CMD 可执行文件 参数1 参数2`。
  如果使用 shell 格式的话，实际的命令会被包装为 `sh -c` 的参数的形式进行执行。比如，`RUN echo $HOME`就是`RUN [ "sh", "-c", "echo $HOME"]`

### 1.5.1. RUN


> 合并RUN

Dockerfile 中每一个指令都会建立一层。
所以可以合并的RUN就合并:
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


> update缓存问题

永远将 `RUN apt-get update` 和 `apt-get install` 组合成一条 RUN 声明，例如：

```Dockerfile
RUN apt-get update && apt-get install -y \
        package-bar \
        package-baz \
        package-foo
```
将 `apt-get update` 放在一条单独的 RUN 声明中会导致缓存问题以及后续的 `apt-get install` 安装老版本。

比如，假设你有一个 Dockerfile 文件：

```Dockerfile
FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl
```
构建镜像后，所有的层都在 Docker 的缓存中。假设你后来又修改了其中的 apt-get install 添加了一个包：
```Dockerfile
FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl nginx
```
Docker 发现修改后的 `RUN apt-get update` 指令和之前的完全一样。所以，这层`apt-get update` 不会执行，而是使用之前的缓存镜像。因为 `apt-get update` 没有运行，后面的 `apt-get install` 可能安装的是过时的 curl 和 nginx 版本。

> install放弃问题

`RUN apt-get update && apt-get install python3-dev`

结果报错
```
Do you want to continue? [Y/n] Abort.
```
所以加上yes，即`RUN apt-get update && apt-get install python3-dev -y`
### 1.5.2. CMD


> 最后一个

注意：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。这就是为什么不能用CMD代替RUN。

> 前台和后台

```Dockerfile
CMD service nginx start
```

出现问题，容器执行后就立即退出了。甚至在容器内去使用 systemctl 命令结果却发现根本执行不了。

对于容器而言，其启动程序就是容器应用进程，主进程结束容器就结束。

而使用 `service nginx start` 命令，则是希望以后台守护进程形式启动 nginx 服务。而刚才说了 `CMD service nginx start` 会被理解为 `CMD [ "sh", "-c", "service nginx start"]`，因此主进程实际上是 sh。那么当命令结束后，sh 也就结束了，sh 作为主进程退出了，自然就会令容器退出。

正确的做法是直接执行 nginx 可执行文件，并且要求以前台形式运行。比如：

```Dockerfile
CMD ["nginx", "-g", "daemon off;"]
```

## 1.6. ENV

```Dockerfile
ENV <key> <value>
ENV <key1>=<value1> <key2>=<value2>...
```

例子：

- 指定版本号

```Dockerfile
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"
```

- 指定PATH

例如使用 `ENV PATH /usr/local/nginx/bin:$PATH` 来确保 `CMD ["nginx"]` 能正确运行。

## 1.7. EXPOSE

格式为 `EXPOSE <端口1> [<端口2>...]`。

- 屁用没用

要将 EXPOSE 和在运行时使用 `-p <宿主端口>:<容器端口>` 区分开来。EXPOSE 仅仅是声明容器打算使用什么端口而已，在容器运行时并不会因为这个声明应用就会开启这个端口的服务。而且，后者指定时可以覆盖前者声明的端口。

- 随机映射时起作用

另一个用处则是在运行时使用随机端口映射时，也就是 `docker run -P` 时，会自动随机映射 EXPOSE 的端口。

- 对VSCode的Docker插件起作用

会让其运行时选中指定的端口。



# 2. 用Dockerfile创建镜像 

## 2.1. build

```bash
# docker build -t <image name> <context>
$ docker image build -t python-dev .
```
- `-t/--tag`: 

不能省略。set the name of our image. 

## 2.2. Context

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

## 2.3. 用Git
```bash
$ docker image build -t easy-flask https://github.com/sword4869/learn_docker.git#main:01-easy/example_python
```
`<https://xxx/xxx.git>#<branch>:<context>`

## 2.4. 用压缩包
```bash
$ docker image build - < context.tar.gz
```
自动解压缩，以其作为上下文，开始构建。