import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import  { BrowserRouter } from 'react-router-dom'; // 리액트 라우터 세팅

import {Provider} from 'react-redux' // 리액트 리덕스 사용 세팅 -> 같은 State를 사용하고 싶은 곳을 아래에서 <Provider>로 묶에 준다.
import { combineReducers, createStore } from 'redux'; // createStore를 이용해서 state관리를 쉽게 할 수 있다.
//state.findIndex((a)=>{return a.id === action.payload.id})
let item = [
  { id:0, name:'White and Black', quan : 2 }, 
  { id:1, name:'Red Knit', quan : 21 }, 
  { id:2, name:'Grey Yordan', quan : 112 }
  ]

function reducer(state = item, action){
  if( action.type === 'add_item_to_cart'){
    let imi = state.findIndex((a)=>{return a.id === action.payload.id });

    if(imi>=0){
      let copy_item = [...item];
      copy_item[action.payload.id].quan++;
      return copy_item;
    }
    else{
      let copy_item = [...item];
      copy_item.push(action.payload);
      return copy_item;
    }
    
  }
  if( action.type === 'add_quan'){
    let copy_item = [...item];
    copy_item[action.data].quan++;
    return copy_item;
  }
  else if( action.type === 'minus_quan' && item[action.data].quan>0 ){
    let copy_item = [...item];
    copy_item[action.data].quan--;
    return copy_item;
  }
  else{
    return state
  }
}


// 카트에 알러트 창을 지우는 redux를 만들고자 한다.
let cart_alert = true;

function reducer2(state = cart_alert, action){
  if( action.type === 'exit_alert' ){
    state = false;
    return state
  }
  else{
    return state
  }

}


let store = createStore(combineReducers({ reducer, reducer2 })); //1. state초깃값을 넣어서 생성해줄 수 있다. 그런다음 props처럼 Provider에게 전송해준다.
                                                                    //1. createStore 함수값으로 들어가던 내용을 리듀서로 옮겼다.
                                                                    // state보관통인 store 생성 완료!










ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
