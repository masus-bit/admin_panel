import {ActionCreator} from './reducer.js'



export const Operations = {
    loadToStorage: (data) => (dispatch, _getState) => {
        data.usr.map((it)=>{

            localStorage.setItem(it.id,{name:it.name,email:it.email, password:it.password, number:it.number, created:it.created, changed:it.changed})
            dispatch(ActionCreator.init(localStorage.getItem(it.id)))
        })
        

      },
}