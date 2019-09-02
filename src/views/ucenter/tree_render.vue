<template>
  <span class="tree-expand">
    <el-row>
      <el-col :span="12">
        <span class="tree-label" v-show="DATA.isEdit">
          <el-input
            class="edit"
            size="mini"
            autofocus
            v-model="DATA.name"
            :ref="'treeInput'+DATA.departmentId"
            @click.stop.native="nodeEditFocus"
            @blur.stop="nodeEditPass(STORE,DATA,NODE)"
            @keyup.enter.stop.native="$event.target.blur"
          ></el-input>
        </span>
        <span v-show="!DATA.isEdit" class="tree-label">
          <span>{{DATA.name}}</span>
        </span>
      </el-col>
      <el-col :span="12" class="text-r">
        <span class="tree-btn" v-show="!DATA.isEdit">
          <el-button size="small" icon="el-icon-plus" v-if="NODE.level===1 && positionAddAuth" @click.stop="nodeAdd(STORE,DATA,NODE)"></el-button>
          <el-button
            size="small"
            icon="el-icon-edit"
            v-if="NODE.level===1?departmentUpdateAuth:positionUpdateAuth"
            @click.stop="nodeEdit(STORE,DATA,NODE)"
          ></el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            v-if="NODE.level===1?departmentDeleteAuth:positionDeleteAuth"
            @click.stop="nodeDel(STORE,DATA,NODE)"
          ></el-button>
        </span>
      </el-col>
    </el-row>
  </span>
</template>

<script>
import { addDeptInfo, addPositionInfo, editDeptInfo, editPositionInfo } from '@/api/ucenter/departmentsInfo.js'

export default {
  name: 'TreeExpand',
  props: ['NODE', 'DATA', 'STORE'],
  computed: {
    // 修改部门信息
    departmentUpdateAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_department_update')
    },
    // 删除部门信息
    departmentDeleteAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_department_delete')
    },
    // 添加职位信息
    positionAddAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_position_add')
    },
    // 修改职位信息
    positionUpdateAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_position_update')
    },
    // 删除职位信息
    positionDeleteAuth() {
      return this.$store.state.user.accessTokenDecode.authorities && this.$store.state.user.accessTokenDecode.authorities.includes('ucenter_position_delete')
    }
  },
  data() {
    return {}
  },
  methods: {
    // 点击新增图标
    nodeAdd(s, d, n) {
      this.$emit('nodeAdd', s, d, n)
    },
    // 点击编辑图标
    nodeEdit(s, d, n) {
      this.$set(d, 'isEdit', 'true')
      this.$nextTick(() => {
        this.$refs['treeInput' + d.departmentId].$refs.input.focus()
      })
      this.$emit('nodeEdit', s, d, n)
    },
    // 点击删除图标
    nodeDel(s, d, n) {
      this.$emit('nodeDel', s, d, n)
    },
    // 失去焦点后，编辑后提交
    nodeEditPass(s, d, n) {
      d.isEdit = false
      // 如果是一级菜单，就添加部门，如果是二级菜单，就添加职位
      if (n.level === 1) {
        const deptParams = {
          name: d.name
        }
        // 添加或者编辑
        if (d.act === 'add') {
          addDeptInfo(deptParams).then(res => {
            this.$message.success('添加成功')
            this.$emit('getDeptPositionInfo')
          }).catch(err => this.$message.error(err))
        } else {
          editDeptInfo(d.departmentId, deptParams).then(res => {
            this.$message.success('编辑成功')
            this.$emit('getDeptPositionInfo')
          }).catch(err => this.$message.error(err))
        }
      } else {
        const positionParams = {
          departmentId: d.departmentId,
          name: d.name
        }
        // 添加或者编辑
        if (d.act === 'add') {
          addPositionInfo(positionParams).then(res => {
            this.$message.success('添加成功')
            this.$emit('getDeptPositionInfo')
          }).catch(err => this.$message.error(err))
        } else {
          editPositionInfo(d.positionId, positionParams).then(res => {
            this.$message.success('编辑成功')
            this.$emit('getDeptPositionInfo')
          }).catch(err => this.$message.error(err))
        }
      }
    },
    nodeEditFocus() {
      // 阻止点击节点的事件冒泡
    }
  }
}
</script>

<style>
.tree-expand {
  width: 80vw;
  height: 35px;
  line-height: 35px;
  margin: 5px;
}
.tree-expand .tree-label {
  font-size: 0.9em;
}
.tree-expand .tree-label .edit {
  width: 80%;
}
/* .tree-expand .tree-btn {
  display: none;
} */
.tree-expand .tree-btn i {
  font-size: 1.1em;
  margin-right: 3px;
}
.tree-expand .tree-btn .el-icon-plus {
  color: #67c23a;
}
.tree-expand .tree-btn .el-icon-edit {
  color: #409eff;
}
.tree-expand .tree-btn .el-icon-delete {
  color: #f56c6c;
}
/* 默认是28px,会出现滚动条，所以用26px,正好不会出现滚动条 */
.el-input--mini .el-input__inner {
  height: 22px;
  line-height: 22px;
}
.el-tree-node__content {
  height: 35px;
}
</style>
