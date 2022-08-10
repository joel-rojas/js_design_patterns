(() => {
    class Circle {
        constructor() {
            this.element = document.createElement('div');
            this.element.setAttribute('class', 'circle');
        }
        color(color) {
            this.element.style.backgroundColor = color;
        }
        move(left, top) {
            this.element.style.left = `${left}px`;
            this.element.style.top = `${top}px`; 
        }
        get() {
            return this.element;
        }
    }
    // The purpose of builder pattern is to have composite properties and methods that
    // a custom builder class would take an useful advantage of it by instancing its base class
    // and build up something from that base 
    class RedCircleBuilder {
        constructor() {
            this.circle = new Circle();
            this.init();
        }
        init() {}
        get() {
            return this.circle;
        }
    }
    class BlueCircleBuilder {
        constructor() {
            this.circle = new Circle();
            this.init();
        }
        init() {
            this.circle.color('blue');
        }
        get() {
            return this.circle;
        }
    }

    class CircleAbstractFactory {
        constructor() {
            this.type = {};
        }
        create(type) {
            // Return the circle instance reference instead of any CircleBuilder class
            return new this.type[type]().get();
        }
        register(type, aClass) {
            if (aClass.prototype.init && aClass.prototype.get) {
                this.type[type] = aClass;
            }
        }
    }

    const aSingleton = (() => {
        let instance;
        function getInstance() {
            if (!instance) {
                instance = new CircleContainer();
            }
            return instance;
        }
        class CircleContainer {
            constructor() {
                this.circles = [];
                this.stage = document.querySelector('.container');
                this.cf = new CircleAbstractFactory();
                this.cf.register('red', RedCircleBuilder);
                this.cf.register('blue', BlueCircleBuilder);
            }
            create(left, top, type) {
                const circleEl = this.cf.create(type);
                circleEl.move(left, top);
                return circleEl.get();
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