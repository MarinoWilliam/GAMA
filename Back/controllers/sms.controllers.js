const SERVICE_PLAN_ID = '8b9171e098fb47ecb70f88bb3e8efdf2';
// const API_TOKEN = '90bc032db6254418aeb1d9e5ddb36eb9';
const SINCH_NUMBER = '447520652428';
const TO_NUMBER = '201223261848';

const fetch = require('node-fetch')

async function sendSMS() {
    const resp = await fetch(
        'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_TOKEN
            },
            body: JSON.stringify({
                from: SINCH_NUMBER,
                to: [TO_NUMBER],
                body: '7abebe ya Daniol'
            })
        }
    );

    const data = await resp.json();
    console.log(data);
}

module.exports = {
    sendSMS,
}