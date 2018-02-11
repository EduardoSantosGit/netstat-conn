import Parser from '../src/parser'
import { expect } from 'chai'

describe('parser tests', () => {

    it('test method parserArgE params text', () => {
        let text = "Interface Statistics\r\n\r\n"                           
        + "Received            Sent\r\n\r\nBytes"                    
        + "2811973136      1123688296\r\nUnicast packets"             
        + "9343224         5548720\r\nNon-unicast packets"          
        + "222996         3190650\r\nDiscards"                          
        + "0               0\r\nErrors"                            
        + "0               0\r\nUnknown protocols  "               
        + "0\r\n"
        let ret = new Parser().parserArgE()
        
        
    })
})    
    