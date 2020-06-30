export TERM=xterm-256color
export CYPRESS_CRASH_REPORTS=0

set fish_greeting

if test -f ~/updatevim.sh
	bash ~/updatevim.sh
end

~/dev-tmux.sh
