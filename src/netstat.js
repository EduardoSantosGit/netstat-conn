import { exec, spawnSync } from 'child_process'
import co from 'co'

export default class NetStat {

    async executeCommand(){        
        return new Promise((resolve, reject) => {
            exec('netstat -a', (error, stdout, stderr) => {
                console.log(stdout)
                if(error)
                    reject(err)
                
                resolve(stdout)
            })
        })
    }

    netstat(){
        let ls = spawnSync('netstat', ['-a'], { encoding : 'utf8', timeout: 1000 });       
        //console.log('stdout here: \n' + ls.stdout);
        return ls.stdout
    }


}