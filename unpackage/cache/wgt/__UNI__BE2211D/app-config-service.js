
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/index","pages/login/changepwd","pages/login/reg","pages/index/newuser","pages/home/index","pages/home/invites","pages/home/aboutus","pages/home/joinus","pages/home/helpcenter","pages/home/sysmsg","pages/home/accountmanage","pages/home/joinmercal","pages/home/accouts/changeavatar","pages/home/accouts/changename","pages/home/taps/chargestones","pages/home/taps/changebills","pages/home/taps/stonesinput","pages/home/taps/stonesoutput","pages/home/taps/outputbills","pages/home/taps/inputbills","pages/home/taps/teams","pages/home/taps/bills","pages/charge/index","pages/charge/bills"],"window":{"pageOrientation":"portrait","navigationBarTitleText":"xunbaoji","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#F8F8F8","backgroundColorTop":"#F4F5F6","backgroundColorBottom":"#F4F5F6"},"tabBar":{"color":"#929292","selectedColor":"#007aff","borderStyle":"black","backgroundColor":"#353535","list":[{"pagePath":"pages/index/index","iconPath":"static/images/iconindex.png","selectedIconPath":"static/images/iconindexchecked.png","text":"首页"},{"pagePath":"pages/charge/index","iconPath":"static/images/iconmiddle.png","selectedIconPath":"static/images/iconmiddlechecked.png","text":"兑换"},{"pagePath":"pages/home/index","iconPath":"static/images/iconlast.png","selectedIconPath":"static/images/iconlastchecked.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"xun2","compilerVersion":"3.6.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false}},{"path":"/pages/login/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/login/changepwd","meta":{},"window":{"navigationBarTitleText":"忘记密码","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"忘记密码","titleSize":"18px","titleColor":"#FFF","autoBackButton":true}}},{"path":"/pages/login/reg","meta":{},"window":{"navigationBarTitleText":"注册","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"注册","titleSize":"18px","titleColor":"#FFF","autoBackButton":true}}},{"path":"/pages/index/newuser","meta":{},"window":{"navigationBarTitleText":"新手指导","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"新手指导","titleSize":"18px","titleColor":"#FFF","autoBackButton":true}}},{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false}},{"path":"/pages/home/invites","meta":{},"window":{"navigationBarTitleText":"我的邀请函","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"我的邀请函","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/aboutus","meta":{},"window":{"navigationBarTitleText":"关于我们","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"关于我们","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/joinus","meta":{},"window":{"navigationBarTitleText":"加入社群","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"加入社区","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/helpcenter","meta":{},"window":{"navigationBarTitleText":"帮助中心","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"帮助中心","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/sysmsg","meta":{},"window":{"navigationBarTitleText":"系统公告","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"关于晶块转出的规则","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/accountmanage","meta":{},"window":{"navigationBarTitleText":"账户管理","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"账户管理","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/joinmercal","meta":{},"window":{"navigationBarTitleText":"加盟商","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"加盟商","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/accouts/changeavatar","meta":{},"window":{"navigationBarTitleText":"账户管理","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"账户管理","titleSize":"18px","titleColor":"#FFF","autoBackButton":true}}},{"path":"/pages/home/accouts/changename","meta":{},"window":{"navigationBarTitleText":"账户管理","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"修改用户名","titleSize":"18px","titleColor":"#FFF","autoBackButton":true}}},{"path":"/pages/home/taps/chargestones","meta":{},"window":{"navigationBarTitleText":"晶块兑换","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"晶块兑换","titleSize":"18px","titleColor":"#FFF","autoBackButton":true,"buttons":[{"text":"记录","fontSize":"16px","fontWeight":"bold","color":"#54a9f7"}]}}},{"path":"/pages/home/taps/changebills","meta":{},"window":{"navigationBarTitleText":"兑换记录","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"兑换记录","titleColor":"#FFF","titleSize":"18px"}}},{"path":"/pages/home/taps/stonesinput","meta":{},"window":{"navigationBarTitleText":"充币","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"充币","titleColor":"#FFF","titleSize":"18px","autoBackButton":true,"buttons":[{"text":"记录","fontSize":"16px","fontWeight":"bold","color":"#54a9f7"}]}}},{"path":"/pages/home/taps/stonesoutput","meta":{},"window":{"navigationBarTitleText":"提币","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"提币","titleColor":"#FFF","titleSize":"18px","autoBackButton":true,"buttons":[{"text":"记录","fontSize":"16px","fontWeight":"bold","color":"#54a9f7"}]}}},{"path":"/pages/home/taps/outputbills","meta":{},"window":{"navigationBarTitleText":"提币记录","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"提币记录","titleColor":"#FFF","titleSize":"18px"}}},{"path":"/pages/home/taps/inputbills","meta":{},"window":{"navigationBarTitleText":"充币记录","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"充币记录","titleColor":"#FFF","titleSize":"18px"}}},{"path":"/pages/home/taps/teams","meta":{},"window":{"navigationBarTitleText":"水晶转出","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"我的团队","titleColor":"#FFF","titleSize":"18px","autoBackButton":true}}},{"path":"/pages/home/taps/bills","meta":{},"window":{"navigationBarTitleText":"我的账单","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"账单记录","titleSize":"18px","titleColor":"#FFF","autoBackButton":true}}},{"path":"/pages/charge/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"商品兑换","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"商品兑换","titleColor":"#FFF","titleSize":"18px","autoBackButton":true,"buttons":[{"text":"","fontSrc":"/static/uni.ttf","fontSize":"28px","float":"right","color":"#FFFFFF","onclick":"tapRightBtn"}]}}},{"path":"/pages/charge/bills","meta":{},"window":{"navigationBarTitleText":"购买记录","bounce":"vertical","titleNView":{"backgroundColor":"#353535","titleText":"购买记录","titleSize":"18px","titleColor":"#FFF","autoBackButton":true}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
