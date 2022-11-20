const form=document.getElementById('my-form');
const amounts=document.getElementById('amount');
const descriptions=document.getElementById('des');
const cate=document.getElementById('cat');

form.addEventListener('submit',onsubmit);


async function onsubmit(e)
{
    try{
    e.preventDefault();

    let expensedetail=
    {
        amount:amounts.value,
        description:descriptions.value,
        category:cate.value,
    }



    axios.post('https://crudcrud.com/api/258282deff7c42e8a17f1d114a41add2/expensetracker',expensedetail)
    
    showexpense(expensedetail)
}catch(err)
        {
            console.log(err);
        }



}

window.addEventListener('DOMContentLoaded',()=>
{
    axios.get('https://crudcrud.com/api/258282deff7c42e8a17f1d114a41add2/expensetracker')
    .then((res)=>
    {
        console.log(res);
        for(var i=0;i<res.data.length;i++)
        {
            showexpense(res.data[i]);
            
        }
    })


})
function showexpense(expense)
{
    
    const parentnode=document.getElementById('users');
    const childnode=`<li id=${expense._id}>${expense.amount}:${expense.description}:${expense.category}
<button onclick="editExpense('${expense.amount}','${expense.description}','${expense.category}','${expense._id}')">EDIT</button>
<button onclick="deleteExpense('${expense._id}')">DELETE</button>
    </li>`;
    parentnode.innerHTML=parentnode.innerHTML+childnode;

    amounts.value='';
    descriptions.value='';
    cate.value='';

}

async function deleteExpense(expenseid)
{
    try
    {
 axios.delete(`https://crudcrud.com/api/258282deff7c42e8a17f1d114a41add2/expensetracker/${expenseid}`) 
 
 {

    removefromsceen(expenseid);
 }
}catch(err)
    {
        console.log(err);
    }


}

 async function editExpense(amount,description,category,exid)
{
    try
    {
    axios.get(`https://crudcrud.com/api/258282deff7c42e8a17f1d114a41add2/expensetracker/${exid}`) 

 {
    
    document.getElementById('amount').value=amount;
    document.getElementById('des').value=description;
    document.getElementById('cat').value=category;

    deleteExpense(exid);
 }
}catch(err)
    {
        console.log(err);
    }
    


}



function removefromsceen(expenseid)
{
const parentnode= document.getElementById('users');
   const childnode=document.getElementById(expenseid);
   if(childnode)
   {
    parentnode.removeChild(childnode);
   }
}