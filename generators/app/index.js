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
      },
      {
        type: 'confirm',
        name: 'enablessl',
        message: 'Enable SSL? (Domain must be pointing to server)'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    // let lol = 'virtualmin create-domain --domain foo.com --pass smeg --desc "The server for foo" --unix --dir --webmin --web --dns --mail --limits-from-plan';
    let siteUrl = this.props.siteurl,
        user = this.props.username,
        pass = this.props.password,
        desc = this.props.description,
        sslEnable = this.props.enablessl;

    let options = ['--dir', '--web', '--unix'];

    if (sslEnable == true) {
      options.push('--ssl')
    }

    ssh.connect({
      host: this.props.sshcon,
      username: this.props.sshuser,
      password: this.props.sshpass,
    })
    .then(function(res) {
      console.log(chalk.green('Connected'));
      ssh.exec('virtualmin create-domain --domain ' + siteUrl + ' --pass ' + pass + ' --desc "' + desc + '"', options, {
        onStdout(chunk) {
          console.log(chalk.green(chunk.toString('utf8')))
        },
        onStderr(chunk) {
          console.log('Error:', chunk.toString('utf8'))
        },
      })
      .then(function() {
        if (sslEnable == true) {
          ssh.exec('virtualmin generate-letsencrypt-cert --domain ' + siteUrl, [], {
            onStdout(chunk) {
              console.log(chalk.green(chunk.toString('utf8')))
            },
            onStderr(chunk) {
              console.log('Error:', chunk.toString('utf8'))
            },
          })
          .then(function() {
            ssh.exec('exit', [], {
              onStdout(chunk) {
                console.log(chunk.toString('utf8'))
              },
              onStderr(chunk) {
                console.log('Error:', chunk.toString('utf8'))
              },
            })
          })
          .catch(function(err) {
            console.log('ERROR', err);
          })
        } else {
          ssh.exec('exit', [], {
            onStdout(chunk) {
              console.log(chunk.toString('utf8'))
            },
            onStderr(chunk) {
              console.log('Error:', chunk.toString('utf8'))
            },
          })
        }
      })
    })
    .catch(function(err) {
      console.log('ERROR', err);
    });
  }

  install() {
    // this.installDependencies();
  }
};
