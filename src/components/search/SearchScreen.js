import React from 'react'
import { heroes } from '../../data/heroes'
import HeroCard from '../heroes/HeroCard';
import useForm from '../../hooks/useForm';

const SearchScreen = () => {

    const heroesFiltered = heroes;
    
    const [ { searchText }, handleInputChange ] = useForm({
        searchText: ''
    })

    const handleSearch = (e) => {
        e.preventDefault();
        console.log( searchText );
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
                        heroesFiltered.map( hero => (
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