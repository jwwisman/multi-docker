<template>
    <div>
        
        <label>Enter your index:</label>
        <input v-model="index"/>
        <button @click="handleSubmit">Submit</button>
        
        <h3>Indexes I have seen: </h3>
        {{
            seenIndexes.map(item => {return item.number}).join(",")
        }}

        <h3>Calculated Values:</h3>
        <div v-for="key in Object.keys(values)" :key="key">
            For index {{key}} I calculated {{values[key]}}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"FibonacciComponent",
    data() {
        return {
            seenIndexes: [],
            values: {},
            index: ''
        }
    },
    created() {},
    mounted() {
        this.fetchValues();
        this.fetchIndexes();
    },
    computed: {
    },
    methods: {
        async handleSubmit() {
            console.log("handle submit for index: ", this.index)
            await axios.post('/api/values', {
                index: this.index
            }).then((result) => {
                if(result.data.working) {
                    // console.log("succesfull post! now load them again");
                    this.fetchValues();
                    this.fetchIndexes();
                }
            })

            // reset the index again:
            this.index = ''
        },
        async fetchValues() {
            const result = await axios.get('/api/values/current');
            // console.log("/api/values/current: ", result.data);
            this.values = result.data;
        },
        async fetchIndexes() {
            const result = await axios.get('/api/values/all');
            // console.log("/api/values/all result: ", result.data);
            this.seenIndexes = result.data;
        },
    }
}
</script>