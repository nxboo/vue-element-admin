<template>
    <el-select v-model="currentValue" v-on:input="updateValue(currentValue)" clearable placeholder="平台" style="width: 100%">
        <el-option
                v-for="(v,k) in versions"
                :key="k"
                :label="v"
                :value="k">
        </el-option>
    </el-select>
</template>
<script>
    import {getPlatforms} from 'api/stat';

    export default {
        name: 'platforms',
        components: {

        },
        props:[
            'value'
        ],
        data() {
            return {
                versions: [

                ],
                currentValue:''
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                getPlatforms().then(response => {
                    this.versions = response.data;
                });
                this.currentValue = this.value;
            },
            updateValue: function (currentValue) {
                console.log(currentValue);
                this.$emit('input', currentValue);
            }
        }
    };
</script>
