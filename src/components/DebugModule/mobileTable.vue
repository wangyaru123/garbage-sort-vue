<template>
  <div class="border">
    <cell :title="title" is-link :border-intent="false" :arrow-direction="contentDirection ? 'up' : 'down'" :ref="refName" @click.native="click"></cell>
    <template v-if="contentDirection">
      <cell-box :border-intent="false" class="p-0">
        <x-table full-bordered class="bg-white" v-if="tableType==='sensor'">
          <thead>
            <tr class="bg-gray">
              <th>描述</th>
              <th>值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">
              <td>{{item.description}}</td>
              <td>{{item.value}}{{item.unit}}</td>
            </tr>
          </tbody>
        </x-table>
        <x-table full-bordered class="bg-white" v-else>
          <thead>
            <tr class="bg-gray">
              <th>PLC地址</th>
              <th>描述</th>
              <th>使能状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="index">
              <td>{{item.plcAddress}}</td>
              <td>{{item.description}}</td>
              <td><span class="light" :class="item.enable? 'open':'close'"></span></td>
            </tr>
          </tbody>
        </x-table>
      </cell-box>
    </template>
  </div>
</template>

<script>
import { XTable, Cell, CellBox } from 'vux'
export default {
  components: {
    XTable,
    Cell,
    CellBox
  },
  props: {
    title: String,
    contentDirection: Boolean,
    refName: String,
    tableData: Array,
    tableType: String
  },
  methods: {
    click(e) {
      this.$emit('showContent', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 1px solid #f2f2f2;
}
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
.vux-table {
  width: 100%;
  line-height: 30px;
  border-radius: 5px;
}
</style>
