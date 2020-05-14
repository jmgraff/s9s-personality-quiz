export TERM=xterm-256color
set fish_greeting

if test -f ~/updatevim.sh
	bash ~/updatevim.sh
end

cd project
tmux
clear
