<template>
  <el-card class="box-card is-always-shadow m-10">
    <div class="expand">
      <div>
        <el-button @click="handleAddTop" v-if="departmentAddAuth">添加部门</el-button>
        <el-tree
          ref="expandMenuList"
          class="expand-tree"
          v-if="isLoadingTree"
          :data="treeData"
          node-key="id"
          highlight-current
          :props="defaultProps"
          :expand-on-click-node="true"
          :default-expand-all="true"
          :render-content="renderContent"
          :default-expanded-keys="defaultExpandKeys"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </div>
  </el-card>
</template>

<script>
import TreeRender from './tree_render'
import { getDeptPositionInfo, deleteDept, deletePosition } from '@/api/ucenter/departmentsInfo.js'

export default {
  name: 'Tree',
  computed: {
    // 增加部门信息
    departmentAddAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_department_add')
    }
  },
  data() {
    return {
      isLoadingTree: false, // 是否加载节点树
      treeData: [], // 节点树数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultExpandKeys: [] // 默认展开节点列表
    }
  },
  created() {
    this.getDeptPositionInfo()
    this.initExpand()
  },
  methods: {
    // 获取部门职位信息--树信息
    getDeptPositionInfo() {
      getDeptPositionInfo().then(res => {
        this.treeData = res
      }).catch(err => this.$message.error(err))
    },
    // 处理id与departmentId对应
    initExpand() {
      this.treeData.map((a) => {
        this.defaultExpandKeys.push(a.departmentId)
      })
      this.isLoadingTree = true
    },
    // 点击节点
    handleNodeClick(d, n, s) {
      d.isEdit = false
    },
    // 加载节点
    renderContent(h, { node, data, store }) {
      const that = this
      return h(TreeRender, {
        props: {
          DATA: data,
          NODE: node,
          STORE: store
        },
        on: {
          nodeAdd: (s, d, n) => that.handleAdd(s, d, n),
          nodeEdit: (s, d, n) => that.handleEdit(s, d, n),
          nodeDel: (s, d, n) => that.handleDelete(s, d, n),
          getDeptPositionInfo: () => that.getDeptPositionInfo()
        }
      })
    },
    // 编辑
    handleEdit(s, d, n) {
      console.log(s, d, n)
    },
    // 添加部门
    handleAddTop() {
      this.treeData.push({
        name: '',
        children: [],
        isEdit: true,
        act: 'add'
      })
    },
    // 添加职位
    handleAdd(s, d, n) {
      const params = {
        departmentId: d.departmentId,
        name: '',
        isEdit: true,
        act: 'add'
      }
      // 添加数据
      d.children.push(params)
      // 展开节点
      if (!n.expanded) {
        n.expanded = true
      }
    },
    // 删除部门
    deleteDept(id) {
      deleteDept(id).then(res => {
        this.$message.success('删除成功')
        this.getDeptPositionInfo()
      }).catch(err => this.$message.error(err))
    },
    // 删除职位
    deletePosition(id) {
      deletePosition(id).then(res => {
        this.$message.success('删除成功')
        this.getDeptPositionInfo()
      }).catch(err => this.$message.error(err))
    },
    // 删除节点
    handleDelete(s, d, n) {
      // 如果是一级菜单，删除部门，如果是二级菜单，删除职位
      this.$confirm(n.level === 1 ? '此操作将删除该部门, 是否删除?' : '此操作将删除该职位, 是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => n.level === 1 ? this.deleteDept(d.departmentId) : this.deletePosition(d.positionId))
        .catch(() => this.$message.info('取消删除'))
    }
  }
}
</script>

<style>
.expand {
  width: 100%;
  height: 100%;
  font-size: 18px;
  overflow: hidden;
}
.expand > div {
  height: 100%;
  padding-top: 20px;
  width: 80%;
  margin: 0 auto;
  max-width: 600px;
  overflow-y: auto;
}
.expand > div::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.expand > div::-webkit-scrollbar-thumb {
  background-color: rgba(50, 65, 87, 0.5);
  outline: 1px solid slategrey;
  border-radius: 5px;
}
.expand > div::-webkit-scrollbar {
  width: 10px;
}
.expand-tree {
  border: none;
  margin-top: 10px;
  height: 78vh;
}
.expand-tree .el-tree-node.is-current,
.expand-tree .el-tree-node:hover {
  overflow: hidden;
}
.expand-tree .is-current > .el-tree-node__content .tree-btn,
.expand-tree .el-tree-node__content:hover .tree-btn {
  display: inline-block;
}
.expand-tree .is-current > .el-tree-node__content .tree-label {
  white-space: normal;
}
</style>
