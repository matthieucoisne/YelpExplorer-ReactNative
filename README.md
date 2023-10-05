# YelpExplorer-ReactNative

[![build](https://github.com/matthieucoisne/YelpExplorer-ReactNative/workflows/build/badge.svg)](https://github.com/matthieucoisne/YelpExplorer-ReactNative/blob/main/.github/workflows/build.yml)

## Project Description

YelpExplorer is a multiplatform project that shows a list of businesses, their details and latest reviews using
[Yelp](https://www.yelp.com/)'s API.

I originally created this project to learn about GraphQL but since Yelp is also serving its data with a REST API,
I thought it would be a great opportunity to showcase the power of Clean Architecture when it comes to being able
to swap one data layer for another without having to modify the domain and presentation layers.

I then thought it would be a great experience to port the Android project to Flutter and ReactNative to learn more
about all the different technologies that exist to build multiplatform applications.

<br/>

> [!NOTE]
> While Clean Architecture is known and used by the Android and the Flutter community, it is not much the case for ReactNative... but at least the ReactNative variant of this project demonstrates that it is possible to adopt it. This branch shows a simpler architecture. To go back to the Clean Architecture branch, please click [here](https://github.com/matthieucoisne/YelpExplorer-ReactNative/tree/main).

<br/>

This project is available in:<br/>
[Compose/Kotlin](https://github.com/matthieucoisne/YelpExplorer)<br/>
[Flutter/Dart](https://github.com/matthieucoisne/YelpExplorer-Flutter)<br/>
[ReactNative/TypeScript](https://github.com/matthieucoisne/YelpExplorer-ReactNative)<br/>

### Screenshots

|                                                                           Business List                                                                            |                                                                             Business Details                                                                             |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![YelpExplorer-React Native - Business List](https://github.com/matthieucoisne/YelpExplorer-ReactNative/blob/main/media/YelpExplorer-ReactNative-BusinessList.png) | ![YelpExplorer-React Native - Business Details](https://github.com/matthieucoisne/YelpExplorer-ReactNative/blob/main/media/YelpExplorer-ReactNative-BusinessDetails.png) |

## Project Characteristics

- Cross-Platform project using [React Native](https://reactnative.dev/) and [TypeScript](https://www.typescriptlang.org/)
- Continuous Integration with GitHub [Actions](https://github.com/matthieucoisne/YelpExplorer-ReactNative/actions)
- Project management with GitHub [Project Board](https://github.com/matthieucoisne/YelpExplorer-ReactNative/projects/1)

## Tech Stack

- [React Native](https://reactnative.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Navigation v6](https://reactnavigation.org/docs/getting-started)
- [Apollo GraphQL](https://www.apollographql.com/docs/react/)
- [Jest](https://jestjs.io/docs/tutorial-react-native)

## Development Setup

### How to run the project

1. Setup your dev environement: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

2. Clone this project using Git or download the source code.

3. Install the dependencies:
   ```
   > npm install
   > cd ios
   > pod install
   ```
4. Start the Metro server:
   ```
   > npm start
   ```
5. Run the app:
   ```
   > npm run ios
   ```

### Yelp API Key

If you want to run this project on an device or an emulator, you need to obtain your own API key from Yelp and
provide it to the app.

1. Request your API key: https://www.yelp.com/developers/documentation/v3/authentication<br/>
2. Create a `config` folder located in this project's root folder. Then, create a `app_config.json` file in that `config` folder and add your API key like this:
   ```
   {
     "api_key": "YOUR_API_KEY"
   }
   ```

## Author

[![Follow me](https://img.shields.io/twitter/follow/matthieucoisne?style=social)](https://x.com/matthieucoisne)

## License

```
Copyright 2021-Present Matthieu Coisne

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
