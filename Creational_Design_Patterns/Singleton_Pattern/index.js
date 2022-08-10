(() => {
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
            create(left, top) {
                const circleEl = document.createElement('div');
                circleEl.setAttribute('class', 'circle');
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
            const circle = cs.create(ev.pageX - 25, ev.pageY - 25 );
            cs.add(circle);
        });
    }
})();