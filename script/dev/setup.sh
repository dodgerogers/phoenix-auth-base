#!/bin/bash

npm install;
mix deps.get;
mix compile;
mix ecto.create;
mix ecto.migrate;
mix phoenix.server;
