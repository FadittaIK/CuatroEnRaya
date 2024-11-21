const SERVER = "http://server-url";

function query(query,cb){
    var url = SERVER + "/daw/"+query;
    fetch(url)
        .then(x=>x.json())
        .then(x=>cb(x.data));
}
