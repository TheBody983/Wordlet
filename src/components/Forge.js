import React, { useState, useEffect } from "react";

import { useUser } from "../providers/UserProvider";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import WordTokenSoft from "./WordTokenSoft";

const Forge = () => {
	
	const { userWordTokens } = useUser( )
    const { mintForgedToken } = useUser( )

	const [forgeWordTokens, setForgeWordTokens] = useState([]);
	const [collectionWordTokens, setCollectionWordTokens] = useState(userWordTokens);

	function reset(){
		setCollectionWordTokens(userWordTokens);
		setForgeWordTokens([]);
	}

	const onDragEnd = (result) => {
		if (!result.destination) {
		  return;
		}

		if (result.source.droppableId === "droppableForge"){
			const forgeListCopy = Array.from(forgeWordTokens);
			const [removed] = forgeListCopy.splice(result.source.index, 1);
			if(result.destination.droppableId === "droppableForge"){
				forgeListCopy.splice(result.destination.index, 0, removed);
			} else if (result.destination.droppableId === "droppableCollection") {
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
			} else if (result.destination.droppableId === "droppableForge") {
				const forgeListCopy = Array.from(forgeWordTokens);
				forgeListCopy.splice(result.destination.index, 0, removed);
				setForgeWordTokens(forgeListCopy);
			}
			setCollectionWordTokens(collectionListCopy);
		}
	  };


    return(
		<DragDropContext onDragEnd={onDragEnd}>
        <section id="forge">
            <div className="card">
                <label>Mots à forger : </label>
				<Droppable key="df" droppableId="droppableForge" direction="horizontal">
				{(provided) => (
					<div className="market-listings" style={{height: 130}} ref={provided.innerRef} {...provided.droppableProps}>
						{
							Object.keys(forgeWordTokens).map((token, index) => {
							return (
								<Draggable key={token} draggableId={"df"+token} index={index}>
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
                <button onClick={() => mintForgedToken(forgeWordTokens)}>Forger</button> 
            </div>
			
			
			{
				collectionWordTokens &&
				
				<Droppable key="dc" droppableId="droppableCollection" direction="horizontal">
				{(provided) => (
					<div className="market-listings" ref={provided.innerRef} {...provided.droppableProps}>
					{
						Object.keys(collectionWordTokens).map((token, index) => {
						return (
							<Draggable key={token} draggableId={"dc"+token} index={index}>
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
			}
			

			<button onClick={() =>  reset()}> Reinitialiser </button>
			<img src="forge_full.png" id="mountains_front" alt=""/>
        </section>
		</DragDropContext>
    )
}

export default Forge