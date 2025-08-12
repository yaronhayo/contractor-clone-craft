#!/bin/bash

echo "Testing Production Build Preview Server (http://localhost:4173)"
echo "================================================"

# Test routes
routes=(
  "/"
  "/health"
  "/debug-test"
  "/services/garage-door-repair"
  "/static-test"
  "/services"
  "/contact"
  "/about"
)

for route in "${routes[@]}"; do
  echo -n "Testing $route: "
  
  # Test HTTP status
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4173$route")
  
  if [ "$status" -eq 200 ]; then
    echo "✅ $status"
  else
    echo "❌ $status"
  fi
  
  # Brief delay
  sleep 0.1
done

echo ""
echo "Manual testing instructions:"
echo "1. Open http://localhost:4173/health in your browser"
echo "2. Open http://localhost:4173/services/garage-door-repair in your browser"
echo "3. Check browser console for any errors"
echo "4. Compare behavior with the live site"