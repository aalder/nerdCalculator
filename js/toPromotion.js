function toPromotion(winRate, currentLP) {
  var winsToPromo = Math.ceil((100 - 73) / 20);
  var lossRate = 1 - winRate;
  return Math.ceil((winsToPromo / winRate) + (.5 * (winsToPromo * lossRate)));
}