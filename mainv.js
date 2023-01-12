console.log('debut');
const main = (function Fn() {
    const A = Array(8).fill('0');
    const P = document.querySelector('ul+p');
    if (!(A && P)) {
        return;
    }
    return (e) => {
        if (e instanceof MouseEvent && e.target instanceof HTMLLIElement && e.target.dataset.ord) {
            A[8 - 1 - (+e.target.dataset.ord)] = e.target.classList.toggle('act') ? '1' : '0';
            P.textContent = parseInt(A.join('') , 2).toString(10);
        }
    }
})();

window
.addEventListener(
    'load' ,
    (evt) => {
        if (!main) {
            console.warn('cancelled : main is not a function');
            return;
        }
        console.log(`WINDOW : ${e.type} : ${e.timeStamp.toFixed(2)} ms`);
        document
        .getElementById('oct')
        ?.addEventListener(
            'mouseup' ,
            main ,
            false
        );
    } ,
    {
        once: true
    }
);
console.log('fin');
