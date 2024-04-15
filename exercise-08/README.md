```bash
kubectl delete deployment greetings-v2 --namespace=ab-testing
````

```bash
kubectl apply -f autoscale-deployment.yaml
```

Voer het `stress.ps1` script uit in een PowerShell.

Je kunt het CPU en geheugen verbruik volgen via:

```bash
kubectl top pod -A
```