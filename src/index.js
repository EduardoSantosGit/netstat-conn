import netstat from './netstat'
/*
let r = new netstat().executeCommand()

r.then((result) => {
    console.log('complete ', result)
}).catch((error) => {
    console.log(error)
});
*/

let r = new netstat().teste()
console.log(r)
export {
    r
}