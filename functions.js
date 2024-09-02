import {PRODUCTS} from './data.js'
export let summaryList = new Array()
export let btnOrder = document.getElementById('btnOrder')
export let nothingHere = document.getElementById('nothingHere')
let orderSummaryContainer = document.getElementById('orderSummary')


export const CREATE_CARD =(element, parent)=>{
  let CARD_COL = document.createElement('div')
  CARD_COL.classList.add('col-md-5', 'col-lg-4')
  parent.append(CARD_COL)
  
  let CARD = document.createElement('div')
  CARD.classList.add('card')
  CARD_COL.append(CARD)
  
  let CARD_IMAGE_CONT = document.createElement('picture')
  CARD_IMAGE_CONT.classList.add('card-image')
  CARD.append(CARD_IMAGE_CONT)

  let CARD_IMAGE = document.createElement('img')
  CARD_IMAGE.classList.add('img-fluid', 'img-rounded', 'p-1')
  CARD_IMAGE.src = element.image.mobile
  CARD_IMAGE_CONT.append(CARD_IMAGE)
  
  let CARD_BODY = document.createElement('div')
  CARD_BODY.classList.add('card-body')
  CARD.append(CARD_BODY)
  
  let CARD_BTN = document.createElement('a')
  CARD_BTN.classList.add('btn', 'btn-cart', 'btn-warning')
  CARD_BTN.setAttribute('id', element.id)
  CARD_BTN.textContent = "Add to Cart"
  CARD_BODY.append(CARD_BTN)
  
  CARD_BTN.addEventListener('click', ()=>{
    if(CARD_BTN.id == element.id){
      addToCart(element)
      //CARD_BTN.innerHTML=''
    }
  })
  

  let CARD_CATEGORY = document.createElement('p')
  CARD_CATEGORY.classList.add('card-text', 'category', 'text-uppercase', 'fw-bolder', 'm-0', 'text-secondary' )
  CARD_CATEGORY.textContent = element.category
  CARD_BODY.append(CARD_CATEGORY)
  
  let CARD_TITLE = document.createElement('h4')
  CARD_TITLE.classList.add('card-title')
  CARD_TITLE.textContent = element.name
  CARD_BODY.append(CARD_TITLE)
  
  let CARD_PRICE = document.createElement('p')
  CARD_PRICE.classList.add('card-text', 'price', 'fw-bold', 'text-danger')
  CARD_PRICE.textContent = '$'+(element.price - 0.01)
  console.log
  CARD_BODY.append(CARD_PRICE)
 
  return CARD_COL
}

const addToCart = (element)=>{
  
  summaryList.push(element)
  check()
 
  let summary= document.getElementById('summaryList')
  summary.replaceChildren()
  orderSummaryContainer.replaceChildren()
  
  let cartQuantity = document.getElementById('cartQuantity')
  cartQuantity.innerHTML = summaryList.length
  
  summaryList.forEach((order)=>{
    CREATE_ORDER_ITEM(order)
    CONFIRM_ORDER_ITEM(order)
  })
}

export const CREATE_ORDER_ITEM =(element)=>{
  let summary= document.getElementById('summaryList')
  
  let orderCont = document.createElement('div')
  orderCont.setAttribute('id', element.id)
  orderCont.classList.add('d-fex', 'justify-content-between', 'order-cont')
  summary.append(orderCont)
  
  let orderInfo= document.createElement('div')
  orderInfo.classList.add('d-flex', 'flex-column', 'order-info', 'py-2', 'pb-0')
  orderCont.append(orderInfo)
  
  let btnCancel = document.createElement('i')
  btnCancel.classList.add('fa', 'fa-times-circle', 'btn-cancel')
  btnCancel.addEventListener('click', ()=>{
      //REMOVE_ITEM()
      let summary= document.getElementById('summaryList')
      summary.replaceChildren()
      orderSummaryContainer.replaceChildren()
     
      let index = summaryList.findIndex(element=> element.id === btnCancel.parentElement.id)
      summaryList.splice(index, 1)
      check()
      
      let cartQuantity = document.getElementById('cartQuantity')
      cartQuantity.innerHTML = summaryList.length
      
      summaryList.forEach((element)=>{
        CREATE_ORDER_ITEM(element)
        CONFIRM_ORDER_ITEM(element)
      })
    })
  orderCont.append(btnCancel)

  let productName = document.createElement('h4')
  productName.classList.add('product-name', 'lead')
  productName.textContent = element.name
  orderInfo.append(productName)
  
  let priceCalc = document.createElement('div')
  priceCalc.classList.add('price-calc', 'd-flex', 'justify-content-between', 'col-6', 'col-lg-4')
  orderInfo.append(priceCalc)
  
  let qtyBought = 1;
  
  let priceMultiplier = document.createElement('p')
  priceMultiplier.classList.add('multiplier', 'text-warning', 'fw-bold')
  priceMultiplier.textContent = "x"+qtyBought
  priceCalc.append(priceMultiplier)
  
  let priceRate = document.createElement('p')
  priceRate.classList.add('price-rate', 'fw-light')
  priceRate.textContent = '@ $'+ (element.price-0.01)
  priceCalc.append(priceRate)
  
  let priceTotal = document.createElement('p')
  priceTotal.classList.add('price-rate', 'fw-bold')
  let total = element.price * qtyBought - 0.01
  priceTotal.textContent = '$'+ (total)
  priceCalc.append(priceTotal)
}


export function check(){
  let cartQuantity = document.getElementById('cartQuantity')
  if(summaryList.length >= 1){
    btnOrder.style.display = 'block'
    nothingHere.style.display = 'none'
    cartQuantity.innerrHTML = summaryList.length
 }
  else{
    btnOrder.style.display = 'none'
    nothingHere.style.display = 'flex'
    //nothingHere.style.flexDirection = 'column'
  }
}

export const CONFIRM_ORDER_ITEM = (element)=>{
  let qtyBought = 1
  let orderSummaryContainer = document.getElementById('orderSummary')
  
  let orderSummary = document.createElement('div')
  orderSummary.classList.add('d-flex', 'justify-content-between', 'align-items-center')
  orderSummaryContainer.append(orderSummary)
  
  let orderInfo = document.createElement('div')
  orderInfo.classList.add('d-flex', 'flex-column')
  orderSummary.append(orderInfo)
  
  let orderTitle = document.createElement('h5')
  orderTitle.classList.add('order-title','fw-bold', 'mb-2')
  orderTitle.textContent = element.name
  orderInfo.append(orderTitle)
  
  let orderText = document.createElement('div')
  orderText.classList.add('order-text', 'd-flex','col-6', 'justify-content-between')
  orderInfo.append(orderText)
  
  let multiplier = document.createElement('p')
  multiplier.classList.add('text-danger','fw-bold')
  multiplier.textContent = "x"+qtyBought
  orderText.append(multiplier)
  
  let rate = document.createElement('p')
  rate.classList.add('text-dark', 'fw-light')
  rate.textContent = (element.price - 0.01)
  orderText.append(rate)
  
  let xyz = (element.price*qtyBought) -0.01;
  
  let orderSum = document.createElement('div')
  orderSum.classList.add('fs-2', 'fw-bolder')
  orderSum.textContent = xyz
  orderSummary.append(orderSum)
  
  // let orderTotalValue; 
  // orderTotalValue += xyz
  // return orderTotalValue;
}
