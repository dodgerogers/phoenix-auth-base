# Teebox

To start your app:

  * Install Docker
  * Run the application in daemon mode `docker-compose up -d web`
  * Stop the application `docker-compose stop web`
  * Restart the application `docker-compose restart web`
  * Run the tests `docker-compose run --rm test`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

To deploy the application  

  * Make a build `docker-compose exec web mix docker.build`
  * Make a release `docker-compose exec web mix docker.release`
  * Publish release `docker-compose exec web mix docker.publish`
  * All three `docker-compose exec web mix docker.shipit`
  * Run the release locally `docker-compose up run_release`
  * Remove stale images `docker rmi -f $(docker images -f "dangling=true" -q)`

Tasks

  * Run security checks `docker exec -t DOCKER_ID mix sobelow`
