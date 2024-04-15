In deze oefening gaan we voor een eenvoudige Spring Boot 3 applicatie een Docker image maken.
Hiervoor moet een bestand `Dockerfile` aangemaakt worden in de root van deze `exercise-01` module.

De `Dockerfile` moet de volgende stappen bevatten:

1. Gebruik de officiële `openjdk:21-slim` image als basis image.
2. Kopieer het JAR bestand van de Spring Boot applicatie als `app.jar` naar de Docker image.
3. Maak een ENTRYPOINT om de applicatie the starten met `java -jar /app.jar`.