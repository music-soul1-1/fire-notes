# FireNotes 

<p align="center"><br><img src="https://github.com/music-soul1-1/fire-notes/assets/72669184/5642a9ae-b6db-431e-bd74-8a0c702fbc32" width="128" height="128" /></p>
<h3 align="center">FireNotes</h3>

This is a notes and to-do application. Web version (the only tested version currently) is built with [Next.js](https://nextjs.org/).

Windows version uses [Tauri](https://tauri.app/). Note that it was not tested or built yet.

### [See changelog](https://github.com/music-soul1-1/fire-notes#changelog)

## Features
* Save your notes and tasks.
* Cross-platform (Mobile version will be available soon).
* Real-time updates.
* Storage and Authentication are provided by [Firebase](https://firebase.google.com/).
* Hosted on [Vercel](https://vercel.com/).

## Usage
1. Open one of the following domains:
* https://firenotes-io.vercel.app/
* https://firenotesio.vercel.app/
* https://fire-notes-io.vercel.app/
* https://firenotes-s.vercel.app
* https://fire-notes-vercel.vercel.app
* https://fire-notes-s.vercel.app
* https://fire-notes-hub.vercel.app
* https://fire-notes-stable.vercel.app
* https://fire-notes-beta.vercel.app

2. Log in.
3. You're ready to go!

## Screenshots

![screenshot](https://github.com/music-soul1-1/fire-notes/assets/72669184/bdf53cd5-0532-457e-a8f7-c229093ecf63)


## Plans
* Refactor and optimize the codebase.
* Fix bugs.
* Improve styling.
* Enable server-side rendering where possible.
* Add features.
* Add settings.
* Release Windows and Android apps.

## Developing

### Using Docker Dev Environments (preferred way)

Open
```
https://open.docker.com/dashboard/dev-envs?url=https://github.com/music-soul1-1/fire-notes@beta
```

This will open Docker Desktop and create a new Dev Environment. After that, open it in VS Code.
Then run

```
npm install -g npm@9.8.0
```

```
npm i
```

And 

```
npm run dev
```
To start Next JS dev server. It should work on ```http://localhost:3001/```

Note that you will need `.env` file for Firebase to work. You can add a project to Firebase console, and then copy the config to `.env` (may require syntax changes). `.env` file should be placed in the root folder of the project.

Using Docker Dev Environments with Hyper-V is preferable, because that way it's not leaving garbage on the dev machine.

### Old way:

Clone the repo, then:

```
docker build -t fire-notes .
```

then:

```
docker run -p 3000:3000 -v ${PWD}:/app fire-notes
```

After making changes, increase the last number in version (`v.0.1.<this>`) in `package.json` and `package-lock.json` and then create pull request.


## Changelog
### v.0.1.2
* Data models updated to match the mobile version.

### v.0.1.1
* License link fix.

### v.0.1.0
* First stable release!

## Dependencies

npm dependencies:

* [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack): ^8.0.1
* [@types/node](https://www.npmjs.com/package/@types/node): 20.3.1
* [@types/react](https://www.npmjs.com/package/@types/react): 18.2.14
* [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): 18.2.6
* [encoding](https://www.npmjs.com/package/encoding): ^0.1.13
* [eslint](https://www.npmjs.com/package/eslint): 8.43.0
* [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 13.4.7
* [firebase](https://www.npmjs.com/package/firebase): ^9.23.0
* [next](https://www.npmjs.com/package/next): 13.4.7
* [react](https://www.npmjs.com/package/react): 18.2.0
* [react-dom](https://www.npmjs.com/package/react-dom): 18.2.0
* [typescript](https://www.npmjs.com/package/typescript): 5.1.3

Dev Dependencies:

* [@tauri-apps/api](https://www.npmjs.com/package/@tauri-apps/api): ^1.4.0
* [@tauri-apps/cli](https://www.npmjs.com/package/@tauri-apps/cli): ^1.4.0

The project also uses:

* [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)
* [NextJS](https://nextjs.org/)
* [Tauri](https://tauri.app/)
* [Firebase](https://firebase.google.com/)
* [Vercel](https://vercel.com/)


## License
FireNotes is an open-source project and released under the [MIT License](https://github.com/music-soul1-1/fire-notes/blob/main/LICENSE.txt).

## Credits
FireNotes is developed and maintained by [music-soul1-1](https://github.com/music-soul1-1/).
