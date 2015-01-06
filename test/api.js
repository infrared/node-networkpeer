
var NetworkPeer = require('../lib/networkpeer.js');


var np = new NetworkPeer({
    id: process.env.APP_API_ID,
    key: process.env.APP_API_KEY,
    secret: process.env.APP_API_SECRET,
    url: process.env.APP_API_URL,
    timeout: process.env.APP_API_TIMEOUT
});
exports.api = {

    "simple test" : function(test) {
        np.test(function(err,res) {
            console.log(res);
            test.ok(err === null,err)
            test.done();
        });
    },
};
