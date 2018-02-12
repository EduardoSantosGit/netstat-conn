export default class Parser {

    parserArgE(body){

        let data = []
       
        return this.parser(body, "Bytes","Unicast packets")
    }

    parser(text, indexOn, indexLast){
        
        let textString = JSON.stringify(text);    
     
        let firstIndex = textString.lastIndexOf(indexOn);
        
        firstIndex = firstIndex + indexOn.length;
   
        let lastIndex = textString.indexOf(indexLast);
        console.log(indexLast)
        let exit = lastIndex - firstIndex;

        let block = textString.substring(firstIndex, exit);

        return block;
    }

}