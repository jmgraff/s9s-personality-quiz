scriptencoding utf-8
set encoding=utf-8

set nocompatible              " be iMproved, required
filetype off                  " required

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
Plugin 'preservim/nerdtree'
Plugin 'easymotion/vim-easymotion'
Plugin 'kien/ctrlp.vim'
Plugin 'airblade/vim-gitgutter'
Plugin 'vim-airline/vim-airline'
Plugin 'altercation/vim-colors-solarized'
call vundle#end()            " required
filetype plugin indent on    " required

let mapleader=" "
nnoremap <SPACE> <Nop>

"easymotion
map <Leader> <Plug>(easymotion-prefix)

"colors
set t_Co=256
syntax enable
set background=dark
let g:solarized_termcolors=256
silent! colorscheme solarized
hi clear SignColumn

"tab/pane movement
map <C-l> :tabn<cr>
map <C-h> :tabp<cr>
map <C-j> <C-w><C-j>
map <C-k> <C-w><C-k>

"rolodex h-splits
set noequalalways winminheight=0 winheight=9999 helpheight=9999

"open wildcard in h-splits
:command! -nargs=+ -complete=file Split
\ for s:f in [<f-args>]
\|  for s:m in glob(s:f, 0, 1)
\|      exe 'split' fnameescape(s:m)
\|  endfor
\|endfor
\|if exists(s:f) | unlet s:f
\|if exists(s:m) | unlet s:m

"search
set hlsearch
set smartcase
set ignorecase
set incsearch

"whitespace
set list
set listchars=tab:»\ ,extends:›,precedes:‹,trail:•

"nerdtree
map <C-n> :NERDTreeToggle<CR>
"let g:NERDTreeDirArrows=0
let g:NERDTreeDirArrowExpandable = '+'
let g:NERDTreeDirArrowCollapsible = '~'
let NERDTreeNodeDelimiter = "\t"
let NERDTreeQuitOnOpen = 1

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

"filetype
filetype on
filetype plugin on
filetype indent on

"indentation
set ai
set expandtab
set tabstop=4
set shiftwidth=4
set softtabstop=4

"nowrap
set nowrap

"no swap files
set noswapfile

"Makefile stuff
autocmd FileType make setlocal noexpandtab shiftwidth=2 softtabstop=0
