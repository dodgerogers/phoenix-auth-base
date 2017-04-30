# rel/hooks/migrate
#!/bin/sh

echo "Running migrations..."
bin/teebox command release_tasks migrate
echo "Finished runnig migrations"
