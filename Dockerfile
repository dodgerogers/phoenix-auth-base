FROM elixir:1.7.4

MAINTAINER Andy Rogers

# Install hex
RUN mix local.hex --force

# Install Erland build tool
RUN mix local.rebar --force

# Install Phoenix
RUN mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez

# Install NodeJS 6.x and the NPM
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y -q nodejs

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install --no-install-recommends yarn

# Install live reload dependencies
RUN apt-get install -y inotify-tools

# Set /app as workdir
ADD . /app
WORKDIR /app
