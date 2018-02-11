import { exec, spawnSync } from 'child_process'

export default class Command {

    commandNetstat(args, options){
        let ls = spawnSync('netstat', [args], { encoding : 'utf8', timeout: 1000 });      
        return ls.stdout
    }
}