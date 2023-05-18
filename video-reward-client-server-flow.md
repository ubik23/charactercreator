https://rewarded-user.herokuapp.com

SERVER-SIDE			CLIENT-SIDE
===========			===========
				Want to download a character? Please watch this video!

				1. GET /pro/ramp ({ user_id, code, rewards })
				2. ramp.showRewardedVideo(...callback(resp) => {})
				3. POST /convert/png... include user_id & code
				4. Server verifies before sending png: http://ramp.com/status/:website_id/:user_id/:code

				

GET /code/:website_id/:user_id

Response:

```json
{
  "user_id": "something to track",
  "code": "valid response code",
  "rewards": 0
}
```
----

				```js
				ramp.showRewardedVideo({
				  code: 'valid response code',
				  userId: 'something to track',
				  callback:(response) => {
				    // Do something with the response
				  }
				})

				```

				Response:
				```jsonc
				{
				  "adPlayed": true // or false
				  "adType": "video" // or "display" or "house"
				  "code": "valid response code"
				  "rewardUser": true // or false
				  "userId": "something to track"
				}
				```

----

GET /status/:website_id/:user_id/:code

Response:

```jsonc
  "code": "valid response code",
  "status": "Not redeemed." // or "Redeemed." or "Not found."
```
