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

        

    }
    /*
    teste(){
        let ls = spawnSync('netstat', ['-a'], { encoding : 'utf8', timeout: 1000 });      
        return ls.stdout
    }*/

    

}