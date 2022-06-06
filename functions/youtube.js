const elasticsearch = require("elasticsearch")
const es_host = new elasticsearch.Client({
    hosts:['http://localhost:9200']
})


//1. youtube 비디오 정보를 불러오는 API
exports.getContentsByProduct = async (req,res,next) =>{
    try{
        product_id=parseInt(req.query['product_id'])
        console.log(req.query)
        const rs = await es_host.search({
            index:'youtube_contents',
            body:{
                'size':1000,
                'query':{
                    'bool':{
                        'must':[{
                            'match_phrase':{
                                'product_id':product_id
                            }
                        }]
                    }
                }
            }
        }).then((response)=>{
            console.log(response)
            return res.json(   response['hits']['hits'].map(data=>data['_source']) )
        })
    } catch(err){
        console.log(err)
        res.status(500)
        return res.json(err)
    }
}

//1. 해당 키워드를 포함하고 있는 comments(댓글)을 불러오는 API
exports.getCommentsByKeyword =  async (req,res,next) => {
    try{
        token=req.query['keyword']
        vid=req.query['content_id']
        const rs = await es_host.search({
            index:'youtube_comments',
            body:{
                'size':1000,
                'query':{
                    'bool':{
                        'must':[
                            {
                                'match_phrase':{ // keyword matching
                                    'tokens.token':token
                                }
                            },
                            {
                                'match_phrase':{ // 해당 video에 대한 comments
                                    'content_id':vid
                            }
                        }]
                    }
                }
            }
        }).then((response)=>{
            console.log(response)
            return res.json(   response['hits']['hits'].map(data=>data['_source']) )
        })
    } catch(err){
        console.log(err)
        res.status(500)
        return res.json(err)
    }
}
