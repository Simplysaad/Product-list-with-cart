import {CREATE_CARD, summaryList, btnOrder, nothingHere,CONFIRM_ORDER_ITEM, check} from './functions.js'
import {PRODUCTS} from './data.js'

let productList = document.getElementById('productList')

PRODUCTS.forEach((product)=>{
  CREATE_CARD(product, productList)
})
let summary = document.getElementById('summaryList')
let btnNewOrder = document.getElementById('btnNewOrder')
btnNewOrder.addEventListener('click', ()=>{
  for(let i=0; i<summaryList.length; i++){
    summaryList.splice(i, summaryList.length)
    console.log(summaryList.length)
    
    summary.replaceChildren()
    check()
  }
})
