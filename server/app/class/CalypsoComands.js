const APDUFormat = 
{
    "CLA":[
        "00",
        "80",
        "94"
    ],
    "INS":[
        "12", // Card Cipher PIN and Card Generate Key
        "14", // Select Diversifier
        "86"  // 
    ],
    "P1":[
        "00",
        "40",
        "80"
    ],
    "P2":[
        "00",
        "FF"
    ],
    "Lc":[
        "04",
        "06",
        "08",
        "0A"
    ],
    "KVC":[
        "29",
        "79" // keyple
    ],
    "KIF":[

    ],
    "SW1-SW2":{
        "6985":"Sam is Locked",
        "6700":"Incorrect Lc",
        "6900":"An event counter cannot be incremented",
        "6985":"Preconditions not satisfied",
        "6A00":"Incorrect P1 or P2",
        "6A83":"Record not Found",
        "6D00":"Instruccion Unknow",
        "6E00":"Class Not supported",
        "9000": "Correct Execution"
    }

};

module.exports={
    APDUFormat
}