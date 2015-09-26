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
  $.ajax({
    url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + sumID + '/ranked' + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function (json) {
      getMostPlayedChamp(json, function(champ) {console.log(champ)});
      getWinRate(json);
    }
  });
}

function getMostPlayedChamp(json, callback) {
  var count = 0;
  var mpc = 0;
  for (var i = 0; i < json['champions'].length; i++) {
    var currentChamp = json['champions'][i]['id']
    if (json['champions'][i]['stats']['totalSessionsPlayed'] > count && currentChamp !== 0) {
      mpc = currentChamp;
      count = json['champions'][i]['stats']['totalSessionsPlayed'];
    }
  }
  getChampionById(mpc, callback)
}

function getWinRate(summonerID) {
  
}

function getChampionById(champId, callback) {
  $.ajax ({
    url: 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function (json) {
      callback(json)
    }
  });
}

function getSummonerRanking(summonerID) {
  $.ajax({
    url: REQUEST_URL_SHORT + '/v2.5/league/by-summoner/' + summonerID + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {
    },
    success: function (json) {
      summonerTier = json[summonerID].tier;
      summonerDivision = json[summonerID].division;
      summonerLP = json[summonerID].leaguePoints;

      document.getElementById("tier").innerHTML = summonerTier;
      document.getElementById("division").innerHTML = summonerDivision;
      document.getElementById("leaguePoints").innerHTML = summonerLP;
    }
  })
}

