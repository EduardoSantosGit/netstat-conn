import { exec, spawnSync } from 'child_process'
import co from 'co'

export default class NetStat {

    netstat(args, options) {

        if (args === undefined) {
            //call method
        }
        else if (args !== undefined && this.validateArgs(args) === true) {
            let argu = this.convertArgs(args)
        }
        else {
            throw new Error("Error invalid argument")
        }
    }

    validateArgs(args) {

        let arrArgs = ['a', 'e', 'n', 'o', 's', 'r']
        let valid = true

        let data = this.convertArgs(args)

        if (data.length === 0)
            return false

        data.forEach((x) => {
            if (arrArgs.includes(x) === false) {
                valid = false
            }
        })

        return valid

    }

    convertArgs(args) {
        return (Array.isArray(args) === true) ? args : Array.from(args)
    }

    /*
    teste(){
        let ls = spawnSync('netstat', ['-a'], { encoding : 'utf8', timeout: 1000 });      
        return ls.stdout
    }*/



}