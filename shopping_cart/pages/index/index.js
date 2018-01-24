//index.js
//获取应用实例
const app = getApp()
var shopping_cart_list = []
var list = [
    {
        id: 1,
        name: '菊花枸杞茶 组合型花茶清热去火 正宗黄山贡菊花茶养生花草茶礼盒',
        price: 53,
        img: '../img/1.jpg'
    },
    {
        id: 2,
        name: '1kgx2包 三合一速溶奶茶粉冲泡热饮品阿萨姆原味珍珠奶茶店22口味',
        price: 52,
        img: '../img/2.jpg'
    },
    {
        id: 3,
        name: '美国进口佳洁士全优7效软毛牙刷成人家用家庭装情侣男女组合装8支',
        price: 59.9,
        img: '../img/3.jpg'
    },
    {
        id: 4,
        name: '黑人超白竹炭薄荷牙膏牙刷套装880g口腔家庭装去口气清新美白',
        price: 57.9,
        img: '../img/4.jpg'
    },
    {
        id: 5,
        name: '刷牙杯漱口杯简约牙刷杯子情侣洗漱杯家用牙缸杯小麦桔梗水杯套装',
        price: 13.8,
        img: '../img/5.jpg'
    }
];
Page({
  data: {
    list: list ? list : [],
    shopping_cart_list: [],
    list_show: true
  },
  //事件处理函数
  onLoad: function () {
  },
    add: function (e) {
        var goodsData = e.target.dataset.goodsdata
        var length = shopping_cart_list.length
        for (var i = 0; i < length; i++) {
            if (goodsData.id === shopping_cart_list[i].id) {
                shopping_cart_list[i].num += 1
                this.setData({
                    shopping_cart_list: shopping_cart_list
                })
                return false
            }
        }
        goodsData.num = 1
        shopping_cart_list[length] = goodsData
        this.setData({
            shopping_cart_list: shopping_cart_list
        })
    },
  del(e){
    var index = e.target.dataset.id
    shopping_cart_list.splice(index, 1)
    this.setData({
      shopping_cart_list: shopping_cart_list
    })
  },
  show_goods(){
    this.setData({
      list_show: true
    })
  },
  show_shopping_cart() {
    this.setData({
      list_show: false
    })
  },
  decrease (e) {
    var id = e.target.dataset.id
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        if (shopping_cart_list[i].num > 1){
          shopping_cart_list[i].num -= 1
          this.setData({
            shopping_cart_list: shopping_cart_list
          })
          return false
        }
      }
    }
  },
  increase (e) {
    var id = e.target.dataset.id
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        shopping_cart_list[i].num += 1
        this.setData({
          shopping_cart_list: shopping_cart_list
        })
        return false
      }
    }
  },
  change_num (e) {
    var id = e.target.dataset.id
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        shopping_cart_list[i].num = parseInt(e.detail.value)
        this.setData({
          shopping_cart_list: shopping_cart_list
        })
        return false
      }
    }
  }
})
