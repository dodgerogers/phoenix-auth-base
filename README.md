# Teebox

To start your app:

  * Install Docker
  * Run the application in daemon mode `docker-compose up -d web`
  * Stop the application `docker-compose stop web`
  * Restart the application `docker-compose restart web`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

To deploy the application  

  * Make a release ` docker build -t teebox:<VERSION> -f Dockerfile.release . `
  * Publish release `docker.publish ...` # See secrets.sample for the docker registry
  * Update the compose file run_release service with the release tag, then run locally `docker-compose up run_release`

Tasks
  * Run the tests `docker-compose run --rm test`
  * Run security checks `docker exec -t CONTAINER_ID mix sobelow`


Tidying up  
  * Remove stale images `docker rmi -f $(docker images -f "dangling=true" -q)`
