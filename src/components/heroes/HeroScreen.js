import React from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroesById as getHeroById } from '../../selectors/getHeroById';

const HeroScreen = () => {

    const { heroId } = useParams();

    const hero = getHeroById( heroId );

    if ( !hero ) {
        return <Redirect to="/" />;
    }

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;
    

    return (
        <div>
            <h1>HeroScreen</h1>
        </div>
    )
}

export default HeroScreen
