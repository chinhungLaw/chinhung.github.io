// 主流程
(function(){

window.onload = function(){
    game.init();
}

var game = window.game = {
    width: 0,
    height: 0,
    canvasId: 'canvas',
    asset: null,
    stage: null,
    ticker: null,
    state: null,
    orientation: null,  // 横竖屏 横屏:0 竖屏:1
    scrollData: {},
    init: function(){
        this.asset = new game.Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStage();
        }.bind(this));
        this.asset.load();
    },

    initStage: function(){
        var This = this;

        this.width = 750; // 设计稿宽度
        this.height = 1334; // 设计稿高度
        this.scale =  window.innerWidth / this.width;
        console.log(this.scale );
        //舞台
        this.stage = new Hilo.Stage({
            renderType: 'canvas',
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        });
        this.stage.canvas.id = this.canvasId;
        $('.box').append(this.stage.canvas);
        //启动计时器
        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(Hilo.Tween);
        this.ticker.addTick(this.stage);
        this.ticker.start();

        //绑定交互事件
        this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
        this.stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true);
        this.stage.enableDOMEvent(Hilo.event.POINTER_END, true);

        //舞台更新
        this.stage.onUpdate = this.onUpdate.bind(this);

        // 各组件初始化
        this.initScene();

    },
    initScene: function(){
        //准备场景
        this.bgScene = new game.bgScene({
            width: this.width,
            height: this.height,
            image: this.asset,
            //visible: false,
        }).addTo(this.stage);
        this.readyScene = new game.readyScene({
            width: this.width,
            height: this.height,
            image: this.asset,
            //visible: false,
        }).addTo(this.stage);

        this.searchScene = new game.searchScene({
            width: this.width,
            height: this.height,
            image: this.asset,
           visible: false,
        }).addTo(this.stage);

        this.gameScene = new game.gameScene({
            width: this.width,
            height: this.height,
            image: this.asset,
           visible: false,
        }).addTo(this.stage);

        

        // this.readyScene.next();
        // this.searchScene.next();
    },
    onUpdate: function(delta){
    }


};

})();