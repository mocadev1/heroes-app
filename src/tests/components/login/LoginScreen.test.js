import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import LoginScreen from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('<LoginScreen /> tests', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };
    
    const historyMock = {
        replace: jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ historyMock }/>
        </AuthContext.Provider>
    );
    
    test('should render correctly', () => {

        expect( wrapper ).toMatchSnapshot();
        
    });
    
    
    test('should make the dispatch and navigation', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');
        
        handleClick();
        
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Omar'
            }
        });
        expect( historyMock.replace ).toHaveBeenCalledWith('/');


        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect( historyMock.replace ).toHaveBeenCalledWith('/dc');
        
    });
    
    
});
