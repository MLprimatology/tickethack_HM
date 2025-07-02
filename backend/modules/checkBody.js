


function checkBody(body,fields){
    let result = true;
    if (Object.keys(body).length === fields.length){
        for(let cpt = 0;cpt<Object.keys(body).length;cpt++){
            if (!fields.includes(Object.keys(body)[cpt]) || Object.values(body)[cpt].length===0){
                result =  false
            }
        }
        
    }
    else{
        result =  false
    }
    return result
}

module.exports = {checkBody}