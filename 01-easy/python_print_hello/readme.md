[toc]

---

# How to run in local host(not Docker)

```bash
$ python hello.py
hello
```



# Run in a container

Build the project to an image
```bash
$ docker build -t test33 .  
```

Run a container
```bash
$ docker run test33
hello
```