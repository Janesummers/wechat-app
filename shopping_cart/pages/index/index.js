//index.js
//获取应用实例
const app = getApp()
var shopping_cart_list = []
var list = [
  {
    id: 1,
    name: '菊花茶',
    price: 1
  },
  {
    id: 2,
    name: '奶茶',
    price: 4
  },
  {
    id: 3,
    name: '牙刷',
    price: 3
  },
  {
    id: 4,
    name: '牙膏',
    price: 4
  },
  {
    id: 5,
    name: '牙杯',
    price: 2
  }
]
Page({
  data: {
    list: list ? list : [],
    shopping_cart_list: [],
    list_show: true
  },
  //事件处理函数
  onLoad: function () {
  },
  add(e){
    var goodsData = e.target.dataset.goodsdata
    var length = shopping_cart_list.length
    for (var i = 0; i < length;i++){
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
  }
})
