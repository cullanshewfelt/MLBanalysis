# MLBanalysis2.0
An small CLI app to retrieve MLB statistics and data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Just install required npm dependencies

```
npm install
```
### Running the Program

```
node mlb.js [player] [-active]
```

You can run mlb.js with or without arguments.
Running without arguments will bring you to the home screen.

The only arguments it can accept right now are players names (not case sensitive).
Full names will always yield a result. Last names will not yield multiple results.  

-active takes two parameters:
* -a will return results for an active player. This is the default value if left blank.
* -a will return results for an inactive player

Examples:
```
node mlb.js bellinger -a
node mlb.js babe ruth -i
```

## Built With

* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js, used to handle HTTP GET/POST requests
* [inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - Interactive Command Line User Interface
* [columnify.js](https://github.com/timoxley/columnify) - Create text-based columns suitable for console output
* [moment.js](https://github.com/moment/moment) - Parse, validate, manipulate, and display dates in javascript.

* **Cullan Shewfelt** - *Initial work* - [Cullan Shewfelt](https://github.com/cullanshewfelt)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
