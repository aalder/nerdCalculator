function toPromotion(winRate winsToPromo) {
  var lossRate = 1 - winRate;
  var gamesToPromo = Math.ceil((winsToPromo / winRate) + (.5 * (winsToPromo * lossRate)));
}