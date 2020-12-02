import React, {useState} from 'react'
import './App.css';

function Form(props) {
  const [formData, setFormData] = useState({
    localidades: '',
    data_ini: '',
    data_fim: '',
    page_tam: ''
  });
  const onChange = e => {
    console.log(e.target.value)
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const {localidades, data_ini, data_fim, page_tam} = formData;
  
  const onSubmit = async e => {
    e.preventDefault();
    const args = {
      localidades,
      data_ini,
      data_fim,
      page_tam
    }
    setFormData({
      localidades: '',
      data_ini: '',
      data_fim: '',
      page_tam: ''
    });
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/metar',
          {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(args)
          }
      )
      const responseData = await response.json();
      console.log(responseData);
      if(!response.ok){
        throw new Error('')
      } else {
        props.setResponse(responseData.data);
      }

    } catch (err) {
      console.log("error")
    }
  }

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
      <p>Insira as localidades separadas por vírgula.</p>
      <input className="form-text" type="text" placeholder="Localidades" name="localidades"
          value={localidades} 
          onChange={e => onChange(e)} />
      </div>
      <div className="form-group">
      <label target='data_ini' style={{display: 'inline-block', width: '150px'}}>Data de início: </label>
      <input type="datetime-local" name="data_ini"
          value={data_ini} 
          onChange={e => onChange(e)} />
      </div>
      <div className="form-group">
      <label target='data_fim' style={{display: 'inline-block', width: '150px'}}>Data final: </label>
      <input type="datetime-local" name="data_fim"
          value={data_fim} 
          onChange={e => onChange(e)} />
      </div>
      <div className="form-group">
      <label target="number" style={{display: 'inline-block', width: '150px'}}>Tamanho da página: </label>
      <input type="number" name="page_tam"
          value={page_tam}
          onChange={e => onChange(e)} />
      </div>
      <input type="submit" className="btn" value="Submit" />
    </form>
  )
}

function App() {
  const [response, setResponse] = useState();
  return (
    <div className="App">
      <h1 className="header">Swim Met</h1>
      <Form setResponse={setResponse} />
      {response && response.map( data => <p style={{backgroundColor: "azure"}}>{JSON.stringify(data)}</p>)}
    </div>
  );
}

export default App;
