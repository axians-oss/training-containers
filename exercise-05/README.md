### Stap 1: Starten maken Docker Compose
Maak een bestand `.env` aan in de root van de `exercise-05` module. Voeg de volgende inhoud toe:

```bash
PASSWORD=<your-password>
```
Vervang `<your-password>` met een wachtwoord naar keuze.

Maak een file `docker-compose.yaml` aan in de root van de `exercise-05` module.

Voeg de volgende inhoud toe aan het bestand:

```yaml
version: '3.7'

services:
  <service name>:
    image: 'image'
    container_name: <gelijk aan service name>
    environment:
      NAAM: 'waarde'
    ports:
      - "8080:8080"
```
Je moet nu 3 services toevoegen, op basis van het template dat gegeven is:

- Postgres database met service name `postgres` en image `postgres:14`. De environment variabele `POSTGRES_USER` moet de waarde `postgres` hebben en de environment variabele `POSTGRES_DB` de waarde `salescloud`. De environment variabele `POSTGRES_PASSWORD` moet de waarde `${PASSWORD}` hebben. De volgende poorten moeten opgenomen worden: `5432:5432`.


- PgAdmin met service name `pgadmin` en image `dpage/pgadmin4`. De environment variabele `PGADMIN_DEFAULT_EMAIL` moet de waarde `admin@nowhere.com` hebben en de environment variabele `PGADMIN_DEFAULT_PASSWORD` de waarde `${PASSWORD}`. De environment variabele `PGADMIN_LISTEN_ADDRESS` moet de waarde `0.0.0.0` hebben. De volgende poorten moeten opgenomen worden: `5050:80`.


- ActiveMQ met service name `activemq` en image `jhoeflaken/artemis:2.32.0`. Kijk op Docker Hub voor de environment variabelen die ingesteld moeten worden. De admin user moet de naam `admin` hebben en anonieme login moet op `true` gezet worden. Het wachtwoord moet op de waarde `${PASSWORD}` gezet worden. De volgende poorten moeten opgenomen worden: `8161:8161`, `61616:61616`, `5672:5672`, `61613:61613`.

### Stap 2: Bijwerken application.yaml
Werk in de `application.yaml` de password properties voor de Postgres database en de ActiveMQ bij met de wachtwoorden zoals die gedefinieerd zijn in de `docker-compose.yaml` file.

### Stap 3: Starten services
Start de services met het commando `docker-compose up`. Controleer of de services draaien met het commando `docker ps`.

### Stap 4: Testen
Start de Spring Boot applicatie en controleer of de applicatie correct werkt. Je kunt naar http://localhost:80880 in de webbrowser om de applicatie te openen.

Ga naar http://localhost:5050 om PgAdmin te openen. Log in met de email en wachtwoord die je hebt ingesteld in de `docker-compose.yaml` file. Maak een nieuwe server aan met de volgende gegevens:

- Hostname: postgres
- Username: postgres
- Password: het wachtwoord dat je hebt ingesteld in de `.env` file

Je kunt nu de database `salescloud` openen en de tabellen bekijken.