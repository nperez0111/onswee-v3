import React, { Component, PropTypes } from 'react';
import GameUtils from './GameUtils.js';

export default class Square extends Component {
    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        playerNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        turn: PropTypes.number.isRequired
    }
    render() {
        const { onEdit, playerNames, turn } = this.props;
        return (<div className='player-names'>{
            this.displayNames(playerNames,turn,onEdit)
        }</div>);
    }
    displayNames(playerNames, turn, onEdit) {
        return playerNames.map((name, index) => {
            const classNamed = `name ${GameUtils.isPlayersTurn(index,turn)?'active':''}`;
            return (<input key={index} className={classNamed} value={name} onChange={onEdit(`player${index+1}`)} />)
        })
    }
}
