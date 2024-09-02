import {PRODUCTS} from './Data.js'
//import {CREATE_ORDER_ITEM} from './Script-2.js'
const summaryList = new Array()

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
     
      let index = summaryList.findIndex(element=> element.id === btnCancel.parentElement.id)
      // console.log(index)
      summaryList.splice(index, 1)
 
      let cartQuantity = document.getElementById('cartQuantity')
      cartQuantity.innerHTML = summaryList.length
  
      summaryList.forEach((element)=>{
      CREATE_ORDER_ITEM(element)
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
  
  let qtyBought = 3;
  
  let priceMultiplier = document.createElement('p')
  priceMultiplier.classList.add('multiplier', 'text-warning', 'fw-bold')
  priceMultiplier.textContent = "x"+qtyBought
  priceCalc.append(priceMultiplier)
  
  let priceRate = document.createElement('p')
  priceRate.classList.add('price-rate', 'fw-light')
  priceRate.textContent = '@ $'+ element.price
  priceCalc.append(priceRate)
  
  let priceTotal = document.createElement('p')
  priceTotal.classList.add('price-rate', 'fw-bold')
  let total = element.price * qtyBought - 0.01
  priceTotal.textContent = '$'+ (total)
  priceCalc.append(priceTotal)
}

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
      CARD_BTN.innerHTML=''
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
  CARD_PRICE.textContent = element.price.toString()
  CARD_BODY.append(CARD_PRICE)
 
  return CARD_COL
}

const addToCart = (element)=>{
  summaryList.push(element)
  //console.log(summaryList)
 
  let summary= document.getElementById('summaryList')
  summary.replaceChildren()
  
  let cartQuantity = document.getElementById('cartQuantity')
  cartQuantity.innerHTML = summaryList.length
  
  summaryList.forEach((order, index)=>{
    CREATE_ORDER_ITEM(order)
  })
}
