(function() {
   


var request         = require('request');
var crypto          = require('crypto');
   


var NetworkPeer = function() {

    var allowed = [ "timeout", "version","id","key","secret","url" ];
    var self = this;
    if (arguments.length) {
        for (var key in arguments[0]) {
            if (allowed.indexOf(key) === -1) {
                throw new Error("invalid argument " + key );
            } else {
                self[key] = arguments[0][key];
            }
        }
    }
    self.timeout = (typeof self.timeout === "undefined") ? 60000 : self.timeout;
    self.version = (typeof self.version === "undefined") ? 1 : self.version;
    self.url     = (typeof self.url     === "undefined") ? "https://www.networkpeer.com/api" : self.url;
    /* Mandatory */
    if (typeof self.key === "undefined") {
        console.log("API key required");
        process.exit(0);
    } else if (typeof self.secret === "undefined") {
        console.log("API secret required");
        process.exit(0);
    } else if (typeof self.url === "undefined") {
        console.log("API url required");
        process.exit(0);
    } else if (typeof self.id === "undefined") {
        console.log("API auth id required");
        process.exit(0);
    }

};

NetworkPeer.prototype.post = function(path,data,callback) {
    if (typeof callback !== 'function') {
        throw new Error("Expecting a callback function");
    }
    var self = this;
    var epoch = Math.floor(parseInt((new Date).getTime())/ self.timeout) * self.timeout;
    var secret = self.secret + epoch.toString();
    var hash = crypto.createHmac('sha256', secret).update(self.key).digest('base64');
//    console.log(hash);
    if (data === undefined) {
        data = { };
    }
    data._signedKey = hash;
    data._id = self.id;
    request.post({ url: self.url + path, form: data, json:true, timeout: self.timeout }, function(error,response,body) {
        if (error) {
            callback(error,null);
        } else {
            body.statusCode = response.statusCode;
            callback(null,body);
        }
    });
}
NetworkPeer.prototype.test = function(callback) {
    if (typeof arguments[ arguments.length -1] !== 'function') {
        throw new Error("Expecting function as last argument");
    }
    var self = this;
    self.post('/test',{},function(err,res) {
        (err === null) ? callback(null,res) : callback(err,null); 
    });
}

module.exports = NetworkPeer; 

})();
