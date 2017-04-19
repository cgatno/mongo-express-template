# ME Web Application Template

This is a boilerplate for Node.js web apps that need quick and easy - yet rich - data integration for handling common tasks like authentication and blogging. Apps are built with the following components:

- **Backend/Web server:** Express
- **Data storage:** MongoDB
- **Layout templates:** Pug
- **Static content:** Markdown
- **Styling:** SCSS

The base template here comes with a robust devops pipeline (built with Gulp.js) out-of-the-box that handles basic error-checking, compiling, and packaging your app for production.

Please use the [GitHub issue tracker](https://github.com/cgatno/ME_template/issues) to submit bug reports and feature requests. I use this template frequently for my own projects, so I'll be updating it _a lot_, but that means breaking changes or bugs could be introduced at any time. The `master` branch in this repo should always be the latest stable copy of the template.

## Getting Started

Here's how to get a copy of the code and get up and running in your local development environment:

    git clone https://github.com/cgatno/ME_template.git
    cd ME_template
    yarn
    yarn start

Once the API is running, you should see more instructions in the console for accessing it on your local machine. You can find more detailed information/instructions [below](#installation).

### Prerequisites

Here's what you'll need installed on your development machine:

- [Node.js](https://nodejs.org/en/) (We prefer the latest LTS, but any stable version _should_ work.)
- [Yarn](https://yarnpkg.com/en/) (Optional but recommended - see [below](#installation).)
- [MongoDB](https://www.mongodb.com/) (The Community Server should work fine.)
- [Git](https://git-scm.com/)

### Installation

The first step in installing the API for local testing is cloning the code from the Git repository:

    git clone https://github.com/cgatno/ME_template.git

We recommend using [Yarn](https://yarnpkg.com/en/) to restore Node.js packages necessary for development and testing:

    cd ME_template
    yarn

Yarn is much faster and more data-efficient than NPM, but if you'd rather stick to the traditional method, you can replace `yarn` with `npm` anywhere you see it used. (Note that you'll have to use `npm install` as opposed to just `npm` to restore packages.)

That's it! You're ready to move on to [building the code](#building) now.

### Building

This project uses [Gulp.js](http://gulpjs.com/) to define and run build tasks. The primary build task for the API is simply transpiling ES2015 JavaScript to ES5 JavaScript so that it can run in a variety of Node.js environments. We use [Babel](https://babeljs.io/) for all transpilation.

Our Gulp pipeline is linked with a NPM script, so all you need to do to build the code is run:

    yarn run build

You can also run Gulp build tasks individually if you'd like. The primary Gulp build task can be started with `gulp build`. A more detailed listing of Gulp build tasks will be in this section soon!

### Running

Once everything is installed and compiled, you need to define a few environment variables and make sure your MongoDB service is running before starting the API. There are 2 ways to set the appropriate environment variables:

_(In order of precedence)_

1. Using your system's global environment variables
2. By setting up a config in `.env`. (See `.env.sample` for an example config.)

A table of environment variables will be created in this section along with their descriptions and whether or not the API server requires them to be set.

Once your environment is configured correctly, you can start the API using

    yarn start

You should see some automatic output from the build that's automatically triggered. Once the build is complete, your default browser will open and navigate to the running app. If you use the livereload browser extension, you can make changes to the code and your app will automatically refresh on save.

## Project Guidelines

In general, this project follows a traditional Node.js project structure and uses some well-established code style and source control guidelines. Be sure any code you submit for inclusion in the project conforms to these guidelines!

### File structure

All source code is written in ES2015 JavaScript and goes in `src/`. Our build pipeline transpiles this code to ES5 and places it in `dist/`.

### Code Style

All JavaScript code is checked for syntax and API standards according to the [airbnb JavaScript style guide](https://github.com/airbnb/javascript). Specifically, we use [ESLint](http://eslint.org/) and the [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) package for code linting.

You can manually lint the source code at any time using an NPM script:

    yarn run lint

or Gulp:

    gulp lint

_Note about code style guidelines_

We're definitely open to making modifications to our style guidelines. In fact, our ESLint config only _extends_ the airbnb config. We've already made some customizations ourselves!

The best way to get the rules changed is by simply breaking them! Submit a pull request with code that doesn't pass linting via `yarn run lint` and explain why you think it should. If we can come to a consensus, we'll modify our rules accordingly.

### Source Control

We use Git for source control and the [Gitflow methodology](http://nvie.com/posts/a-successful-git-branching-model/) for managing branching, pull requests, and releases.

## Roadmap

Upcoming changes:

_(In order of priority)_

- Update README with description of Pug and Markdown content integration
- Add comprehensive list of Gulp build tasks with descriptions
- Add table of environment variables
- Implement automated deployment using [dokku](http://dokku.viewdocs.io/dokku/)
- Add image minification support

## License

This project is licensed under the [MIT license](LICENSE).

## Contributors

Huge thanks to this team of direct contributors for writing the code!

- [Christian Gaetano](http://christiangaetano.com)

## Built With

This project couldn't exist without the following amazing software:

_(In alphabetical order to avoid favoritism)_ 😉

- [airbnb JavaScript style guide](https://www.npmjs.com/package/eslint-config-airbnb)
- [Babel](https://babeljs.io/)
- [ESLint](http://eslint.org/)
- [Express](https://expressjs.com/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
