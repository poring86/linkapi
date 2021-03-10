# linkapi
This is a pipedrive and bling integration integration to list all the deals with won status then post on bling as a buy order.

Get started!

Have mongodb running in your machine.
Create a config folder.
create a dev.env file in the config folder like below ->

PORT=3000
PIPEDRIVE_API_KEY=this_is_a_key
BLING_API_KEY=this_is_a_key
DB_URL=mongo_url

npm run dev

Go to /envio-bling

"/" to list the pipedrive deals with "won" status
"/envio-bling" to send the requests to bling from pipedrive list of won deals
"/total" to show the total amount by day send with "data" param at this format "YYYY-MM-DD"
"/bling-pedidos" to list the bling orders
