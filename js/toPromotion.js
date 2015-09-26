function toPromotion(winRate currentLP) {
  var winsToPromo = Math.ceil((100 - currentLP) / 20);
  var lossRate = 1 - winRate;
  Math.ceil((winsToPromo / winRate) + (.5 * (winsToPromo * lossRate)));
}