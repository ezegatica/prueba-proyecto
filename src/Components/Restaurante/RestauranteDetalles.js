import React, { Component } from 'react'
import { db } from '../../Config/fbConfig'
import { Link } from 'react-router-dom'

export class RestauranteDetalles2 extends Component {
    state = {
        productos: null,
        nombreRestaurante: null,
        e404: null,
        imagen: null,
        cat1: null,
        cat2: null
    }

    componentDidMount() {
        let urlID = this.props.match.params.id;
        // console.log(urlID)
        db.collection('restaurantes').doc(urlID).collection('productos').get()
            .then(snapshot => {
                const Productos = []
                snapshot.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Productos.push({ info, id })
                })
                this.setState({ productos: Productos })
            }).catch(error => console.log(error))
        db.collection('restaurantes').doc(urlID).get()
            .then(snapshot => {
                this.setState({ 
                    nombreRestaurante: snapshot.data().nombre, 
                    imagen: snapshot.data().foto,
                    cat1: snapshot.data().cat,
                    cat2: snapshot.data().cat2,
                })
            }).catch(error => {
                console.log(error)
                if (error.message === "Cannot read property 'nombre' of undefined") {
                    console.log("EL ERROR BRO")
                    this.setState({ e404: true })
                }
            })
    }
    render() {
        if (this.state.e404 === true) {
            return (
                <div className="container center">
                    <h3>Error 404</h3>
                    <h5>El restaurante no ha sido encontrado, puede haber sido movido o eliminado</h5>
                    <Link to="/"><h6>Volver a la home</h6></Link>
                    <Link to="/restaurantes"><h6>Volver a los restaurantes</h6></Link>
                </div>
            )
        }
        if (this.state.productos !== null && this.state.nombreRestaurante !== null) {
            return (
                <div className="container">
                    <Link to="/restaurantes">Atras</Link>
                    <div className="center container fotoResto-container">
                        <img src={this.state.imagen || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media"} alt={"LOGO DE " + this.state.nombreRestaurante} className="responsive-img circle z-depth-3" /> <br />
                    </div>
                    <h4 className="center">{this.state.nombreRestaurante}</h4>
                    <p className="center"><b>Categorias:</b> {this.state.cat1}{this.state.cat2 && ", " + this.state.cat2}</p>
                    <hr />
                    <h4>Productos: </h4>
                    {this.state.productos && this.state.productos.map(producto => {
                        return (
                            <div className="card z-depth-0 proyect-summary grey lighten-3" key={producto.id}>
                                <Link to={"/restaurantes/" + producto.info.autorUUID + "/" + producto.id}>
                                    <div className="card-content grey-text text-darken-3 lista-proyectos row">
                                        <div className="col s4 m4 l3 xl2">
                                        <img src={producto.info.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} alt="" className="responsive-img z-depth-3"/> <br/>
                                        </div>
                                        <div className="col s8 m8 l9 xl10">
                                        <span className="card-title" title={producto.info.titulo}><b>{producto.info.titulo}</b></span>
                                        <p><b>Precio: </b>${producto.info.precio}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className="center">
                    <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                        <div></div><div></div><div></div><div></div>
                    </div></div>
                </div>
            )
        }

    }
}
export default RestauranteDetalles2