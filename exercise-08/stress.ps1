# Array of names
$names = @("John", "Jane", "Bob", "Alice", "Charlie", "Megan", "Tom", "Lucy")

# Generate load
Write-Host "Generating load..."
while ($true) {
  # Pick a random name from the array
  $name = $names[(Get-Random -Maximum $names.Length)]

  # Send a GET request to the specified URL
  Invoke-WebRequest -Uri "http://localhost/hello?name=$name" -UseBasicParsing | Out-Null

  # Optional: sleep for a short period to prevent overloading the server
  Start-Sleep -Milliseconds 100
}