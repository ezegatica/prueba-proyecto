import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SignUpResto from '../Auth/SignUpResto'
import ConvertToResto from '../Admin/ConvertToResto'
import Posts from '../Admin/Posts'
import MakeAdmin from '../Admin/MakeAdmin'
import DebugTools from '../Admin/DebugTools'
export class Admin extends Component {
    render() {
        if (this.props.profile.isLoaded) {
            if (this.props.profile.isAdmin) {
                document.title = process.env.REACT_APP_NAME + ' - Admin';
                return (
                    <>
                        <h3 className="center">Bienvenido al panel de control ultra-secreto</h3>
                        <hr />
                        <div className="container">
                            <DebugTools />
                        </div>
                        <hr />
                        <div className="container">
                            <SignUpResto />
                        </div>
                        <hr/>
                        <div className="container">
                            <Posts/>
                        </div>
                        <hr/>
                        <div className="container">
                            <MakeAdmin/>
                        </div>
                        <hr/>
                        <div className="container">
                            <ConvertToResto />
                        </div>
                    </>
                )
            }
            else {
                return (
                    <Redirect to="/profile" />
                )
            }
        } else {
            return (
                <div className="caja">
                    <div className="centrado">
                        <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                            <div></div><div></div><div></div><div></div>
                        </div></div>
                    </div>
                </div>)
        }

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Admin)