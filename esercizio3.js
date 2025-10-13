
const { createApp } = Vue;

createApp({
    data() {
        return {
            // 0. Cambia Messaggio
            messaggio: 'Clicca il bottone',
            // 1. Accendi/Spegni
            luceAccesa: false,
            // 2. Convertitore
            kg: 0,
            // 3. Form registrazione
            nome: '',
            genere: 'Uomo',
            paese: 'Italia'
        }
    },
    
    computed: {
        grammi() {
            return (Number(this.kg) || 0) * 1000;
        }
    },

    methods: {
        mostraMessaggio(msg) {
            alert(msg);
        },
        inviaModulo() {
            alert('Modulo inviato con successo!');
        },

        // 0. Cambia Messaggio
        cambiaMessaggio() {
            this.messaggio = 'Hai cliccato il bottone!';
        },

        // 1. Accendi/Spegni
        toggleLuce() {
            this.luceAccesa = !this.luceAccesa;
        }
    }
}).mount('#app');
