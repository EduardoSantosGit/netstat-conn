import co from 'co'

export default class NetStat {

    netstat(args, options) {

        if (args === undefined) {
            //call method
        }
        else if (args !== undefined && this.validateArgs(args) === true) {
            
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

    formatArgs(args){
        let value = (Array.isArray(args) === true) ? args.join('') : args 
        return "-" + value
    }

}