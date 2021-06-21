import * as React from "react";
import { Card} from '@material-ui/core';
import {Bar} from 'react-chartjs-2';
import DollarIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import PeopleIcon from '@material-ui/icons/People';
import CardWithIcon from './CardWithIcon'
import {useAuth} from '../../context/AuthShopContext'

const Dashboard= props =>{
  const {orders}=useAuth()
  const {users}=useAuth()
  const arrDates=[]
  const arrPurchase=[]
  
  orders.map((obj)=>arrDates.push(obj.createdAt.substring(0,10)))
  orders.map((obj)=>arrPurchase.push(obj.total))
  const monthlyRevenue=arrPurchase.reduce((total,num)=>total+num)
  const Orders=arrPurchase.length
  const Users=users.length


  const data = {
  labels: arrDates,
  datasets: [
    {
      label: "Orders 2021",
      data: arrPurchase,
      fill: false,
      backgroundColor: "blue",
      hoverBackgroundColor:"lightblue"
    },
  

  ]
};
  return(
    <div>
    <h1>Welcome to Admin Dashboard</h1>
    <div className="container justify-content-center mt-3">
    <div className="row">
    <Card className="col-5">
        <CardWithIcon icon={DollarIcon} title="Monthly Revenue" subtitle={monthlyRevenue}/>
        <CardWithIcon icon={ShoppingCartIcon} title="Number of orders this month" subtitle={Orders}/>
        <CardWithIcon icon={FolderSpecialIcon} title="Our Bestseller product" subtitle="Trezor"/>
        <CardWithIcon icon={PeopleIcon} title="New Customers this month" subtitle={Users} />
      </Card>
        <Card className="col-7">
            <Bar data={data} options={{
                title: { text:"Total purchases vs. Date" ,display: true },
                scales: { yAxes: [ {ticks:{beginAtZero:true}} ] }
            }}/>    
        
      </Card>
      </div>

</div>
</div>
)}

export default Dashboard;