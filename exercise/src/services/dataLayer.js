import axios from 'axios';

class DataLayer{
    
    //_getfestivals = "http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals";
    _getfestivals = "http://localhost:8001/festivals";
    
    /* resposible for returning formatted data to display*/
    getfestivals = () =>{
        var promise = new Promise((resolve,reject) => {
            
            axios.get(this._getfestivals,
                {'Retry-After' : 1200,
                crossdomain : true,
                'Access-Control-Allow-Origin': '*'})
            .then(response =>{ 
                resolve(this.formatData(response.data));
            })
            
            .catch(error => error.status);
        })
        return promise;
    }

    /* responsble formatting data */
    formatData = data =>{
        /*array of all bands 
           Model
           {
               name: string,
               recordLabel: string,
               festival: string
           }
        */
        let bands =[];
        data.map(festival=>{
            const bandFestival = festival.bands.map(band =>{
                band.recordLabel = band.recordLabel || '';
                band.festival = festival.name || '';
                return band;
            });
            return bands = [...bands,...bandFestival];
        });
        //unique record labels
        const recordLabels =([...( new Set( bands.map(y => y.recordLabel)))]);
        /* formatted data model
           {
               name: string,
               bands:[]
           }
           band model
           {
               name: string,
               festivals: [] //array of strings
           }
        */
        const formattedData = recordLabels.sort().map((label, l_index )=> {
            let recordLabel = {"key": "record"+l_index,"name": label || ""};
            let bands_Record = (bands.filter(band =>band.recordLabel === label));
            recordLabel.bands = [...( new Set( bands_Record.map(y => y.name)))].sort().map( (name, n_index) =>{
                let recordLabelBands = {"name": name, "key": "band"+n_index};
                recordLabelBands.festivals =[...( new Set( (bands_Record.filter(y => y.name === name))
                    .map(b => b.festival)))].sort();
                return recordLabelBands;
            })
            return recordLabel;
        })
        return formattedData.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }   
}

export default DataLayer;
