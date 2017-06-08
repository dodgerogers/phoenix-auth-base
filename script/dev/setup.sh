#!/bin/bash

npm --prefix client/ install;
mix deps.get;
mix compile;
mix ecto.create;
mix ecto.migrate;
mix phx.server;
