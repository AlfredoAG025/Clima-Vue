import { ref, computed } from 'vue';

import axios from 'axios';

export default function useClima() {

    const clima = ref({});
    const cargando = ref(false);
    const error = ref('');

    const obtenerClima = async ({ ciudad, pais }) => {
        error.value = '';
        cargando.value = true;
        clima.value = {};

        // Importar el API Key
        const key = import.meta.env.VITE_API_KEY;
        // Obtenerla lat, lng
        try {
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;

            const { data } = await axios(url);

            if (data) {
                const { lat, lon } = data[0];

                // Obtener el clima  
                const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

                const { data: resultado } = await axios(urlClima);

                clima.value = resultado;

            }
        } catch (err) {
            error.value = 'Ciudad No Encontrada';
        } finally {
            cargando.value = false;
        }
    };

    const mostrarClima = computed(() => {
        return Object.values(clima.value).length > 0;
    });

    const formatearTemperatura = temperatura => parseInt(temperatura - 273.15);

    return {
        clima,
        cargando,
        error,
        obtenerClima,
        mostrarClima,
        formatearTemperatura,
    }
}