import React from "react";
import { Table } from "react-bootstrap"
import { connect } from "react-redux";
import './Detail.scss';


function Cart(props){
    return(
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        props.state.map((a,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.quan}</td>
                                    <td>
                                        <button onClick={()=>{ props.dispatch({ type : 'add_quan' }) }}>+</button>
                                        <button onClick={()=>{ props.dispatch({ type : 'minus_quan' }) }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table>
            {props.alert_is_open === true
            ? <div className="my-alert">
                <p>지금 구매하시면 신규할인 20%</p>
                <button onClick={ ()=>{ props.dispatch({ type : 'exit_alert' }) } }>닫기</button>
              </div>
            : null
            }
            
        </div>
    )
}

function 함수명(state){
    return{
        state : state.reducer, // state라는 이름의 props로 바꿔주셈
        alert_is_open : state.reducer2
    }
}
// 위 함수는 store안에 있는 내용들을 다 가져와서 props처럼 만들어주는 함수

export default connect(함수명)(Cart) 

//export default Cart;