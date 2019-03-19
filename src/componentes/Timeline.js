import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';

export default class Timeline extends Component {
  constructor(props){
    super(props);
    this.state={fotos:[]};
    this.login=this.props.login;
  }

  componentWillMount(){
    Pubsub.subscribe('timeline',(topico,fotos) => {
      this.setState({fotos});
    })
  }

  carregaFotos(){
    let urlPerfil;
    if (this.login===undefined) {
      urlPerfil=`https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;    
    }else{
      urlPerfil=`https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;    
    }

    fetch(urlPerfil)
    .then(response => response.json())    
    .then(fotos => {
      this.setState({fotos:fotos});
    });
    console.log(urlPerfil);
  }
  
  componentDidMount(){
    this.carregaFotos();
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.login !== undefined) {
      this.login=nextProps.login;
      this.carregaFotos();
    }
  }
  
  render(){
        return (
        <div className="fotos container">
          {
            this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>)
          }
        </div>            
        );
    }
}