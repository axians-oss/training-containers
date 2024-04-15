### Stap 1: Configureren k3s
Klik op _Preferences_ en vervolgens _Kubernetes_.

Vink _Enable Kubernetes_ aan, selecteer versie v1.29.3 en klik op _Apply_.

Als de optie _Cluster Dashboard_ actief wordt kun je daar op drukken en bekijken wat er draait.

Voer de onderstaande commandoś uit om te verifiëren dat je er ook via de command prompt bij komt:

```bash
kubectl config use-context rancher-desktop
kubectl get nodes
```
Je zou nu een regel moeten zien met de versie van k3s and het aantal minuten dat deze actief is.

### Stap 2: Uitvoeren van de deployment
Voor het onderstaande commando uit om een namespace aan te maken.

```bash
kubectl create namespace ab-testing
````

Voer het onderstaande commando uit om de deployment te starten.

```bash
kubectl apply -f ab-testing-deployment.yaml
```

Vraag met onderstaande commando de namen van de pods op:

```bash
kubectl get pods -n ab-testing
``` 
Open voor iedere pod een command prompt en gebruik het onderstaande commando om de logs te volgen:

```bash
kubectl logs -f -n ab-testing <pod-name>
```

Verifieer dat beiden pods ongeveer evenveel aangeroepen worden.

Pas de ab-testing-deployment.yaml aan door de replicas van de pod met de naam `ab-testing-v1` naar 5 te verhogen.

Verifieer nu dat er 6 pods draaien (zie commando boven). Bekijk via de logs van de pods of v1.0 nu veel vaker wordt aangeroepen dan de ene v1.1 pod.