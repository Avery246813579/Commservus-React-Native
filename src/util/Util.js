import {AsyncStorage, Platform} from 'react-native'

const LIVE = true;

export function isLive(){
    return LIVE;
}

/**
 * Used for requests
 */
function getURL() {
    if (LIVE) {
        return 'NONE'
    }

    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:6969/api/'
    }

    return 'http://127.0.0.1:6969/api/'
}

/**
 * Used for sockets
 */
export function getShortURL() {
    if (LIVE) {
        return 'NONE'
    }

    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:6969/api/'
    }

    return 'http://127.0.0.1:6969/api/'
}

export function request(endpoint, method, body, callback, ) {
    AsyncStorage.multiGet(['TOKEN'], (err, stores) => {
        let stored = stores.map((result, i, store) => {
            return store[i][1];
        });

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (stored[0] !== null) {
            headers['Cookie'] = 'SID=' + stored[0] + ';';
        }

        if (body !== null) {
            fetch(getURL() + endpoint, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson['success']) {
                        callback(undefined, responseJson.data);
                    } else {
                        callback(responseJson, responseJson.code);
                    }
                })
                .catch((error) => {
                    callback(error, endpoint);
                });
        } else {
            fetch(getURL() + endpoint, {
                method: method,
                headers: headers
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson['success']) {
                        callback(undefined, responseJson.data);
                    } else {
                        callback(responseJson, responseJson.code);
                    }
                })
                .catch((error) => {
                    callback(JSON.stringify(error.message), endpoint);
                });
        }
    });
}

export function uploadImage(endpoint, image, callback, options) {
    AsyncStorage.multiGet(['SID', 'CID'], (err, stores) => {
        let stored = stores.map((result, i, store) => {
            return store[i][1];
        });

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        if (stored['SID'] !== null && stored['CID'] !== null) {
            headers['Cookie'] = 'LT=FY42pxNCRUYHc7ITnCNgMG1My;SID=' + stored[0] + ';CID=' + stored[1] + ';'
        } else {
            headers['Cookie'] = 'LT=FY42pxNCRUYHc7ITnCNgMG1My;';
        }

        let data = new FormData();
        data.append('file', {uri: image.path, name: 'selfie.jpg', type: 'image/jpg'});

        const config = {
            method: 'POST',
            headers: headers,
            body: data,
        };

        fetch(getURL() + endpoint, config).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson['success']) {
                    callback(undefined, responseJson.data);
                } else {
                    callback(responseJson, responseJson.code);
                }
            })
            .catch((error) => {
                callback(error, endpoint);
            });
    });
}

export function isSpecificType(variable, type) {
    switch (type.toUpperCase()) {
        case "EMAIL":
            if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(variable))
                return true;

            break;
        case "LNU":
            if (/^\w+$/.test(variable) && variable.charAt(0) !== "_")
                return true;

            break;
        case "UNICODE":
            //TODO Actually check this. We assume it's true, this will definitely come to haunt me.
            return true;
        case "NUMBER":
            return !isNaN(variable);
        case "DATE":
            try {
                Util.parseTime(variable);
                return true;
            } catch (e) {
                return false;
            }
    }

    return false;
}

let DEBUG = false;

export function log(message) {
    if (!DEBUG) {
        return;
    }

    alert(JSON.stringify(message));
}