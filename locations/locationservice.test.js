const locationsService = require('../locations/locations.service')
const Location = require('../locations/locations.model')

jest.mock('../locations/locations.model')
// a partir de maintenant toutes les fonctions qui appellent locations.model
// => je leur renvoie une fausse donnée
// je ne me connecte PAS a pas bdd mongoDB

 describe('Location findAll', () =>{
     it('Should call model find', async () => {
         Location.find.mockResolvedValue([1, 2, 3, 4])
         expect(await locationsService.findAll()).toEqual([1,2,3,4])
         expect(Location.find).toHaveBeenCalledTimes(1)
     })
 });

describe('Location findOne', () =>{
    it('Should get a Location', async () => {
        const mockLocation = {
            _id:'kef8667jsbfjhrgjh625', filmName:"Jojo la crevette"
        }
        Location.findOne.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne({_id:'kef8667jsbfjhrgjh625'})).toEqual(mockLocation)
        expect(Location.findOne).toHaveBeenCalledTimes(1)
    })

    it('Should get a Location', async () => {
        jest.resetAllMocks()
        //pour reset car find va etre appelée plus qu'une fois
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne('kef8667jsbfjhrgjh625')).rejects.toThrow()
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
});

//j'appelle un service qui utilise un model
//je mock le model