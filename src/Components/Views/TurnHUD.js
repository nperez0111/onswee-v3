import React, { Component, PropTypes } from 'react';

export default class TurnHUD extends Component {

    static propTypes = {
        player: PropTypes.number.isRequired,
        playerNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        turn: PropTypes.number.isRequired
    }
    render() {
        const { player, playerNames, turn } = this.props;
        return (
            <div className='Turn-HUD'>
				<div className='turn-count'>
				Round:{turn}
				</div>
				<div className='Player-GUI'>
					{this.displayPlayers(playerNames,player)}
				</div>
                <div className='undo'>{this.props.children}</div>
			</div>
        )
    }
    displayPlayers(names, current) {
        return names.map((name, i) => {
            return (<div key={i} className={`player ${names[current]===name?'active':''}`}><h3>{name}</h3></div>)
        })
    }
}
