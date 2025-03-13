class PassengerCounter {
    constructor() {
        this.countEl = document.getElementById('count-el');
        this.saveEl = document.getElementById('save-el');
        this.incrementBtn = document.getElementById('increment-btn');
        this.saveBtn = document.getElementById('save-btn');
        
        this.count = 0;
        this.entries = [];
        
        this.initialize();
    }

    initialize() {
        this.loadState();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.incrementBtn.addEventListener('click', () => this.increment());
        this.saveBtn.addEventListener('click', () => this.save());
    }

    increment() {
        this.count++;
        this.updateDisplay();
    }

    save() {
        if (this.count === 0) return;
        
        this.entries.push(this.count);
        this.updateHistory();
        this.persistState();
        
        this.count = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        this.countEl.textContent = this.count;
    }

    updateHistory() {
        this.saveEl.innerHTML = this.entries
            .map((entry, index) => `
                <li class="history-item">
                    <span class="entry-number">${index + 1}.</span>
                    <span class="entry-value">${entry} passengers</span>
                </li>
            `)
            .join('');
    }

    persistState() {
        localStorage.setItem('passengerCounter', JSON.stringify({
            count: this.count,
            entries: this.entries
        }));
    }

    loadState() {
        const data = JSON.parse(localStorage.getItem('passengerCounter')) || {};
        this.count = data.count || 0;
        this.entries = data.entries || [];
        this.updateDisplay();
        this.updateHistory();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PassengerCounter();
});