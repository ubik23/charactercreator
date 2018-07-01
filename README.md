# The Character Creator
A frontend interface for creating characters in SVG from a series of menus presented to the user. Characters can then be exported (downloaded) and used in games, comics, websites, etc.

View it in action on https://charactercreator.org

# Description

This project is a prototype for creating characters quickly that can be exported for web projects, 2D gaming projects, Comics or other print materials.

Downloaded characters can be openend in Inkscape, a free vector graphics program.

https://inkscape.org

# MIssion

The aim of this project is to create a fast, intuitive user interface for producing quality 2d character drawings.

# Getting Started

Install the dependencies:

npm install

Get the site up and running on your local machine:

gulp

# Site Architecture

The project is still in its alpha stage, so you might find some legacy code from when the project was created in 2014. I try to keep it up to date but some parts get neglected in favor of new shiny features.

The items are seperated into layers, some items require multiple layers while other only need one. Most SVG paths have classes that tell the App what color the path should be. The order of the SVGs are important to preserve the illusion of 3d in this 2d environment.

All SVGs are optimized to remove as much excess styles and attributes as possible. Each layer is a group with an id that is used to show/hide the layer according to the user's choices.

if you want to open an SVG to edit it, make sure you add the following in the file:

<svg viewBox="10 50 540 540">
[...]
</svg>

You can then edit the layer in Inkscape and export it again. Be sure to use a tool to optimize the file as much as possible (like svgomg) and replace the SVG tag by a Group tag.

# License

Ths project is licensed AGPL, clone, modify and share your improvements!

Suggestions are welcomed. Post an issue on the project's github page to let us know what new features you want implemented and any bugs you may find along the way. Just make sure it isn't already on the list.
