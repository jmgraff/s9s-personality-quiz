call pathogen#infect()
call pathogen#helptags() "If you like to get crazy :)

let mapleader=" "
nnoremap <SPACE> <Nop>

"easymotion
map <Leader> <Plug>(easymotion-prefix)

"solarized
syntax enable
set background=dark
let g:solarized_termcolors=256
colorscheme solarized

"nerdtree
map <C-n> :NERDTreeToggle<CR>

"ctrlp
let g:ctrlp_map = '<C-p>'
let g:ctrlp_cmd = 'CtrlP'

imap jk <Esc>

"make vim-airline show up
set laststatus=2

"line numbers
set number
set cursorline
set cursorcolumn

"indentation
set autoindent
set expandtab
set shiftwidth=4
set tabstop=4
set smarttab

"nowrap
set nowrap

"Makefile stuff
autocmd FileType make set noexpandtab shiftwidth=2 softtabstop=0
