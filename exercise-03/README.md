Voeg in de GreetingController een log statement toe die de tekst _"Saying hello to "_ gevolgd door de naam van de persoon die begroet wordt logt.

Compileer vervolgens de applicatie en bouw opnieuw een container image. Start de applicatie met docker run en voer de volgende commandoś uit in een webbrowser:

http://localhost:8080/hello?name=John
http://localhost:8080/hello?name=Mary

Vraag de logs op van de container (docker logs) en controleer of de log statements in de logs voorkomen. 

Doe nu hetzelfde nogmaals, maar nu door de logs van de container realtime te volgen (_follow_).


