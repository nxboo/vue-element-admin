<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                size="tiny"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        name: 'charts-card',
        props: {},
        computed: {},
        data() {

        },

        methods: {}
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
