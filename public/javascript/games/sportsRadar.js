
var queryURL = 'https://api.sportradar.us/soccer-xt3/eu/en/schedules/live/results.xml?api_key={t9g7njm2rkgu3wg538vppgv2}';

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      data.forEach(response => {
        console.log(response);
      });
    } else {
      console.log('error');
    }
  });

request.send();