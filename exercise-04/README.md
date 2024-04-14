```bash
mvn clean package docker:build 
```

```bash
docker rm greetings
```

```bash
docker run -d -p 8080:8080 --name greetings greetings:1.1
```

```bash
docker logs -f hello-world
```
