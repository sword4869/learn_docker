# Build
```bash
$ docker-compose up --build
```
`--build`: Docker will compile our image and then start the containers.

# Now all work is done

```bash
$ curl http://localhost:5000
Hello, Docker!
$ curl http://localhost:5000/initdb
init database
$ curl http://localhost:5000/widgets
[]
```

# Unsolvable problems

in `docker-compose.yml`:
when`version: "3.9"`, there is a error:
```
ERROR: Version in ".\docker-compose.dev.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version. Either specify a supporf the file to use version 1.
For more on the Compose file format versions, see https://docs.docker.com/compose/compose-file/
```
but when`version: "3.3"`, it works.

Usually, My Docker Engine is `Docker version 20.10.12, build e91ed57` and the `version` of docker-compose.yml should be 3.9 . 