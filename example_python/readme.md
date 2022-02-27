# How to run in local host(not Docker)

```bash
PS E:\CodeProject\Git\learn_docker\example_python> python -m flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
127.0.0.1 - - [27/Feb/2022 09:31:59] "GET / HTTP/1.1" 200 -
```

# Explain the Dockerfile

`CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]`: This tells your operating system to listen on all public IPs. So Let's make the application externally visible (i.e. from outside the container) .

# Run in a container

Build an image
```bash
PS E:\CodeProject\Git\learn_docker\example_python> docker build -t python-docker .  
```

Run a container: 映射container的5000端口到host的5000端口
```bash
PS E:\CodeProject\Git\learn_docker\example_python> docker run --name python-docker-container -d -p 5000:5000 python-docker
```

Open a browser `http://localhost:5000/` in host. You can see "Hello, Docker!" in the html page.