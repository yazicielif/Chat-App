import React, { Component } from "react"
import { socket } from '../../services/socketService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            username: '',
            password: '',
        }

    }

    componentDidMount() {
        socket.on("register", data => {
            console.log(data);
            if (data.response) {
                this.props.history.push("/Login");
            }
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        socket.emit("register", {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="join-container">
                <header className="join-header">
                    <h1><i className="fas fa-smile"></i> Chat App</h1>
                </header>
                <main className="join-main">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Email giriniz..." onChange={this.onChange} />

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Kullanıcı Adı</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Kullanıcı adı giriniz..." onChange={this.onChange} />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Şifre giriniz..." onChange={this.onChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.onSubmit}>
                            Kayıt Ol
                        </Button>
                    </Form>


                    <Link to={"/login"}>
                        <Button variant="primary" type="submit" >
                            Oturum Aç
                        </Button>
                    </Link>


                </main>
            </div>

        )
    }
}

export default Register;