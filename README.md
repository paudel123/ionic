curl -vu nmeuserclient:secret 'https://obscure-fjord-89635.herokuapp.com/api/oauth/token?username=henryy&password=henryy&grant_type=password'

curl -vu nmeuserclient:secret 'https://obscure-fjord-89635.herokuapp.com/api/oauth/token?grant_type=refresh_token&refresh_token=b3f749a8-55c8-4cab-8e51-6b8f9e9724b6'

curl -i -H "Authorization: Bearer 850db30c-b2d7-4bb5-a93c-ba8b9ca6173c" https://obscure-fjord-89635.herokuapp.com/api/secure