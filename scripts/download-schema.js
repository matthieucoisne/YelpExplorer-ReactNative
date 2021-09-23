const exec = require('child_process').exec;
const appConfig = require('../config/app_config.json');

const command = `apollo client:download-schema \
                    --header=\"Authorization: Bearer ${appConfig.api_key}\" \
                    --endpoint=https://api.yelp.com/v3/graphql \
                    ./src/data/graphql/schema/schema.json`;

exec(command, function (error, stdout, stderr) {
  if (error !== null) {
    console.log(error);
  }
});
