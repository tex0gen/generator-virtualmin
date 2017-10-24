'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');
const node_ssh = require('node-ssh');
const ssh = new node_ssh();

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the badass ' + chalk.red('generator-virtualmin') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'sshcon',
        message: 'SSH Host'
      },
      {
        type: 'input',
        name: 'sshuser',
        message: 'SSH Username'
      },
      {
        type: 'input',
        name: 'sshpass',
        message: 'SSH Password'
      },
      {
        type: 'input',
        name: 'siteurl',
        message: 'New Site URL'
      },
      {
        type: 'input',
        name: 'username',
        message: 'Username'
      },
      {
        type: 'input',
        name: 'password',
        message: 'Password'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    // let lol = 'virtualmin create-domain --domain foo.com --pass smeg --desc "The server for foo" --unix --dir --webmin --web --dns --mail --limits-from-plan';

    ssh.connect({
      host: sshcon,
      username: sshuser,
      password: sshpass,
    })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  install() {
    // this.installDependencies();
  }
};
