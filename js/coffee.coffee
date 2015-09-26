# Summoner Name

function summonerLookUp() {
	var SUMMONER_NAME = "";
	SUMMONER_NAME = $("#summonerName").val();

	var REGION = "";
	REGION = $("#region").val();

	REQUEST_URL_SHORT = 'https://' + REGION + 'api.pvp.net/api/lol/' + REGION;

	if (SUMMONER_NAME !== "") {

		$.ajax({
		url: REQUEST_URL_SHORT + '/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=b157e107-4466-49cd-bc5e-8370450e66e0',
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


			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("Error Getting Summoner Data");
		}
		});
	}
}

function getMostPlayedChamp(summonerID) {
	$.ajax({
		url: REQUEST_URL_SHORT + '/v1.3/stats/by-summoner/' + summonerID + '/ranked/?api_key=b157e107-4466-49cd-bc5e-8370450e66e0',
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