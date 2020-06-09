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

"tab to switch tabs
:nnoremap <Tab> :tabn<CR>
:nnoremap <S-Tab> :tabp<CR>

"search
set hlsearch
set smartcase
set ignorecase

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

"indentation
set autoindent
set expandtab
set shiftwidth=4
set tabstop=4
set smarttab

"nowrap
set nowrap

"no swap files
set noswapfile

"Makefile stuff
autocmd FileType make set noexpandtab shiftwidth=2 softtabstop=0
