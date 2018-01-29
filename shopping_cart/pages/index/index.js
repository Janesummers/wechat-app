//index.js
//获取应用实例
const app = getApp()
var shopping_cart_list = []
//浮点数加法运算BUG解决
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
//浮点数剪法运算BUG解决
function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg2 * m - arg1 * m) / m).toFixed(n);
}
//浮点数乘法运算BUG解决
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
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
        price: 13.9,
        img: '../img/5.jpg'
    }
];
// var shopping_cart_list = [
//   {
//     id: 5,
//     name: '刷牙杯漱口杯简约牙刷杯子情侣洗漱杯家用牙缸杯小麦桔梗水杯套装',    
//     price: 13.9,    
//     img: '../img/5.jpg',    
//     num: 1,     
//     checked: false,   
//     total_price: 13.9,
//     editing: true
//   }
// ]
Page({
  data: {
    list: list ? list : [],
    shopping_cart_list: shopping_cart_list ? shopping_cart_list : [],
    list_show: true,
    all_num: 0,
    total_price: 0,
    choose_all: false
  },
  choose_goods(e) {
    var goodsData = e.detail.value
    if (goodsData.length === shopping_cart_list.length){
      this.setData({
        choose_all: true
      })
    }else{
      this.setData({
        choose_all: false
      })
    }
    this.setData({
      all_num: goodsData.length
    })
    var total = 0
    for (var i = 0; i < goodsData.length; i++) {
      for (var j = 0; j < shopping_cart_list.length; j++){
        if (parseInt(goodsData[i]) === shopping_cart_list[j].id) {
          total = accAdd(accMul(shopping_cart_list[j].num, shopping_cart_list[j].price), total)
        }
      }
    }
    this.setData({
      total_price: total
    })
  },
  choose(e){
    var id = e.target.dataset.id
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        shopping_cart_list[i].checked === true ? shopping_cart_list[i].checked = false : shopping_cart_list[i].checked = true
        this.setData({
          shopping_cart_list: shopping_cart_list
        })
        return false
      }
    }
  },
  all_choose(){
    if(!this.data.choose_all){
      var total = 0
      for (var j = 0; j < shopping_cart_list.length; j++) {
        shopping_cart_list[j].checked = true
        total = accAdd(shopping_cart_list[j].total_price, total)
      }
      this.setData({
        shopping_cart_list: shopping_cart_list,
        all_num: shopping_cart_list.length,
        total_price: total,
        choose_all: true
      })
    }else{
      var total = 0
      for (var j = 0; j < shopping_cart_list.length; j++) {
        shopping_cart_list[j].checked = false
      }
      this.setData({
        shopping_cart_list: shopping_cart_list,
        all_num: 0,
        total_price: total,
        choose_all: false
      })
    }
  },
  edit(e){
    var id = e.target.dataset.id
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        shopping_cart_list[i].editing = true
        this.setData({
          shopping_cart_list: shopping_cart_list
        })
        return false
      }
    }
  },
  done(e){
    var id = e.target.dataset.id
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        shopping_cart_list[i].editing = false
        this.setData({
          shopping_cart_list: shopping_cart_list
        })
        return false
      }
    }
  },
  //事件处理函数
  onLoad() {
  },
  add(e) {
    var goodsData = e.target.dataset.goodsdata
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
        if (goodsData.id === shopping_cart_list[i].id) {
            shopping_cart_list[i].num += 1
            shopping_cart_list[i].total_price = accAdd(shopping_cart_list[i].price, shopping_cart_list[i].total_price)
            this.setData({
                shopping_cart_list: shopping_cart_list
            })
            return false
        }
    }
    goodsData.num = 1
    goodsData.checked = false
    goodsData.total_price = goodsData.price
    goodsData.editing = false
    shopping_cart_list[length] = goodsData
    this.setData({
        shopping_cart_list: shopping_cart_list,
        choose_all: false
    })
  },
  del(e){
    var index = e.target.dataset.id
    var total = 0
    var choose_num = 0
    shopping_cart_list.splice(index, 1)
    if (shopping_cart_list.length===0){
      this.setData({
        total_price: 0,
        all_num: 0,
        choose_all: false
      })
    }else{
      for (var j = 0; j < shopping_cart_list.length; j++) {
        console.log(shopping_cart_list[j].checked)
        if (shopping_cart_list[j].checked){
          total = accAdd(shopping_cart_list[j].total_price, total)
          choose_num += 1
        }
      }
      this.setData({
        total_price: total,
        all_num: choose_num >= 1 ? shopping_cart_list.length : 0,
        choose_all: choose_num === shopping_cart_list.length ? true : false
      })
    }
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
  decrease (e) {  // 减少数量
    var id = e.target.dataset.id
    var total = this.data.total_price
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        if (shopping_cart_list[i].num > 1){
          shopping_cart_list[i].num -= 1
          shopping_cart_list[i].total_price = accMul(shopping_cart_list[i].num, shopping_cart_list[i].price)
          if (shopping_cart_list[i].checked){
            total = accSub(shopping_cart_list[i].price, total)
          }
          this.setData({
            shopping_cart_list: shopping_cart_list,
            total_price: total
          })
          return false
        }
      }
    }
  },
  increase (e) {  // 增加数量
    var id = e.target.dataset.id
    var total = this.data.total_price
    var length = shopping_cart_list.length
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        shopping_cart_list[i].num += 1
        shopping_cart_list[i].total_price = accMul(shopping_cart_list[i].num, shopping_cart_list[i].price)
        if (shopping_cart_list[i].checked) {
          total = accAdd(total, shopping_cart_list[i].price)
        }
        this.setData({
          shopping_cart_list: shopping_cart_list,
          total_price: total
        })
        return false
      }
    }
  },
  change_num (e) {  // 手动输入数量
    var id = e.target.dataset.id
    var length = shopping_cart_list.length
    var total = this.data.total_price
    var oldNum = 0,newNum = 0
    for (var i = 0; i < length; i++) {
      if (id === shopping_cart_list[i].id) {
        if (e.detail.value === '') {
          shopping_cart_list[i].num = 1
          this.setData({
            shopping_cart_list: shopping_cart_list,
            total_price: total
          })
          return false
        }
        oldNum = shopping_cart_list[i].num
        console.log(e.detail.value)
        shopping_cart_list[i].num = e.detail.value
        newNum = shopping_cart_list[i].num - oldNum
        if(shopping_cart_list[i].checked){
          total = accAdd(accMul(newNum, shopping_cart_list[i].price), total)
        }
        shopping_cart_list[i].total_price = accMul(shopping_cart_list[i].num, shopping_cart_list[i].price)
        this.setData({
          shopping_cart_list: shopping_cart_list,
          total_price: total
        })
        return false
      }
    }
  }
})
