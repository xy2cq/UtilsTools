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
    for(let i=2; i<15; i++){ //为了计算方便，A算14
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
      TexasHoldem.calculateCards(item)
    })
   
  },
  sortNumber: (a,b) => {
    return a - b
  },
  unique (arr) {
    return Array.from(new Set(arr))
  },
  calculateCards:(item) => { //计算牌面
    let number = []; //牌面数字，用来计算是否是顺子
    let color = []; //牌面花色，用来计算是否是同花
    item.forEach(item2 => {
      number.push(item2[0])
      color.push(item2[1])
    })
    number = TexasHoldem.unique(number)
    if(number.indexOf(14) > -1){
      number.push(1)
    }
    number = number.sort(TexasHoldem.sortNumber)
    color = color.sort(TexasHoldem.sortNumber)
    let oneNumber = 0;
    let max=0
    for(let i = 0 ; i < 6 ; i ++){
      if(number[i+1] - number[i] === 1){
        oneNumber ++;
        if(oneNumber === 4){
          max=number[i+1]
          return
        }
      }else if(oneNumber > 0 ){
        oneNumber --;
      }
    }
    console.log(item, number, color, oneNumber)
  }
}

TexasHoldem.startDealCards(9)
TexasHoldem.sortCards()