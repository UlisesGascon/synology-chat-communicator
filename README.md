
<p align="center"><h1 align="center">
  synology-chat-communicator
</h1>

<p align="center">
  Simple wrapper to send Messages to Synology Chat
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/synology-chat-communicator"><img src="https://badgen.net/npm/v/synology-chat-communicator" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/synology-chat-communicator"><img src="https://badgen.net/npm/license/synology-chat-communicator" alt="license"/></a>
  <a href="https://www.npmjs.org/package/synology-chat-communicator"><img src="https://badgen.net/npm/dt/synology-chat-communicator" alt="downloads"/></a>
  <a href="https://snyk.io/test/github/ulisesgascon/synology-chat-communicator"><img src="https://snyk.io/test/github/ulisesgascon/synology-chat-communicator/badge.svg" alt="Known Vulnerabilities"/></a>
</p>


# About

Simple wrapper to send Messages to [Synology Chat](https://www.synology.com/es-es/dsm/feature/chat)

🌟 If you want a Go version, please check [go-synology-chat](https://github.com/UlisesGascon/go-synology-chat) 🌟


## ❤️ Awesome Features:


- Out of the box simple Interface. 🔥
- Added support for multimedia messages 🍺
- Simple way to send direct messages to one or many users  🎉
- Direct support to list users and channels 🔊
- `debug` is supported 💪
- Easy to use and great test coverage ✅


## Installation

```bash
npm install synology-chat-communicator
```

## Usage

### Simple example

```js
const { sendDirectMessage, getUsers, getChannels } = require('synology-chat-communicator')({
    token: '<YOUR-TOKEN>',
    baseUrl: 'https://<IP-OR-URL>:<PORT>',
    ignoreSSLErrors: true
})

;(async () => {

    const channels = await getChannels()
    console.log("channels:", channels)

    const users = await getUsers()
    console.log("users:", users)

    const user = users[0]
    const userIdsList = users.map(({user_id}) => user_id)

    const message = await sendDirectMessage(user.user_id, `Hello, ${user.username}!`)
    console.log("message:", message)

    const mediaMessage = await sendDirectMessage(user.user_id, `Check out this cool picture, ${user.username}!`, 'https://ulisesgascon.com/ulises_gascon.jpg')
    console.log("Media Message:", mediaMessage)

    const massiveMessage = await sendDirectMessage(userIdsList, "I am the new 🤖. Chat with me!")
    console.log("Massive Message:", massiveMessage)
})()
```

### Disable SSL validation

If you have a Synology NAS with invalid SSL certificates (due to expiration or other issues), you can disable the SSL validation in the requests generated by the library by using the configuration parameter `ignoreSSLErrors`.


## Additional Features

Please check out the official [DSM Documentation](https://kb.synology.com/en-uk/DSM/help/Chat/chat_integration?version=7) to include new features




## Built With

Development only:

- [Standard](https://www.npmjs.com/package/standard) - Linting propuses
- [Husky](https://www.npmjs.com/package/husky) - Git Hooks
- [commitlint](https://www.npmjs.com/package/@commitlint/cli) - Linting commit messages
- [jest](https://www.npmjs.com/package/jest) - Testing
- [standard](https://www.npmjs.com/package/standard) - Linting
- [standard-version](https://www.npmjs.com/package/standard-version) - Manage changelog and releases

Production only:

- [debug](https://www.npmjs.com/package/debug) - Debug the app
- [got](https://www.npmjs.com/package/got) - Human-friendly and powerful HTTP request library for Node.js


## Contributing

Please read [CONTRIBUTING.md](https://github.com/UlisesGascon/.github/blob/main/contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ulisesGascon/synology-chat-communicator/tags).

## Authors

- **Ulises Gascón** - Initial work- - [@ulisesGascon](https://github.com/ulisesGascon)

See also the list of [contributors](https://github.com/ulisesGascon/synology-chat-communicator/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- This project is under development, but you can help us to improve it! We :heart: FOSS!
