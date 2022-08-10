(() => {
    class Circle {
        constructor() {
            const circleEl= document.createElement('div');
            circleEl.setAttribute('class', 'circle');
            this.element = circleEl;
        }
    }
    class RedCircle extends Circle {
        constructor() {
            super();
        }
    }
    class BlueCircle extends Circle {
        constructor() {
            super();
            this.element.setAttribute('class', 'circle circle--blue');
        }
    }

    class CircleFactory {
        constructor() {}
        create(color) {
            switch(color) {
                case 'red': {
                    return new RedCircle();
                }
                case 'blue': {
                    return new BlueCircle();
                }
                default: {
                    return new RedCircle();
                }
            }
        }
    }

    const aSingleton = (() => {
        let instance;
        function getInstance() {
            if (!instance) {
                instance = new Circle();
            }
            return instance;
        }
        class Circle {
            constructor() {
                this.circles = [];
                this.stage = document.querySelector('.container');
            }
            _position(circle, left, top) {
                circle.style.left = `${left}px`;
                circle.style.top = `${top}px`;
            }
            create(left, top, color) {
                const cf = new CircleFactory();
                const circleEl = cf.create(color).element;
                this._position(circleEl, left, top);
                return circleEl;
            }
            add(circle) {
                this.stage.appendChild(circle);
                this.circles.push(circle);
            }
            index() {
                return this.circles.length;
            }
        }
        return {
            getInstance
        };
    })();
    window.onload = () => {
        const containerEl = document.querySelector('.container');
        containerEl.addEventListener('click', function(ev) {
            const cs = aSingleton.getInstance();
            const circle = cs.create(ev.pageX - 50, ev.pageY - 50, 'red');
            cs.add(circle);
        });
        document.addEventListener('keypress', function(ev) {
            if (ev.key === 'a') {
                const cs = aSingleton.getInstance();
                const circle = cs.create(Math.floor(Math.random() * (containerEl.clientWidth - 50)), Math.floor(Math.random() * (containerEl.clientHeight - 50)), 'blue');
                cs.add(circle);
            }
        });
    }
})();