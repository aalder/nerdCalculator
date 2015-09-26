var API_KEY = "b157e107-4466-49cd-bc5e-8370450e66e0";
var REQUEST_URL_SHORT = 'https://na.api.pvp.net/api/lol/na';

function onSubmit(summonerName) {
  if (summonerName) {
    getSummonerId(summonerName, function(id) { getLeaguePoints(id, getSummonerStats) })
  }
}

function getSummonerId(name, callback) {
  $.ajax({
    url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {
    },
    success: function (data) {
      var sum_id = data[name.replace(" ", "").toLowerCase().trim()].id;
      var sum_level = data[name.replace(" ", "").toLowerCase().trim()].summonerLevel;

      $('summonerData').attr('name', name);
      $('summonerData').attr('id', sum_id);
      $('summonerData').attr('level', sum_level);

      callback(sum_id);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("error getting Summoner data!");
    }
  });
}

function getLeaguePoints(id, callback) {
  $.ajax({
  url: 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + id + '?api_key=' + API_KEY,
  type: 'GET',
  dataType: 'json',
  data: {
  },
  success: function (data) {
    var entries = data[id][0]['entries']
    var  lp = 0;
    for (var i = 0; i < entries.length; i++) {
      if (entries[i]['playerOrTeamId'] == id) {
        lp = entries[i]['leaguePoints'];
      }
    }
    $('summonerData').attr('leaguePoints', lp)
    callback(lp, id)
  }
});
}

function getSummonerStats(lp, sum_id) {
  $.ajax({
    url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + sum_id + '/ranked' + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function (data) {
      getMostPlayedChamp(lp, data);
    }
  });
}

function getMostPlayedChamp(lp, json) {
  var count = 0;
  var mpc = 0;
  var average = 0;
  for (var i = 0; i < json['champions'].length; i++) {
    var currentChamp = json['champions'][i]
    if (json['champions'][i]['stats']['totalSessionsPlayed'] > count && currentChamp['id'] !== 0) {
      mpc = currentChamp;
      count = json['champions'][i]['stats']['totalSessionsPlayed'];
    }
    else if (currentChamp['id'] == 0) {
      average = currentChamp;
    }
  }
  analyzeWins(lp, mpc, average)
}

function analyzeWins(lp, mpc, average) {
  var mpc_win_rate = mpc['stats']['totalSessionsWon'] / mpc['stats']['totalSessionsPlayed'];
  var average_win_rate = average['stats']['totalSessionsWon'] / average['stats']['totalSessionsPlayed'];
  toProm = toPromotion(mpc_win_rate, lp)
  //TODO API calls
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

