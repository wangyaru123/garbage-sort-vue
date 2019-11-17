<template>
  <!--<div class="dashboard-container">-->
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <!--<div class="dashboard-text" v-for="(value,name,index) in accessTokenDecode" :key="index">{{name}}:{{value}}</div>-->
  <div>
    <el-row :gutter="5">
        <el-card class="box-card">
          <div slot="header" class="text-c">
            <div class="dashBoardContainer">
             <span></span>
              <div class="" v-show="!isMobile" v-for="list in 3" :key="list.index">
                  <div class="TriangleLeft"></div>
              </div>
              <h2 v-for="(span, index) in spanList" :key="index">
                <span><b>{{span.spanText}}</b></span>
              </h2>
              <div v-for="list in 3" :key="list.index" v-show="!isMobile">
                <div class="TriangleRight"></div>
              </div>
            <div class="xFontLeft" v-show="!isMobile"></div>
            <div class="xFontRight" v-show="!isMobile"></div>
            <div class="line"></div>
            </div>
            <div class="englishFont">Application Programming of "1+X" Industrial Robot</div>
          </div>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" :class="isMobile?'h-auto':'h-num mb-10'">
              <img :src="machineImgRight" alt="">
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" :class="isMobile?'h-auto':'h-num mb-10'">
              <img :src="machineImg"  alt="">
        </el-col>
          <div class="bottom clearfix text-c">
            <span>{{copyRight}}</span>
          </div>
        </el-card>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters, mapState } from 'vuex'
import machineImg from '@/assets/machine.png'
import machineImgRight from '@/assets/machineRight.png'
export default {
  data() {
    return {
      // 头像图片
      machineImg,
      machineImgRight,
      titleName: '“1+X”工业机器人应用编程',
      copyRight: 'Copyright © 2016-2020 江苏汇博机器人技术股份有限公司',
      spanList: [
        { spanText: '“' },
        { spanText: '1' },
        { spanText: '+' },
        { spanText: 'X' },
        { spanText: '”' },
        { spanText: '工' },
        { spanText: '业' },
        { spanText: '机' },
        { spanText: '器' },
        { spanText: '人' },
        { spanText: '应' },
        { spanText: '用' },
        { spanText: '编' },
        { spanText: '程' }
      ]
    }
  },
  name: 'Dashboard',
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ]),
  //   ...mapState('user', ['accessToken', 'accessTokenDecode']),
  //   isMobile() {
  //     return this.$store.state.app.isMobile
  //   }
  // },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 90%;
}
.el-col {
  padding: 80px 20px;
  // border: 1px solid red;
}
.item {
  height: 150px;
  line-height: 150px;
  width: 300px;
  margin:0 auto;
  background-color: rgba(164, 224, 244, 0.5);
  position: relative;
  border: 1px solid #0491ab;
  border-radius: 15px;
}
.ver-m {
  margin-top: 50px;
}
.el-card{
  background: transparent;
  box-shadow: none;
  border:none;
  /deep/ .el-card__header{
    border-bottom:none;
  }
}
.p-10{
  background: linear-gradient(#fff,#fff, #aaa);
 }
.h-num,.h-auto,.h-num1{
  height: calc(100vh - 245px);
  display: flex;
  align-items: center;
  justify-content:center;
  img {
    width: 65%;
    animation: fadeIn 0.8s;
  }
}
.h-auto{
  img {
    width: 55%;
  }
  height: 33vh;
}
// 英文标题
.englishFont{
  color: #aaa;
  font-size: 20px;
  animation: fadeIn 0.4s;
}
// 叉符
.xFontLeft,.xFontRight{
  width: 20%;
  height: 4px;
  border-top:0.4em #3970da dashed;
  transform: rotate(35deg);
  opacity: 0.05;
  position: absolute;
  margin: auto;
  top:0;
  left:0;
  bottom:0;
  right: 0;
}
.xFontRight{
  transform: rotate(-35deg);
}
// 动态三角
.TriangleLeft,.TriangleRight{
  width: 0;
  height: 0;
  border-top:6px solid transparent;
  border-bottom:6px solid transparent;
  border-left:12px solid #888;
  margin: 5px 1px 0 1px;
}
.TriangleRight{
  border-top:6px solid transparent;
  border-bottom:6px solid transparent;
  border-left:none;
  border-right:12px solid #888;
}
.dashBoardContainer :nth-child(2){
  animation: fadeIns 0.5s infinite;
}
.dashBoardContainer :nth-child(3){
  animation: fadeIns 0.7s infinite;
}
.dashBoardContainer :nth-child(4){
  animation: fadeIns 0.9s infinite;
  margin-right: 20px;
}
.dashBoardContainer :nth-last-child(4){
  animation: fadeIns 0.8s infinite;
}
.dashBoardContainer :nth-last-child(5){
  animation: fadeIns 0.7s infinite;
}
.dashBoardContainer :nth-last-child(6){
  animation: fadeIns 0.6s infinite;
  margin-left: 20px;
}
@keyframes fadeIns {
  0% {
    transform: scale(0.4);
    opacity: 0.3;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.4);
    opacity: 0.3;
  }
}
// 动态文字
.dashBoardContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.dashBoardContainer h2{
  position: relative;
  span{
    display: inline-block;
  }
}
.dashBoardContainer h2 span{
  display: inline-block;
  opacity: 0;
  text-transform: uppercase;
  animation-iteration-count: 1;
  animation: fadeIn forwards 0.8s ease-out;
  &:nth-child(1) {
  animation-delay: 0.8s;
   }
  &:nth-child(2) {
    animation-delay: 0.7s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }
  &:nth-child(4) {
    animation-delay: 0.5s;
  }
  &:nth-child(5) {
    animation-delay: 0.4s;
  }
  &:nth-child(6) {
    animation-delay: 0.4s;
  }
  &:nth-child(7) {
    animation-delay: 0.5s;
  }
  &:nth-child(8) {
    animation-delay: 0.6s;
  }
  &:nth-child(9) {
    animation-delay: 0.7s;
  }
  &:nth-child(10) {
    animation-delay: 0.8s;
  }
  &:nth-child(11) {
    animation-delay: 0.7s;
  }
  &:nth-child(12) {
    animation-delay: 0.6s;
  }
  &:nth-child(13) {
    animation-delay: 0.5s;
  }
  &:nth-child(14) {
    animation-delay: 0.4s;
  }
}

@keyframes fadeIn {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
  .line{
    width: 400px;
    height: 4px;
    position: absolute;
    top:70px;
    left:50%;
    margin-left:-200px;
    background-image: linear-gradient(right, rgba(0, 0, 0, 0) 20%, rgba(230, 230, 230, 0.9) 50%, rgba(0, 0, 0, 0) 90%);
    animation:myfirst 2s ease-out;
    opacity: 0;
  }
@keyframes myfirst{
  0% {opacity: 0;}
  10%{left:30%;opacity: 0;}
  50%{left:60%;opacity: 0.8;}
  100%{left:70%;opacity: 0;}
}
</style>
