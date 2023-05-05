// when some situation occurs where-
// 1)in that we have to call api or any other processing as asynchronus task which we have to do in store in reducers
// 2)we are displaying products by the components but this displaying of products we have to do with reducers
// 3)we are calling api with useEffect(fetch & json)

// IS REALLY WE WANT TO STORE OUR PRODUCTS IN REDUX-STORE?
// a)if your products or data is used by multiple pages 
// --> in our case our product is displaying only on home page not by multiple pages so doesnt need to store products or data in redux-store
// b)in STORE we only store that data which used on multiple places or that data share by multiple component in our app
// --> just like eg. if we have different category(used in dropdown on navbar or filters) in our app 
//     so you can store this category in STORE(because it used at multiple) places
// c)but here we dont have category so we store products in reducers in STORE(how we do asynchronus call)

const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit")
//declaring intial state

//with use of js obj we can create enum like mechanism //freeze=read only
export const STATUSES=Object.freeze({//freeze=for not changing value by anyone,from outside cannot change the property
    IDLE:'idle',
    SUCCESS:'success',
    ERROR:'error',
    LOADING:'loading',
})

//creating slice //createSlice method creats actions,reducers
const productSlice= createSlice({
    name:"product",
    //initialState is obj here,when we call any api it has a lot of problems like it take time for fetching requested data
    //for that we have to maintain or track the status for that in ui we to put loading etc..
    //whwnever we put string as a 'status's value,best way use 'enum' but enum is in typescript not in js
    initialState:{
        data:[],//data=product list
        status:STATUSES.IDLE,//status=status request eg.loading..,error..
    },
    reducers:{//inside reducers we creates func with func we can change our state

    //CANNOT CALL ASYNCHORNUS CALL IN REDUCERS ,api call can be a side-effect
    //WE CAN ONLY CALL SYNCHRONUS CALL IN REDUCERS BECAUSE ITS PURE FUNC(NO SIDEEFFECT)
    //for requesting data from api in reducers we use Thunk middleware
    //setProducts,setStatus are for asynchronus flow or call [[using normal manual thunk]]
 
        // setProducts(state , action) {
        //     state.data=action.payload;//product get by payload & st it in data
        // },

        // setStatus(state , action) {
        //     state.status=action.payload;
        // },

        //reducers are like func with reducers we can mutate(change) the state,
        //reducers are also a Pure Func-such func they dont have any side-effects 
        //                              cannot change the data of outside of this func
    },

    //extraReducers are for asynchronus flow or call [[using redux-toolkit thnuk]]
    //promise | conventions are used by createAsyncThunk which automatically dispatch actions
    //createAsyncThunk generates 3 actions-->pendind,fulfilled,rejected
    extraReducers:(builder)=>{//builder is their api
      builder
        .addCase(fetchProducts.pending,(state , action)=>{//not dispatch manually,it automatically do
           state.status=STATUSES.LOADING;
        })
        //if we want add another method we do method-chainig
        .addCase(fetchProducts.fulfilled,(state , action)=>{
           state.data=action.payload;//if action is fulfilled then we have to set the data,fetchProducts.fulfilled action send data in action.payload
           state.status=STATUSES.SUCCESS;
        })
        .addCase(fetchProducts.rejected,(state , action)=>{
            state.status=STATUSES.ERROR;
        })
    }
});

export const {setProducts,setStatus} = productSlice.actions;//export actions[func],also use in thunk because we destrucred the setProducts
export default productSlice.reducer;//export reducers for store

//"Thunk"= the word "Thunk" is a programming term that means "a piece of code that does some delayed work"
//Rather than execute some logic now,we can write a function body or code that can be used to perform the work later.
//"Thunk"is middleware in redux,in core or previous redux we have to include "Thunk" when we configure our store
//in redux-toolkit "Thunk" is inbuild & alredy configured
//2 types of "Thunk", "Thunk" IS A FUNCTION
//1)normal 2)thunk method by redux-toolkit

//"Thunk" - for asynchronus flow or call[NORMAL WAY=MANUALLY]
//if flow or call is symchronus no need of "Tnunk"

// export function fetchProducts(){//when call this func that time parameter pass by the func received here
//    //Thunk alredy a func,but inside this func we return a new func
//    return async function fetchProductThunk(dispatch, getState){//return new fun has to be async //getState=get the current state
//     dispatch(setStatus(STATUSES.LOADING));//before start the request the status is loading..
//          try{//try catch block for any error comes ,we are doing network request

//             const res=await fetch('https://fakestoreapi.com/products');
//             const data=await res.json();
// //after this we get data,after get data if "dispatch"[fetchProductThunk(dispatch, getState)] func is available then we dispatch action[here no need of getState]
// action=setProducts,in action data send in payload,that data store in state
//             dispatch(setProducts(data));//after processing request set data
//             dispatch(setStatus(STATUSES.SUCCESS));//after setting data set status

//          }catch(err){
//          console.log(err);//if any error then print on console
//          dispatch(setStatus(STATUSES.ERROR));//for that setting status

//          }
//   }
// }//dispatch "Thnuk" in product.js
//animation tutorial - redux offical website-->redux fundamentals-->1)redux concep-->2)async logic
//ss in phone 0f 22 april 2023

//"Thunk"[BY REDUX-TOOLKIT]
//createAsyncThunk method by redux-toolkit
//createAsyncThunk is for better error-handling
//promise have diff states-->1)[when we call promise 1st state]"pending"
//                        -->2)[if 1st state is get sucess then ]"fulfill"
//                        -->3)[if any error]"rejected"
//promise | conventions are used by createAsyncThunk which automatically dispatch actions
export const fetchProducts=createAsyncThunk('products/fetch',async ()=>{ //1st parameter='products/fetch'=identifier //2nd parameter is async func
    const res=await fetch('https://fakestoreapi.com/products');
    const data=await res.json();
    return data;
})

