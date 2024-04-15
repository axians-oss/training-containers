### Stap 1: Configureer de JKube plugin
Voeg de `jkube-maven-plugin` versie `1.16.1` toe in de aan de `pluginManagement` sectie in de `build` sectie 
van de pom.xml.

Voeg een `configuration` sectie toe aan de `jkube-maven-plugin` plugin met de volgende properties:

- `verbose` op `true`.
- `buildStrategy` op `docker`.

Voeg ook een `images/image` sectie toe in de `configuration` sectie met de volgende properties:

- `name` op `greetings` met de tag gelijk aan de `project.version` property.
- `alias` op `greetings`.

Voeg aan de image een `build` sectie toe met de volgende properties:

- `from` op `openjdk:21-slim`.
- `entrypoint/exec` met de argumenten `java"`, `-jar`, `/maven/${project.build.finalName}.jar`.
- `ports/port` op `8080`.

Standaard kopieert de JKube plugin de jar file naar de `/maven` folder in de container.


```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId></groupId>
                <artifactId></artifactId>
                <version></version>
                <configuration>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```
Zie eventueel [k8s:build](https://eclipse.dev/jkube/docs/kubernetes-maven-plugin/#jkube:build) voor meer informatie.

### Stap 2: Bouw de container image
Bouw nu een image met behulp van het `clean package k8s:build` Maven commando. 

### Stap 3: Start de container
Start de container met het `docker run` commando. Gebruik als container naam `greetings` en draai de container als daemon. Gebruik als _tag_ de versie van de applicatie: `1.1`.

Als je een foutmelding krijgt dat de container al bestaat, dan moet je de oude eerst verwijderen.

Test nu weer de applicatie met de onderstaande commando's:

http://localhost:8080/hello?name=John
http://localhost:8080/hello?name=Mary

Controleer de logs om te kijken of de container correct draait.



