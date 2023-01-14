// console.log('test : debut');
(function main() {
    const p = document.getElementById('prg');
    if (!p) {
        return;
    }
    p.textContent = `WINDOW: w: ${window.innerWidth} x h: ${window.innerHeight} / touch ? (${navigator.maxTouchPoints > 1 ? 'yes' : 'no'})`;
    const box = document.getElementById('plan');
    const ctx = document.getElementById('cnv')?.querySelectorAll('canvas')[0].getContext('2d');
    if (!(box instanceof HTMLElement && ctx instanceof CanvasRenderingContext2D)) {
        return;
    }
    const mediaQueryList = window.matchMedia('(max-width: 540px)');
    const obj = {
        w: 0,
        get r() {
            return Math.round(this.w * 0.8);
        }
    };
    const handleChange = (mql) => {
        if (mql.matches) {
            obj.w = Math.round(window.innerWidth * 0.9);
        } else {
            obj.w = 500;
        }        
        ctx.canvas.width        = obj.w;
        ctx.canvas.height       = obj.w;
        ctx.transform(1 , 0 , 0 , -1 , obj.w / 2 , obj.w / 2);
        box.style.width  = `${obj.r}px`;
        box.style.height = `${obj.r}px`;
        console.log(obj);
    };
    handleChange(mediaQueryList);
    mediaQueryList.addEventListener('change' , handleChange);
    let ii = 0;
    window
    .addEventListener(
        'load' ,
        () => {
            box.addEventListener(
                'mouseup' ,
                (e) => {
                    if (navigator.maxTouchPoints > 1) {
                       p.textContent = `TOUCH_SCREEN : ${ii}`;
                    } else {
                       p.textContent = `normal_screen : ${ii}`;
                    }
                    ii++;
                    const rect = box.getBoundingClientRect();
                    // window_area : rect.x & e.clientX : from the window_left_edge :
                    // window_area : rect.y & e.clientY : from the window_top_edge
                    // console.log(rect.width , rect.height);
                    const offset_x = e.clientX - rect.x; /* e.offsetX */
                    const offset_y = e.clientY - rect.y; /* e.offsetY */
                    const mx = ( 1) * Math.round(offset_x - (rect.width / 2));
                    const my = (-1) * Math.round(offset_y - (rect.height / 2));
                    const hp = Math.hypot(mx , my);
                    if (hp >= (obj.r * 0.5) * 0.2 && hp <= (obj.r * 0.5)) {
                        ctx.clearRect(-250 , -250 , 500 , 500);
                        ctx.fillStyle = 'white';
                        ctx.beginPath();
                        ctx.arc(mx , my , 5 , 0 , 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                        ctx.fillStyle = 'yellow';
                        ctx.beginPath();
                        ctx.arc(0 , 0 , hp , 0 , 2 * Math.PI);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(0 , 0 , 4 , 0 , 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(obj.r * 0.5 , 0 , 4 , 0 , 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }

                } ,
                false
            );
        } ,
        {
            once: true
        }
    );
})();
