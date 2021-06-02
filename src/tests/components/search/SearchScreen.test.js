import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import SearchScreen from '../../../components/search/SearchScreen';

describe('<SearchScreen /> tests', () => {

    const historyMock = {
        push: jest.fn()
    }
    
    
    test('should render with the default values properly', () => {


        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );

        

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('input').text().trim() ).toBe('');
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a Hero');
        
    });
    
    test('should show Batman as result and the input should contain the queryString value', () => {


        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper.find('HeroCard').exists() ).toBe(true);
        
        
    });
    
    test('should show an alert containing the queryString value', () => {


        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=chapulin%20colorado']}>
                <Route path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );


        expect( wrapper.find('input').prop('value') ).toBe('chapulin colorado');
        expect( wrapper.find('HeroCard').exists() ).toBe(false);
        expect( wrapper.find('.alert-danger').text().trim() ).toBe(`There is no hero with chapulin colorado`);
        
        
    });

    test('should call the history PUSH method', () => {
        

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ () => <SearchScreen history={ historyMock } /> }/>
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'spiderman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( historyMock.push ).toHaveBeenCalledWith('?q=spiderman');


    });
    
    
    
    
});
