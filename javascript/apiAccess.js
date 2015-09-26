var sumName = "";
var API_KEY = "b157e107-4466-49cd-bc5e-8370450e66e0";
var REQUEST_URL_SHORT = 'https://na.api.pvp.net/api/lol/na'; 
sumID = '';

function onSubmit() {
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
  var mostPlayed = getMostPlayedChamp(summonerID, getChampionById);
  var winRate = getWinRate(summonerID);
}

function getMostPlayedChamp(summonerID, callback) {
  $.ajax({
    url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + sumID + '/ranked' + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {
    },
    success: function (json) {
      var champList = json['champions']; // a list of ChampionStatsDto
      var MPC; // what will hold the ID #
      var champ = "default"; // the champ object
      for (var i = 0; i < champList.length; i++) { // iterate over the length of 
        if (champ == "default" || champList[i].stats.totalSessionsPlayed > champ.stats.totalSessionsPlayed) {
          MPC = champList[i]['id'];
          champ = champList[i];
        } else {
          //So the bug is that MPC is constantly 0 and that's not a Champion ID #. So something is going wrong here where we're setting the MPC to the highest champion id
        }
      } 
      callback(MPC);
      champList = json['champions'];
      wr = 1 + 1;

      document.getElementById("wr").innerHTML = wr;
    }
  });
}

function getChampionById(champId) {
  $.ajax ({
    url: 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {

    },
    success: function (json) {
      document.getElementById("mPC").innerHTML = json['name'];
    }
  });
}

function getWinRate(summonerID) {
  return "todo"
}
