<template>
    <el-select v-bind:value="value" v-on:change="updateValue(value)" multiple placeholder="请选择版本" style="width: 100%" filterable>
        <el-option
                v-for="(v,k) in versions"
                :key="k"
                :label="v"
                :value="k">
        </el-option>
    </el-select>
</template>
<script>
    import {getVersions} from 'api/stat';

    export default {
        name: 'versions',
        components: {

        },
        data() {
            return {
                versions: [

                ],
                value:[

                ]
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                getVersions().then(response => {
                    this.versions = response.data;
                })
            },
            updateValue: function (value) {
                this.$emit('input', value);
            }
        }
    };
</script>
