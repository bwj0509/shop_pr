import React from "react";
import { Table } from "react-bootstrap"
import { connect, useDispatch, useSelector } from "react-redux";
import './Detail.scss';


function Cart(props){

    let state = useSelector((state)=>state) // useSelcect를 사용해서 reducer값을 가져온다.
    let dispatch = useDispatch(); // useDispatch 훅을 사용해서 dispatch를 관리 할 수 있다.

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
                        state.reducer.map((a,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.quan}</td>
                                    <td>
                                        <button onClick={()=>{ dispatch({ type : 'add_quan', data: a.id }) }}>+</button>
                                        <button onClick={()=>{ dispatch({ type : 'minus_quan', data: a.id }) }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {state.reducer2 === true
            ? <div className="my-alert">
                <p>지금 구매하시면 신규할인 20%</p>
                <button onClick={ ()=>{ dispatch({ type : 'exit_alert' }) } }>닫기</button>
              </div>
            : null
            }
            
        </div>
    )
}
export default Cart;



// function 함수명(state){
//     return{
//         state : state.reducer, // state라는 이름의 props로 바꿔주셈
//         alert_is_open : state.reducer2
//     }
// }
// // 위 함수는 store안에 있는 내용들을 다 가져와서 props처럼 만들어주는 함수

// export default connect(함수명)(Cart) 


// 이제는 위에 함수를 선언해서 reducer를 connect하지 않고! useSelector를 이용해서 연결을 시킨다
