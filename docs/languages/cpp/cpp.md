---
id: cpp
title: C++
sidebar_label: Overview
---

## Courses

- [GFG Fork CPP](https://practice.geeksforgeeks.org/courses/fork-cpp): GeeksForGeeks Fork CPP
- [SoloLearn](https://www.sololearn.com/Course/CPlusPlus/): Syntax

## Setup

[Reference](https://www.freecodecamp.org/news/how-to-compile-your-c-code-in-visual-studio-code/)

### Linux

- g++ is already installed in Kubuntu
- VS Code
  - Install C++ Language support extension
  - Install Code Runner extension
  - RightClick RunCode
  - Write Access to terminal
    - Open CommandPallette <kbd>Ctrl + Shift + P</kbd> or View CommandPalette
    - SelectDefaultShell cmd
    - File Preferences Settings Users Extensions RunCodeConfiguration Enable RunInTerminal

### Windows

- Install [MinGW](https://osdn.net/projects/mingw/downloads/68260/mingw-get-setup.exe/)
- Select ```mingw32-gcc-g++``` and MarkForInstallation
- TopLeftMenu Installation Apply Changes
- Set Environment Variables
  - ControlPanel System AdvancedSystemSettings EnvironmentVariables SystemVariables Path New ```C:\MinGW\bin```
- VS Code
  - Install C++ language support extension
  - Install Code Runner extenstion
  - Open CommandPallette <kbd>Ctrl + Shift + P</kbd> or View CommandPalette
  - Type ```C/C++ Edit Configuration UI```
  - CompilerPath ```C:/MinGW/bin/g++.exe```
  - IntelliSenseMode ```gcc-x64```
  - RightClick in any cpp file RunCode
  - Write Access to terminal
    - Open CommandPallette <kbd>Ctrl + Shift + P</kbd> or View CommandPalette
    - SelectDefaultShell cmd
    - File Preferences Settings Users Extensions RunCodeConfiguration Enable RunInTerminal

## Overview

- Strings
    > [LeetCode Tutorial](https://leetcode.com/explore/learn/card/array-and-string/)
- Vectors
- Maps
- Sets
- Iterators
- STL
