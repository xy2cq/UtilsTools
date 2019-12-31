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
    console.log(TexasHoldem.AllCard)
  },  
  sortCards:()=>{
    TexasHoldem.AllCard.forEach(item=>{
      console.log(TexasHoldem.calculateCards(item))
    })   
  },
  sortNumber: (a,b) => {
    return b-a
  },
  unique (arr) {
    return Array.from(new Set(arr))
  },
  calculateCards:(item) => { //计算牌面
    if( TexasHoldem.isTonghuaShun(item)){
      return "同花顺"
    } else if(TexasHoldem.isShunzi(item)){
      return ["顺子",TexasHoldem.isShunzi(item)]
    } else if(TexasHoldem.isTonghua(item)){
      return "同花"
    } else{
      return TexasHoldem.isNum(item)
    }
  },
  isTonghuaShun:(item) => { //计算牌面
    let number = []; //牌面数字，用来计算是否是顺子
    item.forEach(item2 => {
      if(item2[0] === 1){
        number.push(14+item2[1]*100)
      }
      number.push(item2[0]+item2[1]*100)
    })
    number = number.sort(TexasHoldem.sortNumber)
    let oneNumber = 0;
    let max=0
    number.forEach((item, index)=>{
      if(number[index] - number[index+1] === 1){
        oneNumber ++;
        if(oneNumber === 4){
          max=number[index+1]+4
          return
        }
      }else if(oneNumber > 0 ){
        oneNumber = 0;
      }
    })
    if(oneNumber === 4){
      return max
    } else {
      return false
    }
  },
  isShunzi:(item)=> { //计算牌面
    let number = []; //牌面数字，用来计算是否是顺子
    item.forEach(item2 => {
      number.push(item2[0])
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
          max=number[i+1]+4
          return
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
    for(let i = 0 ; i < 6 ; i ++){
      if(color[i] - color[i+1] === 0){
        oneNumber ++
        if(oneNumber === 3){
          return
        }
      }else if(oneNumber > 0 ){
        oneNumber = 0;
      }
    }
    if(oneNumber === 4){
      return '同花'
    } else {
      return false
    }
  },
  isNum: (item) => {
    let number = []; //牌面数字，用来计算是否是对子，葫芦，三条等
    item.forEach(item2 => {
      number.push(item2[0])
    })
    number = number.sort(TexasHoldem.sortNumber)
    let nowNumber = number[0]
    let maxNumber = number[0]
    let oneNumber = {}
    for(let i = 1 ; i < 6 ; i ++){      
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
    let arr = Object.keys(oneNumber)
    let maxlength = oneNumber[arr[0]] || 0
    let minlength = 0
    if(oneNumber[arr[1]]&&oneNumber[arr[1]]>oneNumber[arr[0]]){
      maxlength = oneNumber[arr[1]]
      maxNumber = arr[1]
    } else if (oneNumber[arr[1]]){
      minlength = oneNumber[arr[1]]
    } else if (oneNumber[arr[0]]) {
      maxNumber = arr[0]
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
        return ["四个",maxNumber]
      default:
        break
    }
  }
}

TexasHoldem.startDealCards(9)
TexasHoldem.sortCards()