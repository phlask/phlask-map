# phlask-map
Code behind the Phlask Web Map. In order to run the app locally 

* You will need to have Docker installed: https://www.docker.com

* Once Docker is installed, run the following commands from the root of this repository.
```shell
# Build the phlask image
docker-compose build

# Run the application
docker-compose up
docker-compose up -d # Run in the background

# Stop the application
# Ctrl+C or ⌘+C
docker-compose stop # When running in the background

# Rebuild the image
docker-compose up -d --build
```
* Navigate to http://localhost:3000 on your browser to view the application