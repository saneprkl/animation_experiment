import React from 'react';
import styles from './Game.module.css';
import char from './AnimationSheet_Character.png'

export default function Game() {
    let output;

    
    const startGame = () => {
        
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width = 900;
        const height = canvas.height = 250;

        const character = new Image();
        character.src = char;
        let frames = 0;
        const slowAnimation = 30;
        const charWidth = 33;
        const charHeight = 32.2;
        let charState = 'idle2';

        const animations = [];
        const animationState = [
            {
                name: 'idle',
                frames: 2
            },
            {
                name: 'idle2',
                frames: 2
            },
            {
                name: 'walk',
                frames: 4
            },
            {
                name: 'run',
                frames: 8
            },
            {
                name: 'duck',
                frames: 6
            },
            {
                name: 'jump',
                frames: 8
            },
            {
                name: 'vanish',
                frames: 3
            },
            {
                name: 'die',
                frames: 8
            },
            {
                name: 'attack',
                frames: 8
            }
        ];

        animationState.forEach((state, i) => {
            let frames = {
                loc: [],
            }
            for(let c = 0; c < state.frames; c++){
                let positionX = c * charWidth;
                let positionY = i * charHeight;
                frames.loc.push({x: positionX, y: positionY});
            }
            animations[state.name] = frames;
        })

        const animate = () => {
            ctx.clearRect(0,0, width, height);
            let position = Math.floor(frames/slowAnimation) % animations[charState].loc.length;
            let frameX = charWidth * position;
            let frameY = animations[charState].loc[position].y;
            ctx.drawImage(character, frameX, frameY, charHeight, charWidth, 100, 100, 100, 100);
            frames++;
            requestAnimationFrame(animate);
        }

        output = <>
            { animate() }
        </>
    }

    output = <>
        <div className={ styles.container }>
            <button className={ styles.start } onClick={ () => startGame() }>
                Start Animation
            </button>
        </div>
            </>
    return (
    <>
    <canvas id="canvas"></canvas>
        { output }
        <div className={ styles.buttonContainer }>
            <button className={ styles.animationButton }>Idle</button>
            <button className={ styles.animationButton }>Idle 2</button>
            <button className={ styles.animationButton }>Walk</button>
            <button className={ styles.animationButton }>Run</button>
            <button className={ styles.animationButton }>Duck</button>
            <button className={ styles.animationButton }>Jump</button>
            <button className={ styles.animationButton }>Vanish</button>
            <button className={ styles.animationButton }>Death</button>
            <button className={ styles.animationButton }>Attack</button>
        </div>    
    </>
    )
}