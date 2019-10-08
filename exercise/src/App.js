import React from 'react';
import './App.css';

import RecordLabelItem from './components/recordLabelItem';
import DataLayer from './services/dataLayer';

const dataLayer = new DataLayer();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordLabels : []
    };
  }
  
  componentDidMount(){
    dataLayer.getfestivals().then( resp => {
      this.setState({recordLabels : resp})
    });
  }


  render() {
    const records = this.state.recordLabels.map(r => <RecordLabelItem recordobj={r} />)
    return (
      <div>
        { records }
      </div>
    );
  }
  
}

export default App;
