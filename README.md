# React File Generator README

This is a VSCode extension to generate useful TypeScript React files. It will generate .tsx, .test.tsx, .stories.tsx and .module.css files for the specified relative file path and file name.

## Features

There are two ways to generate your files:

### Method 1

Mac: `cmd+shift+p`
Windows: `ctrl+shift+p`

Type `Generate React TS files` and press `Enter` to select it.

Enter the relative file path to the file you are currently in.

For example if you wanted to create the files in the same directory then either don't type anything and press `enter` or type `./` and press `enter`.

If you want to create your files in a folder called `foo` which is in the same folder that the file you are looking at is in then type `./foo` and press `enter`.

You will then be prompted for the file name. If you want to create files for a component `Bar` then just type `Bar` and press `enter`.

You will then have four files created at the directory you specified:

`Bar.tsx`

`Bar.test.tsx`

`Bar.stories.tsx`

`Bar.module.css`

### Method 2

The quicker way to do it is to type a relative path anywhere in the file you are looking at such as `./foo/Bar`.

Then select the relative file path. And press:

Mac: `cmd+shift+p`
Windows: `ctrl+shift+p`

Type `Generate React TS files` and press `Enter` to select it.

The files will have been generated for you.

## Requirements

This extension requires VSCode version 1.45.0.

## Known Issues

Incorrectly typed paths may not work as expected so double check your file paths if something isn't working.
