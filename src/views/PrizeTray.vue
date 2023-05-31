<template>
  <div ref="mainBox" class="main" :class="[readOnly === true ? 'onlyread' : '']" v-loading="loading">
    <!-- 音频播放 -->
    <div>
      <audio src="../../public/sound/click.mp3" ref="clickSound"></audio>
      <audio id="luckySound" src="../../public/sound/lucky.mp3" ref="luckySound"></audio>
    </div>
    <el-drawer :visible.sync="drawer" direction="btt" :with-header="false"
      style=" height: 100%; width: 100%; text-align: center;">
      <div class="kf_tel">
        <a href="tel:17710767031">联系方式：17710767031</a>
      </div>
    </el-drawer>
    <div class="headBox">
      <div class="guize" @click="dialogGuize = true">
        <img src="../../public/imgs/guize.jpg">
      </div>
      <div class="kf_bt" @click="drawer = true" type="primary" style="">
        <img src="../../public/imgs/kf_btn.png" alt="">
      </div>

      <!-- <div class="prize-box" @click="prizePage">
         <img src="../../public/imgs/myprize.jpg"> 
        <a>中奖记录></a>
      </div> -->
      <!-- 规则弹窗 -->
      <el-dialog :visible.sync="dialogGuize" width="100%" :show-close="showClose" :style="this.guizeStyle()">
        <div class="guize-box">
          <div class="guize-title">活动规则</div>
          <div class="guize-text">
            <div class="text-box">
              <p>【参与方式】点击抽奖按钮即可参与活动，概率性抽中活动奖品。</p>
              <p>【活动规则】每位用户不限制限制参与次数。本活动为概率中奖，用户有一定中奖概率抽中活动奖品。</p>
              <p>【活动奖品】点击奖品链接到相关服务厂商领取。</p>
              <p>【特殊说明】在活动中获得奖品后，如退出活动，可能导致道具或奖品丢失，请在获奖后及时兑换或领取，避免损失。</p>
              <p>使用说明</p>
              <p>1.参与活动后，中奖的用户应在活动页面、奖品详情页面所提示的时间内领奖，逾期未领，即视为放弃。</p>
              <p>2.领奖后，用户可以通过点击奖品链接或相似字样、图标，查看已领取的奖品及使用规则。</p>
              <p>3.请认真阅读优惠券、兑换券的使用规则，并按照优惠券、兑换券详情页面的提示操作。</p>
              <p>4.实物类奖品将在中奖后的30个工作日内发货，请注意查收；</p>
              <p>5.话费、红包等虚拟奖品将在中奖后的72小时内充值进用户填写的账号，因个人原因填写错误，导致充值失败的，不予补发。</p>
              <p>6.因不可抗力、技术故障等原因，我们有权相应调整或终止活动，而无需向用户进行赔偿或补偿。</p>
              <p>7.活动期间内，用户存在作弊等违法违规行为的，将被撤销抽奖资格、奖品使用资格，收回已获得的权益。</p>
              <p>8.对活动规则、奖品使用规则、奖品领取等有疑问的，请在工作日10:00-18:00，联系索知客服。</p>
            </div>
          </div>
          <div class="guize-close" style="" @click="dialogGuize = false">
            <img src="../../public/imgs/x.png" style="width: 100%; height: 100%;">
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="luckyBox">
      <LuckyWheel id="luckyWheel" ref="myLucky" width="32rem" height="32rem" :prizes="prizes" :blocks="blocks"
        :buttons="buttons" :defaultConfig="defaultConfig" @start="startCallback" @end="endCallback" />
      <div class="fixed-box">
        <img class="rotate" :class="[{ 'r1': shrinkPacket }, { 'r2': !shrinkPacket }]" src="../assets/finger.jpg" />
      </div>
    </div>
    <!-- 奖品弹窗,遮罩层 -->
    <div class="popContainer" v-show="dialogVisible">
      <div class="guanbi" @click="closeWin">
        <img src="../../public/imgs/x.png" alt="">
      </div>
      <div class="dia-box" @click="toPath">
        <img class="figure" src="../../public/imgs/prizebg.png" alt="">
        <div class="prize_img_box" ref="prize_img_box">
          <img class="pirze-img" :src="this.luckyPrize.imgUrl" />
          <img class="prize_bg" src="../../public/imgs/huode_bg.png" alt="">
          <img class="prize_ling" src="../../public/imgs/lingqu.png" alt="">

        </div>
        <!-- <div class="prizeFont">快领盲盒大奖</div> -->
        <!-- <div class="egg-box">
          <div class="img-box" v-for="(item, index) in eggArr" :key="index">
            <img v-show="item.isChuizi" ref="chuizi" class="chuizi" src="../../public/imgs/chuizi.png" alt="">
            <img style="width: 90%; position: absolute; bottom: 32%;" :src="item.prizeImg" alt="">
            <img :key="keyIndex" ref="egg" @click="clickEgg(item, index)" class="rotate-egg" :src="item.src"
              :class="[{ 'e1': eggstyle }, { 'e2': !eggstyle }]" />
          </div>
        </div> -->
      </div>
    </div>
    <div id="footer">
      主办单位：索知（北京）科技有限公司<br>
      客服电话：17710767031<br>
      京ICP备2021039592号
      <!-- <a href="https://beian.miit.gov.cn/" style="color: #d96841;">京ICP备2021039592号</a> -->
    </div>
  </div>
</template>
<script>
//默认在#prize-dialog下面创建canvas弹出
import '../components/canvas-confetti'
import axios from 'axios'
import butten from "../assets/butten.jpg"
import Fingerprint2 from 'fingerprintjs2'
export default {
  name: 'RaffltNine',
  data() {
    return {
      //接口api
      // apiUrl: 'https://vapi.suozhikeji.cn/api',
      apiUrl: 'https://vapi.suozhikeji.cn',
      defaultImg: 'this.src="' + require('../../public/imgs/404.png') + '"',
      blocks: [{ padding: '13px', background: '#ea5f34' }],
      prizes: [
        {
          fonts: [{ seq: '0', text: '28元红包', fontColor: '#ea4035', fontSize: '16', top: '10%' }],
          background: '#fdf4e9',
          imgs: [{ src: '../../imgs/28yuan.jpg', top: '28%', width: '37%', height: '' }]
        },
        {
          fonts: [{ seq: '1', text: '88元红包', fontColor: '#ea4035', fontSize: '16', top: '10%' }],
          background: '#ffffff',
          imgs: [{ src: '../../imgs/88yuan.jpg', top: '28%', width: '37%', height: '' }]

        },
        {
          fonts: [{ seq: '2', text: '188元红包', fontColor: '#ea4035', fontSize: '16', top: '10%' }],
          background: '#fdf4e9',
          imgs: [{ src: '../../imgs/188yuan.jpg', top: '28%', width: '37%', height: '' }]

        },
        {
          fonts: [{ seq: '3', text: '288元红包', fontColor: '#ea4035', fontSize: '16', top: '10%' }],
          background: '#ffffff',
          imgs: [{ src: '../../imgs/288yuan.jpg', top: '28%', width: '37%', height: '' }]

        },
        {
          fonts: [{ seq: '4', text: '幸运福袋', fontColor: '#ea4035', fontSize: '16', top: '10%' }],
          background: '#fdf4e9',
          imgs: [{ src: '../../imgs/fudai.jpg', top: '28%', width: '37%', height: '' }]

        }, {
          fonts: [{ seq: '5', text: '谢谢参与', fontColor: '#ea4035', fontSize: '16', top: '10%' }],
          background: '#ffffff',
          imgs: [{ src: '../../imgs/again.jpg', top: '28%', width: '37%', height: '' }]

        },
      ],
      buttons: [{
        radius: '20%',
        background: '',
        pointer: true,
        //fonts: [{ text: '开始', top: '-10px' }],
        imgs: [{
          src: butten,
          top: '-5rem',
          width: '8rem',
          height: '10rem'
        }]
      }],
      defaultConfig: {
        // gutter:'20px',
        accelerationTime: 500,
        decelerationTime: 1000,
        speed: 15
      },
      shrinkPacket: true,
      urlObj: {},//请求链接数据
      urlObj_b: {
        "logType": "",
        "eventTime": "",
        "deviceId": "",
        "deviceType": "",
        "idfa": "",
        "idfaMd5": "",
        "imei": "",
        "imeiMd5": "",
        "oaid": "",
        "oaidMd5": "",
        "androidId": "",
        "androidIdMd5": "",
        "osType": "",
        "osVersion": "",
        "mediaId": "",
        "positionId": "",
        "placeId": "",
        "schemeId": ""
      },
      prizeObj: {},//广告obj数据
      prizeList: [],//广告list
      luckyPrize: {},//中奖商品
      // imgurl: 'https://vapi.suozhikeji.cn/prod-api',
      logObj: {
        "logType": "",
        "logTime": "",
        "searchId": "",
        "deviceId": "",
        "deviceType": "",
        "idfa": "",
        "idfv": "",
        "caid1": "",
        "caid2": "",
        "idfaMd5": "",
        "idfvMd5": "",
        "imei": "",
        "imeiMd5": "",
        "oaid": "",
        "oaidMd5": "",
        "androidId": "",
        "androidIdMd5": "",
        "osType": "",
        "osVersion": "",
        "isTest": "",
        "mediaId": "",
        "positionId": "",
        "placeId": "",
        "advertiserId": "",
        "accountId": "",
        "planId": "",
        "creativeType": "",
        "creativeId": "",
        "materialId": "",
        "abTag": "",
        "packageName": "com.taobao.market",
        "transType": "",
        "bidType": "",
        "targetType": "",
        "schemeId": "",
        "pageId": "",
        "templateId": "",
        "ideaId": ""
      },//日志数据
      dialogVisible: false,
      dialogGuize: false,
      showClose: false,
      loading: false,
      timer: '',
      eggtimer: '',
      eggstyle: true,
      eggArr: [
        { index: 0, src: '../../imgs/egg.png', prizeImg: '', isChuizi: false },
        { index: 1, src: '../../imgs/egg.png', prizeImg: '', isChuizi: false },
        { index: 2, src: '../../imgs/egg.png', prizeImg: '', isChuizi: false },
      ],
      keyIndex: 0,
      //是否禁用点击
      readOnly: false,
      deviceFinger: '',
      drawer: false,
    }
  },

  methods: {
    //客服事件
    kfEvent() {

    },
    //自动播放音频
    audio() {
      if (typeof WeixinJSBridge === "undefined") {
        //未执行WeixinJSBridge 开始监听 WeixinJSBridge
        document.addEventListener('WeixinJSBridgeReady', () => {
          // alert('2')
          this.$refs.luckySound.play();
        }, false);
      } else {
        //已经执行 使用 getNetworkType 调用获取网络类型后执行
        WeixinJSBridge.invoke("getNetworkType", {}, () => {
          // alert('1')
          this.$refs.luckySound.play();
        });
      }
      // alert('3')

      // this.$refs.luckySound.play();
    },
    //处理广告接口参数
    dealSearchParm() {
      let keyarr = Object.keys(this.urlObj)
      for (let i = 0; i < Object.keys(this.urlObj_b).length; i++) {
        let key = Object.keys(this.urlObj_b)[i]
        // 返回值等于-1 说明数组keyarr中不存在item为key的对象
        if (keyarr.findIndex(item => item === key) == -1) {
          this.urlObj[key] = ''
          if (key == 'deviceId' || this.urlObj.deviceId == '') {
            this.urlObj.deviceId = this.$cookies.get('murmur')
          }
          if (key == 'eventTime') {
            this.urlObj.eventTime = this.createTime.currentTime();
          }
        }
      }
    },
    //获取浏览器的唯一标识符
    createFingerprint() {
      let that = this
      Fingerprint2.get(function (components) {
        const values = components.map(function (component, index) {
          if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
            return component.value.replace(/\bNetType\/\w+\b/, '')
          }
          return component.value
        })
        // 生成最终id murmur   
        const murmur = Fingerprint2.x64hash128(values.join(''), 31);
        that.$cookies.set("murmur", murmur);
      })
    },
    //砸蛋事件
    clickEgg(item, index) {
      this.eggArr[index].isChuizi = true
      setTimeout(() => {
        this.$refs.chuizi[index].style.transform = 'rotate(0deg)';
        //取消摇蛋
        clearInterval(this.eggtimer);
        let arr = this.eggArr
        for (let i = 0; i < arr.length; i++) {
          //恢复蛋的水平位置
          this.$refs.egg[i].style.transform = 'rotate(0deg)'
          if (index == i) {
            this.eggArr[i].src = '../../imgs/egg-bad.png'
            this.eggArr[i].prizeImg = this.luckyPrize.imgUrl
          } else {
            this.eggArr[i].prizeImg = '../../imgs/yihan.png'
          }
        }
        //未选中的🥚等一会在碎
        setTimeout(() => {
          for (let i = 0; i < arr.length; i++) {
            if (index != i) {
              this.eggArr[i].src = '../../imgs/egg-bad.png'
              this.eggArr[i].prizeImg = '../../imgs/yihan.png'
            }
          }
        }, 1000);
      }, 200);
      //跳转
      setTimeout(() => {
        this.toPath()
      }, 2000);
      this.readOnly = true
    },
    guizeStyle() {
      return {
        position: 'relative',
        padding: '0',
      }
    },
    //弹出窗关闭
    closeWin() {
      this.dialogVisible = false
      this.$refs.prize_img_box.style = 'width: 1%;height: 1%;'

      this.keyIndex++
      for (let i = 0; i < this.eggArr.length; i++) {
        this.eggArr[i].src = '../../imgs/egg.png'
        this.eggArr[i].prizeImg = ''
        this.eggArr[i].isChuizi = false
      }
    },
    //获取窗口大小设置给页面
    setWin() {
      this.winWidth = window.innerWidth;
      this.winHeight = window.innerHeight;
      this.$refs.mainBox.style.height = this.winHeight + 'px'
      this.$refs.mainBox.style.width = this.winWidth + 'px'
    },
    //点击抽奖按钮
    startCallback() {
      console.log();
      // this.audio()
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play()
      this.$refs.clickSound.play();
      this.readOnly = true
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        this.getPrize().then(res => {
          // 假设后端返回的中奖索引是0
          // 调用stop停止旋转并传递中奖索引
          const index = res.data.data.seq - 1
          this.$refs.myLucky.stop(index)
        }).catch(err => {
          this.$refs.myLucky.stop(5)
        });
      }, 2000)
    },
    //五彩礼花
    lihua() {
      //  this.$refs.luckySound.play();
      this.audio()
      confetti({
        spread: 70,
        particleCount: 100,
        origin: { y: 0.5 }
      });
    },
    //抽奖结束
    endCallback(prize) {
      setTimeout(() => {
        if (prize.fonts[0].seq == 5) {
          this.$message({
            message: '谢谢参与',
            type: 'info',
            duration: 3000,
            offset: 300
          });
          return
        }
        this.luckyPrize = prize.ement
        this.luckyPrize.imgUrl = this.domainUrl(this.luckyPrize.imgUrl)
        this.dialogVisible = true
        setTimeout(() => {
          this.$refs.prize_img_box.style = 'width: 100%;height: 100%;'
        }, 100);
        //显示奖品信息点用日志21
        this.getLog(21)
        this.lihua()
        this.eggRotate()
        this.readOnly = false
      }, 500);

    },
    //蛋抖动
    eggRotate() {
      clearInterval(this.eggtimer);
      this.eggtimer = setInterval(() => {
        this.eggstyle = !this.eggstyle
      }, 500);
    },
    //手指抖动
    startRotate() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.shrinkPacket = !this.shrinkPacket
      }, 450);
    },
    //接受上级页面传入参数
    getQuery(query) {
      if (typeof (query) == "string") {
        this.urlObj = this.getParm.getParmOfUrl(query)
        return
      }
      if (query == undefined | query == null | Object.keys(query).length == 0) {
        //如果没有入参就按默认数据请求接口
        this.dealSearchParm()
        return
      }
      this.urlObj = query
    },
    //调用广告商品接口
    getSearch() {
      var that = this
      // console.log(JSON.stringify(this.urlObj));
      var config = {
        method: 'post',
        url: that.apiUrl + `/api/ads/search`,
        header: {
          'Content-Type': 'application/json'
        },
        data: this.urlObj
      };
      axios(config)
        .then(function (res) {
          // console.log('Search-success', res);
          that.dealData(res.data.data)
          //页面加载完成调用日志接口20
          that.getLog(20)
        })
        .catch(function (error) {
          // console.log('Search-err', error);
        });
    },
    //日志接口
    getLog(logtype) {
      this.dealLog(logtype)
      let that = this;
      var config = {
        method: 'post',
        url: that.apiUrl + '/api/event/trace',
        header: {
          'Content-Type': 'application/json'
        },
        data: this.logObj
      };
      axios(config)
        .then(function (response) {
          // console.log('log-success', response);
        })
        .catch(function (error) {
          // console.log('log-err', error);
        });
    },
    //处理广告奖品数据
    dealData(obj) {
      this.prizeObj = obj
      this.prizeList = obj.advertisement
      //奖品放入转盘
      var arr = obj.advertisement
      for (let i = 0; i < Math.min(5, arr.length); i++) {
        this.prizes[i].fonts[0].text = arr[i].titleMain
        this.prizes[i].fonts[0].seq = arr[i].seq
        this.prizes[i].imgs[0].src = this.domainUrl(arr[i].imgUrl)
        this.prizes[i].imgs[0].top = '35%'
        this.prizes[i].ement = arr[i]
      }
    },
    //日志数据整理
    dealLog(logtype) {
      this.logObj.logType = logtype;
      this.logObj.logTime = this.createTime.currentTime();
      this.logObj.searchId = this.prizeObj.search_id;
      this.logObj.deviceId = this.urlObj.deviceId;
      this.logObj.deviceType = this.urlObj.deviceType;
      // IOS: IDFA > IDFV  ;   Android: IMEI > OAID > AndroidID； 没有的话前端生成cookie
      this.logObj.caid1 = '';
      this.logObj.caid2 = '';
      for (let i = 0; i < Object.keys(this.urlObj).length; i++) {
        if (Object.keys(this.urlObj)[i] == 'idfa') {
          this.logObj.idfa = this.urlObj.idfa;//idfa、idfv二选一
          this.logObj.idfaMd5 = this.urlObj.idfaMd5;//idfaMd5、idfvMd5二选一
        } else if (Object.keys(this.urlObj)[i] == 'idfv') {
          this.logObj.idfv = this.urlObj.idfv;//idfa、idfv二选一
          this.logObj.idfvMd5 = this.urlObj.idfvMd5;//idfaMd5、idfvMd5二选一
        }
      }
      this.logObj.imei = this.urlObj.imei;
      this.logObj.imeiMd5 = this.urlObj.imeiMd5;
      this.logObj.oaid = this.urlObj.oaid;
      this.logObj.oaidMd5 = this.urlObj.oaidMd5;
      this.logObj.androidId = this.urlObj.androidId;
      this.logObj.androidIdMd5 = this.urlObj.androidIdMd5;
      this.logObj.osType = this.urlObj.osType;
      this.logObj.osVersion = this.urlObj.osVersion;
      this.logObj.isTest = '';
      this.logObj.mediaId = this.urlObj.mediaId;
      this.logObj.positionId = this.urlObj.positionId;
      this.logObj.packageName = '';
      this.logObj.placeId = '123';
      this.logObj.advertiserId = '';
      this.logObj.accountId = this.luckyPrize.accountId;
      this.logObj.planId = this.luckyPrize.planId;
      this.logObj.creativeType = '';
      this.logObj.creativeId = this.luckyPrize.creativeId;
      this.logObj.materialId = '';
      this.logObj.abTag = '';
      this.logObj.transType = '';
      this.logObj.bidType = this.luckyPrize.bidType;
      this.logObj.targetType = '';
      this.logObj.ideaId = this.urlObj.ideaId;
      this.logObj.templateId = this.urlObj.templateId;
      this.logObj.pageId = this.urlObj.pageId;
      this.logObj.schemeId = this.urlObj.schemeId;

      this.filteLog(this.logObj)
    },
    //过滤日志接口每个参数
    filteLog(obj) {
      for (let i = 0; i < Object.keys(obj).length; i++) {
        if (Object.values(obj)[i] === undefined || Object.values(obj)[i] === '' || Object.values(obj)[i] === '-' || Object.values(obj)[i] === null) {
          let aaa = Object.keys(obj)[i]
          this.$set(this.logObj, aaa, '-9999')
        }
      }
    },
    //检查链接是否为域名
    domainUrl(url) {
      if (url.includes('https')) {
        return url
      } else {
        return 'https://' + url
      }
    },
    //中奖接口
    async getPrize() {
      let that = this;
      let data;
      var config = {
        method: 'get',
        url: that.apiUrl + '/api/luck/prize',
        header: {
          'Content-Type': 'application/json'
        },
      };
      await axios(config)
        .then(function (res) {
          data = res
          // console.log('prize-success', res);
        })
        .catch(function (error) {
          // console.log('prize-err', error);
        });
      return data
    },
    //跳转链接
    toPath() {
      // console.log(this.luckyPrize);
      //显示奖品信息点用日志21
      this.getLog(22)
      let urlstr = '?' + 'mediaId=' + this.logObj.mediaId + '&positionId=' + this.logObj.positionId
        + '&planId=' + this.logObj.planId + '&deviceId=' + this.logObj.deviceId + '&deviceType=' + this.logObj.deviceType
        + '&imeiMd5=' + this.logObj.imeiMd5 + '&osType=' + this.logObj.osType + '&oaidMd5=' + this.logObj.oaidMd5 + '&schemeId=' + this.logObj.schemeId
        + '&accountId=' + this.luckyPrize.accountId + '&creativeId=' + this.logObj.creativeId + '&searchId=' + this.logObj.searchId + '&pageId=' + this.urlObj.pageId
        + '&templateId=' + this.urlObj.templateId
      let url = this.domainUrl(this.luckyPrize.landUrl) + urlstr
      window.location.href = url
      // console.log(urlstr);
    },
    //监听图片渲染完成
    imgListen() {
      let imglis = document.getElementsByTagName('img')
      for (let i = 0; i < imglis.length; i++) {
        if (imglis[i].complete == false) {
          return false
        }
        return true
      }
    },
    //奖品页面
    prizePage() {
      // console.log('跳转页面');
    },
  },

  mounted() {
    this.createFingerprint()
    this.setWin()
    this.imgListen()
    this.startRotate()
    this.getQuery(this.$route.query)
    this.dealSearchParm()
    setTimeout(() => {
      this.getSearch()
    }, 600);
  },
  created() { },
}
</script>
<style lang="less" >
.el-drawer__container {
  position: relative; 
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.el-drawer__body {
  height: 10%;
}

.kf_tel {
  height: 30%;
  width: 100%;
  font-size: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  /*使子项目水平居中*/
  align-items: center;

  a {
    color: #5e8df7;

  }
}

.kf_bt {
  bottom: 0;
  position: absolute;
  height: 15%;
  width: 13%;

  img {
    height: 100%;
  }
}



.prize_img_box {
  // transition: 2s all ease .1s;
  transition-duration: 2s;
  height: 1%;
  width: 1%;
  position: relative;
  display: flex;
  justify-content: center;
  /*使子项目水平居中*/
  align-items: center;

  /*使子项目垂直居中*/
  // &:hover {
  //   // transform: scale(100);
  //   width: 100%;
  //   height: 100%;
  // }
}

.pirze-img {
  position: absolute;
  z-index: 1;
  width: 76%;
  height: 29%;
  border-radius: 10px;
  border: 2px solid white;
}

.prize_ling {
  position: absolute;
  width: 25%;
  z-index: 2;
  bottom: 17%;
}

.prize_bg {
  position: absolute;
  width: 90%;
  z-index: 0;
}

.el-message {
  min-width: 30%;
}

//去掉通知的iocn图标
.el-icon-info:before {
  content: "";
}

.onlyread {
  pointer-events: none;
}

.chuizi {
  transform: rotate(30deg);
  transform-origin: right bottom; //旋转中心
  position: absolute;
  right: -3%;
  width: 60%;
  height: 40%;
  z-index: 9;
}

.guanbi {
  position: absolute;
  top: 15%;
  right: 8%;
  width: 6%;
  z-index: 1;

  img {
    width: 100%;
  }
}

.e1 {
  transform: rotate(-8deg);
}

.e2 {
  transform: rotate(8deg);
}

.egg-box {
  position: absolute;
  bottom: 0;
  height: 28%;
  width: 100%;
}

.img-box {
  height: 100%;
  width: 22%;
  margin: 5.5%;
  display: flex;
  justify-content: center;
  /*使子项目水平居中*/
  float: left;
  position: relative;
}

.rotate-egg {
  width: 100%;
  bottom: 0;
  position: absolute;
}

// 旋转图片
.figure {
  position: absolute;
  z-index: 0; //层级
  width: 100%;
  animation: 0ms;
  -webkit-animation: rotateImg 3s linear infinite;
  vertical-align: middle;
}

@keyframes rotateImg {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotateImg {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

.popContainer {
  position: absolute;
  display: flex;
  justify-content: center;
  /*使子项目水平居中*/
  align-items: center;
  /*使子项目垂直居中*/
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.prize-box {
  position: absolute;
  bottom: 2%;
  right: 2%;
  height: 10%;
  font-size: 1.5rem;
  color: #cd5642;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid;

  img {
    height: 100%;
  }
}

.guize-close {
  height: 2.5rem;
  width: 2.5rem;
  position: absolute;
  top: 5%;
  right: 6%;
}

.guize-text {
  position: relative;
  height: 70%;
  width: 76%;
  top: 29%;
  margin: auto;
  box-sizing: border-box;

}

.text-box {
  height: 100%;
  width: 100%;
  overflow: auto;
  font-size: 1rem;
  line-height: 2.1rem;
  overflow-y: scroll;
  height: calc(100%);
  padding-right: 3%;
}

.guize-title {
  position: absolute;
  width: 100%;
  top: 14%;
  text-align: center;
  font-size: 2.5rem;
  color: #f8e4b4;
}

.el-dialog__header {
  padding: 0;
}

.el-dialog__body {
  padding: 0;
}

.guize-box {
  margin: auto;
  height: 44rem;
  background-image: url(../../public/imgs/guizebg2.jpg);
  background-size: 100% 100%;
}

.guize {
  position: absolute;
  top: 2%;
  left: 1%;
  height: 12%;

  img {
    height: 100%;
  }
}

.dia-box {
  position: relative;
  height: 65%;
  width: 100%;
  // text-align: center;
  display: flex;
  justify-content: center;
  /*使子项目水平居中*/
  align-items: center;
  /*使子项目垂直居中*/

}



.el-dialog {
  top: 20%;
  background-color: rgb(0 0 0 / 0%);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .0);

}

.prizeFont {
  position: absolute;
  bottom: 20%;
  width: 100%;
  text-align: center;
  color: #f6dfb2;
  font-size: 3rem;
  font-weight: bold;
}

//取消超链接的下划线
a {
  text-decoration: none
}

#footer {
  height: 7%;
  width: 100%;
  position: absolute;
  bottom: 2%;
  text-align: center;
  color: #d96841;
  font-size: 13px;
}

.el-message-box {
  display: inline-block;
  width: 80%;
  padding-bottom: 0;
  vertical-align: middle;
  background-color: rgb(0 0 0 / 0%);
  border-radius: 0;
  border: 0px solid #EBEEF5;
  font-size: 18px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .0);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}

.fixed-box {
  position: relative;
  top: 50%;
  left: 55%;
  width: 6rem;
  height: 7rem;
  transform-origin: right bottom;

  img {
    width: 100%;
    height: 100%;
  }

  .r1 {
    transform: rotate(-8deg);
  }

  .r2 {
    transform: rotate(8deg);
  }
}

.luckyBox {
  width: 100%;
  height: 46%;
  position: relative;
}

#luckyWheel {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.headBox {
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  height: 27%;
  position: relative;
}

.main {
  background-image: url(../assets/tray.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

body {
  background-color: #f8e4b4;
}
</style>
  