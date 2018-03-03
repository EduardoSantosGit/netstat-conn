import { exec, spawnSync } from 'child_process'

export default class Command {

    commandNetstat(args, options = null){

        if(options === null){
            options = { timeout: 1000, encoding: 'utf8'}
        }

        let ls = spawnSync('netstat', [args], { encoding : options.encoding , timeout: options.timeout });      
        return ls.stdout
    }
}