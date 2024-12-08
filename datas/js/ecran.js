function refresh(){
    var t = 1000; // rafraîchissement en millisecondes
    setTimeout('showDate()',t)
}

function showDate() {
    var date = new Date()
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if( h < 10 ){ h = '0' + h; }
    if( m < 10 ){ m = '0' + m; }
    if( s < 10 ){ s = '0' + s; }
    var time = h + ':' + m + ':' + s
    document.getElementById('horloge').innerHTML = time;
    refresh();
}

let date1 = new Date();

let jourSemaine = date1.getDay();
let jourMois = date1.getDate();
let mois = date1.getMonth();

const joursListe = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const moisListe = ['janvier', 'février', 'mars', 'avril', 'mais', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
if (jourMois == 1){
    var expo = '<sup>er</sup>';
}else{
    var expo = '';
}
document.getElementById('date').innerHTML =
    joursListe[jourSemaine] + ' ' + jourMois + expo + ' ' + moisListe[mois];