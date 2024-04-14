# Start with a base image containing Java runtime (Here we are using OpenJDK)
FROM openjdk:21-slim

# Add the application's jar to the container
COPY target/*.jar app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]