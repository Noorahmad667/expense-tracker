const nameExpense=document.getElementById("name");
const amountExpense=document.getElementById("amount");
const category=document.getElementById("category");
const paymentMethod=document.getElementById("payment-method");
const date=document.getElementById("date")
const addBtn=document.getElementById("add-expense");
const errorName=document.getElementById("error-name")
const errorAmount=document.getElementById("error-amount")
const errorCategory=document.getElementById("error-category")
const errorPayment=document.getElementById("error-payment")
const errorDate=document.getElementById("error-date")
const expenseContainer=document.getElementById("expense-container")
const filterCategory=document.getElementById("filter-category")
const filterPayment=document.getElementById("filter-payment-method")
const sortExpense=document.getElementById("sort-expense")
const search=document.getElementById("search")
const totalExpenseElements=document.getElementById("total-expense");
const totalCountElements=document.getElementById("total-count");
const cashExpenseElements=document.getElementById("cash-expense")
const cardExpenseElement=document.getElementById("card-expense")
const highestExpenseElement=document.getElementById("highest-expense")
const lowestExpenseElement=document.getElementById("lowest-expense")
const darkBtn=document.getElementById("dark-btn")
const moonIcon=document.getElementById("moon")
console.log(darkBtn);

const expenses=JSON.parse(localStorage.getItem("list")) ||[];
displayExpenses(expenses)
updateStatics()
let editIndex=null;
function displayExpenses(item){
   
    expenseContainer.innerHTML=""
    if(item.length===0)
    {
        expenseContainer.innerText="Not Expenses Found!"
        expenseContainer.classList.add("empty-state")
        return;
    }
    else{
    item.forEach((expense,index)=>{
const card=createElementCard(expense)
const deleteBtn=document.createElement("button");
deleteBtn.textContent="Delete";
deleteBtn.classList.add("delete-btn")
card.appendChild(deleteBtn);
deleteBtn.addEventListener("click",()=>{
    expenses.splice(index,1)
    localStorage.setItem("list",JSON.stringify(expenses))
   displayExpenses(expenses)
   updateStatics()
})
   const editBtn=document.createElement("button");
editBtn.textContent="Edit";
card.appendChild(editBtn)
editBtn.classList.add("edit-btn")
expenseContainer.appendChild(card)
editBtn.addEventListener("click",()=>{
   const editExpense= expenses[index]
   editIndex=index;
  nameExpense.value=editExpense.name
  amountExpense.value=editExpense.amount
  category.value=editExpense.categoryList;
  paymentMethod.value=editExpense.paymentMethodList;
  date.value=editExpense.dateSave
 
})
})} } 
function createElementCard(expense){
const card=document.createElement("div");

card.classList.add("expensve-card");
const title=document.createElement("h3");
card.append(title);
title.textContent=expense.name;
title.classList.add("title")
const text=document.createElement("p");
text.textContent=`Amount:${expense.amount} $`
card.appendChild(text);
const textCategory=document.createElement("p");
textCategory.textContent=` Category:${expense.categoryList}`;
card.appendChild(textCategory)
const textPayment=document.createElement("p")
textPayment.textContent=`Payment Method: ${expense.paymentMethodList}`;
card.appendChild(textPayment)
const textDate=document.createElement("p");
textDate.textContent=`Date:${expense.dateSave}`
card.appendChild(textDate)

  return card;
}

  


addBtn.addEventListener("click",()=>{
let nameValue=nameExpense.value;
let amountValue=amountExpense.value;
let categoryValue=category.value;
let paymentMethodValue=paymentMethod.value;
let dateValue=date.value;
if(nameValue===""){
    errorName.textContent="Name is Rrquired";
 return;
}
errorName.textContent=""
if(amountValue==="" || amountValue < 0){
    errorAmount.textContent="Amount is Required";
    return;
}
errorAmount.textContent=""
if(categoryValue===""){
    errorCategory.textContent="category is Rrquired";
return;
}
errorCategory.textContent=""
if(paymentMethodValue===""){
    errorPayment.textContent="payment Method is Rrquired";
return;
}
errorPayment.textContent=""
if(dateValue===""){
    errorDate.textContent="date is Rrquired";
return;
}
errorDate.textContent=""
const expense={
    name:nameValue,
    amount:amountValue,
    categoryList:categoryValue,
    paymentMethodList:paymentMethodValue,
    dateSave:dateValue



}

if (editIndex===null)

{expenses.push(expense)}

else if(editIndex!==null)
{
    expenses[editIndex]=expense
}
localStorage.setItem("list",JSON.stringify(expenses))

displayExpenses(expenses)
updateStatics()
nameExpense.value="";
amountExpense.value="";
category.value="";
paymentMethod.value="";
date.value="";
editIndex=null
console.log(expenses);
})
search.addEventListener("input",()=>{
    const searchValue=search.value;
   let expenseFilter=expenses.filter(expense=> expense.name.toLowerCase().includes(searchValue.toLowerCase()))
   displayExpenses(expenseFilter)
})
filterCategory.addEventListener("change",()=>{
    const categoryValue=filterCategory.value;
    if (categoryValue==="all")
    {
        displayExpenses(expenses)
    }
    else{
        const foodCategoey=expenses.filter(expense=>
             expense.categoryList===categoryValue)
        displayExpenses(foodCategoey)
        
    }
    
})
filterPayment.addEventListener("change",()=>{
    const paymentMethodFilter=filterPayment.value;
  
        const paymentMethodCategory=expenses.filter(expense=>
            expense.paymentMethodList===paymentMethodFilter
        )
        displayExpenses(paymentMethodCategory)
    
})
sortExpense.addEventListener("change",()=>{
    const sortValue=sortExpense.value;
   if (sortValue==="highest amount"){
    expenses.sort((a,b)=>
     b.amount-a.amount
    )}
    else if(sortValue==="lowest amount"){
        expenses.sort((a,b)=>
            a.amount-b.amount
        )
    }
    else if(sortValue==="a-z"){
        expenses.sort((a,b)=>
        a.name.localeCompare(b.name))
    }
     else if(sortValue==="z-a"){
        expenses.sort((a,b)=>
        b.name.localeCompare(a.name))
    }
    else if(sortValue==="newest"){
        expenses.sort((a,b)=>
          new Date(a.dateSave)-new Date(b.dateSave))
    }
    else if(sortValue==="oldest"){
        expenses.sort((a,b)=>
          new Date(b.dateSave)-new Date(a.dateSave))
    }
   displayExpenses(expenses)
   
  
})
function updateStatics(){
const totalExpenses=expenses.reduce((acc,expense)=>{
  return acc+Number(expense.amount);
    
},0)
totalExpenseElements.textContent=`${totalExpenses} $`
totalCountElements.textContent=`${expenses.length} $`

const cashExpenseFilter=expenses.filter(expense=>
    expense.paymentMethodList==="cash"
   
)
const expenseCash=cashExpenseFilter.reduce((acc,expense)=>{
    return acc+Number(expense.amount)
},0)
cashExpenseElements.textContent=`${expenseCash} $`
const cardExpenseFilter=expenses.filter((expense) =>
    expense.paymentMethodList==="card"
)
const expenseCard=cardExpenseFilter.reduce((acc,expense)=>{
    return acc+Number(expense.amount)
},0)
cardExpenseElement.textContent=`${expenseCard} $`
if(expenses.length===0){
    highestExpenseElement.textContent=`-`
    lowestExpenseElement.textContent=`-` 
}
else{
   const highestExpense=expenses.reduce((highest,expense)=>{
    return Math.max(highest, expense.amount)
},0)
highestExpenseElement.textContent=`${highestExpense}$`
const lowestExpense=expenses.reduce((lowest,expense)=>{
 return Math.min(lowest,Number(expense.amount))
},Number(expenses[0].amount))
lowestExpenseElement.textContent=`${lowestExpense} $` 
}
}


darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-btn");
    if(document.body.classList.contains("dark-btn")){
moonIcon.classList.remove("fa-moon")
moonIcon.classList.add("fa-sun")
    }
    else{
      moonIcon.classList.remove("fa-sun")
moonIcon.classList.add("fa-moon")  
    }
});
