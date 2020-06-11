#!/bin/sh
pytest -s -vvx tests -k $1 --sw
