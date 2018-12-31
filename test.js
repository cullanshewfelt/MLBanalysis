const argument = process.argv[2];
const inquirer = require('inquirer');

const menu = () => {
    // !argument ?
    inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Name?',
      default: argument,
      validate: function validate(name){
        let reg = /^([^0-9]*)$/;
        // console.log('validating', name, reg.test(name))
        return reg.test(name) || "Not a valid name"
      },
      filter: function filter(name){
        return `Do Something with Name: ${name}`
      }
    }]).then(answer => {
      showName(answer.name)
    })
    // : showName(argument)
}

const showName = (name) => {
 console.log(name)
}

menu();
