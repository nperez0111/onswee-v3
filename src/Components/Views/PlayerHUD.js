import React from 'react'
import PropTypes from 'prop-types'
import GameLogic from '../Game/Logic.js'


const Square = ({ onEdit, playerNames, turn }) => {

    const displayEditNames = (playerNames, turn, onEdit) => {
        return playerNames.map((name, index) => {
            const classNamed = `name ${GameLogic.isPlayersTurn(index,turn)?'active':''}`;
            return (<input key={index} className={classNamed} value={name} onChange={onEdit(`player${index+1}`)} />)
        })
    }

    return (<div className='player-names'>{ displayEditNames(playerNames,turn,onEdit) }</div>)

}

Square.propTypes = {
    onEdit: PropTypes.func.isRequired,
    playerNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    turn: PropTypes.number.isRequired
}
export default Square