# glossary
3 components:
- Docker client (docker) : ssh终端。 the client sends these commands to dockerd.
- Docker daemon (dockerd)：主机。 host carries commands out.
- Docker registry: the website where stores Docker images


4 concept:
- Image: 类似虚拟机的操作系统镜像。采用分层文件技术，只重建不一样的部分，从而文件小。大家在dockerhub上发布的资源也是Image。
- Container：类似安装Image后可以运行的虚拟机实体，但是对标是进程，A container is a normal operating system process。Container还可以类似快照后做成Image。
- Dockerfile：A Dockerfile contains the instructions to assemble an image containing your app and its dependencies. Then use this image to run your app in a container
- Volume: where persistantly save files.

# architecture
- concept:
  [image](/concept/image.md)
  [container](/concept/container.md)
  [dockerfile](/concept/the_dockerfile.md)
  [other](/concept/other.md)

- dockerfile project:
  
  singular:
  - [print hello in python](/01-easy/python_print_hello/readme.md)
  - [flask in python](/01-easy/python_flask/readme.md)
  
  compose:
  - [example_db_compose](/02-dababase/example_db_compose/readme.md)
  - [example_db_discrete](/02-dababase/example_db_discrete/readme.md)
