[toc]

---

# How to run in local host(not Docker)

```bash
$ python -m flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
127.0.0.1 - - [27/Feb/2022 09:31:59] "GET / HTTP/1.1" 200 -
```

# Explain the Dockerfile

`CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]`: 

This tells your operating system to listen on all public IPs. So Let's make the application externally visible (i.e. from outside the container) .

# Run in a container

Build the project to an image
```bash
$ docker build -t python-docker .  
```

Run a container: 映射container的5000端口到host的5000端口
```bash
$ docker run --name python-docker-container -d -p 5000:5000 python-docker
```

Open a browser `http://localhost:5000/` in host. 

You can see "Hello, Docker!" in the html page.

# requirements

## how to get this file?

> method 1

we can use pip freeze to output all library of python.
```bash
$ python -m pip freeze > requirements.txt
```
But, if you have installed other irrelevant library, this output includes them. So, it is fittable to use this method when you create a pure project development.

> method2

we manually write it.

And the format is 
```
Flask==2.0.3
mysql-connector-python==8.0.28
```

## how to use this file?
```Dockerfile
RUN pip3 install -r requirements.txt
```