import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import HeroScreen from '../../../components/heroes/HeroScreen';

describe('<HeroScreen /> tests', () => {
    
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    };
    
    
    test('should render the Redirect component whether there is no arguments in URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ history }/>
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('should show a hero whether a parameter exists and is found', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-daredevil']}>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('p').text().trim() ).toBe('Matthew Michael Murdock');
    });

    test('should go back to the previous screen with PUSH', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-daredevil']}>
                <Route
                    path="/hero/:heroId"
                    component={ (props) => <HeroScreen history={ history } />} />
            </MemoryRouter>
        );
        

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();

        
    });

    test('should go back to the previous screen with GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-daredevil']}>
                <Route
                    path="/hero/:heroId"
                    component={ (props) => <HeroScreen history={ history } />} />
            </MemoryRouter>
        );
        

        wrapper.find('button').prop('onClick')();

        expect( history.push ).not.toHaveBeenCalled();
        expect( history.goBack ).toHaveBeenCalled();

        
    });

    test('should call Redirect component whether does not exist', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-daredevil-fadfkañdfj']}>
                <Route
                    path="/hero/:heroId"
                    component={ (props) => <HeroScreen history={ history } />} />
            </MemoryRouter>
        );


        expect( wrapper.html() ).toBe('');
        
        
    });
    
    
    
    
    
});
