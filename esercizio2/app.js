
const { createApp } = Vue;

createApp({
    data() {
        return {
            visibile: true,
            punteggio: 7,

            
            isLoggedIn: false,

           
            coloreSemaforo: 'rosso',

            
            teams: ['Juventus', 'Inter', 'Milan'],

            
            products: [
                { id: 1, name: 'Palla', price: 12.5 },
                { id: 2, name: 'Maglia', price: 29.99 },
                { id: 3, name: 'Scarpe', price: 59.99 }
            ]
        }
    },
    methods: {
        toggleLogin() {
            this.isLoggedIn = !this.isLoggedIn;
        },
        setSemaforo(col) {
            if (['rosso', 'giallo', 'verde'].includes(col)) {
                this.coloreSemaforo = col;
            }
        }
    }
}).mount('#app');