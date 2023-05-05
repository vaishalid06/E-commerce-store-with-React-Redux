//slice feature is in redux-toolkit
//slice=basically we can organise our store data in small pieces,we can maintain data easily,complexiy get reduced
//--------------------------//
//in core redux-we cannot directly mutate the state,with reducers we can return a new state
//return[...state,action.payload];-->returning new arr //state=currentstate,action.payload=adding new item
//const initialState=[];-->not chaneing og arr,creating new state & assing to og arr
//in redux,we make reducers,actions{type:'add',payload:1} in diffrent place

const {createSlice} = require("@reduxjs/toolkit")
//declaring intial state
const initialState=[];

//creating slice //createSlice method creats actions,reducers
const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{//inside reducers we creates func with func we can change our state

    //Here we are doing state.push,we are directly mutate the state,state.push is allow here because of createSlice method
        add(state , action) {//add is a func,with calling add func we can add item into Add To Cart
            state.push(action.payload);//state=initialState=[];(empty arr),we push(add) data in arr,pushhing action.payload
        },

        remove(state , action) {//remove is a func,with calling remove func we can remove item from Add To Cart
             return state.filter((item)=>item.id !== action.payload);//when we remove item we pass item-id
                                                              //with filter we can remove item
        },

        //reducers are like func with reducers we can mutate(change) the state,
        //reducers are also a Pure Func-such func they dont have any side-effects 
        //                              cannot change the data of outside of this func
    },
});

export const {add,remove} = cartSlice.actions;//export actions[func]
export default cartSlice.reducer;//export reducers for store
//IMPORTANT
//create cartSlice-->make store(register reducers)-->in App.js with help of Provider we have to inject store in app