const SERVER = "http://localhost:3000"

function query(query,cb){
    var url = SERVER + "/daw/"+query;
    fetch(url)
        .then(x=>x.json())
        .then(x=>cb(x.data));
}