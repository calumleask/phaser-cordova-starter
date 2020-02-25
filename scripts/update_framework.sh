#!/bin/sh

# Trap errors #
error() {
  # Dump error location #
  local parent_lineno="$1"
  local message="$2"
  local code="${3:-1}"
  if [[ -n "$message" ]] ; then
    echo "Error on or near line ${parent_lineno}: ${message}; exiting with status ${code}"
  else
    echo "Error on or near line ${parent_lineno}; exiting with status ${code}"
  fi

  # Exit with original error code #
  exit "${code}"
}
trap 'error ${LINENO}' ERR

package="phaser-framework"

rm -rf -f ./libs/${package}
mkdir -p ./libs/${package}/src
mkdir -p ./libs/${package}/types
cp ../${package}/package.json ./libs/${package}/package.json
cp -r ../${package}/src/* ./libs/${package}/src
cp -r ../${package}/types/* ./libs/${package}/types