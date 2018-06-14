
var queryURL = 'https://api.sportradar.us/soccer-t3/intl/en/schedules/live/results.json?api_key=t9g7njm2rkgu3wg538vppgv2';

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      data.forEach(here => {
        console.log(here);
      });
    } else {
      console.log('error');
    }
  });

request.send();