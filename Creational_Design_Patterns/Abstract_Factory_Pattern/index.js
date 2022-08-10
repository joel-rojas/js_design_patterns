(() => {
    class Circle {
        constructor() {
        }
        create() {
            const circleEl= document.createElement('div');
            circleEl.setAttribute('class', 'circle');
            this.element = circleEl;
        }
    }
    class RedCircle extends Circle {
        constructor() {
            super();
        }
        create() {
            super.create();
            return this;
        }
    }
    class BlueCircle extends Circle {
        constructor() {
            super();
        }
        create() {
            super.create();
            this.element.setAttribute('class', 'circle circle--blue');
            return this;
        }
    }

    class CircleAbstractFactory {
        constructor() {
            this.type = {};
        }
        create(type) {
            return new this.type[type]().create();
        }
        register(type, aClass) {
            if (aClass.prototype.create) {
                this.type[type] = aClass;
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
                this.cf = new CircleAbstractFactory();
                this.cf.register('red', RedCircle);
                this.cf.register('blue', BlueCircle);
            }
            _position(circle, left, top) {
                circle.style.left = `${left}px`;
                circle.style.top = `${top}px`;
            }
            create(left, top, type) {
                const circleEl = this.cf.create(type).element;
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
            const circle = cs.create(ev.pageX - 25, ev.pageY - 25, 'red');
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