const savedLang = localStorage.getItem("lang") || "en";
function getLang(){
   
    return 'language/'+savedLang+'/'
}
