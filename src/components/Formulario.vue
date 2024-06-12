<script setup>
import { reactive, ref } from 'vue';

import Alerta from './Alerta.vue';

const paises = [
    { codigo: 'US', nombre: 'Estados Unidos' },
    { codigo: 'MX', nombre: 'México' },
    { codigo: 'AR', nombre: 'Argentina' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'CR', nombre: 'Costa Rica' },
    { codigo: 'ES', nombre: 'España' },
    { codigo: 'PE', nombre: 'Perú' }
];

const busqueda = reactive({
    ciudad: '',
    pais: '',
});

const error = ref('');

const emit = defineEmits(['obtener-clima']);

const consultarClima = () => {
    if (Object.values(busqueda).includes('')) {
        error.value = 'Todos los campos son obligatorios';
        return;
    }
    error.value = '';

    emit('obtener-clima', busqueda);
}

</script>
<template>
    <form @submit.prevent="consultarClima" class="formulario">

        <Alerta v-if="error">{{ error }}</Alerta>
        <div class="campo">
            <label for="ciudad">Ciudad</label>
            <input v-model="busqueda.ciudad" type="text" id="ciudad" placeholder="Ciudad">
        </div>

        <div class="campo">
            <label for="pais">Pais</label>
            <select v-model="busqueda.pais" id="pais">
                <option value="">-- Selecciona un país --</option>
                <option :value="pais.codigo" v-for="pais in paises">{{ pais.nombre }} </option>
            </select>

            <input type="submit" value="consultar clima">
        </div>
    </form>
</template>
