<template>
  <el-card class="box-card is-always-shadow m-5">
    <div slot="header" class="clearfix" v-if="tableType==='sensor'">
      <span><strong>传感器参数</strong></span>
    </div>
    <el-row>
      <el-col :span="isMobile?24:13" v-if="tableType==='io'">
        <el-image :style="{width: isMobile?'':'300px'}" :class="heightClass" :src="src" fit="contain"></el-image>
      </el-col>
      <el-col :span="isMobile?24:tableType==='sensor'?24:11" :class="heightClass">
        <el-table :data="displayData" border stripe :class="isMobile?'mt-5':''">
          <template v-if="tableType==='sensor'">
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="值" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.value}}{{ scope.row.unit}}</span>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column label="参数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100px" align="center">
              <template slot-scope="scope">
                <span class="light" :class="scope.row.enable? 'open':'close'"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    src: String,
    displayData: Array,
    heightClass: String,
    isMobile: Boolean,
    tableType: String
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.light {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: white;
  margin: 0px auto;
  border-radius: 50%;
}
.open {
  background: #67c23a;
}
.close {
  background: #b6b3b3;
}
.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
.height300 {
  height: 300px;
}
.height924 {
  height: 924px;
}
.height400 {
  height: 400px;
}
.height1044 {
  height: 1004px;
}
</style>
