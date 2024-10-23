import axios from "axios"

export const fetchInventoryData = async () => {
    try{
        // const response = await axios.get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')

        //fetching data from local file as the api was constatly giving errors. Tried on Postman as well. 
        const response = await axios.get('/data.json')
        return response
    }
    catch (error){
        throw error
    }
}