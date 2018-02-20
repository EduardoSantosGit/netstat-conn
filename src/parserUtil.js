export default class ParserUtil {

    static parserIPV4(body) {
        let ret = []
        for (let i = 0; i < body.length; i++) {
            ret.push({
                "networkDestination": body[i][1],
                "netmask": body[i][2],
                "gateway": body[i][3],
                "interface": body[i][4],
                "metric": body[i][5]
            })
        }
        return ret
    }

    static parserIPV6(body) {

        let ret = []
        let ifs = ""
        let metric = ""
        let net = ""
        let gate = ""

        for (let i = 0; i < body.length; i++) {
            
            ifs = "", metric = "", net = "" , gate = ""

            if (body[i].length >= 5) {
                ifs = body[i][1]
                metric = body[i][2]
                net = body[i][3]
                gate = body[i][4] 
            }
            else if (body[i].length === 4){
                ifs = body[i][1]
                metric = body[i][2]
                net = body[i][3]
            }
            else if(body[i].length === 2){
                gate = body[i][1] 
            } 
            ret.push(
                {
                    "if": ifs,
                    "metric": metric,
                    "networkDestination": net,
                    "gateway": gate
                }
            )
        }
        
        return ret

    }

    static parserBlockEqual(block){

        let json = []

        for(let i=0;i<block.length;i++){
            
            if(block[i][block[i].length-2] === "="){
                
                

            }                
        }

    }

}