
  builtQueryInsert=function  (answers, tablename){
    let query= '(default, ';
    for(const i in answers.respuestas){        
        query = query +'\''+ (answers.respuestas[i].respuesta)+'\''+',';
    }
    query= query + answers.coordenadas.latitude+','+ answers.coordenadas.longitude
    + ')' 
    return 'INSERT INTO '+ tablename+ ' '+ ' VALUES '+ query ;
}
module.exports=  {builtQueryInsert};