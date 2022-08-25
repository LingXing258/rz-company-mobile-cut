<template>
      <div class="container">
      <div class="card-box">
      <div class="card" ref="card">
         <div class="header">
          <div class="header-left"> 
            <h4>{{name}}</h4>
            <span class="spacil">职位: {{position}}</span>
         </div>
          <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div>
         </div>
         <div class="header-body">
         <div class="header-body-top">
         <div class="header-body-top-conpanyname">
               {{companyName}}
         </div>
         </div>
         <div class="header-body-bottom">
         <div v-for="itemInfo in userInfo" :key="itemInfo.userName" class="header-body-bottom_item">
          <span  class="iconfont common-icon" v-html="itemInfo.userIcon"></span>&nbsp;<p class="userValue">{{itemInfo.userValue}}</p></div>
         </div>
          <div class="header-body-right">      
         </div>
          </div>
          <div class="header-footer">
              <div class="header-footer-img"  ref="getimg" @touchend="toucherQrcode">
             <div class="header-footer-img-qrcode" ref="qrcode">
             </div>
          </div>
         </div>
     </div>
     </div>
    <div class="hr">
    </div>
    <div class="x-scrllo-box">
    <div class="x-scrllo-box-inner">  
      <div class="x-scrllo-box-inner-item" v-for="itemInfo in userInfo" :key="itemInfo.userName" @click="copy(itemInfo.userName,itemInfo.userValue)" ref="item">
      <div class="content-top"><i class="iconfont" v-html="itemInfo.userIcon"></i><div >{{itemInfo.userName}}&nbsp;</div></div>
       <div class="content-bottom">{{itemInfo.userValue}}</div>
      </div> 
      </div>
    </div> 
    <div class=" hr-second"></div>
     <div class="footer-box"  @touchstart="touchOpenSaveImg" id="down">
      <div class="footer-box-buttom" >
        <a>保存名片</a><i class="iconfont">&#xe8b0;</i>
      </div>
    </div>
    </div>
</template>
 <script>
import html2canvas from 'html2canvas'
import  QRCode  from 'qrcodejs2'
import { ImagePreview } from "vant";
import { Toast } from 'vant';
   export default {
     name: 'App',
     data() {
      return {
        name:'张龙飞',
        position:'总经理',
        companyName:'广州市睿志信息科技有限公司',
        headerPicture:'',
        userUrl:'http://192.168.5.16:8080/#/',
        userInfo:[
         {userName:'联系电话',userValue: '134 220 987 92',userIcon:"&#x100bd;"},
         {userName:'网址',userValue: 'www.reizinfo.com',userIcon:"&#xe61f;"},
         {userName:'邮箱',userValue: 'syiao8848@163.com',userIcon:"&#xe687;"},
         {userName:'地址',userValue: '广州市海珠区蚝壳洲东街11号自编2号楼2楼B19(仅限办公)',userIcon:"&#xe624;" },
        ],
        imgurl:'',
        imglist:[],
        cardSrc:'',
        cardList:[],
      }
     },
     mounted() {
        this.createQrCode();
     },
     methods:{
       touchCardDown() {
        this.cardList = [];
         this.cardList.push(this.cardSrc);
         console.log(this.cardList,1);
         ImagePreview({
          images:this.cardList,
          showIndicators:false,
          showIndex:false,
          closeable:true,
          closeIconPosition:'top-right',
         }
         )
      },
      toucherQrcode() {
         this.preventEventDoing=true;
         this.imglist = [];
         this.imglist.push(this.src);
         console.log(this.imglist);
         ImagePreview({
          images:this.imglist,
          showIndicators:false,
          showIndex:false,
          closeable:true,
          closeIconPosition:'top-right',
          onClose:this.clearArr,
         }
         )
      },
      createQrCode(){
        const userurl=this.userUrl
        let qrcodeConfig={
          text: userurl,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          width:50,
          height:50,
          correctLevel: QRCode.CorrectLevel.H,//容错率，L/M/H,
        }
        let qrcode = new QRCode(this.$refs.qrcode,qrcodeConfig);
        this.src = qrcode._oDrawing._elCanvas.toDataURL("image/png");
        },
      touchOpenSaveImg() {
       html2canvas(this.$refs.card,{
       allowTaint: true,
       scale: window.devicePixelRatio,  //像素比
       useCORS: true,  
        dpi: 300,
       color:'#fffff',  //允许服务器图片
       backgroundColor: "#FFFFF",
       logging: false,
       width: this.$refs.card.offsetWidth, //设置canvas尺寸与所截图尺寸相同，防止白边
       height:this.$refs.card.offsetHeight //防止白边
       }).then(canvas => {
        this.cardList=[]
        this.preventEventDoing=false
        const Base64 = canvas.toDataURL('img/png')
        this.cardSrc = Base64 
        this.cardList.push(this.cardSrc)
       ImagePreview({
          images:this.cardList,
          showIndicators:false,
          showIndex:false,
          closeable:true,
          closeIconPosition:'top-right',
         }
         )
         Toast.setDefaultOptions({ duration: 2000 ,position:'bottom'});
         this.$toast('长按保存或分享')
         setTimeout(function(){
          Toast.resetDefaultOptions({duration:500,position:'top'});
         },0)
       
});
      },
     async copy(name,value) {
    this.show=true;
    try {
     await this.$dialog.confirm({ title: name, message: value })
        const success  = await this.$copyText(value)
        if(success) {
           this.$toast.success('复制成功')
        }else {
            this.$toast('复制失败')
        }
    }catch(e){
    console.log(e)
    }
  }
}
     }
 </script>
<style>
html,h4,p {
  margin: 0;
  padding:0;
}
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  background-color: #f3eeee;
}
.container .card-box {
   padding: 8px;
   position: relative;
  background-color: #FFFFFF;
}
.container .card-box::after{
  position: absolute;
  content: '';
  display: block;
  background-color:  rgba(0, 0, 0, 0.1);
    /* background-color:  rgba(0, 0, 0, 0.1); */
  left:0px;
  right:0px;
  bottom: -19px;
  height: 1px;
 }
 .container .card-box .card {
  width: 100%;
  background-image: url(../../assets/back.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid rgba(0,0,0,0.7);
  overflow: hidden;
} 
.container .card-box .card .header {
  display: flex;
  padding: 18px 23px 0px 20px;
}
.container .card-box .card .header .header-left {
  flex: 1;
  width: 100%;
  padding-top: 6px;
}
.container .card-box .card .header .header-left h4{
   /* color:rgba(0,0,0,0.7); */
   color:#FAFAFA;
   font-size: 20px;
  padding-bottom: 2px;
  /* transform: scale(0.8,1.0); */
  transform-origin: left;
}
.container .card-box .card .header .header-left span.spacil{

   padding-bottom: 1px;
   font-size: 12px;
   transform: scale(0.8,0.9);
   display: inline-block;
   transform-origin:left;
    color:#FAFAFA;
}
.container .card-box .card .header .header-right { 
  box-sizing: border-box;      
  width: 55px;                 
  height: 55px;                
  display: flex;
}
.container .card-box .card .header .header-right .round  {
  border-radius: 50%;
  width: 100%;
  height: 100%;
 background-color: #F6F6F6;
}
.container .card-box .card .header .header-right .round img {
 height: 100%;
  transform: scale(0.7,0.7);
  transform-origin: center;
}
.container .card-box .card .header-body {
  font-size: 20px;
  padding: 5px 0px 12px 20px;
  color: #F6F6F6;
}
.container .card-box .card .header-body-top {
  box-sizing: border-box;
  padding: 8px 30px 0px 45px;
  /* display: flex; */
  justify-content: flex-end;
  align-items: center;
  margin-bottom: -9px;
}
.container .card .header-body .header-body-top .header-body-top-conpanyname {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space:nowrap;
   width: 100%;
   display: block;
   font-size: 20px;
   color: #F6F6F6;
   transform: scale(0.6,0.7);
  transform-origin: right;
}
.container .card .header-body .header-body-bottom {
  width: 160%;
}
.container .card .header-body .header-body-bottom .header-body-bottom_item {
   transform: scale(0.4,0.5);
   transform-origin:left;
   color: #ffff;
   display: flex;
   align-items: center;
   margin: -10px 0px;
}
.container .card .header-body .header-body-bottom .header-body-bottom_item .userValue {
   /* width: 100%; */
    transform: scale(1.1,1);
    text-indent:0px;
    transform-origin:left;
}
.container .card .header-body .header-body-bottom .header-body-bottom_item :first-child{
  padding: 0 0 1.5px 0;
}
.container .card .header-body .header-body-bottom .header-body-bottom_item :last-child .userValue{
   transform: scale(1,1);
   text-indent:0px;
}
.container .card .header-footer {
  padding: 0px 10px 20px 18px;
  display: flex;
}
.container .card .header-footer-img {
  position: absolute;
  bottom: 20px;
  right: 25px;
  width: 50px;
  height: 50px;
  background-color: #ffff;
}
.container .card .header-footer-img .header-footer-img-qrcode canvas{
  width: 50px;
  height: 50px;
}
.container .card .header-footer-img .header-footer-img-qrcode img{
  width: 100%;
  height:100%;
}
.container .hr {
  width: 100%;
  height: 10px;
}
 .x-scrllo-box {
   position: relative;
   height: 100px;
   width: 100%;
   overflow-x: auto;
   background-color: #FFFFFF;
 }
.x-scrllo-box  .x-scrllo-box-inner{
   box-sizing: border-box;
   padding: 10px 10px 0 10px;
   width: 150%;
   border: 0px;
     }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item {
   float: left;
   width: 23%;
   box-sizing: border-box;
   /* background-color: #e0925a; */
   margin-right: 10px;
   border-radius:6px;
   display: flex;
   flex-direction: column;
   padding: 12px 5px 16px 10px;
   -moz-box-shadow:1px 2px 8px rgba(0,0,0,0.7);
   -webkit-box-shadow:1px 2px 8px rgba(0,0,0,0.7);
   box-shadow:1px 1px 4px rgba(0,0,0,0.4);
   background-color: #ffff;
     }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:last-child{
     margin-right: 0px;
     }
.x-scrllo-box::-webkit-scrollbar {
      width: 0 !important
     }
 .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item .content-top{
       display: flex;
       flex-direction: row;
       padding-bottom: 6px;
       align-items: center;
       }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item .content-top div {
         margin-left: 5px;
         }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(1) i{
color: rgb(35, 126, 223);
 }
   .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(2) i{
    color: rgb(240, 96, 19);
 }
   .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(3) i{
color: rgb(77, 42, 165);
 }  .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(4) i{
  color: rgb(40, 109, 58);
 }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item .content-bottom {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
      color: rgba(0, 0, 0, 0.8);
   }
.footer-box {
  height: 70px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* background-color: #FFFFFF; */
}
.footer-box .footer-box-buttom {
  width: 100%;
  height: 18px;
  padding: 15px 40px;
  border-radius: 50px;
  background-color: rgba(16, 31, 236, 0.914);
  margin: 0px auto;
  justify-content:center;
  align-items: center;
  display: flex;
}
.footer-box .footer-box-buttom a {
  color: #ffffff;
}
.footer-box .footer-box-buttom i {
  color: #FFFFFF;
  margin-right: 3px;
}
</style> 
