[toc]
[@toc]
---
# List existing images

```bash
$ docker images
REPOSITORY               TAG               IMAGE ID       CREATED        SIZE
python                   3.8-slim-buster   9f9436d44487   2 months ago   114MB
```

这个镜像的名字，`python` Respository 和 `3.8-slim-buster` Tag, 一起构成 `python:3.8-slim-buster`。

- 镜像的命名规则，分两类。
第一类官方镜像，`image-name:tag`。比如，`ubuntu:16.04`。
第二类个人镜像，`user-name/image-name:tag`。比如`sandal33s/helloworld:1.0`，`sandal33s/helloworld:v3`。
- 默认Tag : 是`latest`，不显示。比如，`python`就是`python-docker:latest`。


# Remove

要删除镜像，就得先把和它的容器都删完了，然后才能删镜像。这是因为Layer filesystem，最下层是镜像，所以删除镜像就有容器依赖丢失问题。

# Create
## Get remote sources


When you use the `docker pull` or `docker run` commands, the required images are pulled from your configured registry.

# Save
# Save to remote

```bash
$ docker push
```
your image is pushed to your configured registry.