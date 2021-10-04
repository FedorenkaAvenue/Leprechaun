#!/usr/bin/env bash

indexer --all --config /etc/sphinx/sphinx.conf --rotate
searchd --config /etc/sphinx/sphinx.conf --nodetach
