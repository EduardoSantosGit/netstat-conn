import { exec, spawnSync } from 'child_process'
import co from 'co'

export default class NetStat {

    netstat(args, options){

        if(options !== undefined){
            
        }

        if(args === undefined){
            //call method
        }
        else if(args !== undefined){
            validateArgs(args)
        }    
        
    }

    validateArgs(args){

        let arrArgs = ['a','e','n','o','s','r']
        let valid = true

        if(Array.isArray(args) === true || args.length > 1){

            let data = (Array.isArray(args) === true) ? args : Array.from(args)
            
            data.forEach((x) => {
                if(arrArgs.includes(x) === false){
                    valid = false
                }
            })

            return valid
        }
        else {
            valid = arrArgs.includes(args)
        }

        return valid
    }

    /*
    teste(){
        let ls = spawnSync('netstat', ['-a'], { encoding : 'utf8', timeout: 1000 });      
        return ls.stdout
    }*/

    

}