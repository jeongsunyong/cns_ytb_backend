const es = require("elasticsearch");
const elasticsearch = require("elasticsearch");
const res = require("express/lib/response");
const es_host = new elasticsearch.Client({
    hosts:['http://localhost:9200']
})

exports.getProductList = async(req,res,next) => {
    try{
        user_id=req.query['user_id']
        const rs = await es_host.search({
            index:'products',
            body:{
                'query':{
                    'bool':{
                        'must':[{
                            'match_phrase':{
                                'user_id':user_id
                            }
                        }]
                    }
                }
            }
        }).then((response)=>{
            console.log(response['hits']['hits'].map(data=>data['_source']))
            return res.json(response['hits']['hits'].map(data=>data['_source']) )
        })
    } catch(err){
        console.log(err)
        res.status(500)
        return res.json(err)
    }
}

exports.addProduct = async(req,res,next) => {
    try{
        let products=req.body.products

        let bulk_actions=[];

        products.forEach((product)=>{
            bulk_actions.push(
                {update:{_id:product.product_id}}
            )
            bulk_actions.push(
                {'doc_as_upsert':true,'doc':{
                    'product_id':product.product_id,
                    'user_id':product.user_id,
                    'product_name':product.product_name,
                    'company':product.company,
                    'create_time':Date.now()
                }
            })
        })
        const rs = await es_host.bulk({
            index:'products',
            type:'_doc',
            body:bulk_actions
        }).then((response)=>{
            console.log(response)
            return res.json(response)
        })
    }catch(err){
        console.log(err)
        res.status(500)
        return res.json(err)
    }
    

}

exports.removeProduct = async(req,res,next) => {
    try{
        let del_id_list=req.body.del_list
        let bulk_actions = del_id_list.map((id) => {
            return {
               'delete': {
                  '_index': 'products',
                  '_type': '_doc',
                  '_id': id
               }
            };
          });
          es_host.bulk({
              body:bulk_actions
          }).then((response)=>{
            console.log(response)
            return res.json(response)
        })
    }catch(err){
        console.log(err)
        res.status(500)
        return res.json(err)
    }
}
