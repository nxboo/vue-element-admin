<template>
  <div>
    <div class="card-container edit-form">
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          名称
        </el-col>
        <el-col :sm="12">
          <el-input v-model="info.name"></el-input>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          图标
        </el-col>
        <el-col :sm="12">
          <el-input v-model="info.icon"></el-input>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          序号
        </el-col>
        <el-col :sm="12">
          <el-input-number v-model="info.seq"></el-input-number>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <div class="edit-footer">
        <el-row type="flex" justify="center">
          <el-col :sm="8">
            <el-button style="width: 100%" type="primary" @click="submit" :loading="putLoading" icon="check">提交</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
import { catList, catInfo, catEdit, catDelete } from '../../api/report';
import lodash from 'lodash';

export default {
  name: 'reportCatEdit',
  db: null,
  data() {
    return {
      info: {
        catId: 0,
        name: '',
        icon: '',
        seq: 0
      },
      putLoading: false,
    }
  },
  created() {
    if (this.$route.params.catId) {
      this.info.catId = this.$route.params.catId;
    }

    this.$store.dispatch('setPageInfo', {
      title: this.info.catId ? '修改分类' : '添加分类',
      options: []
    });

    this.fetchData();
  },
  methods: {

    fetchData() {
      this.listLoading = true;

      if(this.info.catId){
        catInfo(this.info.catId).then(response => {
          if (response.code == 0) {
            this.info = response.data;
          }
        });
      }
    },

    submit() {
      this.putLoading = true;

      catEdit(this.info).then(response => {
        this.putLoading = false;

        if (response.code == 0) {
          this.$message({
            type: 'success',
            message: response.msg ? response.msg : '成功'
          });

          this.$router.go(-1);
        } else {
          this.$message({
            type: 'error',
            message: response.msg ? response.msg : '失败'
          });
        }
      });
    },
  }
};
</script>
