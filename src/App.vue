<template>
   <div class="container" id="container">
    <div class="card" id="card">
         <div class="header">
          <div class="header-left"> 
            <h4>姓&nbsp;名: 张龙飞</h4>
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
          <span>广州市睿志信息科技有限公司</span>
         </div>
         </div>
         <div class="header-body">
         <div class="header-body-left">
          <p v-for="itemInfo in userInfo" :key="itemInfo.userName" @click="copy(itemInfo.userName,itemInfo.userValue)">
          <span >{{itemInfo.userName}}: &nbsp;</span>
          <span id="tel">{{itemInfo.userValue}}</span> 
          &nbsp;<i class="iconfont common-icon" v-html="itemInfo.userIcon"></i></p>
         </div>
          <div class="header-body-right">      
         </div>
          </div>
          <div class="header-footer">
         </div>
              <div class="header-footer-img" @touchstart.stop.prevent="createQrCode" @click.stop.prevent="createQrCode">
             <div class="header-footer-img-qrcode" id="qrcode" >
             </div>
             </div>
    </div>
    <div class="hr">
      <div class="innnerhr">
         <div class="innnerhr-left">
             <div class="innnerhr-left-abosolute">
    </div>
    </div>
     <div class="innnerhr-right">
             <div class="innnerhr-right-abosolute">
               </div>
    </div>
    </div>
    </div>
    <!-- <div class="body1">
      <div class="body-x">高新区简介</div>
      <div class="body-y">内容</div>
      <div class="body-z"><a href="void:0">查看更多</a>&nbsp;&gt;</div>
     </div> -->
      <van-cell class="course-details">
        <van-tabs scrollspy sticky>
       <van-tab title="详情">
        <div >
           <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
            <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
            <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div>
        </div>
        </div>
        </div>
       </van-tab>
       <van-tab title="内容">
        <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div> <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div> <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div> <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div> <div class="header-right">
           <div class="round">
            <img src="@/assets/logo.png" alt="加载失败">
           </div>
        </div>
       </van-tab>
       </van-tabs>
       </van-cell>
    </div>
      <div class="footer" v-show="shown">
      <div class="footer-x">
        <a  @touchstart="longTimeTouch(e)" id="down">发名片</a><span class="out-box"><span class="inner-box"></span></span>
      </div>
    </div>
</template>
 <script>
import html2canvas from 'html2canvas'
import  QRCode  from 'qrcodejs2'
// import Clipboard from 'clipboard';
   export default {
     name: 'App',
     data() {
      return {
        Loop: null,
        userInfo:[
         {userName:'电话',userValue: '13422098792',userIcon:"&#xe60d;"},
         {userName:'邮箱',userValue: 'syiao8848@163.com',userIcon:"&#xe60d;"},
         {userName:'网址',userValue: 'www.reizinfo.com',userIcon:"&#xe60d;"},
         {userName:'地址',userValue: '广州市海珠区蚝壳洲东街11号自编2号楼2楼B19(仅限办公)',userIcon:"&#xe60d;"},
        ],
        shown:true
      }
     },
   mounted() {
        this.createQrCode();
        this.wacthTop()
     },
     methods:{
      toucherqrcode() {
        this.$imagepreview(
  );
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
        let qrcode= document.getElementById('qrcode')
         new QRCode(qrcode,{
          text: 'http://192.168.5.12:8080/#/',
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.H,//容错率，L/M/H,
          // width:'80',
          // height:'80'
        });
        },
      longTimeTouch() {
       html2canvas(document.querySelector("#card"),{
       allowTaint: true,
       scale: window.devicePixelRatio,  //像素比
       useCORS: true,  
       color:'#fffff',  //允许服务器图片
       backgroundColor: "#FFFFF",
       logging: false,
       }).then(canvas => {
        const myBlob =this.dataURLtoBlob(canvas.toDataURL('img/png', 0.92)) // canvas转base64 转 blob
        const myUrl = URL.createObjectURL(myBlob)  // blob转URL对象
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
  let a = document.createElement("a")

  let clickEvent = document.createEvent("MouseEvents");

  a.setAttribute("href", url)


  a.setAttribute("download", 'codeImg')

  a.setAttribute("target", '_blank')

  clickEvent.initEvent('click', true, true)

  a.dispatchEvent(clickEvent);
 return url
},
async copy(name,value) {
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
h4,p {
  margin: 0;
  padding:0;
}
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  /* bottom:200px; */
  left: 0;
  box-sizing: border-box;
  padding: 15px;
  background-color: #F6F6F6;
}
.container .card {
  width: 100%;
  background-color: #114B7B;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
} 
.container .card .header {
  display: flex;
  padding: 15px 20px 0px 20px;
}
.container .card  .header .header-left {
  flex: 1;
  width: 100%;
}
.container .card .header .header-left h4{
   color:#E0C45A;
   font-size: 18px;
  padding-bottom: 2px;
  transform: scale(0.8,1.1);
  transform-origin: left;
}
.container .card .header .header-left span.spacil{
   border-bottom:1px solid #F6F6F6;
   padding-bottom: 1px;
   font-size: 12px;
   transform: scale(0.8,0.9);
   display: inline-block;
   transform-origin:left;
    color: #F6F6F6;
}
.card  .header .header-right { 
  /* display: inline-block; */ 
  box-sizing: border-box;      
  width: 50px;                 
  height: 50px;                
  display: flex;
  /* justify-content: flex-end; */
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
  padding: 8px 15px 10px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.card .header-body-add .header-body-add-conpany-name {
   font-size: 20px;
   color: #F6F6F6;
   transform: scale(0.7,0.8);
  transform-origin: right;

}
.card .header-body {
  font-size: 16px;
  padding: 5px 0px 12px 20px;
  color: #F6F6F6;
}
.card  .header-body .header-body-left{
   transform: scale(0.7,0.8);
   transform-origin:left;
   color: #ffff;
}
.card  .header-body .header-body-left{
   transform: scale(0.7,0.8);
   transform-origin:left;
   color: #ffff;
}

.card  .header-footer {
  padding: 0px 10px 20px 18px;
  display: flex;
}
.card  .header-footer span{
   border-radius: 30px;
   padding: 10px 25px;
   text-align: center;
   display: inline-block;
   color: #ffff;
   background-color: #2D7DBC;
   transform: scale(0.7,0.8);
   display: inline-block;
   transform-origin:left;
   flex-shrink: 0;
   flex-grow: 1;
   flex-basis: 20%;
}
/* .card  .header-footer span:nth-child(4) {
  opacity: 0;
} */
.container .hr {
  width : 100%;
  height: 62px;
  position: relative;
}
.container .hr .innnerhr {
   background-color: #F6F6F6;
   width : 100%;
   height: 100%;
   display: flex;
} 
.container .hr .innnerhr .innnerhr-left {
   background-color: #F6F6F6;
   width : 50%;
   height: 100%;
}
.container .hr .innnerhr .innnerhr-right {
   display: inline-block;
   background-color: #F6F6F6;
   width : 50%;
   height: 100%;
}
 .container .hr .innnerhr .innnerhr-left .innnerhr-left-abosolute {
 position: absolute;
 left: -10px;
 width: 100%;
 height: 100%;
 top: 0;
 background-color: #F6F6F6;
 }
  .container .hr .innnerhr .innnerhr-right .innnerhr-right-abosolute {
 position: absolute;
 right: -10px;
 width: 100%;
 height: 100%;
 background-color: #F6F6F6;
 top: 0px;
 }
.card .header-footer-img {
  position: absolute;
  bottom: 40px;
  right: 10px;
  width: 80px;
  height: 80px;
  background-color: #ffff;
}
.card .header-footer-img .header-footer-img-qrcode canvas{
  width: 80px;
  height: 80px;
}
.card .header-footer-img .header-footer-img-qrcode img{
  width: 100%;
  height:100%;
}
.body1 {
  display: flex;
  display: flex;
  flex-direction: column;
  color:#9E9E9E;
}
.body-x {
  flex: 1;
  background-color:  rgb(245, 252, 252);
  padding: 20px ;
}
.body-y {
  flex: 1;
  background-color:  rgb(245, 252, 252);
  height: 100px;
   padding: 20px ;
   text-indent: 110px;
}
.body-z {
  flex: 1;
  background-color: rgb(245, 252, 252);
  height: 100px;
  padding: 20px ;
  text-align: center;
  color: #3880B4;
}
.body-z a {
 text-decoration: none;
}
 .body-z a:active {
  color: #114B7B;
 }
.footer {
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* background-color: rgb(243, 39, 39); */
  /* background-color: #114B7B; */

}
.footer .footer-x {
  width: 50px;
  height: 20px;
  padding: 15px 40px;
  border-radius: 50px;
  background-color: #114B7B;
  display: flex;
  margin: 0px 20px;
  justify-content:center;
  align-items: center;
  z-index: 1000;
}
.footer .footer-x a {
  text-decoration: none;
  color: #ffff;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: 30px;
  background-color: #114B7B;
}
.footer .footer-x a .out-box  {
  width: 10px;
  height: 10px;
  background-color: #E0C45A;
  position:relative;
  margin-left: -3px;
  border: 0.2px solid rgb(0,0,0,0.2);
  margin-bottom: -9px;
}
.footer .footer-x a .out-box .inner-box {
  width: 5px;
  height: 5px;
  background-color: #5ae077;
  position: absolute;
  right:-0.2px;
  top: -0.2px;
  margin-left: 1px;
  margin-bottom: 1px;
  border: 0px solid #ffff;
  border-left: 1px solid #ffff;
  border-bottom: 1px solid #ffff;
  z-index: 10px;
  border-radius: 1px;
}
</style> 
