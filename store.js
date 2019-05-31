// The ultimate absolute store for the application.
// We use Redux for rapid development.
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const loggerMiddleware = createLogger()

const defaultState={
	"currentPanel": "dashboard",
	"dashboard": {
		"isFetching": false,
		"didInvalidate": false,
    "data": {

    }
	},
	"userInfo": {
		"isFetching": true,
		"didInvalidate": true,
    "data":{
      "userId": "",
      "userName": ""
    }
	},
	"apiList": {
		"isFetching": false,
		"didInvalidate": false,
		"data":{"items": []}
	},
	"apiEdit": {
		"isFetching": false,
		"didInvalidate": false,
		"dirty": false,
    "data":{
      "selectedApi": {
        "id": "",
        "name": "",
        "spec": ""
      }
    }
	},
	"bundleList": {
		"isFetching": false,
		"didInvalidate": false,
    "data":{
		  "items": []
    }
	},
	"bundleEdit": {
		"isFetching": false,
		"didInvalidate": false,
		"dirty": false,
		"data": {
      "selectedBundle":{
        "id": "",
        "name": "",
        "bundleData": ""
      }
		}
	}
}
//Reducers.
function createAsyncReducer(name){
  const suffix=name.toUpperCase();
  const initial_state=defaultState[name];
  const reducer=function(state=initial_state, action){
    switch(action.type){
      case "INVALIDATE_"+suffix:
        return Object.assign({}, state, {"didInvalidate": true});
      case "START_"+suffix:
        return Object.assign({}, state, {"didInvalidate":false, "isFetching": true});
      case "FINISH_"+suffix:
        return Object.assign({}, {"data":action.data, "isFetching": false, "didInvalidate": false });
      default:
        return state;
    }
  }
  return reducer;
}
function currentPanel(state=defaultState.currentPanel, action){
  switch(action.type){
    case "SWITCH_PAGE":
      return action.page;
    default:
      return state;
  }
}
const async_reducers=["userInfo", "apiList", "apiEdit", "bundleList", "bundleEdit"].reduce(
(obj, x)=>Object.assign(obj, {[x]: createAsyncReducer(x)}), {});

const rootReducer=combineReducers(Object.assign({currentPanel}, async_reducers));

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)
import {connect as rconnect} from 'react-redux'
export const my_connect=(component)=>{
  //component.propTypes=Object.assign({}, component.propTypes, {"store": PropTypes.object.isRequired});
  return rconnect((state=>{
      return {"store": state}
    }),(
    dispatch=>{
      return {"dispatch": dispatch}
    }
  ))(component);

}
export const connect=my_connect;