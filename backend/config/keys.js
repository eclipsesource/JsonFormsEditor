/**
 * Created by pancho111203 on 15/02/16.
 */

var keys = {};

keys.clientId = process.env['GITHUB_CLIENT_ID'];
keys.clientSecret = process.env['GITHUB_CLIENT_SECRET'];
keys.sessionSecret = "random_key_to_encode_sessions";


module.exports = keys;