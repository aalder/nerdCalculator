var sumName = "";
var API_KEY = "b157e107-4466-49cd-bc5e-8370450e66e0";

function summonerLookUp() {
	var SUMMONER_NAME = "";
	SUMMONER_NAME = $("#userName").val();
	REQUEST_URL_SHORT = 'https://na.api.pvp.net/api/lol/na'; 
	if (SUMMONER_NAME !== "") {

		$.ajax({
			url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
			type: 'GET',
			dataType: 'json',
			data: {

			},
			success: function (json) {
				var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");

				SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

				summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
				summonerID = json[SUMMONER_NAME_NOSPACES].id;

				document.getElementById("sLevel").innerHTML = summonerLevel;
				document.getElementById("sID").innerHTML = summonerID;

				// give sumName the Summoner Name from the json Object
				sumName = json[SUMMONER_NAME_NOSPACES].name;
				
				getMostPlayedChamp(summonerID);
				winRate(summonerID);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("error getting Summoner data!");
			}
		});
	} 
	else {}
}

function getMostPlayedChamp(summonerID) {
	$.ajax({
		url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + summonerID + '/ranked' + '?api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: {
		},
			success: function (json) {
				champList = json[summonerID].champions;

				mostPlayedChamp = function () {
					var MPC;
					for (i = 0; i < champList.length; i++) {
						if (champList[i].stats.totalSessionsPlayed > MPC.stats.totalSessionsPlayed) {
							MPC = champList[i];
						}
					}
					return MPC;
				}
				document.getElementById("mPC").innerHTML = mostPlayedChamp;
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

				wr = function () {
					var totalSessionsWon = 0;
					var totalSessions = 0;
					for(i = 0; i < champions.length; i++) {
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
