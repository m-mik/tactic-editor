
<h1 align="center">Tactic Editor</h1>

<h4 align="center">
A tool that allows you to create pre-match football tactics and summaries of already completed games,
and convert them to PNG images
</h4>

<p align="center">
  <a href="https://m-mik.github.io/tactic-editor/#/tactics/5" target="_blank">Demo</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#technology">Technology</a> •  
  <a href="#development">Development</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img width="774" height="646" src="https://user-images.githubusercontent.com/25752752/118730733-59d8ec80-b838-11eb-97ea-89c5ea6b2694.gif" alt="Demo" />
</p>

## Key Features

* Tactic list
  - Create, edit, delete and save tactics to localStorage
  - Clone the selected tactic
* Tactic settings
  - Change tactic name
  - Toggle tactic visibility options
* Match summary
  - Calculate match score based on the teams' goals
  - Display match events according to players' data
* Teams
  - Edit team names, colors and shirt styles  
* Team formation
  - Use predefined formations or create your own
  - Move players on the field to new positions  
  - Swap players with other players from the same team
* Team bench
  - Make substitutions by dragging a bench player and dropping it on a field player
  - Add, remove and edit players on the bench
* Players
  - Manage player's data, including: name, shirt number, match rating, goals, own goals, 
    assists, yellow cards, red cards
* Tactic image generation
  - Generate PNG images from the currently selected tactic

## Technology

| Name          | Version       |
| --------------|:-------------:|
| React.js      | 15.5.4        |
| React DnD     | 2.4.0         |
| Redux         | 3.6.0         |
| Redux Form    | 6.6.3         |
| Redux Thunk   | 2.2.0         |
| Material-UI   | 0.17.4        |
| Dom To Image  | 2.6.0         |
| Node Sass     | 4.13.1        |
| Webpack       | 2.4.1         |
| Jest          | 19.0.2        |


## Development

```bash
# Clone this repository
$ git clone https://github.com/m-mik/tactic-editor

# Go into the repository
$ cd tactic-editor

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## License
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

