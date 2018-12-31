# MLBanalysis2.0

An small CLI app to retrieve MLB statistics and data.

## Table of Contents

1.  [Documentation](#documentation)
    1.  [Installation](#installation)
    2.  [Running the Program](#runningtheprogram)
    3.  [Options](#options)
    4.  [Examples](#examples)
2.  [Built With](#builtwith)
3.  [Contributors](#contributors)
4.  [License](#license)

## [Documentation](#documentation)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### [Installation](#installation)

Just install required npm dependencies

    npm install

## [Running the Program](#runningtheprogram)

    node mlb.js [player] [-active_status]

-   You can run **`mlb.js`** with or without arguments.
-   Running without arguments will bring you to the home screen.
-   The only arguments it can accept right now are players names (not case sensitive) and active status.
-   Full names will always yield a result. Last names will not yield multiple results.  

### [Options](#options)

**-active_status** takes two arguments:

-   **-a** will return results for an **active** player. This is the default value if left blank.
-   **-i** will return results for an **inactive** player

### [Examples](#examples)

    node mlb.js bellinger -a

    node mlb.js babe ruth -i

## [Built With](#builtwith)

-   [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js, used to handle HTTP GET/POST requests
-   [inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - Interactive Command Line User Interface
-   [columnify.js](https://github.com/timoxley/columnify) - Create text-based columns suitable for console output
-   [moment.js](https://github.com/moment/moment) - Parse, validate, manipulate, and display dates in javascript.

## [Contributors](#contributors)

-   **Cullan Shewfelt** - _Initial work_ - [Cullan Shewfelt](https://github.com/cullanshewfelt)

## [License](#license)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
