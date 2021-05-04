import React  from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url_person = "https://swapi.dev/api/people/";

class App extends React.Component {
  state={
    data:[{nombre: 'alex'}],
  }

  peticionGet=()=>{
    axios.get(url_person).then(response=>{
      this.setState({loading:false, data: response.data.results});
      //console.log(response.data.results)
    })
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar})
  }

  componentDidMount(){
    this.peticionGet();
  }

  render(){  
    return (
      <div className="App">
        <br/>
        <button className="btn btn-success" onClick={()=>this.modalInsertar()}>Agregar persona</button>
        <br/><br/>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>País</th>
              <th>Capital Bursatil (en millones de USD)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map(persona=>{
          return(
            <tr>
          <td>{persona.birth_year}</td>
          <td>{persona.name}</td>
          <td>{persona.gender}</td>
          <td>{new Intl.NumberFormat("en-EN").format(persona.capital_bursatil)}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarPersona(persona); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarPersona(persona); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
          </td>
          </tr>
          )
        })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input className="form-control" type="text" name="id" id="id" readOnly></input>
              <br/>
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" type="text" name="nombre" id="nombre"></input>
              <br/>
              <label htmlFor="pais">País</label>
              <input className="form-control" type="text" name="pais" id="pais"></input>
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success">Insertar</button>
            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default App;
