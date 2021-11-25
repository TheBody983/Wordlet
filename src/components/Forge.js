import React, { useState, useEffect } from "react";

import { useUser } from "../providers/UserProvider";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Popup from 'reactjs-popup';

import WordTokenSoft from "./WordTokenSoft";

const Forge = () => {
	
	const { userWordTokens, getUserWordTokens } = useUser( )
	const { mintForgedToken } = useUser( )

	const [forgeWordTokens, setForgeWordTokens] = useState([]);
	const [collectionWordTokens, setCollectionWordTokens] = useState(userWordTokens);

	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if(userWordTokens && !initialized){
			reset();
			setInitialized(true);
		}
	});


	function reset(){
		getUserWordTokens();
		setCollectionWordTokens(userWordTokens);
		setForgeWordTokens([]);
	}

	function forge(wordTokens){
		if(wordTokens.length >= 2){
			mintForgedToken(wordTokens);
		} else{			
			return(
				<div>
					<Popup className="errorPopup" modal open={true}>
						<div className="card">Popup content here !!</div>
					</Popup>
				</div>
			)			
		}
	}

	const onDragEnd = (result) => {
		if(!result.destination) {
		  return;
		}

		if(result.source.droppableId === "droppableForge"){
			const forgeListCopy = Array.from(forgeWordTokens);
			const [removed] = forgeListCopy.splice(result.source.index, 1);
			if(result.destination.droppableId === "droppableForge"){
				forgeListCopy.splice(result.destination.index, 0, removed);
			} else if(result.destination.droppableId === "droppableCollection") {
				const collectionListCopy = Array.from(collectionWordTokens);
				collectionListCopy.splice(result.destination.index, 0, removed);
				setCollectionWordTokens(collectionListCopy);
			}
			setForgeWordTokens(forgeListCopy);

		} else if(result.source.droppableId === "droppableCollection"){
			const collectionListCopy = Array.from(collectionWordTokens);
			const [removed] = collectionListCopy.splice(result.source.index, 1);
			if(result.destination.droppableId === "droppableCollection"){
				collectionListCopy.splice(result.destination.index, 0, removed);
			} else if(result.destination.droppableId === "droppableForge") {
				const forgeListCopy = Array.from(forgeWordTokens);
				forgeListCopy.splice(result.destination.index, 0, removed);
				setForgeWordTokens(forgeListCopy);
			}
			setCollectionWordTokens(collectionListCopy);
		}
	  };


	return (
		
		<DragDropContext onDragEnd={onDragEnd}>
		<section id="forge">
			<div className="card">
				<label>Mots à forger : </label>
				<Droppable key="df" droppableId="droppableForge" direction="horizontal">
				{(provided) => (
					<div className="market-listings" style={{minHeight: 150, minWidth: 150}} ref={provided.innerRef} {...provided.droppableProps}>
						{
							Object.keys(forgeWordTokens).map((token, index) => {
							return (
								<Draggable key={token} draggableId={"df#"+token} index={index}>
									{(provided) => (
										<div ref = {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
											<WordTokenSoft key={forgeWordTokens[token]} tokenId={forgeWordTokens[token]}/>
										</div>
									)}
								</Draggable>
							)
							})
						}
					{provided.placeholder}
					</div>
				)}
				</Droppable>
				<Popup trigger={<button>Forger</button>} modal>
				{close => (
						forgeWordTokens.length < 2 ?
							<div className="card">
								<label>Veuillez selectionner plus de 2 mots à forger</label>
								<button className="button" onClick={() => { close(); }}> Ok </button>
							</div>	
						:
							<div className="card">
								<label>Êtes vous sûr de forger ces mots ? (ils ne pourront pas être dissociés par la suite)</label>
								<button onClick={() => forge(forgeWordTokens)}>Forger</button> 
								<button className="button" onClick={() => { close(); }}> Annuler </button>
							</div>							
				)}
				</Popup>
			</div>
			
			{
				collectionWordTokens &&
				<div className="card">
					<label>Vos mots : </label>
					<Droppable key="dc" droppableId="droppableCollection" direction="horizontal">
					{(provided) => (
						<div className="market-listings" style={{minHeight: 150, minWidth: 150}} ref={provided.innerRef} {...provided.droppableProps}>
						{
							Object.keys(collectionWordTokens).map((token, index) => {
							return (
								<Draggable key={token} draggableId={"dc#"+token} index={index}>
									{(provided) => (
										<div ref = {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
											<WordTokenSoft key={collectionWordTokens[token]} tokenId={collectionWordTokens[token]}/>
										</div>
									)}
								</Draggable>
							)
							})
						}
						{provided.placeholder}
						</div> 
					)}
					</Droppable>
				</div>
			}
			

			<button onClick={() =>  reset()}> Reinitialiser </button>
			<img src="forge_full.png" id="mountains_front" alt=""/>
		</section>
		</DragDropContext>
	)
}

export default Forge