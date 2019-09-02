<template>
  <el-card :class="isMobile?'mt-5':'m-5'" shadow="never" :body-style="{border : '1px solid #eee'}">
    <div class="font-25 text-c">{{title}}</div>
    <div class="mt-5 pa-20 preview-div">
      <form-preview :body-items="list0"></form-preview>
      <form-preview :body-items="list1"></form-preview>
      <form-preview :body-items="list2"></form-preview>
      <form-preview :body-items="list3"></form-preview>
    </div>
  </el-card>
</template>

<script>
import { FormPreview } from 'vux'
export default {
  components: {
    FormPreview
  },
  // 父组件传入的属性值
  props: {
    title: null,
    cardData: {}
  },
  data() {
    return {
      list: [{
        label: '缓冲区名',
        value: this.cardData.ProductCode
      }, {
        label: '产品代号',
        value: this.cardData.ProductModel
      }, {
        label: '产品型号',
        value: this.cardData.ProductModel
      }, {
        label: '喷釉次数',
        value: this.cardData.SprayGlazeCount
      }, {
        label: '第一遍程序号',
        value: this.cardData.FirstProgramNumber
      }, {
        label: '第一遍雾化值',
        value: this.cardData.FirstAtomizingValue
      }, {
        label: '第一遍扇形值',
        value: this.cardData.FirstFanValue
      }, {
        label: '第一遍喷枪值',
        value: this.cardData.FirstSprayGunValue
      }, {
        label: '第二遍程序号',
        value: this.cardData.SecondProgramNumber
      }, {
        label: '第二遍雾化值',
        value: this.cardData.SecondAtomizingValue
      }, {
        label: '第二遍扇形值',
        value: this.cardData.SecondFanValue
      }, {
        label: '第二遍喷枪值',
        value: this.cardData.SecondSprayGunValue
      }, {
        label: '第三遍程序号',
        value: this.cardData.ThirdProgramNumber
      }, {
        label: '第三遍雾化值',
        value: this.cardData.ThirdAtomizingValue
      }, {
        label: '第三遍扇形值',
        value: this.cardData.ThirdFanValue
      }, {
        label: '第三遍喷枪值',
        value: this.cardData.ThirdSprayGunValue
      }],
      list0: [{
        label: '缓冲区名',
        value: this.cardData.ProductCode
      }, {
        label: '产品代号',
        value: this.cardData.ProductModel
      }, {
        label: '产品型号',
        value: this.cardData.ProductModel
      }, {
        label: '喷釉次数',
        value: this.cardData.SprayGlazeCount
      }],
      list1: [{
        label: '第一遍程序号',
        value: this.cardData.FirstProgramNumber
      }, {
        label: '第一遍雾化值',
        value: this.cardData.FirstAtomizingValue
      }, {
        label: '第一遍扇形值',
        value: this.cardData.FirstFanValue
      }, {
        label: '第一遍喷枪值',
        value: this.cardData.FirstSprayGunValue
      }],
      list2: [{
        label: '第二遍程序号',
        value: this.cardData.SecondProgramNumber
      }, {
        label: '第二遍雾化值',
        value: this.cardData.SecondAtomizingValue
      }, {
        label: '第二遍扇形值',
        value: this.cardData.SecondFanValue
      }, {
        label: '第二遍喷枪值',
        value: this.cardData.SecondSprayGunValue
      }],
      list3: [{
        label: '第三遍程序号',
        value: this.cardData.ThirdProgramNumber
      }, {
        label: '第三遍雾化值',
        value: this.cardData.ThirdAtomizingValue
      }, {
        label: '第三遍扇形值',
        value: this.cardData.ThirdFanValue
      }, {
        label: '第三遍喷枪值',
        value: this.cardData.ThirdSprayGunValue
      }]
    }
  },
  computed: {
    // 是否为手机
    isMobile() {
      return this.$store.state.app.isMobile
    }
  }
}
</script>

<style lang="scss">
.pa-20 {
  padding: 10px 20px;
}
.preview-div /deep/ .weui-form-preview__label {
  min-width: 0px;
}
.preview-div /deep/ .weui-form-preview__hd {
  line-height: 0px;
  padding: 0px;
}
</style>
