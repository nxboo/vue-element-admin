<template>
  <div>
    <div class="card-container edit-form">

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          分类
        </el-col>
        <el-col :sm="12">
          <el-select v-model="info.cat_id" placeholder="请选择分类">
            <el-option v-for="cat in catList" :key="cat.cat_id" :label="cat.name" :value="cat.cat_id">
              <philm-icon :icon="cat.icon"></philm-icon> {{cat.name}}
            </el-option>
          </el-select>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

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
          url
        </el-col>
        <el-col :sm="12">
          <el-input v-model="info.url"></el-input>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          汇总字段
        </el-col>
        <el-col :sm="8">
          <el-select v-model="info.group_field" placeholder="请选择分类">
            <el-option v-for="(groupField,key) in groupFieldList" :key="key" :label="groupField" :value="key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :sm="4">
          <el-select v-model="info.group_field_sort" placeholder="排序">
            <el-option v-for="(groupFieldSort,key) in groupFieldSortList" :key="key" :label="groupFieldSort" :value="key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          搜索选项
        </el-col>
        <el-col :sm="12">
          <el-checkbox-group v-model="info.search_options">
            <el-checkbox label="1">时间段</el-checkbox>
            <el-checkbox label="2">天</el-checkbox>
            <el-checkbox label="3">平台</el-checkbox>
            <el-checkbox label="4">版本</el-checkbox>
            <el-checkbox label="5">国家</el-checkbox>
            <el-checkbox label="6">新老用户</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          搜索选项（参数）
        </el-col>
        <el-col :sm="8">
          <el-input v-model="info.search_argv_name" placeholder="参数名称"></el-input>
        </el-col>
        <el-col :sm="4">
          <el-input v-model="info.search_argv_cmd" placeholder="选项生成CMD"></el-input>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          表格选项
        </el-col>
        <el-col :sm="12">
          <el-checkbox-group v-model="info.table_options">
            <el-checkbox label="1">图表</el-checkbox>
            <el-checkbox label="2">总计行</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          拆解选项
        </el-col>
        <el-col :sm="12">
          <el-checkbox-group v-model="info.dismantle_options">
            <el-checkbox label="1">小时</el-checkbox>
            <el-checkbox label="2">渠道</el-checkbox>
            <el-checkbox label="3">版本</el-checkbox>
            <el-checkbox label="4">国家</el-checkbox>
            <el-checkbox label="5">ABTest</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :sm="8" class="edit-help">
        </el-col>
      </el-row>
      <!--
  table_options
  dismantle_options
  data_changes
  desc
  seq -->

      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :sm="4" class="edit-label">
          说明
        </el-col>
        <el-col :sm="12">
          <el-input v-model="info.desc"></el-input>
        </el-col>
        <el-col :sm="8" class="edit-help">
          说明分显示在页面上
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
  name: 'reportEdit',
  data() {
    return {

      info: {
        report_id: 0,
        cat_id: null,
        name: '',
        url: '',
        sql: '',
        group_field: "1",
        group_field_sort: "2",
        search_options: ["1",2,3,4,5],
        search_argv_name: '',
        search_argv_cmd: '',
        table_options: [],
        dismantle_options: [],
        desc: '',
        seq: 0
      },
      catList: [],
      groupFieldList:{
        1:"天",
        2:"渠道",
        3:"版本",
        4:"参数",
        5:"国家",
        6:"ABTest",
      },
      groupFieldSortList:{
        1:"升序",
        2:"降序"
      },

      putLoading: false,
    }
  },
  created() {
    if (this.$route.params.catId) {
      this.info.catId = this.$route.params.catId;
    }

    this.$store.dispatch('setPageInfo', {
      title: this.info.catId ? '修改报表' : '添加报表',
      options: []
    });

    this.fetchCats();
    this.fetchData();
  },
  methods: {

    fetchCats(){
      catList(this.keyword).then(response => {
        this.catList = response.data;
      });
    },

    fetchData() {
      this.listLoading = true;

      if (this.info.catId) {
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
