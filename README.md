# The Character Creator
A frontend interface for creating characters in SVG from a series of menus presented to the user. Characters can then be exported (downloaded) and used in games, comics, websites, etc.

View it in action on https://charactercreator.org

# Description

This project is a prototype for creating characters quickly that can be exported for web projects, 2D gaming projects, Comics or other print materials.

Downloaded characters can be openend in Inkscape, a free vector graphics program.

https://inkscape.org

# Mission

The aim of this project is to create a fast, intuitive user interface for producing quality 2d character drawings.

# Getting Started

## Install the dependencies:

Requires node 16 or above. We strongly suggest you install pnpm too (instead of using npm) since it's faster, takes less space and is more versatile:

```sh
npm i -g pnpm
```

After which you can:

```sh
pnpm install
cp config-sample.json config.json # or edit existing config.json
```

The config.json keys "extraPort", "secret" and "formUrl" are all optional. "formUrl" is the URL of the form at the client's site. "secret" is used to sign the cookie, make it a long randomstring. "extraPort" defaults to 3000.

In dev mode, set "secret" (random) and "formUrl" to "http://localhost:5000/fake-form" to test form.

Also copy `members.json` to project root (with `config.json`) to list patrons automatically.

- pnpm build # dev build in src/
- pnpm prod # production build in prod/
- pnpm dev # launch dev web server; caddy is used in prod
- pnpm start # launch backend to handle form post and image conversions

## Install CouchDB

Get the site up and running on your local machine:

```sh
pnpm prod # outputs production site into prod/
pnpm build # build js and css (mostly for dev)
pnpm start # launch static web server; Ctrl-C to quit
# edit js/html/css/svg files
# run 'pnpm build' as needed (not automatic)
pnpm clean # delete built files in prod/ and src/dist/
```


# Site Architecture

![function-calls](https://raw.githubusercontent.com/ubik23/charactercreator/master/scripts/function-calls.jpg)

The project is still in its alpha stage, so you might find some legacy code from when the project was created in 2014. I try to keep it up to date but some parts get neglected in favor of new shiny features.

The items are separated into layers, some items require multiple layers while others only need one. Most SVG paths have classes that tell the App what color the path should be. The order of the SVGs are important to preserve the illusion of 3d in this 2d environment.

All SVGs are optimized to remove as much excess styles and attributes as possible. Each layer is a group with an id that is used to show/hide the layer according to the user's choices.

if you want to open an SVG to edit it, make sure you add the following in the file:
```svg
<svg viewBox="10 50 540 540">
[...]
</svg>
```
You can then edit the layer in Inkscape and export it again. Be sure to use a tool to optimize the file as much as possible (like svgomg) and replace the SVG tag by a Group tag.

# License

The code is licensed AGPL, clone, modify and share your improvements! The assets in `src/layer/` are licenses CC-BY-NC unless you received another licenses as an elligible  patron.

Suggestions are welcomed. Post an issue on the project's Github page to let us know what new features you want implemented and any bugs you may find along the way. Just make sure it isn't already on the list.

