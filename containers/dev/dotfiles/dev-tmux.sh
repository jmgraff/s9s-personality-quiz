#!/bin/sh
if [ -z "$TMUX" ]
then
	tmux new-session -d 'export TERM=xterm-256color && vim'
	tmux split-window -h
	tmux resize-pane -R 45
	tmux last-pane
	tmux new-window 'fish'
	tmux last-window
	tmux attach-session -d
fi
