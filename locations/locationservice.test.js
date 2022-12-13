const locationsService = require('../locations/locations.service')
const Location = require('../locations/locations.model')

jest.mock('../locations/locations.model')
// a partir de maintenant toutes les fonctions qui appellent locations.model
// => je leur renvoie une fausse donnée
// je ne me connecte PAS a pas bdd mongoDB

 describe('Location findAll', () =>{
     it('Should call model find', async () => {
         Location.find.mockResolvedValue([1,2,3,4])
         await (locationsService.findAll()).toEqual([1,2,3,4])
         expect(Location.find).toHaveBeenCalledTimes(1)
     })

 });