function randomusefloor(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function makerandomletter(max)
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < max; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function setvalue(){
  document.getElementById('QQQQ').innerHTML="ZSJH"+makerandomletter(2)+randomusefloor(1,999999);
}