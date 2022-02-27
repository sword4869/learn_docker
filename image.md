# To list images

```bash
$ docker images
```


`python:3.8-slim-buster`的`python`是名字，`3.8-slim-buster`是TAG。
默认TAG是`latest`，不显示，`python`就是`python-docker:latest`。
标准镜像的命名规则是`image-name:tag`，比如`ubuntu:16.04`；而个人镜像则是`user-name/image-name:tag`，比如`sandal33s/helloworld:1.0`，`sandal33s/helloworld:v3`。

# Push

`docker push` 
your image is pushed to your configured registry.

# Pull


When you use the `docker pull` or `docker run` commands, the required images are pulled from your configured registry.

# Remove

要删除镜像，就得先把和它的容器都删完了，然后才能删镜像。这是因为Layer filesystem，最下层是镜像，所以删除镜像就有容器依赖丢失问题。