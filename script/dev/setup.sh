#!/bin/bash

yarn --cwd client/ install;
mix deps.get;
mix compile;
mix ecto.create;
mix ecto.migrate;
mix ecto.seed;
mix phx.server;
