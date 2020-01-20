const TexasHoldem = {
  PrivateCard:[], //私有牌 2张
  PublicCard:[], //公共牌 5张
  AllCard:[], //总共牌 7张
  sort:{
    1:'高牌',
    2:'一对',
    3:'两对',
    4:'三条',
    5:'顺子',
    6:'同花',
    7:'葫芦',
    8:'四条',
    9:'同花顺',
    10:'皇家同花顺',
  },
  init: () => { //新建一副扑克
    TexasHoldem.PrivateCard = [],
    TexasHoldem.PublicCard = [],
    TexasHoldem.AllCard = []
    let poker = [];
    let color = [1,2,3,4] //1：黑桃，2：红心，3：草花， 4：方块
    for(let i=1; i<14; i++){ //为了计算方便，A算14
      color.forEach(item=>{
        poker.push([i,item])
      })
    }
    return poker
  },
  shuffle:(arr) =>{ //乱序排列扑克牌
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr
  },
  startDealCards:(num)=>{ //发牌
    let poker = TexasHoldem.init() 
    poker =  TexasHoldem.shuffle(poker)
    for(let i=0; i<num; i++){
      TexasHoldem.PrivateCard.push([poker[i],poker[i+num]])
    }
    for(let i=2*num; i<2*num+5; i++){
      TexasHoldem.PublicCard.push(poker[i])
    }

    TexasHoldem.PrivateCard.forEach(item=>{
      TexasHoldem.AllCard.push([...item, ...TexasHoldem.PublicCard])
    })
    // console.log('AllCard')
    // console.log(TexasHoldem.AllCard)
  },
  sortCards:()=>{
    let resultArray = []
    TexasHoldem.AllCard.forEach(item=>{
      resultArray.push(TexasHoldem.calculateCards(item))
    })   
    return resultArray
  },
  sortNumber: (a,b) => {
    return b-a
  },
  unique (arr) {
    return Array.from(new Set(arr))
  },
  calculateCards:(item) => { //计算牌面
    if( TexasHoldem.isTonghuaShun(item)){
      return ["同花顺", TexasHoldem.isTonghuaShun(item)]
    } else if(TexasHoldem.isSitiao(item)){
      return TexasHoldem.isSitiao(item)
    } else if(TexasHoldem.isHulu(item)){
      return TexasHoldem.isHulu(item)
    } else if(TexasHoldem.isTonghua(item)){
      return ["同花",item]
    } else if(TexasHoldem.isShunzi(item)){
      return ["顺子",TexasHoldem.isShunzi(item)]
    } else{
      return TexasHoldem.isNum(item)
    }
  },
  isTonghuaShun:(item) => { //计算牌面
    res = TexasHoldem.isShunzi(item,true);
    if(res){
      return res % 100;
    }else{
      return false;
    }
  },
  isSitiao:(item) => { //计算是否是四条
    let result = TexasHoldem.isNum(item)
    if(result[0] === '四条'){
      return result
    }else{
      return false
    }
  },
  isHulu:(item) => { //计算是否是四条
    let result = TexasHoldem.isNum(item)
    if(result[0] === '葫芦'){
      return result
    }else{
      return false
    }
  },
  isShunzi:(item,huase=false)=> { //计算牌面 花色参数用来查看是否是同花顺
    let number = []; //牌面数字，用来计算是否是顺子
    item.forEach(item2 => {
      if(huase){
        number.push(item2[0] + item2[1] * 100)
      }else{
        number.push(item2[0])
      }
    })
    number = TexasHoldem.unique(number)
    if(number.indexOf(1) > -1){
      number.push(14)
    }
    number = number.sort(TexasHoldem.sortNumber)
    let oneNumber = 0;
    let max=0
    for(let i = 0 ; i < 6 ; i ++){
      if(number[i] - number[i+1] === 1){
        oneNumber ++;
        if(oneNumber === 4){
          return number[i+1]+4;
        }
      }else if(oneNumber > 0 ){
        oneNumber = 0;
      }
    }
    if(oneNumber === 4){
      return max
    } else {
      return false
    }
  },
  isTonghua: (item) => {
    let color = []; //牌面花色，用来计算是否是同花
    item.forEach(item2 => {
      color.push(item2[1])
    })
    color = color.sort(TexasHoldem.sortNumber)
    let oneNumber = 0
    for(let i = 0 ; i < 7 ; i ++){
      if(color[i] - color[i+1] === 0){
        oneNumber ++
        if(oneNumber === 4){
          return ['同花', item]
        }
      }else if(oneNumber > 0 ){
        oneNumber = 0;
      }
    }
    if(oneNumber === 4){
      return ['同花', item]
    } else {
      return false
    }
  },
  isNum: (item) => {
    let number = []; //牌面数字，用来计算是否是对子，葫芦，三条等
    item.forEach(item2 => {
      if(item2[0] == 1){
        number.push(14)
      }else{
        number.push(item2[0])
      }
    })
    number = number.sort(TexasHoldem.sortNumber)
    // console.log('sortResult')
    // console.log(number)
    let nowNumber = number[0]
    let maxNumber = number[0]
    let oneNumber = {}
    for(let i = 1 ; i < 7 ; i ++){
      if(number[i] - nowNumber === 0){    
        if(oneNumber[nowNumber]){
          oneNumber[nowNumber] ++
        } else {
          oneNumber[nowNumber] = 2
        }          
      }else{
        nowNumber = number[i]
      }
    }
    // console.log('oneNumber')
    // console.log(oneNumber)
    let arr = Object.keys(oneNumber)
    let maxlength = 0
    let minlength = arr.length >= 2 ? 2 : 0
    for (let j in oneNumber){
      if(oneNumber[j] >= maxlength){
        maxlength = oneNumber[j]
        maxNumber = j
      }
    }
    switch(maxlength){
      case 0:
        return ["单个",maxNumber]
      case 2:
        if(minlength === 0){
          return ["对子",maxNumber]
        } else {
          return ["两对",maxNumber]
        }
      case 3:
        if(minlength === 0){
          return ["三条",maxNumber]
        } else {
          return ["葫芦",maxNumber]
        }        
      case 4:
        return ["四条",maxNumber]
      default:
        break
    }
  },
  tongji: (personNum, times) => {
    let resultArray = {}
    for(let i=0;i<times;i++){
      TexasHoldem.startDealCards(personNum)
      let result = TexasHoldem.sortCards()
      result.forEach(item => {
        if(resultArray[item[0]]){
          resultArray[item[0]]++
        }else{
          resultArray[item[0]] = 1
        }
      })
    }   
    console.log(resultArray)
  }
}
