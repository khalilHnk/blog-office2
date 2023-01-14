// console.log('xrtest : debut');
(function xr() {
    const protector = document.getElementById('protector');
    if (!protector) {
        return;
    }
    if (window.top !== window.self) {
        console.warn('this window is not the topmost window');
    } else {
        protector.remove();
        let script = document.createElement('script');
        script.onerror = (e) => {
            if (e instanceof Event && e.target instanceof HTMLScriptElement) {
                throw new URIError(`The script ${e.target.src} didn't load.`);
            }
        };
        script.onload = (e) => {
            if (e.target instanceof HTMLScriptElement) {
                console.log('right');
            }
        };
        document.body.append(script);
        script.src = './uitest0.js';
        script.async = false;    
    }
})();
