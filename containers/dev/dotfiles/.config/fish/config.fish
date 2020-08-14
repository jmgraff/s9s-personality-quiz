export TERM=xterm-256color
export CYPRESS_CRASH_REPORTS=0
export PROJECT_NAME_SLUG=(slugify $PROJECT_NAME)

set fish_greeting

if test -f ~/updatevim.sh
	bash ~/updatevim.sh
end

~/dev-tmux.sh
