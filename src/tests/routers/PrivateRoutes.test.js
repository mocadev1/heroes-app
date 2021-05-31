import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import PrivateRoutes from '../../routers/PrivateRoutes';

describe('<PrivateRoutes /> tests', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }
    
    Storage.prototype.setItem = jest.fn();
    
    test('should display component whether is authenticated and write on localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes 
                    isAuthenticated={ true }
                    component={ () => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );


        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
        
    });

    test('should block the component whether is not authenticated', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes 
                    isAuthenticated={ false }
                    component={ () => <span>Blocked!</span> }
                    { ...props }
                />
            </MemoryRouter>

        );

        expect( wrapper.find('span').exists() ).toBe(false);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
        
    });
    
    
})
