import React, { Component } from "react"
import { socket } from '../../services/socketService'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Room extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            room: 'dark',
            kisiUsername: ""
        }
    }

    componentDidMount() {
        this.setState({ username: localStorage.getItem('username') })
    }


    change = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }





    render() {
        return (
            <>
                <div className="join-container">
                    <header className="join-header">
                        <h1><i className="fas fa-smile"></i> Chat App</h1>
                    </header>
                    <main className="join-main">
                        <Form>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Oda seç:</Form.Label>
                                <Form.Control name="room" onChange={this.change} as="select" custom>
                                    <option value="dark">Dark</option>
                                    <option value="limitless">Limitless</option>
                                    <option value="12monkeys">12Monkeys</option>
                                </Form.Control>
                            </Form.Group>

                            <Link to={`/roomChat/${this.state.room}`}>
                            <Button variant="primary" type="submit" onClick={this.onSubmit}>
                            Odaya Katıl
                        </Button>
                        </Link>
                        </Form>

                        <Link to={"/broadcast"}>
                        <Button variant="primary" type="submit" onClick={this.onSubmit}>
                            Yayın
                        </Button>
                    </Link>
                       
                    </main>
                </div>
                
                
                
               

                <div className="join-container">
                    <header className="join-header">
                        <h1><i className="fas fa-smile"></i> Chat App</h1>
                    </header>
                    <main className="join-main">
                    <Form>
                      

                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Kullanıcı Adı</Form.Label>
                          <Form.Control type="text" name="kisiUsername" placeholder="Kullanıcı adı giriniz..." onChange={this.change}/>
                        
                      </Form.Group>

                      <Link to={`/C2CRoom/${this.state.kisiUsername}`}>
                      <Button variant="primary" type="submit" onClick={this.onSubmit}>
                          Sohbete Katıl
                      </Button>
                      </Link>
                  </Form>
                        
                    </main>
                </div>


            </>


        )
    }
}

export default Room;