# YelpExplorer-ReactNative

## Project Description

YelpExplorer-ReactNative is a React Native application that shows a list of business, their details and latest reviews using [Yelp](https://www.yelp.com/)'s API.

The goal of this project is to demonstrate the differences between using a REST API versus a GraphQL API in a modern React Native application, that has a scalable, maintainable and testable architecture.

## Development Setup

### Yelp API Key

If you want to build and run this project on physical device, a simulator/emulator, or a web browser, you need to obtain your own API key from Yelp and provide it to the app.

1. Clone this project using Git or download the source code
2. Request your API key: https://www.yelp.com/developers/documentation/v3/authentication \
   Note: You might need to join the developer beta to use GraphQL
3. Create `config` folder located in this project's root folder. Then, create a `app_config.json` file in that `config` folder and add your API key like this:
   ```
   {
     "api_key": "YOUR_API_KEY"
   }
   ```

## Author

[![Follow me](https://img.shields.io/twitter/follow/matthieucoisne?style=social)](https://twitter.com/matthieucoisne)

## License

```
Copyright 2021 Matthieu Coisne

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
