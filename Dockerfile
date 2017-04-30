FROM elixir:1.4.2

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

# Set /app as workdir
ADD . /app
WORKDIR /app
