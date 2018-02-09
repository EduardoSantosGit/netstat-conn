import { exec } from 'child_process'

export default class NetStat {

    executeCommand(){
        
        exec('node -v', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }

}