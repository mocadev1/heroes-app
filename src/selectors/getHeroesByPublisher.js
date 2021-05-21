import { heroes } from '../data/heroes';


export const getHeroesByPublisher = ( publisher ) => {

    const validPublishers = ['DC Comics', 'Marvel Comics'];

    if ( !validPublishers.includes( publisher ) ) {
        throw new Error(`Publisher "${publisher}" have been not found.
        Valid ones are "DC Comics" and "Marvel Comics". :)`);
    }
    
    return heroes.filter( hero => hero.publisher === publisher );
}