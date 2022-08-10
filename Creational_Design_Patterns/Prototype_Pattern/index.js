(() => {
    // Helper function to create prototype obj clones from one pseudo class to another
    function clone(src, dst) {
        Object.keys(src.prototype).forEach(key => {
            if (key !== 'constructor') {
                dst.prototype[key] = src.prototype[key];
            }
        });
    }
    // Make sure to use function declaration instead of ES6 class in order to make the prototype cloning process run properly
    function Circle() {
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'circle');
    }
    Circle.prototype.color = function(color) {
        this.element.style.backgroundColor = color;
    };
    Circle.prototype.move = function (left, top) {
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`; 
    };
    Circle.prototype.get = function() {
        return this.element;
    };

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
            const rect = new Rect();
            rect.color('yellow');
            rect.move(40, 40);
            this.circle.get().append(rect.get());
        }
        get() {
            return this.circle;
        }
    }
    // We create a Rectangle class which has almost the same properties a Circle class has.
    function Rect() {
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'rect');
    }
    // The Protype pattern is memory efficient because it just clones the prototype properties from one class to another
    // So that we avoid implementing inheritance and have repetitive implementation.
    clone(Circle, Rect);
    

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