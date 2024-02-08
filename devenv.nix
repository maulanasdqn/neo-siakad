{ pkgs, ... }:

{
  packages = with pkgs; [
    bun
    nodejs
    (writeScriptBin "helpme" ''
      __usage="
      👋 Welcome to NeoSiakad development environment. 🚀
      If you see this message, it means your are inside the Nix shell ❄️.

      [Info]===============================================================>

      NodeJS Version: v${nodejs.version}
      Bun Version: v${bun.version}

      Command available:
        - start:            start project in production ( need to run build first  ) 🛹
        - build:            build project for production
        - dev:              start development server
        - start-postgres:   start postgres-db
        - db-gen:           generate drizzle migration
        - db-push:          push migration
        - db-seed:          seed database
        - helpme:           show this messages

      Repository:
        - https://github.com/maulanasdqn/neo-siakad
      [Info]===============================================================>
      "
      echo "$__usage"
    '')

    (writeScriptBin "dev" ''
      bun dev
    '')

    (writeScriptBin "build" ''
      bun run build
    '')

    (writeScriptBin "start" ''
      bun start
    '')

    (writeScriptBin "db-generate" ''
      bun db:gen
    '')

    (writeScriptBin "db-push" ''
      bun db:push
    '')

    (writeScriptBin "db-seed" ''
      bun db:seed
    '')

  ];

  enterShell = ''
    helpme
  '';

  languages.typescript.enable = true;

  dotenv.enable = true;

  services.postgres = with pkgs; {
    enable = true;
    package = postgresql_15;
    initialDatabases = [{ name = "neosiakad-db"; }];
  };

}
