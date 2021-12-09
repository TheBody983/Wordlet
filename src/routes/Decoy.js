import React, { useState, useEffect } from "react";
import  io from "socket.io-client";

import Header from "../components/Header";
import Providers from "../providers/Providers.comp";

import WaitingArea from "./WaitingArea";

var socket = ' ';

//Objet joueur
const player = {
    socketId : "",
    username : "",
    host : false,
    roomId : null,
    turn : false,
    listWords : [],
    playedWord : "",
    win : false
};

const Decoy = () =>{

	//Hooks nécessaires à la récupération de la liste des salons, du pseudo du joueur, du nom du salon et du passage à la fenêtre d'attente
    var [listRooms, setListRooms] = useState("");
	const [username, setUsername] = useState("");
    const [nameRoom, setNameRoom] = useState("");
    const [wait, setWait] = useState(false);

	//Code effectué à la montée du component, comparable à un ComponentDidMount()
    useEffect( () => {
        socket = io(); //Vérifier proxy package.json pour l'hebergement sinon : socket = io.connect('http://localhost:5000')
        socket.emit('get rooms');
        socket.on('list rooms', (rooms) => {  

            var list = '';

            if (rooms.length > 0) {
                rooms.forEach(room => {
                    if (room.players.length !== 6 ) {
                        list += `<ul>
                                    <center><p id = "displayRooms"> Salon ${room.name} de ${room.players[0].username} ${room.players.length}/6 </p></center>
                                    <center><button id = createButton data-room = ${room.id}> Rejoindre </button></center>
                                </ul>`;
                    }
                });
            }
            setListRooms(listRooms + list);
        });
		//Code effectué à la descente(?) du component, comparable à un ComponentWillUnMount()
        return () => {
            socket.disconnect();
        }
    }, [])

    //Créer un salon
    const createRoom = () => {

        player.socketId = socket.id;
        player.username = username;
        player.host = true;
        player.turn = true; //A modifier pour que ce soit aléatoire après ? 
        setWait(true);
        
        socket.emit('playerData', player, nameRoom);
    }

	//Rafraîchi la page afin d'avoir accès aux nouveaux salons  
	const reloadPage = () => {
		window.location.reload();
	}

    return(
        <Providers>
            <Header/>
            <section>
                <div id = "salons">
                    {!wait ? (
                        <div id = "settings">
                            <h3> Créer un salon</h3>
                            <input
                                type="text"
                                placeholder="Pseudo"
                                onChange={(event) => {
                                setUsername(event.target.value);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Nom du salon"
                                id = "inputNameRoom"
                                onChange={(event) => {
                                setNameRoom(event.target.value);
                                }}
                            />
                            <button onClick={createRoom} id = "createButton">Créer</button>
                            <h3> Salons disponibles </h3>
                            <div id = "settings" onChange = '' dangerouslySetInnerHTML = {{__html: listRooms}}/>
							<button onClick = {reloadPage}>Rafraichir</button>
                        </div>
						
                    ) : (
                        <WaitingArea />
                    )}
                </div>
                <img src="marche.png" id="marche" alt=""/>
            </section>
        </Providers>
    )
}

export default Decoy;