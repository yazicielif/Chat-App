import React, { Component } from "react"
import "./Broadcast.css";
import { socket } from '../../services/socketService'
import Button from 'react-bootstrap/Button'

class Broadcast extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
    }


    gonder = () => {
        socket.emit('broadcastGonder', {mesaj:'Bu bir broadcast mesajdır.'})
    }


    render() {
        return (
            <>
                <Button onClick={this.gonder}>Broadcast Gönder</Button>
            </>


        )
    }
}

export default Broadcast;