// 资源加载
(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,
    bg: null,
    ground: null,
    ready: null,
    over: null,
    numberGlyphs: null,
    birdAtlas: null,
    holdback: null,

    load: function(){
        var resources = [
            {id:'raedybg', src:'images/ready/begin_bg.png'},
            {id:'searchbg', src:'images/search/bg.jpg'},
            {id:'gamebg', src:'images/game/game_bg.png'},
            {id:'searchuser', src:'images/search/user.jpg'},
            {id:'searchtimer', src:'images/search/time.png'},
            {id:'loading', src:'images/search/loading.png'},
            {id:'vsX', src:'images/search/x.png'},
            {id:'vsV', src:'images/search/v.png'},
            {id:'vsS', src:'images/search/s.png'},
            {id:'ready', src:'images/game/ready.png'},
            {id:'go', src:'images/game/go.png'},
            {id:'runbtn', src:'images/game/run.png'},
            {id:'win', src:'images/game/win.png'},
            {id:'lost', src:'images/game/lost.png'},
            {id:'btnbg', src:'images/game/btn_bg.png'},
            {id:'overline', src:'images/game/overline.png'},
            {id:'girl', src:'images/game/girl.png'},
            {id:'stop', src:'images/stop.png'},
            {id:'role1_1', src:'images/role/role12.png'},
            {id:'role1_2', src:'images/role/role13.png'},
            {id:'role1_3', src:'images/role/role1.png'},
            {id:'role1_win1', src:'images/role/role14.png'},
            {id:'role1_win2', src:'images/role/role15.png'},
            {id:'role2_1', src:'images/role2/role2.png'},
            {id:'role2_2', src:'images/role2/role3.png'},
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        for (var i = 0;i<this.queue._source.length;i++){
            var id =this.queue._source[i].id;
            this[id] = this.queue.get(id).content
        }
        this.queue.off('complete');
        this.fire('complete');
    }
});

})(window.game);