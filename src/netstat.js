import { exec } from 'child_process'
import co from 'co'

export default class NetStat {

    async executeCommand(){        
        return new Promise((resolve, reject) => {
            exec('netstat', (error, stdout, stderr) => {
                if(error)
                    reject(err)
                
                resolve(stdout)
            })
        })
    }
}