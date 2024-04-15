### Stap 1: Aanpassen docker-compose file
Kopieer de `.env` van `exercise-05` module in de root van de `exercise-06` module. 

Open de `docker-compose.yaml` file.

Voeg aan de `otel-collector` service de `image` en `container_name` toe. De image heet `opentelemetry-collector-contrib` en moet van de gebruiker `otel` zijn. Je mag de _latest_ version pakken.

Voeg aan de `prometheus` service de `image` en `container_name` toe. De image heet `prometheus` en moet van de gebruiker `prom` zijn. Je mag de _latest_ version pakken.

Voeg aan de `grafana` service de `image` en `container_name` toe. De image heet `grafana` en moet van de gebruiker `grafana` zijn. Je mag de _latest_ version pakken. 

### Stap 2: Aanpassen van de applicatie
Open de `application.yaml` file in de `exercise-06` module. 

Voeg de onderstaande properties toe aan de `properties` sectie van de `pom.xml`:

```xml
<properties>
    <opentelemetry.version>1.37.0</opentelemetry.version>
    <opentelemetry-instrumentation.version>2.3.0-alpha</opentelemetry-instrumentation.version>
</properties>
```

Voeg de volgende dependencies toe aan de `dependencyManagement` sectie:

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.opentelemetry</groupId>
            <artifactId>opentelemetry-bom</artifactId>
            <version>${opentelemetry.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>io.opentelemetry.instrumentation</groupId>
            <artifactId>opentelemetry-instrumentation-bom-alpha</artifactId>
            <version>${opentelemetry-instrumentation.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Voeg de volgende dependency toe aan de `dependencies` sectie:

```xml
<dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-spring-boot-starter</artifactId>
</dependency>
```

Voeg onderstaande toe aan het einde, waarbij `otel` de root key is:

```yaml
otel:
  traces:
    exporter: none
  logs:
    exporter: none
  metrics:
    exporter: otlp
  instrumentation:
    logback-appender:
      enabled: false
    micrometer:
      enabled: true
  exporter:
    otlp:
      metrics:
        endpoint: 'http://localhost:4318/v1/metrics'
```

### Stap 3: Testen
voer een `mvn clean package` uit.

Run de applicatie en voeg wat accounts en opportunities toe. Bekijk de metrics in het Dashboard van Grafana.

Probeer of je het geheugen en CPU gebruik van de SalesCloud applicatie en de Sales Cloud Event Processor kan toevoegen aan het Grafana dashboard.

