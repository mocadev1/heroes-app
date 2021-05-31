import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

describe('<Navbar /> tests', () => {

    const historyMock = {
        push: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
        location: {}
    };
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Omar'
        }
    };
    
    const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach( () => {
        jest.clearAllMocks();
    });
    

    test('should render properly and contain a span with the user name', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('span').text().trim() ).toBe('Omar');
    });

    test('should logout the user when clicking Logout button and use history', () => {

        wrapper.find('button').simulate('click');
        
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');

        
    });
    
    
    
});
