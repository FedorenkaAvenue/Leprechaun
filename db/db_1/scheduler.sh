#!/bin/bash

crontab -l | { cat; echo "0 * * * * sh /app/dump_pull.sh"; } | crontab -
