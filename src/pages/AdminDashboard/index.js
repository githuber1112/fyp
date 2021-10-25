import React from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Card, Col, Row } from 'antd';



const dataSales = {
    labels: ['January','Febuary','March','April','May','June'],
    datasets:[
        {
            label: 'Total Sales',
            data: [400,1000,800,950,1200,1100],
            fill:false,
            backgroundColor: 'rgb(255,99,132)',
            borderColor:'rgba(255,99,132,0.2)',
        },
    ],
};

const dataCustomers = {
    labels: ['January','Febuary','March','April','May','June'],
    datasets:[
        {
            label: 'Customers Served',
            data: [100,250,200,120,300,280],
            fill:true,
            backgroundColor:[
               'rgb(255,99,132,0.6)', 
               'rgb(54,162,235,0.6)', 
               'rgb(255,206,86,0.6)', 
               'rgb(75,192,192,0.6)', 
               'rgb(153,102,255,0.6)', 
               'rgb(255,159,64,0.6)', 
            ], 
        },
    ],
};

const dataBestSellers = {
    labels: ['Callie N95 Mask','Callie 4-ply Mask','Hand Sanitizer','Callie Blackout Mask'],
    datasets:[
        {
            label: 'Top Selling Products',
            data: [10,30,40,20],
            fill:false,
            backgroundColor:[
            'rgb(255,99,132,0.6)', 
               'rgb(54,162,235,0.6)', 
               'rgb(255,206,86,0.6)', 
               'rgb(75,192,192,0.6)', 
            ] 
        },
    ],
};

const optionsSales = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero:true,
                },
            },
        ],
    },
};

const optionsCustomers = {
    type: 'bar',
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
};

const optionsBestSellers = {
    type: 'pie',
    options: {
        responsive: true
    }
}

const AdminDashboard = () => {
    return (
        <div className="adminDashboardWrapper">
            <table>
                <tbody>
                    <tr>
                      <td width="500px">
                      <Card style={{borderRadius: "15px", margin: "10px", borderColor:"white", boxShadow: "0 7px 25px rgba(0,0,0,0.2)"}}>
                      <div className="totalSales">
                        <h3>Total Sales</h3>
                        <Line data={dataSales} options={optionsSales} />    
                      </div> 
                      </Card>    
                      </td> 
                      
                      <td width="500px">
                    <Card style={{borderRadius: "15px", margin: "10px", borderColor:"white", boxShadow: "0 7px 25px rgba(0,0,0,0.2)"}}>
                      <div className="customersServed">
                        <h3>Customers Served</h3>
                        <Bar data={dataCustomers} options={optionsCustomers} />
                        </div>   
                        </Card>  
                      </td> 
                    </tr>
                    </tbody>
                    </table>
                    <table>
                        <tbody>
                        <tr>
                        <td width="400px">
                            <Card style={{borderRadius: "15px", margin: "10px", borderColor:"white", boxShadow: "0 7px 25px rgba(0,0,0,0.2)"}}>
                            <div className="recentOrders">
                                <h3>Recent Orders</h3>
                                <table width="500" cellpadding="20">
                                    <thead>
                                    <tr style={{fontWeight:"bold"}}>
                                        <td>Name</td>
                                        <td>Price (RM)</td>
                                        <td>Quantity</td>
                                        <td>Status</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Callie 4-ply Mask</td>
                                            <td>50</td>
                                            <td>1</td>
                                            <td>Paid</td>
                                        </tr>
                                        <tr>
                                            <td>Hand Sanitizer</td>
                                            <td>12</td>
                                            <td>4</td>
                                            <td>Unpaid</td>
                                        </tr>
                                        <tr>
                                            <td>N-95 All Blue Mask</td>
                                            <td>70</td>
                                            <td>3</td>
                                            <td>Paid</td>
                                        </tr>
                                        <tr>
                                            <td>Mixed Color 3-ply Mask</td>
                                            <td>35</td>
                                            <td>8</td>
                                            <td>Paid</td>
                                        </tr>
                                        <tr>
                                            <td>Callie Blackout Mask</td>
                                            <td>40</td>
                                            <td>2</td>
                                            <td>Unpaid</td>
                                        </tr>
                                        <tr>
                                            <td>Cactus Hand Cleaner</td>
                                            <td>17</td>
                                            <td>5</td>
                                            <td>Paid</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </Card>
                            </td>
                            <td width="500px">
                            <Card style={{borderRadius: "15px", margin: "10px", borderColor:"white", boxShadow: "0 7px 25px rgba(0,0,0,0.2)"}}>
                            <div className="bestSellers">
                            <h3>Top Selling Products</h3>
                            <Pie data={dataBestSellers} options={optionsBestSellers} /> 
                            </div>
                            </Card>
                            </td>
                            </tr>
                    </tbody>
            </table>
        </div>
    )
}

export default AdminDashboard;