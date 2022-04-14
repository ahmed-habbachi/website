---
path: '/How-to-Git'
title: How to Git
date: 2022-04-14 11:00:00
category: Tools
tags: [Angular, cleanArchitecture]
featuredImage: ./git-hero.png
published: true
---

These are some git command cheat sheet that I am mainly writing them down to me, yes I could just keep them in my [Notion](https://www.notion.so/) repository but I find myself sending it and sharing it with a lot of my colleagues so yeah why not post it here too.

### Git commands Cheat Sheet

Initialize a new git repository:  
`git init`  
Set configuration values for your username and email:  
`git config --global [user.name](http://user.name/) <your-name>`  
`git config --global [user.email](http://user.email) <your-email>`

Clone a repository:  
`git clone <repository-url>`  

Add a file to the staging area:  
`git add <file-name-to-add>`  

Add all files changes to the staging area:  
`git add .`  
Check the un-staged changes:  
`git diff`  
Reset staging area to the last commit:  
`git reset`  
Check the state of the working directory and the staging area:  
`git status`  
Remove a file from the index and working directory:  
`git rm <file-to-remove>`

List the commit history:  
`git log`  
Check the metadata and content changes of the commit:  
`git show <commit-hash>`

Lists all local branches:  
`git branch`  
Create a new branch:  
`git branch <branch-name>`

Rename the current branch:  
`git branch -m <new-branch-name>`

Delete a branch:  
`git branch -d <branch-name-to-delete>`

Switch to another branch:  
`git checkout <branch-name>`

Switch to another branch on remote:  
`git fetch origin`  
`git checkout -b <local-branch-name> <remote-branch-name starting with 'origin/...'>`

Merge specified branch into the current branch:  
`git merge <branch-name>`

Create a new connection to a remote repository:  
`git remote add <name> <repository-url>`

Push the committed changes to a remote repository:  
`git push <remote> <branch>`

Download the content from a remote repository:  
`git pull <remote>`

Cleanup unnecessary files and optimize the local repository:  
`git gc`
Temporarily remove uncommitted changes and save them for later use:  
`git stash`  
Reapply previously stashed changes:  
`git stash apply`

### Revert commits made to the wrong branch

```bash
# first reset the commit 
git reset --soft HEAD^
# checkout the branch you want to commit to
git checkout branch
# commit
git commit
```

### Rebase Current branch onto develop

```bash
# either update your develop local branch by call
git rebase develop
# or
git rebase origin/develop
# Conflicts may occur you should resolve them all and add your changes by running 'git add' command, you should not commit your changes:
git add .
# then continue your rebase, conflicts still can occur fix them and then git add . and then continue
git rebase --continue
# once you are done, you just need to update your remote branch
git push origin HEAD -f
# I urge you to push your rebase to the remote server like that you wont be surprised if you see that your branch need to download some commit from the old pushed commits.
# PS: If you want to see the files with conflicts
git diff --name-only --diff-filter=U
```

### Git Submodules

`git clone --recurse-submodules git@git.case-tunisia.com:Bosch/box-control.git`  
`git submodule update --init --recursive`

### Git Alias

To be able to use alias in git you basically just need to add lines to ~/.gitconfig

```bash
[alias]
    st = status
    ci = commit -v
```

Or you can use the git config alias command:

`git config --global alias.st status`  
On unix, use single quotes if the alias has a space:

`git config --global alias.ci 'commit -v'`  
On windows, use double quotes if the alias has a space or a command line argument:

`git config --global alias.ci "commit -v"`  
The alias command even accepts functions as parameters. Take a look at [aliases](https://git.wiki.kernel.org/index.php/Aliases#Aliases)

some usefull examples

br = branch

co = checkout

cob = checkout -b

ci = commit

cam = commit -am

st = status

last = log -1 HEAD

hist = log --graph
--pretty=format:'%C(bold)%h%Creset%C(magenta)%d%Creset %s %C(yellow)<%an>
%C(cyan)(%cr)%Creset' --abbrev-commit --date=relative

hists = log --graph
--pretty=format:'%C(bold)%h%Creset%C(magenta)%d%Creset %s %C(yellow)<%an>
%C(cyan)(%cr)%Creset' --abbrev-commit --date=relative --stat

ls = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cgreen\\
[%cn]" --decorate

fp = fetch --all --prune

alias = "!git config -l | grep alias | cut -c 7-"

mnff = merge --no-ff

f = "!git ls-files | grep -i"

rh1 = reset HEAD^ --hard

rh2 = reset HEAD^^ --hard

bra = branch -a

up = pull --rebase --autostash
