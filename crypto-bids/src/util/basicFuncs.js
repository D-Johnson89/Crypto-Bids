/*
  Function to get candle-sticks
*/
export function getCandles(symbol, interval, limit) {

    /*
      Send data to server and try to create candles
    */
    return fetch('https://candlestick-chart.p.rapidapi.com/binance', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'bd9bf48b34msh21f284187ba8265p10f148jsnd6545d4a2062',
        'X-RapidAPI-Host': 'candlestick-chart.p.rapidapi.com'
        },
        body: JSON.stringify({
            symbol,
            interval,
            limit
        }),
    })

    /*
      If successful, send chart img to page for use
    */
    .then((response) => {
        return response.json()

    })

    /*
      Else return error for now
    */
    .catch((err) => {
        console.error('Error: ', err)
        return err

    })
}