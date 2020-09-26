import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {Link} from 'react-router-dom'
import Filtros from '../Layout/Filtros'
import ShowRestaurante from './ShowRestaurante'

export class RestaurantesFiltro extends Component {
    state = {
        restaurantes: null,
        e404: null
    }
    leerDB () {
            this.setState({restaurantes: null})
        db.collection('restaurantes').get()
        .then(snapshot =>{
            console.log("REQUESTING DB")
            const Restaurantes = []
            snapshot.forEach(doc =>{
                const info = doc.data()
                const id = doc.id;
                const cat = doc.data().cat
                const cat2 = doc.data().cat2
                let categoria = this.props.match.params.filtro
                 if (cat === categoria || cat2 === categoria){
                    Restaurantes.push({info, id})
                    this.setState({e404: false})
                }
            })
            this.setState({restaurantes: Restaurantes})
        }).catch(error => console.log(error))
        .then(()=> {
            if (this.state.restaurantes.length === 0){
               this.setState({e404: true})
            }
        })
    }
    componentDidMount(){
        this.leerDB()
    }
    render(props) {
        console.log(this.props);
        if (this.state.e404 === true){
            return(
                <div className="container center">
                    <h3 className="center">Pedir {this.props.match.params.filtro}!</h3>
                    <div className="filtros-afuera-container"><Filtros onClick={()=> this.leerDB()}/></div>
                    <h5>La categoria que has intentado buscar no se encuentra disponible! Puede ser que se haya cambiado de nombre o eliminado!</h5>
                    <Link to="/"><h6>Volver a la home</h6></Link>
                    <Link to="/restaurantes"><h6>Volver a los restaurantes</h6></Link>
                </div>
            )
        }
        let Cargando = this.state.restaurantes ? 
        null :
        <div className="caja">
                    <div className="centrado">
                    <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
            <div></div><div></div><div></div><div></div>
            </div></div>                    </div>
                </div>
       
        return (
            <>
                <h3 className="center">Pedir {this.props.match.params.filtro}!</h3>
                <div onClick={()=> this.leerDB()}><Filtros /></div>
                {Cargando}
                <div className="lista-restaurantes row">
                {this.state.restaurantes && this.state.restaurantes.map (restaurant =>{
                        return(
                            <ShowRestaurante restaurant={restaurant} key={restaurant.id}/>

                        )
                })}
                </div>
            </>
        )
    }
    
}

export default RestaurantesFiltro