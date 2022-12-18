const locationsService = require('../locations/locations.service')
const Location = require('../locations/locations.model')

jest.mock('../locations/locations.model')
// a partir de maintenant toutes les fonctions qui appellent locations.model
// => je leur renvoie une fausse donnée
// je ne me connecte PAS a pas bdd mongoDB
beforeEach(()=>{
    jest.resetAllMocks()
})

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


describe('Location createOne', () =>{
    it('should saves a new location to the database', async () => {
        const data = {filmType: "Long métrage",
            filmProducerName: "TEST",
            endDate:"2018-11-05T00:00:00.000+00:00",
            filmName: "TEST", district: "75004",
            sourceLocationId: "2018-131211",
            filmDirectorName: "Laura LILI",
            address:"pont louis-philippe, 75004 paris",
            startDate:"2018-11-05T00:00:00.000+00:00",
            year:"2018"}
        const saved = jest.fn().mockResolvedValue();
        Location.mockImplementation(() => ({
            saved
        }));

        await locationsService.createOne(data);

        expect(Location.create).toHaveBeenCalledWith(data);
        expect(saved).toHaveBeenCalled();
    });

    it('should throws an error if the data is invalid', async () => {
        jest.resetAllMocks()
        const data = {};
        const saved = jest.fn().mockResolvedValue(new Error('Wrong data'));
        Location.mockImplementation(() => ({
            saved
        }));
        try {
            await locationsService.createOne(data);
        } catch (error) {
            expect(error.message).toBe('Wrong data');
        }
    });
})

describe('Locations deleteOne', ()=>{
    it('should delete an existing location', async () => {
        const id = '1234';
        Location.findOneAndDelete.mockResolvedValue("Valid");
        await locationsService.deleteOne(id);
        expect(Location.findOneAndDelete).toHaveBeenCalledWith({ _id: id });
    });

    it('should throws an error if the location does not exist', async () => {
        jest.resetAllMocks()
        const id = '123456789';
        const deleteLocation = jest.fn().mockResolvedValue();
        Location.deleteOne = deleteLocation;
        try {
            await locationsService.deleteOne(id);
        } catch (error) {
            expect(error.message).toBe('Location not found');
        }
    });
})


//Test of updateLocation function, with a valid and an unknown location
describe('Locations updateLocation', ()=>{
    it('should update an existing location', async () => {
        const id = '123456';
        const update = { name: 'Great One', country: 'USA' };
        const location = {};
        const updateOne = jest.fn().mockResolvedValue("Valid");
        Location.updateOne = updateOne;

        await locationsService.updateLocation(id, update);
        expect(updateOne).toHaveBeenCalledWith({ _id: id }, update);
    });

    it('should throws an error if the location does not exist', async () => {
        jest.resetAllMocks()
        const id = '123456';
        const update = { name: 'Great One', country: 'USA' };
        const updateOne = jest.fn().mockResolvedValue(null);
        Location.updateOne = updateOne;
        try {
            await locationsService.updateLocation(id, update);
        } catch (error) {
            expect(error.message).toBe('Location not found');
        }
    });
})
