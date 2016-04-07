const utils = {
    debounce: (func, wait, immediate) => {
        let timeout;
        return () => {
            const args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(this, args);
                }
            }.bind(this);
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(this, args);
            }
        };
    },

    isDeviceMobile: () => {
        var isMobile = {
            android: function() {
                return navigator.userAgent.match(/Android/i) &&
                    navigator.userAgent.match(/mobile|Mobile/i);
            },
            blackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i) ||
                    navigator.userAgent.match(/BB10; Touch/);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPod/i);
            },
            opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            windows: function() {
                return navigator.userAgent.match(/IEMobile/i) ||
                    navigator.userAgent.match(/webOS/i);
            },
            any: function() {
                return (isMobile.android() || isMobile.blackBerry() ||
                isMobile.iOS() || isMobile.opera() || isMobile.windows());
            }
        };

        return isMobile.any();
    }
};

export default utils;
