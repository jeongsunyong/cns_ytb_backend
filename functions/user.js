const elasticsearch = require("elastisearch")
const es_host = new elastisearch.Client({
    hosts:['http://localhost:9200']
})

async function getUserInfo(req){
    
    user=req.data.product
    try{

    }
    catch{

    }
}