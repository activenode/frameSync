var FrameSync = function(_namespace){
    var nsCallbacks = {};
    var nsInterval = {};

    try {
        if (!('localStorage' in window)) {
            throw 'localStorage not available!';
        }
    } catch(e) {
        return false;
    }

    return {
        register: function(selfName) {
            //needs to register as TRUE - then it needs to wait to be updated to a timestamp
            selfName = _namespace + selfName;
            localStorage[selfName] = false;

            return {
                onload: function(execFunc){
                    nsCallbacks[selfName] = execFunc;
                },
                loaded: function(){
                    localStorage[selfName] = 'FS_LOADED';

                    nsInterval[selfName] = setInterval(function(){
                        if (localStorage[selfName] > 0) {
                            clearInterval(nsInterval[selfName]);
                            var now = new Date().getTime();
                            var diffToWait = now-localStorage[selfName];

                            setTimeout(nsCallbacks[selfName], 0);
                        }
                    }, 30);
                }
            };
        },
        wait: function(waitFor) {
            waitFor = _namespace + waitFor;

            return {
                onload: function(execFunc) {
                    nsInterval[waitFor+'_wait'] = setInterval(function(){
                        if (localStorage[waitFor] == 'FS_LOADED') {
                            clearInterval(nsInterval[waitFor+'_wait']);
                            localStorage[waitFor] = new Date().getTime() + 500;

                            setTimeout(execFunc, 0);
                        }
                    }, 30);
                }
            }
        }
    }
};
