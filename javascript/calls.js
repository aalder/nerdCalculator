function serveTheMath(summonerName, rank, lp, mpc, mpcwr, awr, g2p) {
  //Use: toPromotion(winrate, targetWins2Prom)
  //serve the stats for Most Played Champion
  mpcs = toPromotion(mpcwr, g2p);

  //serve the stats for Average
  as = toPromotion(awr, g2p);

  //send output to the front end in a manageable way
  document.getElementById("summonerName").innerHTML = summonerName;
  document.getElementById("rank").innerHTML = rank;
  document.getElementById("lp").innerHTML = lp;
  document.getElementById("awr").innerHTML = awr;
  document.getElementById("mostPlayedChamp").innerHTML = mpc;
  document.getElementById("mostPlayedWinRate").innerHTML = mpcwr;
  document.getElementById("gamesAverage").innerHTML = as;
  document.getElementById("gamesMostPlayed").innerHTML = mpcs;
}

//directly set variables into Alice's style