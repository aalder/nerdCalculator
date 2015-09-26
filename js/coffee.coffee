# Summoner Name
var API_KEY = "$RIOT_SECRET = b157e107-4466-49cd-bc5e-8370450e66e0";

function summonerLookUp() {
	var SUMMONER_NAME = "";
	SUMMONER_NAME = $("#summonerName").val();

	var REGION = "";
	REGION = $("#region").val();

	REQUEST_URL_SHORT = 'https://' + REGION + 'api.pvp.net/api/lol/' + REGION;

	if (SUMMONER_NAME !== "") {

		$.ajax({
		url: REQUEST_URL_SHORT + '/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + $RIOT_SECRET,
		type: 'GET',
		dataType: 'json',
		data: {

			},
			success: function (json) {
				var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");

				SUMMONER_NAME_NOSPACES =
				SUMMONER_NAME_NOSPACES.toLowerCase().trim();

				summonerID =
				json[SUMMONER_NAME_NOSPACES].id;
				
				var foundSummoner = "true";
				document.getElementById("foundSummoner").innerHTML=foundSummoner;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("Error Getting Summoner Data");
		}
		
		});
	} else {}
	#getMostPlayedChamp(summonerID);
	#winRate(summonerID);
}

function getMostPlayedChamp(summonerID) {
	$.ajax({
		url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + summonerID + '/ranked',
		type: 'GET',
		dataType: 'json',
		data: {
		},
			success: function (json) {
				champList =
				json[summonerID].champions;

				mostPlayedChamp =
				function () {
					for (i = 0, i < champList.length, i++) {
						var MPC;
						if (champList[i].stats.totalSessionsPlayed > MPC.stats.totalSessionsPlayed) {
						MPC = champList[i];
						}
					}
					return MPC;
				}
				document.getElementById("mPC").innerHTML = mostPlayedChamp.
			}
		})
}

function winRate(summonerID) {
	$.ajax({
		
		url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + summonerID + '/ranked' + '?api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: {
		},
			success: function(json){
				champions = json[summonerID].champions;
				
				function () {
					var totalSessionsWon = 0;
					var totalSessions = 0;
					for(i = 0, i < champions.length, i++) {
						totalSessionsWon = totalSessionsWon + champions[i].stats.totalSessionsWon;
						totalSessions = totalSessions + champions[i].stats.totalSessionsPlayed;
					}
					
					var wr = totalSessionsWon/totalSessions;
					return wr;
				}
				
				document.getElementById("wr").innerHTML = wr;
			}
	})
}