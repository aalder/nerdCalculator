var sumName = "";
var API_KEY = "b157e107-4466-49cd-bc5e-8370450e66e0";
var REQUEST_URL_SHORT = 'https://na.api.pvp.net/api/lol/na'; 
sumID = '';

function onSubmit(e) {
  var SUMMONER_NAME = getSummonerName();
  if (SUMMONER_NAME) {
    getSummonerId(SUMMONER_NAME, getSummonerStats)
  }
}

function getSummonerName() {
  return $("#userName").val();
}

function getSummonerId(name, callback) {
  $.ajax({
    url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {
    },
    success: function (json) {
      var SUMMONER_NAME_NOSPACES = name.replace(" ", "");

      SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

      summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
      summonerID = json[SUMMONER_NAME_NOSPACES].id;

      document.getElementById("sLevel").innerHTML = summonerLevel;
      document.getElementById("sID").innerHTML = summonerID;

      // give sumName the Summoner Name from the json Object
      sumName = json[SUMMONER_NAME_NOSPACES].name;
      
      sumID = summonerID;
      callback(summonerID);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("error getting Summoner data!");
    }
  });
}

function getSummonerStats(summonerID) {
  var mostPlayed = getMostPlayedChamp(summonerID);
  var winRate = getWinRate(summonerID);
}

function getMostPlayedChamp(summonerID) {
      $.ajax({
      url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + sumID + '/ranked' + '?api_key=' + API_KEY,
      type: 'GET',
      dataType: 'json',
      data: {
      },
      success: function (json) {
        debugger
        var champList = json['champions'];

        mostPlayedChamp = function () {
          var MPC;
          for (i = 0; i < champList.length; i++) {
            if (champList[i].stats.totalSessionsPlayed > MPC.stats.totalSessionsPlayed) {
              MPC = champList[i];
            } else {
              
            }
          }
          return MPC;
        }
        champList = json['champions'];
        wr = champList.stats[0].totalSessionsWon / champList.stats[0].totalSessionsPlayed;

        document.getElementById("mPC").innerHTML = mostPlayedChamp;
        document.getElementById("wr").innerHTML = wr;
      }
    });
}

function getWinRate(summonerID) {
  return "todo"
}
