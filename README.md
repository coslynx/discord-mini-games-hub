<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-mini-games-hub
</h1>
<h4 align="center">A Discord bot that provides an engaging collection of mini-games to enhance server communities</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Discord.js-blue" alt="Framework used">
  <img src="https://img.shields.io/badge/Frontend-JavaScript-red" alt="Frontend languages">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend language">
  <img src="https://img.shields.io/badge/Database-MySQL-black" alt="Database used">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-mini-games-hub?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-mini-games-hub?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-mini-games-hub?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the source code for a Discord bot called "discord-mini-games-hub". This bot provides an engaging collection of mini-games to enhance server communities, fostering interaction, healthy competition, and fun.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🕹️ | Mini-Game Selection   | The bot offers a diverse range of mini-games, including trivia, word games, reaction tests, and skill-based challenges. Players can browse the game list and select their preferred choice. |
| 🎮 | Game Initiation  | Users can easily initiate games using simple commands. They can specify the desired game, invite other players, and manage game settings. |
| 🏆 | Gameplay and Scoring   | The bot guides players through gameplay with clear instructions and prompts. It interprets player responses, tracks game progress, and manages scoring systems.      |
| 📈 | Leaderboards and Achievements  |  The bot displays ranked players based on their performance in various games. Achievements are awarded for completing tasks or reaching milestones within games, promoting friendly competition.  |
| ⚙️ | Customization and Server Integration   | Server administrators can customize aspects of the bot, such as game themes, rules, and access permissions, tailoring it to specific server needs.  |
| 💬 | User Interface  |  The bot provides a user-friendly interface through Discord commands and responses, minimizing confusion and facilitating smooth interaction with clear instructions. |

## 📂 Structure
```
discord-mini-games-hub/
├── commands
│   ├── gameSelection.js
│   ├── gameStart.js
│   ├── gamePlay.js
│   ├── leaderboard.js
│   ├── achievements.js
│   ├── serverSettings.js
│   └── help.js
├── events
│   ├── ready.js
│   ├── messageCreate.js
│   ├── guildCreate.js
│   ├── guildDelete.js
│   ├── interactionCreate.js
│   └── error.js
├── services
│   ├── gameService.js
│   ├── userService.js
│   ├── serverService.js
│   └── databaseService.js
├── models
│   ├── gameModel.js
│   ├── userModel.js
│   ├── serverModel.js
│   └── leaderboardModel.js
├── utils
│   ├── commandHandler.js
│   ├── logger.js
│   └── errorHandler.js
├── config
│   ├── env.config.js
│   └── database.config.js
├── routes
│   ├── api.js
│   └── gameRoutes.js
├── middleware
│   ├── authentication.js
│   ├── authorization.js
│   └── validation.js
├── .env
└── package.json

```

  ## 💻 Installation
  ### 🔧 Prerequisites
  - Node.js
  - npm
  - MySQL

  ### 🚀 Setup Instructions
  1. Clone the repository:
     - `git clone https://github.com/spectra-ai-codegen/discord-mini-games-hub.git`
  2. Navigate to the project directory:
     - `cd discord-mini-games-hub`
  3. Install dependencies:
     - `npm install`
  4. Create a `.env` file in the root directory and add the following environment variables:
      ```
      DISCORD_TOKEN=your_discord_bot_token
      MYSQL_HOST=your_mysql_host
      MYSQL_USER=your_mysql_user
      MYSQL_PASSWORD=your_mysql_password
      MYSQL_DATABASE=your_mysql_database
      ```
  5. Set up your MySQL database and create a database with the name specified in your `.env` file.
  6. Run the following command to start the bot:
      - `npm start`

  ## 🏗️ Usage
  ### 🏃‍♂️ Running the Project
  The bot will automatically connect to your Discord server and start listening for commands. 

  ### ⚙️ Configuration
  - Game Selection: Use `!games` to view the list of available mini-games.
  - Game Initiation: Use `!start <game_name> <optional:player1_mention> <optional:player2_mention>` to start a game.
  - Gameplay: Follow the instructions provided by the bot during gameplay.
  - Leaderboards: Use `!leaderboard <game_name>` to view the leaderboard for a specific game.
  - Achievements: The bot will automatically notify you of any achievements you unlock.
  - Server Settings:  Server administrators can customize the bot's behavior using `!settings`.

  ### 📚 Examples
  - Example 1: Starting a trivia game with two players:
     - `!start trivia @player1 @player2`
  - Example 2: Viewing the leaderboard for the "wordle" game:
     - `!leaderboard wordle`

  ## 🌐 Hosting
  ### 🚀 Deployment Instructions
  1. Set up your database: Create a MySQL database on a hosting platform like AWS RDS, Google Cloud SQL, or a self-managed database server. 
  2. Configure environment variables: Add your database credentials and Discord bot token to a `.env` file.
  3. Deploy to a hosting platform: Choose a suitable platform like Heroku, AWS Elastic Beanstalk, or a serverless platform like AWS Lambda.
  4. Set up the bot: Create a Discord application and a bot user, then add the bot to your Discord server.
  5. Run the bot: Start the bot on your hosting platform.

  ## 📜 License
  This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).
  
  ## 👥 Authors
  - Author Name - [Spectra.codes](https://spectra.codes)
  - Creator Name - [DRIX10](https://github.com/Drix10)

  <p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
  </p>
  <p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
  </p>
  <p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google_&_Microsoft_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
  <p>