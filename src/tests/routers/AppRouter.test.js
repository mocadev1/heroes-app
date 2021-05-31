import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import AppRouter from '../../routers/AppRouter';

describe('<AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    
    test('should display \'/login\' whether is not authenticated', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );
        

        console.log( wrapper.html() );
        expect( wrapper.find('h1').text() ).toContain('Login');
        expect( wrapper ).toMatchSnapshot();
    });

    test('should display <MarvelScreen /> whether is authenticated', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );


        expect( wrapper.find('.navbar').exists() ).toBe(true);


    });
    
    
});
