#!/bin/sh
set -e

function h1() {
  echo -e "\n\n# ${@}\n" >&2
}

function h2() {
  echo -e "\n\n## ${@}\n" >&2
}

function pre() {
  echo '```' >&2
}

function run() {
  echo ">_ $@"
  su -c "$@" rails
}

# El primer parámetro tiene que ser el sitio
test -n "$1"

h1 "Entrar al repositorio ${1}"

h2 "Actualizando content"

pre
  run "git -C /srv/_sites/${1} fetch"
  run "git -C /srv/_sites/${1} switch content"
  run "git -C /srv/_sites/${1} add public && git -C /srv/_sites/${1} commit --message=public" || true
  run "git -C /srv/_sites/${1} pull"
  run "git -C /srv/_sites/${1} push"
pre

h2 "Cambiando a la rama ${2}"

pre
  run "git -C /srv/_sites/${1} fetch"
  run "git -C /srv/_sites/${1} switch ${2}"
pre

h2 "Traer cambios"

pre
  run "git -C /srv/_sites/${1} pull"
  run "git -C /srv/_sites/${1} lfs prune"
pre

h2 "Enviar cambios locales"

pre
  run "git -C /srv/_sites/${1} push"
pre

if test -n "${3}" ; then
  h2 "Publicando cambios en $1"

  pre
    cd /srv
    run "bundle exec rails r 'site = Site.find_by_name \"${1}\"; DeployJob.perform_now(site.id, notify: false, output: true)'"
    run "git -C /srv/_sites/${1} add public && git -C /srv/_sites/${1} commit --message=public" || true
  pre
fi

h2 "Volver a content"

pre
  run "git -C /srv/_sites/${1} switch content"
pre

h2 "Listo"
