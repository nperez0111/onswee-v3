import React from 'react';
import PropTypes from 'prop-types';

const TurnHUD = ({ player, playerNames, turn, children }) => {

    const displayPlayers = (names, current) => {
        return names.map((name, i) => {
            return (<div key={i} className={`player ${names[current]===name?'active':''}`}><h3>{name}</h3></div>)
        })
    }
    return (
        <div className='Turn-HUD'>
                <div className='turn-count'>
                Round:{turn}
                </div>
                <div className='Player-GUI'>
                    {displayPlayers(playerNames,player)}
                </div>
                <div className='undo'>{children}</div>
            </div>
    )
}


TurnHUD.propTypes = {
    player: PropTypes.number.isRequired,
    playerNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    turn: PropTypes.number.isRequired
}
export default TurnHUD