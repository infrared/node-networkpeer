# node-networkpeer

node.js library for networkpeer.com
### Installation

```sh
$ npm install git://github.com/infrared/node-networkpeer.git
```
### Usage
```javascript
 var NetworkPeer = require('networkpeer');
 var np = new NetworkPeer({
    id: <your API id>,
    key: <your API key>,
    secret: <your API secret>
});
```

#### Test 
```javascript
 np.test(function(err,res) {
    ...
 });
```
License
----

MIT
