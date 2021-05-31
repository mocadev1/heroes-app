import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('authReducer tests', () => {
    
    test('should return the default state', () => {

        const state = authReducer( { logged: false }, {} );

        expect( state ).toEqual( { logged: false } );
        

    });
    
    test('should auth and collocate the user name', () => {

        const action =  {
            type: types.login,
            payload: {
                name: 'Omar',
                logged: false
            }
        }
        
        const state = authReducer( { logged: false }, action );

        expect( state ).toEqual( { name: 'Omar', logged: true } );
        
    });
    
    test('should delete user name and set logged on false', () => {
        const action =  {
            type: types.logout,
        }
        
        const state = authReducer( { name: 'Omar', logged: true }, action );

        expect( state ).toEqual( { logged: false } );
    });
    
    
});
