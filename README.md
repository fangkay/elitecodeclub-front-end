<img src="https://raw.githubusercontent.com/fangkay/elitecodeclub-front-end/main/bidbybid-header.png"/>

# bidbybid

A card game where players bid on cards to gain points

### Main flow of the game

Each player starts with the same amount of money which they can use to bid. At the start of the round a card is drawn from the deck, these cards have point values ranging from 1 to 10. Players bid their desireable amount that they are willing to pay for that card. As soon as all players have passed the player with the highest bid wins that card.

### The winner

Whoever at the end of the game has the highest amount of points AND does not have the least amount of money left of all players, wins the game.

## Setup

### Installation

Use $ npm install to install all packages that are required to run bidbybid.

After installation has finished run $ npm run start , your browser will open automatically displaying the initial home screen.

## Usage

Whenever someone is visiting the URL of bidbybid, this player is connected to the server. After a player has entered a username, this username is stored locally until this player joins a game. If at any moment a player refreshes the browser all local states will be unavailable, this requires the player to go back to the homepage and create a new username and join/create a new game.
