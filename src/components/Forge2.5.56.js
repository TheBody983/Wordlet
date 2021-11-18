import React, { useState } from "react";

import { useUser } from "../providers/UserProvider";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import WordTokenSoft from "./WordTokenSoft";


const Forge = () => {
	
	const { getUserWordTokens, userWordTokens, setUserWordTokens } = useUser( )
    const { mintForgedToken } = useUser( )

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const newItems = Array.from(userWordTokens);
		const [removed] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, removed);
		setUserWordTokens(newItems);
	};

    return(
		<DragDropContext onDragEnd={onDragEnd}>
        <section id="forge">
            <div className="card">
                <label>Mots à forger : </label>
				<Droppable droppableId="droppableForge" direction="horizontal">
				{(provided, snapshot) => (
					<div className="market-listings" style={{height: 100}} ref={provided.innerRef} {...provided.droppableProps}>
					</div>
				)}
				</Droppable>
                <button onClick={() => mintForgedToken()}>Forger</button> 
            </div>
			<img src="forge_full.png" id="mountains_front" alt=""/>
			
			{
				userWordTokens &&
				
				<Droppable droppableId="droppableCollection" direction="horizontal">
				{(provided, snapshot) => (
				<div className="market-listings" ref={provided.innerRef} {...provided.droppableProps}>
				{
					Object.keys(userWordTokens).map((token, index) => {
					return (
						<Draggable key={token} draggableId={token} index={index}>
							{(provided, snapshot) => (
								<div ref = {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
									<WordTokenSoft key={userWordTokens[token]} tokenId={userWordTokens[token]}/>
								</div>
							)}
						</Draggable>
					)
					})
				}
				</div> 
				)}
				</Droppable>
			}
			

			<button onClick={() => getUserWordTokens()}> Actualiser </button>
        </section>
		</DragDropContext>
    )
}

export default Forge