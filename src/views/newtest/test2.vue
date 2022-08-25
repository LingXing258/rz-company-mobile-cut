<template>
   <div class="container" id="container">
     <div class="card_inner">
    <div class="card" id="card" ref="card" @touchend="touchCardDown">
         <div class="header">
          <div class="header-left"> 
            <h4>张龙飞</h4>
            <span class="spacil">职位: 总经理</span>
         </div>
          <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div>
         </div>
         <div class="header-body-add">
         <div class="header-body-add-conpany-name">
                  广州市睿志信息科技有限公司
         </div>
         </div>
         <div class="header-body">
         <div class="header-body-left">
         <div v-for="itemInfo in userInfo" :key="itemInfo.userName" class="header-body-left_item">
          <span  class="iconfont common-icon" v-html="itemInfo.userIcon"></span>&nbsp;<p class="userValue">{{itemInfo.userValue}}</p></div>
         </div>
          <div class="header-body-right">      
         </div>
          </div>
          <div class="header-footer">
              <div class="header-footer-img"  ref="getimg" @touchend="toucherQrcode">
             <div class="header-footer-img-qrcode" id="qrcode">
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
     <div class="footer-box" v-show="shown" @touchstart="longTimeTouch" id="down">
      <div class="footer-box-buttom" >
        <a>下载</a><i class="iconfont">&#xe8b0;</i>
      </div>
    </div>
    </div>
</template>
 <script>
import html2canvas from 'html2canvas'
import  QRCode  from 'qrcodejs2'
import { ImagePreview } from "vant";
import eruda from 'eruda'
   export default {
     name: 'App',
     data() {
      return {
        Loop: null,
        userInfo:[
         {userName:'联系电话',userValue: '134 220 987 92',userIcon:"&#x100bd;"},
         {userName:'网址',userValue: 'www.reizinfo.com',userIcon:"&#xe61f;"},
         {userName:'邮箱',userValue: 'syiao8848@163.com',userIcon:"&#xe687;"},
         {userName:'地址',userValue: '广州市海珠区蚝壳洲东街11号自编2号楼2楼B19(仅限办公)',userIcon:"&#xe624;" },
        ],
        shown:true,
        show:false,
        imgurl:'',
        preventEventDoing:'false',
        imglist:[],
        src:'',
        cardList:[],
        cardSrc:'',
       
      }
     },
   mounted() {
        this.createQrCode();
        this.wacthTop();
        this.init();
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
      init() {
          eruda.init()   
      },
      companyName(e){
       console.log(e)
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
      wacthTop() {
         window.addEventListener('scroll',this.handleScrolly)
      },
     handleScrolly() {
         let step = window.pageYOffset;
         if(step>120) {
         this.shown = false
         }else {
          this.shown = true
         }
     },
       createQrCode(){
        let el = document.getElementById('qrcode')
        let qrcode = new QRCode(el,{
          text: 'http://192.168.5.16:8080/#/',
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          width:50,
          height:50,
          correctLevel: QRCode.CorrectLevel.H,//容错率，L/M/H,
        });
        this.src = qrcode._oDrawing._elCanvas.toDataURL("image/png");
        },
      longTimeTouch() {
       html2canvas(document.querySelector("#card"),{
       allowTaint: true,
       scale: window.devicePixelRatio,  //像素比
       useCORS: true,  
        dpi: 300,
       color:'#fffff',  //允许服务器图片
       backgroundColor: "#FFFFF",
       logging: false,
       width: document.querySelector("#card").offsetWidth, //设置canvas尺寸与所截图尺寸相同，防止白边
       height: document.querySelector("#card").offsetHeight //防止白边
       }).then(canvas => {
        this.preventEventDoing=false
        const Base64 = canvas.toDataURL('img/png')
        const myBlob =this.dataURLtoBlob(canvas.toDataURL('img/png')) // canvas转base64 转 blob
        const myUrl = URL.createObjectURL(myBlob)  // blob转URL对象
        this.cardSrc = Base64
        console.log(this.cardSrc)
        this.downImg(myUrl)  // 创建a标签，下载图片
});
      },
  convertCanvasToImg(canvas) {
  // canvas转base64 转 blob

  let myBlob = this.dataURLtoBlob(canvas.toDataURL('img/png', 0.92))
 
  // blob转URL对象

  let myUrl = URL.createObjectURL(myBlob)
  // 创建a标签，下载图片 D:\Installation_Path\node-v16.16.0-win-x64.zip\node-v16.16.0-win-x64
   this.downImg(myUrl)
},
  dataURLtoBlob(dataurl) {

    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],

     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while (n--) {

     u8arr[n] = bstr.charCodeAt(n);

  }

  return new Blob([u8arr], { type: mime });

},
 downImg(url){

  // 创建a标签 并设置其相关属性，最后触发其点击事件
  // let b= document.getElementById('img')
  // b.src=url;
   const timestamp = Date.now().toString();
   if(this.preventEventDoing){
    return
   }
  let a = document.createElement("a")

  // let clickEvent = document.createEvent("MouseEvents");
  
  let clickEvent = document.createEvent("MouseEvents");
  a.setAttribute("href", url)
  a.setAttribute('id','aId')
  a.setAttribute("download", `${timestamp}.png`)

  a.setAttribute("target", '_blank')

  clickEvent.initEvent('click', true, true)

  a.dispatchEvent(clickEvent);
  let b =document.getElementById('aId')
  console.log(b)
},
    // 这个方法会将渲染好的图片在新页面打开。
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
.container .hr {
  width: 100%;
  height: 10px;
}
.container .card_inner {
   padding: 8px;
   position: relative;
  background-color: #FFFFFF;
}
.container .card_inner::after{
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
.container .card {
  width: 100%;
  background-image: url(./assets/back.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid rgba(0,0,0,0.7);
  overflow: hidden;
} 

.container .card .header {
  display: flex;
  padding: 18px 23px 0px 20px;
}
.container .card  .header .header-left {
  flex: 1;
  width: 100%;
  padding-top: 6px;
}
.container .card .header .header-left h4{
   /* color:rgba(0,0,0,0.7); */
   color:#FAFAFA;
   font-size: 20px;
  padding-bottom: 2px;
  /* transform: scale(0.8,1.0); */
  transform-origin: left;
}
.container .card .header .header-left span.spacil{

   padding-bottom: 1px;
   font-size: 12px;
   transform: scale(0.8,0.9);
   display: inline-block;
   transform-origin:left;
    color:#FAFAFA;
}
.card  .header .header-right { 
  box-sizing: border-box;      
  width: 55px;                 
  height: 55px;                
  display: flex;
}
.card .header .header-right .round  {
  border-radius: 50%;
  width: 100%;
  height: 100%;
 background-color: #F6F6F6;
}
.card .header .header-right .round img {
 height: 100%;
  transform: scale(0.7,0.7);
  transform-origin: center;
}
.card .header-body-add {
  box-sizing: border-box;
  padding: 8px 30px 0px 45px;
  /* display: flex; */
  justify-content: flex-end;
  align-items: center;
  margin-bottom: -9px;
}
.card .header-body-add .header-body-add-conpany-name {
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
.card .header-body {
  font-size: 20px;
  padding: 5px 0px 12px 20px;
  color: #F6F6F6;
}
.card  .header-body .header-body-left .header-body-left_item{
   transform: scale(0.4,0.5);
   transform-origin:left;
   color: #ffff;
   display: flex;
   align-items: center;
   margin: -10px 0px;
}
.container .card .header-body .header-body-left {
  width: 160%;
}
.container .card .header-body .header-body-left .header-body-left_item .userValue {
   /* width: 100%; */
    transform: scale(1.1,1);
    text-indent:0px;
    transform-origin:left;
}
.card  .header-body .header-body-left .header-body-left_item:first-child{
  padding: 0 0 1.5px 0;
}
.card  .header-body .header-body-left .header-body-left_item:last-child .userValue{
   transform: scale(1,1);
   text-indent:0px;
}
.card  .header-footer {
  padding: 0px 10px 20px 18px;
  display: flex;
}
.card .header-footer-img {
  position: absolute;
  bottom: 20px;
  right: 25px;
  width: 50px;
  height: 50px;
  background-color: #ffff;
}
.card .header-footer-img .header-footer-img-qrcode canvas{
  width: 50px;
  height: 50px;
}
.card .header-footer-img .header-footer-img-qrcode img{
  width: 100%;
  height:100%;
}
 .x-scrllo-box {
   position: relative;
   height: 100px;
   width: 100%;
   overflow-x: auto;
   background-color: #FFFFFF;
 }
 .container .hr-second {
  position: relative;
  width: 100%;
  height: 0px;
  background-color: #f3eeee;
}
 .container .hr-second::after{
  content: '';
  display: block;
  position: absolute;
  top:0; 
  height: 100%;
  left:0;
  right: 0;
  background-color: #f3eeee;
}
   .x-scrllo-box  .x-scrllo-box-inner{
   box-sizing: border-box;
   padding: 10px 10px 0 10px;
   width: 150%;
   border: 0px;
     }
   .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item {
  /* box-sizing: border-box; */
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
