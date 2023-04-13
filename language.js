function getLang(){
    var myselect=document.getElementById("lang")
    return 'language/'+myselect.options[myselect.selectedIndex].value+'/'
}
