<template>
    <div class="dashboard-container">
        <component v-bind:is="currentRole"> </component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import EditorDashboard from './editor/index';
    import DefaultDashboard from './default/index';
    import StatDashboard from './stat/index';
    export default {
      name: 'dashboard',
      components: { EditorDashboard, DefaultDashboard, StatDashboard },
      data() {
        return {
          currentRole: 'StatDashboard'
        }
      },
      computed: {
        ...mapGetters([
          'name',
          'avatar',
          'email',
          'introduction',
          'roles'
        ])
      },
      created() {
        if (this.roles.indexOf('admin') >= 0) {
          return;
        }
        // const isEditor = this.roles.some(v => v.indexOf('editor') >= 0)
        // if (!isEditor) {
        //   this.currentRole = 'DefaultDashboard';
        // }
        this.currentRole = 'StatDashboard';
      }
    }
</script>
