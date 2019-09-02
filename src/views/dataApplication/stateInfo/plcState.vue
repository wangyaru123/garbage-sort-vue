<template>
  <div class="mt-5">
    <el-card>
      <div slot="header" class="flexbox">
        <div class="font-25">PLC</div>
        <el-tag class="text-r" type="primary" disable-transitions>网络正常</el-tag>
        <el-tag class="text-r" style="margin-left:10px;" type="primary" disable-transitions>无报警</el-tag>
      </div>
      <el-row>
        <el-col :span="24">
          <!-- 如果是移动端，使用table -->
          <table class="mt-5 table table-bordered" cellspacing="0" width="100%" v-if="isMobile">
            <tbody>
              <tr>
                <td>喷釉工位产品代号</td>
                <td>{{plcData.SprayGlazy.CurrentProductCode}}</td>
              </tr>
              <tr>
                <td>喷釉工位产品型号</td>
                <td>{{plcData.SprayGlazy.CurrentProductModel}}</td>
              </tr>
              <tr>
                <td>喷釉工位产品目标次数</td>
                <td>{{plcData.SprayGlazy.CurrentGoalFrequency}}</td>
              </tr>
              <tr>
                <td>喷釉工位产品当前次数</td>
                <td>{{plcData.SprayGlazy.CurrentFrequency}}</td>
              </tr>
              <tr>
                <td>调用的程序号</td>
                <td>{{plcData.SprayGlazy.ProgramNumber}}</td>
              </tr>
              <tr>
                <td>等待工位产品代号</td>
                <td>{{plcData.SprayGlazy.WaitProductCode}}</td>
              </tr>
              <tr>
                <td>等待工位产品型号</td>
                <td>{{plcData.SprayGlazy.WaitProductModel}}</td>
              </tr>
              <tr>
                <td>等待工位产品目标次数</td>
                <td>{{plcData.SprayGlazy.WaitGoalFrequency}}</td>
              </tr>
              <tr>
                <td>喷釉工位产品当前次数</td>
                <td>{{plcData.SprayGlazy.WaitFrequency}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 如果是pc端，使用el-row -->
          <table class="mt-5 table table-bordered text-c" cellspacing="0" width="100%" v-else>
            <tbody>
              <tr>
                <td>喷釉工位产品代号</td>
                <td>喷釉工位产品型号</td>
                <td>喷釉工位产品目标次数</td>
                <td>喷釉工位产品当前次数</td>
                <td>调用的程序号</td>
                <td>等待工位产品代号</td>
                <td>等待工位产品型号</td>
                <td>等待工位产品目标次数</td>
                <td>喷釉工位产品当前次数</td>
              </tr>
              <tr>
                <td>{{plcData.SprayGlazy.CurrentProductCode}}</td>
                <td>{{plcData.SprayGlazy.CurrentProductModel}}</td>
                <td>{{plcData.SprayGlazy.CurrentGoalFrequency}}</td>
                <td>{{plcData.SprayGlazy.CurrentFrequency}}</td>
                <td>{{plcData.SprayGlazy.ProgramNumber}}</td>
                <td>{{plcData.SprayGlazy.WaitProductCode}}</td>
                <td>{{plcData.SprayGlazy.WaitProductModel}}</td>
                <td>{{plcData.SprayGlazy.WaitGoalFrequency}}</td>
                <td>{{plcData.SprayGlazy.WaitFrequency}}</td>
              </tr>
            </tbody>
          </table>
          <el-row>
            <el-col :lg="6" :xs="24" :class="isMobile?'':'mt-5'">
              <plc-card title="缓冲区" :cardData="plcData.BufferCache"></plc-card>
            </el-col>
            <el-col :lg="6" :xs="24" :class="isMobile?'':'mt-5'">
              <plc-card title="自动模式上料缓冲区" :cardData="plcData.AutoCache"></plc-card>
            </el-col>
            <el-col :lg="6" :xs="24" :class="isMobile?'':'mt-5'">
              <plc-card title="1号工位缓冲区" :cardData="plcData.OneCache"></plc-card>
            </el-col>
            <el-col :lg="6" :xs="24" :class="isMobile?'':'mt-5'">
              <plc-card title="2号工位缓冲区" :cardData="plcData.TwoCache"></plc-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import plcCard from './component/plcCard'

export default {
  // 父组件传入的属性值
  props: {
    plcData: {
      type: Object,
      default: function () {
        return {
          BufferCache: {
            ProductCode: 7,
            ProductModel: 190,
            SprayGlazeCount: 1,
            FirstProgramNumber: 7,
            FirstAtomizingValue: 0,
            FirstFanValue: 0,
            FirstSprayGunValue: 0,
            SecondProgramNumber: 0,
            SecondAtomizingValue: 0,
            SecondFanValue: 0,
            SecondSprayGunValue: 0,
            ThirdProgramNumber: 0,
            ThirdAtomizingValue: 0,
            ThirdFanValue: 0,
            ThirdSprayGunValue: 0,
            LoadMaterialLocation: 1,
            Retention: 1
          },
          AutoCache: {
            ProductCode: 59,
            ProductModel: 990,
            SprayGlazeCount: 1,
            FirstProgramNumber: 59,
            FirstAtomizingValue: 0,
            FirstFanValue: 0,
            FirstSprayGunValue: 0,
            SecondProgramNumber: 0,
            SecondAtomizingValue: 0,
            SecondFanValue: 0,
            SecondSprayGunValue: 0,
            ThirdProgramNumber: 0,
            ThirdAtomizingValue: 0,
            ThirdFanValue: 0,
            ThirdSprayGunValue: 0,
            LoadMaterialLocation: 1,
            Retention: 1
          },
          OneCache: {
            ProductCode: 59,
            ProductModel: 990,
            SprayGlazeCount: 1,
            FirstProgramNumber: 59,
            FirstAtomizingValue: 0,
            FirstFanValue: 0,
            FirstSprayGunValue: 0,
            SecondProgramNumber: 0,
            SecondAtomizingValue: 0,
            SecondFanValue: 0,
            SecondSprayGunValue: 0,
            ThirdProgramNumber: 0,
            ThirdAtomizingValue: 0,
            ThirdFanValue: 0,
            ThirdSprayGunValue: 0,
            LoadMaterialLocation: 1,
            Retention: 1
          },
          TwoCache: {
            ProductCode: 59,
            ProductModel: 990,
            SprayGlazeCount: 1,
            FirstProgramNumber: 59,
            FirstAtomizingValue: 0,
            FirstFanValue: 0,
            FirstSprayGunValue: 0,
            SecondProgramNumber: 0,
            SecondAtomizingValue: 0,
            SecondFanValue: 0,
            SecondSprayGunValue: 0,
            ThirdProgramNumber: 0,
            ThirdAtomizingValue: 0,
            ThirdFanValue: 0,
            ThirdSprayGunValue: 0,
            LoadMaterialLocation: 1,
            Retention: 1
          },
          SprayGlazy: {
            CurrentProductCode: 59,
            CurrentProductModel: 990,
            CurrentGoalFrequency: 1,
            CurrentFrequency: 1,
            ProgramNumber: 59,
            WaitProductCode: 59,
            WaitProductModel: 990,
            WaitGoalFrequency: 1,
            WaitFrequency: 1
          }
        }
      }
    }
  },
  components: {
    plcCard
  },
  data() {
    return {}
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 0;
}
.select-middle {
  height: 85px;
  line-height: 85px;
  vertical-align: middle;
}
.icon-div {
  width: 46px;
}
.flexbox {
  display: flex;
}
.flexbox div {
  flex: 1;
}
</style>

