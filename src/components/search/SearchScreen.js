import React, { useMemo } from 'react';
import queryString from 'query-string'

import HeroCard from '../heroes/HeroCard';
import useForm from '../../hooks/useForm';
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';

const SearchScreen = ({ history }) => {

    const location = useLocation();

    const { q = '' } = queryString.parse( location.search )
    
    const [ { searchText }, handleInputChange ] = useForm({
        searchText: q
    });

    
    const filteredHeroes = useMemo( () =>  getHeroesByName( q ), [ q ] )


    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${ searchText }`)
    }
    
    
    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />

                    <form
                        onSubmit={ handleSearch }
                        className="d-grid"
                    >

                        <input
                            type="text"
                            name="searchText"
                            placeholder="Find your hero!"
                            value={ searchText }
                            onChange={ handleInputChange }
                            autoComplete="off"
                            className="form-control"
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                        
                    </form>

                </div>

                <div className="col-7">

                    <h4> Results </h4>
                    <hr />

                    {
                        (q === '' )
                            &&
                            <div className="alert alert-info">
                                Search a Hero
                            </div>
                    }

                    {
                        (q !== '' && filteredHeroes.length === 0 )
                            &&
                            <div className="alert alert-danger">
                                There is no hero with { q }
                            </div>
                    }

                    {
                        filteredHeroes.map( hero => (
                            <HeroCard
                                key={ hero.id }
                                { ...hero}
                            />
                        )) 

                        
                    }
                    
                </div>


            </div>
        </div>
    )
}

export default SearchScreen