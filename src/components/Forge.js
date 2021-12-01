import React, { useState, useEffect } from "react"

import { useUser } from "../providers/UserProvider"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import Popup from 'reactjs-popup'

import WordTokenSoft from "./WordTokenSoft"

const Forge = () => {
	
	const { allWordTokenDatas, getAllWordTokenDatas} = useUser( )
	const { mintForgedToken } = useUser( )

	const [forgeWordTokens, setForgeWordTokens] = useState([])
	const [collectionWordTokens, setCollectionWordTokens] = useState([])

	useEffect(() => {
		if(allWordTokenDatas){
			reset()
		} 
	}, [ allWordTokenDatas ])


	function reset(){
		getAllWordTokenDatas()
		setCollectionWordTokens(allWordTokenDatas)
		setForgeWordTokens([])
	}

	function forge(){
		if(forgeWordTokens.length >= 2){
			var idList = []
			forgeWordTokens.map(tokenIndex => {
				idList.push(parseInt(tokenIndex["id"]))
			});
			mintForgedToken(idList)
		}
	}

	const onDragEnd = (result) => {
		if(!result.destination) {
		  return
		}

		const forgeListCopy = Array.from(forgeWordTokens)
		const collectionListCopy = Array.from(collectionWordTokens)
		var [removed] = [null]

		if(result.source.droppableId === "droppableForge"){
			[removed] = forgeListCopy.splice(result.source.index, 1)
		} else {
			[removed] = collectionListCopy.splice(result.source.index, 1)
		}

		if(result.destination.droppableId === "droppableCollection"){
			collectionListCopy.splice(result.destination.index, 0, removed)
		} else {
			forgeListCopy.splice(result.destination.index, 0, removed)
		}
		setCollectionWordTokens(collectionListCopy)
		setForgeWordTokens(forgeListCopy)
	}


	return (
		
		<DragDropContext onDragEnd={onDragEnd}>
		<section id="forge">
			<div className="card">
				<label>Mots à forger : </label>
				<Droppable key="df" droppableId="droppableForge" direction="horizontal">
				{(provided) => (
					<div className="market-listings" style={{minHeight: 150, minWidth: 150}} ref={provided.innerRef} {...provided.droppableProps}>
						{
							Object.keys(forgeWordTokens).map((tokenIndex, index) => {
							return (
								<Draggable key={tokenIndex} draggableId={"df#"+tokenIndex} index={index}>
									{(provided, snapshot) => (
										<div ref = {provided.innerRef} snapshot={snapshot} {...provided.draggableProps} {...provided.dragHandleProps}>
											<WordTokenSoft key={forgeWordTokens[tokenIndex]} datas={forgeWordTokens[tokenIndex]}/>
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
				<Popup trigger={
					<button> Forger </button>
				} modal>
				{close => (
						forgeWordTokens.length < 2 ?
							<div className="card">
								<label>Veuillez selectionner plus de 2 mots à forger</label>
								<button className="button" onClick={() => { close() }}> Ok </button>
							</div>	
						:
							<div className="card">
								<label>Êtes vous sûr de forger ces mots ? (ils ne pourront pas être dissociés par la suite)</label>
								<button onClick={() => {forge(forgeWordTokens); close()}}>Forger</button> 
								<button className="button" onClick={() => { close() }}> Annuler </button>
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
							Object.keys(collectionWordTokens).map((tokenIndex, index) => {
							return (
								<Draggable key={tokenIndex} draggableId={"dc#"+tokenIndex} index={index}>
									{(provided) => (
										<div ref = {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
											<WordTokenSoft key={collectionWordTokens[tokenIndex]} datas={collectionWordTokens[tokenIndex]}/>
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
			

			<button onClick={() =>  reset()}> Actualiser </button>

			<img src="forge_full.png" id="mountains_front" alt=""/>
		</section>
		</DragDropContext>
	)
}

export default Forge